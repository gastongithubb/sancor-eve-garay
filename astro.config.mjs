import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
<<<<<<< HEAD
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
=======
import vercel from '@astrojs/vercel/serverless';

// Define la configuración de Astro
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  server: {
    port: 4321,
>>>>>>> 3120d25e780996749973811d25100fece0580884
  },
  integrations: [react(), tailwind()],
  vite: {
    define: {
<<<<<<< HEAD
      'import.meta.env.PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.PUBLIC_TURSO_DATABASE_URL),
      'import.meta.env.PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
=======
      'import.meta.env.VITE_PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.PUBLIC_TURSO_DATABASE_URL),
      'import.meta.env.VITE_PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.PUBLIC_TURSO_AUTH_TOKEN),
>>>>>>> 3120d25e780996749973811d25100fece0580884
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