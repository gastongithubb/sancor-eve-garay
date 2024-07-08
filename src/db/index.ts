import { createClient } from '@libsql/client';

// Estas variables deben ser definidas en tiempo de compilación
// por ejemplo, usando import.meta.env en Astro o Vite
const TURSO_CONNECTION_URL = import.meta.env.PUBLIC_TURSO_CONNECTION_URL;
const TURSO_AUTH_TOKEN = import.meta.env.PUBLIC_TURSO_AUTH_TOKEN;

if (!TURSO_CONNECTION_URL || !TURSO_AUTH_TOKEN) {
  throw new Error('Las variables de entorno TURSO_CONNECTION_URL y TURSO_AUTH_TOKEN deben estar definidas');
}

const client = createClient({
  url: TURSO_CONNECTION_URL,
  authToken: TURSO_AUTH_TOKEN,
});

export { client };