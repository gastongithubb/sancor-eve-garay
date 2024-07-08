import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  build: {
    outDir: 'dist'
  },
  server: {
    port: process.env.PORT || 3000
  },
  integrations: [react(), tailwind(), vercel(),],
  vite: {
    'import.meta.env.PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.PUBLIC_TURSO_CONNECTION_URL),
      'import.meta.env.PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
  }
});