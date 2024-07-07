import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';



// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    outDir: 'dist',
  },
  server: {
  },
  adapter: vercel(),
    integrations: [react(), tailwind()],
  });
