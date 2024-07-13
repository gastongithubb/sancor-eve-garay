import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// Define la configuración de Astro
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  server: {
    port: 4321,
  },
  integrations: [react(), tailwind()],
  vite: {
    define: {
      'import.meta.env.VITE_PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.PUBLIC_TURSO_DATABASE_URL),
      'import.meta.env.VITE_PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
    },
    build: {
      rollupOptions: {
        external: ['fsevents']
      }
    },
    optimizeDeps: {
      exclude: ['fsevents']
    },
    ssr: {
      noExternal: ['@libsql/client', '@mui/material', '@emotion/react', '@emotion/styled', 'recharts'],
    },
  },
  envPrefix: ['PUBLIC_', 'GOOGLE_'],
});