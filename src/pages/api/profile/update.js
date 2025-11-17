import { supabase } from '../../../lib/supabase'

export async function POST({ request, cookies }) {
  try {
    const session = await supabase.auth.getSession()
    
    if (!session.data.session) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/login'
        }
      })
    }

    const formData = await request.formData()
    const username = formData.get('username')
    const fullName = formData.get('fullName')
    const bio = formData.get('bio')
    const avatar_url = formData.get('avatar_url')

    if (!username || !fullName) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Username y nombre completo son requeridos'
        }
      })
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        username: username,
        full_name: fullName,
        bio: bio,
        avatar_url: avatar_url || null, // Usar null si está vacío
        updated_at: new Date().toISOString()
      })
      .eq('id', session.data.session.user.id)

    if (error) {
      console.error('Error updating profile:', error)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Error al actualizar el perfil'
        }
      })
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/profile?message=Perfil actualizado exitosamente'
      }
    })

  } catch (error) {
    console.error('Error in profile update:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/profile?error=Error interno del servidor'
      }
    })
  }
}