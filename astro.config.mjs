import { defineConfig } from 'astro/config';
import { defineConfig } from 'vite';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  integrations: [react(), tailwind(), vercel()],
  plugins: [
    '@astro/metadata'
  ],
  vite: {
    define: {
      'process.env.VITE_PUBLIC_TURSO_CONNECTION_URL': JSON.stringify(process.env.VITE_PUBLIC_TURSO_CONNECTION_URL),
      'process.env.VITE_PUBLIC_TURSO_AUTH_TOKEN': JSON.stringify(process.env.VITE_PUBLIC_TURSO_AUTH_TOKEN),
    },
    optimizeDeps: {
      exclude: ['fsevents'],
    },
    ssr: {
      noExternal: ['@libsql/client', '@mui/material', '@emotion/react', '@emotion/styled', 'recharts'],
    },
  },
  envPrefix: 'PUBLIC_',
});