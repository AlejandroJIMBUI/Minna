import { supabase } from '../../../lib/supabase'

export async function POST({ cookies }) {
  try {
    await supabase.auth.signOut()

    // Limpiar cookies
    cookies.delete('sb-access-token')
    cookies.delete('sb-refresh-token')

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Error al cerrar sesión' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}