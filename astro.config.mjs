import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: '@astrojs/node',
  site: 'https://alejandrojimbui.github.io',
  base: '/Minna/',
});