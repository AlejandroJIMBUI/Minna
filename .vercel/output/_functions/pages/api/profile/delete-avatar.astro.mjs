import { s as supabase } from '../../../chunks/supabase_LGgGHRHq.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, cookies }) {
  try {
    const session = await supabase.auth.getSession();
    
    if (!session.data.session) {
      return new Response(JSON.stringify({ 
        error: 'No autorizado' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const userId = session.data.session.user.id;

    // Obtener el perfil actual para ver si tiene avatar
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching profile:', fetchError);
      return new Response(JSON.stringify({ 
        error: 'Error al obtener el perfil' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Si hay un avatar_url, intentar eliminar TODOS los archivos del usuario
    if (profile.avatar_url) {
      try {
        // Listar todos los archivos del usuario en el bucket avatars
        const { data: files, error: listError } = await supabase.storage
          .from('avatars')
          .list(userId);

        if (listError) {
          console.error('Error listando archivos:', listError);
        } else if (files && files.length > 0) {
          // Crear array con todos los paths a eliminar
          const filesToDelete = files.map(file => `${userId}/${file.name}`);
          console.log('Eliminando archivos:', filesToDelete);
          
          // Eliminar TODOS los archivos del usuario
          const { error: deleteError } = await supabase.storage
            .from('avatars')
            .remove(filesToDelete);

          if (deleteError) {
            console.error('Error eliminando archivos de storage:', deleteError);
          } else {
            console.log('Todos los archivos del usuario eliminados de storage');
          }
        }
      } catch (storageError) {
        console.error('Error procesando eliminación de storage:', storageError);
      }
    }

    // Actualizar el perfil para establecer avatar_url como null
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
        error: 'Error al actualizar el perfil' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Perfil actualizado correctamente, avatar eliminado');

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Avatar eliminado correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in delete avatar:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
