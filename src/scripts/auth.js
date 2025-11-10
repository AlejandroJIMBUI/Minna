import { 
  supabase, 
  signIn, 
  signUp, 
  signOut 
} from '../lib/supabase-client.js';

// Sistema de estado y listeners
let currentUser = null;
let authListeners = [];

// Inicializar autenticación
export async function initAuth() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        currentUser = session?.user || null;
        notifyAuthListeners();
        
        // Escuchar cambios de autenticación
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session?.user);
            currentUser = session?.user || null;
            notifyAuthListeners();
            handleAuthRedirect(event, session);
        });
    } catch (error) {
        console.error('Error initializing auth:', error);
    }
}

// Usamos TU función de login
export async function login(email, password) {
    try {
        const data = await signIn(email, password);
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Usamos TU función de registro
export async function register(email, password, userData) {
    try {
        const data = await signUp(email, password, userData);
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Usamos TU función de logout
export async function logout() {
    try {
        await signOut();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Obtener usuario actual - AHORA SOLO HAY UNA DEFINICIÓN
export function getCurrentUser() {
    return currentUser;
}

// Verificar autenticación
export function isAuthenticated() {
    return !!currentUser;
}

// Listeners para cambios de estado
export function onAuthChange(callback) {
    authListeners.push(callback);
    return () => {
        authListeners = authListeners.filter(cb => cb !== callback);
    };
}

function notifyAuthListeners() {
    authListeners.forEach(callback => {
        try {
            callback(currentUser);
        } catch (error) {
            console.error('Error in auth listener:', error);
        }
    });
}

// Redirección automática
function handleAuthRedirect(event, session) {
    const currentPath = window.location.pathname;
    
    if (event === 'SIGNED_IN' && session?.user) {
        if (currentPath === '/login' || currentPath === '/register') {
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }
    } else if (event === 'SIGNED_OUT') {
        if (currentPath.startsWith('/dashboard') || currentPath === '/') {
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        }
    }
}

// Protección de rutas en el cliente
export function requireAuth() {
    if (!currentUser) {
        window.location.href = '/login';
        return false;
    }
    return true;
}

// Inicializar cuando se carga la página
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initAuth);
}