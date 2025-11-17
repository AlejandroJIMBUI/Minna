import { e as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Crelv-dB.mjs';
import { $ as $$Layout } from '../chunks/Layout_CnnVFTuW.mjs';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$SignUpForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="auth-form-container" data-astro-cid-tvd53vlv> <h2 data-astro-cid-tvd53vlv>Crear Cuenta</h2> <form method="POST" action="/api/auth/signup" class="auth-form" data-astro-cid-tvd53vlv> <div class="form-group" data-astro-cid-tvd53vlv> <label for="username" data-astro-cid-tvd53vlv>Nombre de usuario</label> <input type="text" id="username" name="username" required placeholder="tu_usuario" pattern="[a-zA-Z0-9_]+" title="Solo letras, números y guiones bajos" data-astro-cid-tvd53vlv> </div> <div class="form-group" data-astro-cid-tvd53vlv> <label for="fullName" data-astro-cid-tvd53vlv>Nombre completo</label> <input type="text" id="fullName" name="fullName" required placeholder="Tu nombre completo" data-astro-cid-tvd53vlv> </div> <div class="form-group" data-astro-cid-tvd53vlv> <label for="email" data-astro-cid-tvd53vlv>Correo electrónico</label> <input type="email" id="email" name="email" required placeholder="tu@email.com" data-astro-cid-tvd53vlv> </div> <div class="form-group" data-astro-cid-tvd53vlv> <label for="password" data-astro-cid-tvd53vlv>Contraseña</label> <input type="password" id="password" name="password" required placeholder="Mínimo 6 caracteres" minlength="6" data-astro-cid-tvd53vlv> </div> <button type="submit" class="auth-button" data-astro-cid-tvd53vlv>Registrarse</button> </form> <div class="auth-links" data-astro-cid-tvd53vlv> <p data-astro-cid-tvd53vlv>
¿Ya tienes cuenta? <a href="/login" class="auth-link" data-astro-cid-tvd53vlv>Inicia sesión aquí</a> </p> </div> </div> `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/components/auth/SignUpForm.astro", void 0);

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Registrarse", "showHeader": false, "data-astro-cid-qraosrxq": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-page" data-astro-cid-qraosrxq> <main class="auth-main" data-astro-cid-qraosrxq> ${renderComponent($$result2, "SignUpForm", $$SignUpForm, { "data-astro-cid-qraosrxq": true })} </main> </div> ` })} `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/register.astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
