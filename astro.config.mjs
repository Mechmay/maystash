import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://maystash.xyz',
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
});
