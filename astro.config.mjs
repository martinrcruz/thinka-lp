// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://thinka.cl', // Base URL required for sitemap
  integrations: [tailwind(), sitemap(), svelte()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});