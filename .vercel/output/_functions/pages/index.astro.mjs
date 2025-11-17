import { e as createComponent, f as createAstro } from '../chunks/astro/server_Crelv-dB.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = Astro2.locals.session;
  if (session) {
    return Astro2.redirect("/dashboard");
  } else {
    return Astro2.redirect("/login");
  }
}, "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/index.astro", void 0);

const $$file = "C:/Users/buitr/OneDrive/Documents/Archives/Projects/Minna/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
