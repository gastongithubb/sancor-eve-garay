import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import db from '@astrojs/db';
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  build: {
    outDir: 'dist'
  },
  server: {
    port: process.env.PORT || 3000
  },
  integrations: [react(), tailwind(), vercel(), db(), solidJs()],
  vite: {
    ssr: {
      noExternal: ['pg']
    },
    optimizeDeps: {
      exclude: ['pg']
    },
    define: {
      'import.meta.env.POSTGRES_URL': JSON.stringify(process.env.POSTGRES_URL)
    }
  }
});