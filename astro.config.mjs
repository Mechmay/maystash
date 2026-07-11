import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://maystash.xyz',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
});
