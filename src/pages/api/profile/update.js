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
          'Location': '/profile?error=Username and full name are required&from=profile'
        }
      })
    }

    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('username', username)
      .neq('id', session.data.session.user.id)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking username:', checkError)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Error checking username availability&from=profile'
        }
      })
    }

    if (existingUser) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `/profile?error=Username "${username}" is already taken&from=profile`
        }
      })
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        username: username,
        full_name: fullName,
        bio: bio,
        avatar_url: avatar_url || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.data.session.user.id)

    if (error) {
      console.error('Error updating profile:', error)
      
      if (error.code === '23505') {
        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/profile?error=Username is already taken&from=profile'
          }
        })
      }
      
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Error updating profile&from=profile'
        }
      })
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/profile?message=Profile updated successfully&from=profile'
      }
    })

  } catch (error) {
    console.error('Error in profile update:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/profile?error=Internal Server Error&from=profile'
      }
    })
  }
}