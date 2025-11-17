import { s as supabase } from '../../../chunks/supabase_LGgGHRHq.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ cookies }) {
  try {
    await supabase.auth.signOut();

    // Limpiar cookies
    cookies.delete('sb-access-token');
    cookies.delete('sb-refresh-token');

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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
