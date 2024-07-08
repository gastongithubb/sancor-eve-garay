import { createClient, type Client } from '@libsql/client';

// Estas variables deben ser definidas en tiempo de compilación
const TURSO_CONNECTION_URL = import.meta.env.PUBLIC_TURSO_CONNECTION_URL as string;
const TURSO_AUTH_TOKEN = import.meta.env.PUBLIC_TURSO_AUTH_TOKEN as string;

let client: Client | null = null;

if (TURSO_CONNECTION_URL && TURSO_AUTH_TOKEN) {
  client = createClient({
    url: TURSO_CONNECTION_URL,
    authToken: TURSO_AUTH_TOKEN,
  });
} else {
  console.warn('Las variables de entorno TURSO_CONNECTION_URL y TURSO_AUTH_TOKEN no están definidas. La funcionalidad de base de datos no estará disponible.');
}

export { client };