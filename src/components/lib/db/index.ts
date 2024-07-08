import { createClient } from '@libsql/client';

const TURSO_CONNECTION_URL = import.meta.env.TURSO_CONNECTION_URL as string;
const TURSO_AUTH_TOKEN = import.meta.env.TURSO_AUTH_TOKEN as string;

if (!TURSO_CONNECTION_URL || !TURSO_AUTH_TOKEN) {
  console.error('Las variables de entorno TURSO_CONNECTION_URL y TURSO_AUTH_TOKEN deben estar definidas');
  throw new Error('Configuración de base de datos incompleta');
}

export const client = createClient({
  url: TURSO_CONNECTION_URL,
  authToken: TURSO_AUTH_TOKEN,
});