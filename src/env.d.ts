/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_TURSO_CONNECTION_URL: string;
    readonly PUBLIC_TURSO_AUTH_TOKEN: string;
    // Agrega aquí otras variables de entorno si las tienes
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }