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
    const postId = formData.get('postId')

    if (!postId) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Post ID required&from=posts'
        }
      })
    }

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single()

    if (fetchError || !post) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Post not found&from=posts'
        }
      })
    }

    if (post.user_id !== session.data.session.user.id) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=You do not have permission to delete this post&from=posts'
        }
      })
    }

    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (deleteError) {
      console.error('Error deleting post:', deleteError)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/profile?error=Error deleting post&from=posts'
        }
      })
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/profile?message=Post successfully deleted&from=posts'
      }
    })

  } catch (error) {
    console.error('Error in delete post:', error)
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/profile?error=Internal Server Error&from=posts'
      }
    })
  }
}