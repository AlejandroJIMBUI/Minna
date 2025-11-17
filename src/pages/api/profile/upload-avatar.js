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
        error: 'No se proporcionó archivo' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validar tamaño (1MB)
    if (file.size > 1048576) {
      return new Response(JSON.stringify({ 
        error: 'La imagen debe ser menor a 1MB' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ 
        error: 'Solo se permiten imágenes' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const fileName = `${Date.now()}-${file.name}`
    const filePath = `${userId}/${fileName}`

    console.log('Subiendo archivo a:', filePath);

    // PRIMERO: Limpiar archivos antiguos del usuario
    try {
      const { data: oldFiles, error: listError } = await supabase.storage
        .from('avatars')
        .list(userId);

      if (!listError && oldFiles && oldFiles.length > 0) {
        const filesToDelete = oldFiles.map(file => `${userId}/${file.name}`);
        console.log('Limpiando archivos antiguos:', filesToDelete);
        
        await supabase.storage
          .from('avatars')
          .remove(filesToDelete);
      }
    } catch (cleanupError) {
      console.error('Error limpiando archivos antiguos:', cleanupError);
      // Continuamos aunque falle la limpieza
    }

    // Subir nuevo archivo a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false // No usar upsert para evitar conflictos
      })

    if (uploadError) {
      console.error('Error subiendo archivo:', uploadError)
      return new Response(JSON.stringify({ 
        error: 'Error subiendo archivo: ' + uploadError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Archivo subido correctamente:', uploadData);

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    console.log('URL pública generada:', publicUrl);

    // Actualizar perfil en la base de datos
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error actualizando perfil:', updateError)
      // Intentar eliminar el archivo subido si falla la actualización
      await supabase.storage
        .from('avatars')
        .remove([filePath]);
        
      return new Response(JSON.stringify({ 
        error: 'Error actualizando perfil' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Perfil actualizado correctamente');

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
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}