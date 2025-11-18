import { supabase } from '../../../lib/supabase'

export async function POST({ request, cookies }) {
  try {
    const formData = await request.formData()
    
    const email = formData.get('email')
    const password = formData.get('password')
    const username = formData.get('username')
    const fullName = formData.get('fullName')

    console.log('Data received:', { email, username, fullName })

    if (!email || !password || !username || !fullName) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/register?error=All fields are required'
        }
      })
    }

    const { data: existingUser, error: usernameError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/register?error=The username is already in use'
        }
      })
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          full_name: fullName
        }
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `/register?error=${encodeURIComponent(authError.message)}`
        }
      })
    }

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
        console.error('Error creating profile:', profileError)
        
        await supabase.auth.admin.deleteUser(authData.user.id)
        
        return new Response(null, {
          status: 302,
          headers: {
            'Location': `/register?error=${encodeURIComponent('Error creating profile: ' + profileError.message)}`
          }
        })
      }

      const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Login error:', signInError)
        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/login?message=Registration successful. Please log in.'
          }
        })
      }

      if (sessionData.session) {
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

        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/dashboard'
          }
        })
      }
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login?message=Registration successful. You can now log in.'
      }
    })

  } catch (error) {
    console.error('Error en signup:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `/register?error=${encodeURIComponent('Internal Server Error: ' + error.message)}`
      }
    })
  }
}