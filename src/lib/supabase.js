import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// FUNCIONES DE AUTENTICACION

// Registro de nuevo usuario
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        full_name: userData.fullName
      }
    }
  })

  if (error) throw error
  return data
}

// Inicio de sesión
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

// Cierre de sesión
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Obtener usuario actual
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Restablecer contraseña
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`
  })

  if (error) throw error
  return data
}

// Actualizar contraseña
export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
  return data
}

// FUNCIONES DE PERFILES

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const updateProfile = async (profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert([profileData])
    .select()
  
  if (error) throw error
  return data[0]
}

// Crear perfil automáticamente después del registro
export const handleNewUser = async (user) => {
  const { error } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id,
        username: `user_${user.id.slice(0, 8)}`,
        full_name: user.email?.split('@')[0] || 'Usuario',
        avatar_url: null,
        bio: null
      }
    ])

  if (error) {
    console.error('Error creating profile:', error)
    throw error
  }
}

// Listener para creación automática de perfiles
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    try {
      // Verificar si el usuario ya tiene perfil
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
      
      if (!error && (!data || data.length === 0)) {
        await handleNewUser(session.user)
      }
    } catch (error) {
      console.error('Error in auth state change:', error)
    }
  }
})

// FUNCIONES DE PUBLICACIONES

export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getUserPosts = async (userId) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// FUNCIONES DE ARCHIVOS/MEDIA

// Configuración de límites de tamaño (en bytes)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024,    // 5MB para imágenes
  audio: 50 * 1024 * 1024,   // 50MB para audio (50 debido a los archivos FLAC y WAV)
  video: 50 * 1024 * 1024,   // 50MB para video - NOTA: Añadir compresion en deployments futuros
  default: 20 * 1024 * 1024   // 20MB por defecto
}

// Función para validar el tamaño del archivo
export const validateFileSize = (file, fileType = 'image') => {
  const maxSize = FILE_SIZE_LIMITS[fileType] || FILE_SIZE_LIMITS.default
  
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
    throw new Error(`El archivo es demasiado grande. Máximo ${maxSizeMB}MB permitido para ${fileType}.`)
  }
  
  return true
}

export const getMaxSizeForType = (fileType) => {
  return FILE_SIZE_LIMITS[fileType] || FILE_SIZE_LIMITS.default
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileType = (mimeType) => {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.startsWith('video/')) return 'video'
  return 'none'
}

// Función para subir cualquier tipo de archivo con validación de tamaño
export const uploadFile = async (file, fileName, fileType = 'image') => {
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a', 'audio/flac'],
    video: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-matroska']
  }

  if (!allowedTypes[fileType]?.includes(file.type)) {
    throw new Error(`Tipo de archivo no permitido para ${fileType}. Formatos permitidos: ${allowedTypes[fileType].join(', ')}`)
  }

  validateFileSize(file, fileType)

  const { data, error } = await supabase
    .storage
    .from('post-media')
    .upload(fileName, file)

  if (error) {
    if (error.message.includes('File size exceeds the maximum allowed')) {
      throw new Error('El archivo excede el límite de tamaño permitido por el servidor.')
    }
    throw error
  }
  
  return data
}

export const getFileUrl = (path) => {
  const { data } = supabase
    .storage
    .from('post-media')
    .getPublicUrl(path)
  
  return data.publicUrl
}

export const createPostWithMedia = async (postData, file = null) => {
  let mediaUrl = null
  let mediaType = 'none'

  if (file) {
    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
    
    mediaType = getFileType(file.type)
    await uploadFile(file, fileName, mediaType)
    mediaUrl = fileName
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{
      ...postData,
      media_url: mediaUrl,
      media_type: mediaType
    }])
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
  
  if (error) throw error
  return data[0]
}