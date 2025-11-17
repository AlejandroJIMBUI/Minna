import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Dbg-34lC.mjs';
import { manifest } from './manifest_BlJr4slm.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/login.astro.mjs');
const _page2 = () => import('./pages/api/auth/logout.astro.mjs');
const _page3 = () => import('./pages/api/auth/signup.astro.mjs');
const _page4 = () => import('./pages/api/posts/create.astro.mjs');
const _page5 = () => import('./pages/api/profile/delete-avatar.astro.mjs');
const _page6 = () => import('./pages/api/profile/update.astro.mjs');
const _page7 = () => import('./pages/api/upload-avatar.astro.mjs');
const _page8 = () => import('./pages/create-post.astro.mjs');
const _page9 = () => import('./pages/dashboard.astro.mjs');
const _page10 = () => import('./pages/login.astro.mjs');
const _page11 = () => import('./pages/profile.astro.mjs');
const _page12 = () => import('./pages/register.astro.mjs');
const _page13 = () => import('./pages/search.astro.mjs');
const _page14 = () => import('./pages/users/_---username_.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth/login.js", _page1],
    ["src/pages/api/auth/logout.js", _page2],
    ["src/pages/api/auth/signup.js", _page3],
    ["src/pages/api/posts/create.js", _page4],
    ["src/pages/api/profile/delete-avatar.js", _page5],
    ["src/pages/api/profile/update.js", _page6],
    ["src/pages/api/upload-avatar.js", _page7],
    ["src/pages/create-post.astro", _page8],
    ["src/pages/dashboard.astro", _page9],
    ["src/pages/login.astro", _page10],
    ["src/pages/profile.astro", _page11],
    ["src/pages/register.astro", _page12],
    ["src/pages/search.astro", _page13],
    ["src/pages/users/[...username].astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "4b8f290f-c1c9-4734-8805-9f1a5bc9ba52",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
