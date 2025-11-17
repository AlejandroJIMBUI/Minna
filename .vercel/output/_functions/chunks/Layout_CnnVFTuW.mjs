import { e as createComponent, f as createAstro, l as renderHead, h as addAttribute, n as renderSlot, r as renderTemplate } from './astro/server_Crelv-dB.mjs';
import 'clsx';
/* empty css                               */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, showHeader = true } = Astro2.props;
  const session = Astro2.locals.session;
  return renderTemplate`<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description" content="Una red social moderna"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${showHeader && session && renderTemplate`<header class="main-header" data-astro-cid-sckkx6r4> <div class="header-content" data-astro-cid-sckkx6r4> <a href="/" class="logo" data-astro-cid-sckkx6r4> <h1 data-astro-cid-sckkx6r4>Minna</h1> </a> <div class="header-actions" data-astro-cid-sckkx6r4> <form method="GET" action="/search" class="search-form" data-astro-cid-sckkx6r4> <input type="text" name="q" placeholder="Buscar usuarios..." class="search-input" data-astro-cid-sckkx6r4> <button type="submit" class="search-btn" data-astro-cid-sckkx6r4>
Buscar
</button> </form> <nav class="header-nav" data-astro-cid-sckkx6r4> <a href="/dashboard" class="nav-link" data-astro-cid-sckkx6r4>
Dashboard
</a> <a href="/profile" class="nav-link" data-astro-cid-sckkx6r4>
Mi Perfil
</a> </nav> </div> </div> </header>`} <main${addAttribute(!showHeader ? "full-height" : "", "class")} data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main>  </body> </html>`;
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
