import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Crelv-dB.mjs';
import { $ as $$Layout } from '../chunks/Layout_CnnVFTuW.mjs';
import 'clsx';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$CreatePostForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CreatePostForm;
  const { error, message } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="create-post-form-container" data-astro-cid-tt6igkdl> ${error && renderTemplate`<div class="error-message" data-astro-cid-tt6igkdl>${decodeURIComponent(error)}</div>`} ${message && renderTemplate`<div class="success-message" data-astro-cid-tt6igkdl>${decodeURIComponent(message)}</div>`} <form method="POST" action="/api/posts/create" class="post-form" data-astro-cid-tt6igkdl> <div class="form-group" data-astro-cid-tt6igkdl> <input type="text" name="title" placeholder="Título de tu publicación" required class="post-title-input" data-astro-cid-tt6igkdl> </div> <div class="form-group" data-astro-cid-tt6igkdl> <textarea name="content" placeholder="¿Qué quieres compartir con la comunidad? Escribe aquí tus pensamientos, ideas o experiencias..." required rows="8" class="post-content-input" data-astro-cid-tt6igkdl></textarea> </div> <div class="form-actions" data-astro-cid-tt6igkdl> <a href="/dashboard" class="cancel-btn" data-astro-cid-tt6igkdl> Cancelar </a> <button type="submit" class="post-submit-btn" data-astro-cid-tt6igkdl>Publicar</button> </div> </form> </div> `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/components/posts/CreatePostForm.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$CreatePost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreatePost;
  const session = Astro2.locals.session;
  const user = Astro2.locals.user;
  if (!session || !user) {
    return Astro2.redirect("/login");
  }
  const error = Astro2.url.searchParams.get("error");
  const message = Astro2.url.searchParams.get("message");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Crear Publicaci\xF3n", "showHeader": false, "data-astro-cid-7sxnnjk4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="create-post-page" data-astro-cid-7sxnnjk4> <main class="page-main" data-astro-cid-7sxnnjk4> <div class="create-post-container" data-astro-cid-7sxnnjk4> <div class="create-post-header" data-astro-cid-7sxnnjk4> <h1 data-astro-cid-7sxnnjk4>Crear Nueva Publicación</h1> <p data-astro-cid-7sxnnjk4>Comparte tus pensamientos con la comunidad</p> </div> <!-- Pasar las variables como props --> ${renderComponent($$result2, "CreatePostForm", $$CreatePostForm, { "error": error, "message": message, "data-astro-cid-7sxnnjk4": true })} </div> </main> </div> ` })} `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/create-post.astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/create-post.astro";
const $$url = "/create-post";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreatePost,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
