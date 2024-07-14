<<<<<<< HEAD
/// <reference types="astro/client" />
=======
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_PUBLIC_TURSO_DATABASE_URL: string;
  readonly VITE_PUBLIC_TURSO_AUTH_TOKEN: string;
  // Agrega aquí otras variables de entorno que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
>>>>>>> 3120d25e780996749973811d25100fece0580884
