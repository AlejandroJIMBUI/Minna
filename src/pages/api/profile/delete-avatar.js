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

    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching profile:', fetchError);
      return new Response(JSON.stringify({ 
        error: 'Error obtaining profile' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (profile.avatar_url) {
      try {
        const { data: files, error: listError } = await supabase.storage
          .from('avatars')
          .list(userId);

        if (listError) {
          console.error('Error listing files:', listError);
        } else if (files && files.length > 0) {
          const filesToDelete = files.map(file => `${userId}/${file.name}`);
          console.log('Deleting files:', filesToDelete);
          
          const { error: deleteError } = await supabase.storage
            .from('avatars')
            .remove(filesToDelete);

          if (deleteError) {
            console.error('Error deleting files from storage:', deleteError);
          } else {
            console.log('All user files deleted from storage');
          }
        }
      } catch (storageError) {
        console.error('Error processing storage deletion:', storageError);
      }
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return new Response(JSON.stringify({ 
        error: 'Error updating profile' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Profile updated successfully, avatar removed');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Successfully deleted avatar'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in delete avatar:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}