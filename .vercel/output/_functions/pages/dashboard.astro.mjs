import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Crelv-dB.mjs';
import { $ as $$Layout } from '../chunks/Layout_CnnVFTuW.mjs';
import { s as supabase } from '../chunks/supabase_LGgGHRHq.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const session = Astro2.locals.session;
  const user = Astro2.locals.user;
  if (!session || !user) {
    return Astro2.redirect("/login");
  }
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(20);
  let postsWithProfiles = [];
  if (posts && posts.length > 0) {
    const userIds = [...new Set(posts.map((post) => post.user_id))];
    const { data: profiles } = await supabase.from("profiles").select("id, username, full_name").in("id", userIds);
    postsWithProfiles = posts.map((post) => {
      const profile = profiles?.find((p) => p.id === post.user_id);
      return {
        ...post,
        profiles: profile || { username: "Usuario", full_name: "Usuario" }
      };
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard", "data-astro-cid-3nssi2tu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dashboard" data-astro-cid-3nssi2tu> <main class="dashboard-main" data-astro-cid-3nssi2tu> <!-- Botón para crear publicación --> <div class="create-post-cta" data-astro-cid-3nssi2tu> <h2 data-astro-cid-3nssi2tu>Bienvenido a tu Dashboard</h2> <p data-astro-cid-3nssi2tu>Comparte tus pensamientos con la comunidad</p> <a href="/create-post" class="create-post-btn" data-astro-cid-3nssi2tu>
Crear Nueva Publicación
</a> </div> <div class="posts-feed" data-astro-cid-3nssi2tu> <h3 data-astro-cid-3nssi2tu>Publicaciones Recientes</h3> ${postsWithProfiles && postsWithProfiles.length > 0 ? renderTemplate`<div class="posts-list" data-astro-cid-3nssi2tu> ${postsWithProfiles.map((post) => renderTemplate`<article class="post-card" data-astro-cid-3nssi2tu> <div class="post-header" data-astro-cid-3nssi2tu> <span class="post-author" data-astro-cid-3nssi2tu> <a${addAttribute(`/users/${post.profiles.username}`, "href")} class="username-link" data-astro-cid-3nssi2tu>
@${post.profiles.username} </a> </span> <span class="post-date" data-astro-cid-3nssi2tu> ${new Date(post.created_at).toLocaleDateString()} </span> </div> <h4 class="post-title" data-astro-cid-3nssi2tu>${post.title}</h4> <p class="post-content" data-astro-cid-3nssi2tu>${post.content}</p> ${post.media_url && renderTemplate`<div class="post-media" data-astro-cid-3nssi2tu> <img${addAttribute(post.media_url, "src")} alt="Media" class="post-image" data-astro-cid-3nssi2tu> </div>`} </article>`)} </div>` : renderTemplate`<div class="no-posts" data-astro-cid-3nssi2tu> <p data-astro-cid-3nssi2tu>Aún no hay publicaciones. ¡Sé el primero en publicar!</p> <a href="/create-post" class="create-post-link" data-astro-cid-3nssi2tu>
Crear primera publicación
</a> </div>`} </div> </main> </div> ` })} `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
