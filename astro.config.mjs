import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [react(), tailwind(), vercel()],
  vite: {
    define: {
      'import.meta.env.TURSO_CONNECTION_URL': JSON.stringify(process.env.TURSO_CONNECTION_URL),
      'import.meta.env.TURSO_AUTH_TOKEN': JSON.stringify(process.env.TURSO_AUTH_TOKEN),
    },
    ssr: {
      noExternal: ['@libsql/client'],
    },
  },
});