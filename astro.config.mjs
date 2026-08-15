import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://maystash.xyz',
  // Pages stay prerendered; only routes marked `prerender = false`
  // (the /api/ask chat endpoint) run as serverless functions.
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
});
