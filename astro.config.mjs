import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://thinka.cl', // Base URL required for sitemap
  output: 'static', // Change to 'server' or 'hybrid' if you need SSR later
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  integrations: [tailwind(), sitemap(), svelte()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});