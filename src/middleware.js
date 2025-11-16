import { defineMiddleware } from 'astro:middleware'
import { supabase } from './lib/supabase'

export const onRequest = defineMiddleware(async (context, next) => {
  // Inicializar locals
  context.locals.session = null
  context.locals.user = null

  // Obtener el token de la cookie
  const accessToken = context.cookies.get('sb-access-token')?.value
  const refreshToken = context.cookies.get('sb-refresh-token')?.value

  if (accessToken && refreshToken) {
    try {
      // Establecer la sesión en Supabase
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (!error && data.session) {
        context.locals.session = data.session
        context.locals.user = data.session.user
      } else {
        // Limpiar cookies si la sesión no es válida
        context.cookies.delete('sb-access-token')
        context.cookies.delete('sb-refresh-token')
      }
    } catch (error) {
      console.error('Error setting session:', error)
      // Limpiar cookies en caso de error
      context.cookies.delete('sb-access-token')
      context.cookies.delete('sb-refresh-token')
    }
  }

  return next()
})