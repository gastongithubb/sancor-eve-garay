import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  integrations: [react(), tailwind(), vercel()],
  vite: {
    define: {
      'import.meta.env.PUBLIC_TURSO_CONNECTION_URL': 
        JSON.stringify(process.env.PUBLIC_TURSO_CONNECTION_URL),
      'import.meta.env.PUBLIC_TURSO_AUTH_TOKEN': 
        JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
    },
    ssr: {
      noExternal: ['@libsql/client'],
    },
  },
});