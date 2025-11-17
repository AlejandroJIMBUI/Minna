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
    const title = formData.get('title')
    const content = formData.get('content')

    if (!title || !content) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/create-post?error=Título y contenido son requeridos'
        }
      })
    }

    const { error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: session.data.session.user.id,
          title: title,
          content: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Error creating post:', error)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/create-post?error=Error al crear la publicación'
        }
      })
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/dashboard?message=Publicación creada exitosamente'
      }
    })

  } catch (error) {
    console.error('Error in create post:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/create-post?error=Error interno del servidor'
      }
    })
  }
}