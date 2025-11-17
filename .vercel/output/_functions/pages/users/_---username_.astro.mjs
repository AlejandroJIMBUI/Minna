import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Crelv-dB.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CnnVFTuW.mjs';
import { s as supabase } from '../../chunks/supabase_LGgGHRHq.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { username } = Astro2.params;
  Astro2.locals.session;
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single();
  if (!profile) {
    return Astro2.redirect("/dashboard?error=Usuario no encontrado");
  }
  const { data: userPosts } = await supabase.from("posts").select("*").eq("user_id", profile.id).order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Perfil de @${username}`, "data-astro-cid-pph7swg6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="user-profile-page" data-astro-cid-pph7swg6> <main class="profile-main" data-astro-cid-pph7swg6> <div class="profile-card" data-astro-cid-pph7swg6> <div class="profile-header-section" data-astro-cid-pph7swg6> <div class="avatar-section" data-astro-cid-pph7swg6> <img${addAttribute(profile.avatar_url || "/default-avatar.jpg", "src")} alt="Avatar" class="profile-avatar" data-astro-cid-pph7swg6> </div> <div class="profile-info" data-astro-cid-pph7swg6> <h1 data-astro-cid-pph7swg6>@${profile.username}</h1> <p class="full-name" data-astro-cid-pph7swg6>${profile.full_name}</p> </div> </div> ${profile.bio && renderTemplate`<div class="bio-section" data-astro-cid-pph7swg6> <h3 data-astro-cid-pph7swg6>Biografía</h3> <p class="bio-text" data-astro-cid-pph7swg6>${profile.bio}</p> </div>`} <div class="profile-stats" data-astro-cid-pph7swg6> <span class="stat" data-astro-cid-pph7swg6> <strong data-astro-cid-pph7swg6>${userPosts?.length || 0}</strong> publicaciones
</span> <span class="stat" data-astro-cid-pph7swg6>
Miembro desde ${new Date(profile.created_at).getFullYear()} </span> </div> </div> <div class="user-posts" data-astro-cid-pph7swg6> <h2 data-astro-cid-pph7swg6>Publicaciones de @${profile.username}</h2> ${userPosts && userPosts.length > 0 ? renderTemplate`<div class="posts-list" data-astro-cid-pph7swg6> ${userPosts.map((post) => renderTemplate`<article class="post-card" data-astro-cid-pph7swg6> <div class="post-header" data-astro-cid-pph7swg6> <span class="post-date" data-astro-cid-pph7swg6> ${new Date(post.created_at).toLocaleDateString()} </span> </div> <h3 class="post-title" data-astro-cid-pph7swg6>${post.title}</h3> <p class="post-content" data-astro-cid-pph7swg6>${post.content}</p> </article>`)} </div>` : renderTemplate`<div class="no-posts" data-astro-cid-pph7swg6> <p data-astro-cid-pph7swg6>@${profile.username} aún no ha creado publicaciones.</p> </div>`} </div> </main> </div> ` })} `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/users/[...username].astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/users/[...username].astro";
const $$url = "/users/[...username]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
