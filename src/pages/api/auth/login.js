import { supabase } from '../../../lib/supabase'

export async function POST({ request, cookies }) {
  try {
    const formData = await request.formData()
    
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/login?error=Email y contraseña son requeridos'
        }
      })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `/login?error=${encodeURIComponent(error.message)}`
        }
      })
    }

    if (data.session) {
      // Establecer cookies de sesión
      cookies.set('sb-access-token', data.session.access_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax'
      })
      
      cookies.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax'
      })

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/dashboard'
        }
      })
    }

  } catch (error) {
    console.error('Login error:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login?error=Error interno del servidor'
      }
    })
  }
}