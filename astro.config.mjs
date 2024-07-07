import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  build: {
    outDir: 'dist',
  },
  server: {
    port: process.env.PORT || 3000, // Configura el puerto del servidor, opcionalmente desde una variable de entorno
  },
  integrations: [
    react(),     // Integra React con Astro
    tailwind(),  // Integra Tailwind CSS con Astro
    vercel(),    // Configura Astro para despliegues en Vercel
  ],
  routes: [
    { src: "/", dest: "/index.astro" }, // Ruta para la raíz de la aplicación
    // Agrega más rutas según sea necesario para tu aplicación
  ],
});
