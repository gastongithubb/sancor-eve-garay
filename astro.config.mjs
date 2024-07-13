import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// Variables de entorno
const googleClientId = process.env.GOOGLE_CLIENT_ID || 'tu-client-id-por-defecto';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || 'tu-client-secret-por-defecto';

// Define la configuración de Astro
export default defineConfig({
  output: 'hybrid',
  integrations: [react(), tailwind(), vercel()],
  vite: {
    define: {
      'process.env.VITE_PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.PUBLIC_TURSO_DATABASE_URL),
      'process.env.VITE_PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
      'import.meta.env.GOOGLE_CLIENT_ID': JSON.stringify(googleClientId),
      'import.meta.env.GOOGLE_CLIENT_SECRET': JSON.stringify(googleClientSecret),
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