import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from "@astrojs/node";

// Comenta estas líneas si los archivos no existen o si no los necesitas
// import astroExpress from './src/astro';
// import app from './src/server';

// Define la configuración de Astro
export default defineConfig({
  // Comenta esta línea si no tienes astroExpress
  // ...astroExpress,
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 4321,
    host: true,
    // Comenta esta línea si no tienes app
    // middleware: [app],
  },
  integrations: [react(), tailwind()],
  vite: {
    define: {
      'import.meta.env.PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.PUBLIC_TURSO_DATABASE_URL),
      'import.meta.env.PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
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