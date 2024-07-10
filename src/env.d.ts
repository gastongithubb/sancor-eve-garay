/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_TURSO_CONNECTION_URL: string;
  readonly PUBLIC_TURSO_AUTH_TOKEN: string;
  // Añade aquí otras variables de entorno que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}