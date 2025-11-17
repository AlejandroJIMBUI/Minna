import { s as supabase } from '../../../chunks/supabase_LGgGHRHq.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, cookies }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    const fullName = formData.get("fullName");
    console.log("Datos recibidos:", { email, username, fullName });
    if (!email || !password || !username || !fullName) {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/register?error=Todos los campos son requeridos"
        }
      });
    }
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName
        },
        // Esto evita que se envíe el email de verificación
        emailRedirectTo: `${request.headers.get("origin")}/dashboard`
      }
    });
    if (authError) {
      console.error("Error de auth:", authError);
      return new Response(null, {
        status: 302,
        headers: {
          "Location": `/register?error=${encodeURIComponent(authError.message)}`
        }
      });
    }
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          username,
          full_name: fullName,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]);
      if (profileError) {
        console.error("Error creando perfil:", profileError);
      }
    }
    if (authData.user) {
      const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (signInError) {
        console.error("Error al iniciar sesión:", signInError);
        return new Response(null, {
          status: 302,
          headers: {
            "Location": "/login?message=Registro exitoso. Ahora puedes iniciar sesión."
          }
        });
      }
      if (sessionData.session) {
        cookies.set("sb-access-token", sessionData.session.access_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: true,
          sameSite: "lax"
        });
        cookies.set("sb-refresh-token", sessionData.session.refresh_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: true,
          sameSite: "lax"
        });
        return new Response(null, {
          status: 302,
          headers: {
            "Location": "/dashboard"
          }
        });
      }
    }
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/login?message=Registro exitoso"
      }
    });
  } catch (error) {
    console.error("Error en signup:", error);
    return new Response(null, {
      status: 302,
      headers: {
        "Location": `/register?error=${encodeURIComponent("Error interno del servidor")}`
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
