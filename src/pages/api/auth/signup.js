import { supabase } from '../../../lib/supabase'

export async function POST({ request, cookies }) {
  try {
    const formData = await request.formData()
    
    const email = formData.get('email')
    const password = formData.get('password')
    const username = formData.get('username')
    const fullName = formData.get('fullName')

    console.log('Datos recibidos:', { email, username, fullName })

    // Validar campos requeridos
    if (!email || !password || !username || !fullName) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/register?error=Todos los campos son requeridos'
        }
      })
    }

    // 1. Registrar usuario en Auth (sin verificación de email)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          full_name: fullName
        },
        // Esto evita que se envíe el email de verificación
        emailRedirectTo: `${request.headers.get('origin')}/dashboard`
      }
    })

    if (authError) {
      console.error('Error de auth:', authError)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `/register?error=${encodeURIComponent(authError.message)}`
        }
      })
    }

    // 2. Crear perfil en la tabla profiles
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username: username,
            full_name: fullName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])

      if (profileError) {
        console.error('Error creando perfil:', profileError)
      }
    }

    // 3. Iniciar sesión automáticamente después del registro
    if (authData.user) {
      const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Error al iniciar sesión:', signInError)
        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/login?message=Registro exitoso. Ahora puedes iniciar sesión.'
          }
        })
      }

      if (sessionData.session) {
        // Establecer cookies de sesión
        cookies.set('sb-access-token', sessionData.session.access_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: 'lax'
        })
        
        cookies.set('sb-refresh-token', sessionData.session.refresh_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: 'lax'
        })

        // Redirigir al dashboard
        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/dashboard'
          }
        })
      }
    }

    // Fallback: redirigir al login
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login?message=Registro exitoso'
      }
    })

  } catch (error) {
    console.error('Error en signup:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `/register?error=${encodeURIComponent('Error interno del servidor')}`
      }
    })
  }
}