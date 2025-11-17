import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Crelv-dB.mjs';
import { $ as $$Layout } from '../chunks/Layout_CnnVFTuW.mjs';
import { s as supabase } from '../chunks/supabase_LGgGHRHq.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const session = Astro2.locals.session;
  const user = Astro2.locals.user;
  if (!session || !user) {
    return Astro2.redirect("/login");
  }
  const query = Astro2.url.searchParams.get("q") || "";
  let searchResults = [];
  if (query) {
    const { data } = await supabase.from("profiles").select("*").or(`username.ilike.%${query}%,full_name.ilike.%${query}%`).limit(10);
    searchResults = data || [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Buscar: ${query}`, "data-astro-cid-ipsxrsrh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="search-page" data-astro-cid-ipsxrsrh> <header class="page-header" data-astro-cid-ipsxrsrh> <a href="/dashboard" class="back-link" data-astro-cid-ipsxrsrh>← Volver al Dashboard</a> </header> <main class="search-main" data-astro-cid-ipsxrsrh> <div class="search-container" data-astro-cid-ipsxrsrh> <form method="GET" action="/search" class="search-form-large" data-astro-cid-ipsxrsrh> <input type="text" name="q"${addAttribute(query, "value")} placeholder="Buscar usuarios por nombre o username..." class="search-input-large" data-astro-cid-ipsxrsrh> <button type="submit" class="search-btn-large" data-astro-cid-ipsxrsrh>Buscar</button> </form> ${query && renderTemplate`<div class="search-results" data-astro-cid-ipsxrsrh> <h2 data-astro-cid-ipsxrsrh>Resultados para "${query}"</h2> ${searchResults.length > 0 ? renderTemplate`<div class="users-list" data-astro-cid-ipsxrsrh> ${searchResults.map((user2) => renderTemplate`<a${addAttribute(`/users/${user2.username}`, "href")} class="user-card" data-astro-cid-ipsxrsrh> <img${addAttribute(user2.avatar_url || "/default-avatar.png", "src")}${addAttribute(user2.username, "alt")} class="user-avatar" data-astro-cid-ipsxrsrh> <div class="user-info" data-astro-cid-ipsxrsrh> <h3 data-astro-cid-ipsxrsrh>@${user2.username}</h3> <p class="user-fullname" data-astro-cid-ipsxrsrh>${user2.full_name}</p> ${user2.bio && renderTemplate`<p class="user-bio" data-astro-cid-ipsxrsrh>${user2.bio}</p>`} </div> </a>`)} </div>` : renderTemplate`<div class="no-results" data-astro-cid-ipsxrsrh> <p data-astro-cid-ipsxrsrh>No se encontraron usuarios para "${query}"</p> </div>`} </div>`} </div> </main> </div> ` })} `;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/search.astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
