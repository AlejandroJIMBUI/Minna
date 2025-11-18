import { supabase } from '../../../lib/supabase'

export async function POST({ request, cookies }) {
  try {
    const session = await supabase.auth.getSession()
    
    if (!session.data.session) {
      return new Response(JSON.stringify({ 
        error: 'No autorizado' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const userId = session.data.session.user.id;
    const formData = await request.formData()
    const file = formData.get('avatar')
    
    if (!file) {
      return new Response(JSON.stringify({ 
        error: 'No file provided' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (file.size > 1048576) {
      return new Response(JSON.stringify({ 
        error: 'The image must be smaller than 1MB' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ 
        error: 'Only images are allowed' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const fileName = `${Date.now()}-${file.name}`
    const filePath = `${userId}/${fileName}`

    console.log('Uploading file to:', filePath);

    try {
      const { data: oldFiles, error: listError } = await supabase.storage
        .from('avatars')
        .list(userId);

      if (!listError && oldFiles && oldFiles.length > 0) {
        const filesToDelete = oldFiles.map(file => `${userId}/${file.name}`);
        console.log('Cleaning old files:', filesToDelete);
        
        await supabase.storage
          .from('avatars')
          .remove(filesToDelete);
      }
    } catch (cleanupError) {
      console.error('Error cleaning old files:', cleanupError);
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return new Response(JSON.stringify({ 
        error: 'Error uploading file: ' + uploadError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('File uploaded successfully:', uploadData);

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    console.log('Generated public URL:', publicUrl);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      await supabase.storage
        .from('avatars')
        .remove([filePath]);
        
      return new Response(JSON.stringify({ 
        error: 'Error updating profile' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Profile updated successfully');

    return new Response(JSON.stringify({ 
      success: true,
      avatarUrl: publicUrl 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error en upload avatar:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}