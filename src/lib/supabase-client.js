// Re-exportamos todo EXCEPTO getCurrentUser para evitar conflicto
export { 
  supabase,
  signUp, 
  signIn, 
  signOut, 
  resetPassword,
  updatePassword,
  getProfile,
  updateProfile,
  getPosts,
  getUserPosts,
  validateFileSize,
  formatFileSize,
  getMaxSizeForType,
  getFileType,
  uploadFile,
  getFileUrl,
  createPostWithMedia
} from './supabase.js';