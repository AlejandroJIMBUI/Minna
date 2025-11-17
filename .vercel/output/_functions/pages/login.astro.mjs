import { e as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Crelv-dB.mjs';
import { $ as $$Layout } from '../chunks/Layout_CnnVFTuW.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$LoginForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="auth-form-container" data-astro-cid-s6unksgf> <h2 data-astro-cid-s6unksgf>Iniciar Sesión</h2> <form method="POST" action="/api/auth/login" class="auth-form" data-astro-cid-s6unksgf> <div class="form-group" data-astro-cid-s6unksgf> <label for="email" data-astro-cid-s6unksgf>Correo electrónico</label> <input type="email" id="email" name="email" required placeholder="tu@email.com" data-astro-cid-s6unksgf> </div> <div class="form-group" data-astro-cid-s6unksgf> <label for="password" data-astro-cid-s6unksgf>Contraseña</label> <input type="password" id="password" name="password" required placeholder="Tu contraseña" minlength="6" data-astro-cid-s6unksgf> </div> <button type="submit" class="auth-button" data-astro-cid-s6unksgf> Iniciar Sesión </button> </form> <div class="auth-links" data-astro-cid-s6unksgf> <p data-astro-cid-s6unksgf>
¿No tienes cuenta? <a href="/register" class="auth-link" data-astro-cid-s6unksgf>Regístrate aquí</a> </p> <p data-astro-cid-s6unksgf> <a href="/forgot-password" class="auth-link" data-astro-cid-s6unksgf>¿Olvidaste tu contraseña?</a> </p> </div> </div> `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/components/auth/LoginForm.astro", void 0);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n", "showHeader": false, "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-page" data-astro-cid-sgpqyurt> <main class="auth-main" data-astro-cid-sgpqyurt> ${renderComponent($$result2, "LoginForm", $$LoginForm, { "data-astro-cid-sgpqyurt": true })} </main> </div> ` })} `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/login.astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
