import { createClient } from '@libsql/client';

const TURSO_CONNECTION_URL = import.meta.env.PUBLIC_TURSO_CONNECTION_URL;
const TURSO_AUTH_TOKEN = import.meta.env.PUBLIC_TURSO_AUTH_TOKEN;

if (!TURSO_CONNECTION_URL || !TURSO_AUTH_TOKEN) {
  console.error('Las variables de entorno PUBLIC_TURSO_CONNECTION_URL y PUBLIC_TURSO_AUTH_TOKEN deben estar definidas');
  throw new Error('Configuración de base de datos incompleta');
}

export const client = createClient({
  url: TURSO_CONNECTION_URL,
  authToken: TURSO_AUTH_TOKEN,
});

// Prueba de conexión
client.execute('SELECT 1')
  .then(() => console.log('Conexión a la base de datos establecida con éxito'))
  .catch(error => console.error('Error al conectar con la base de datos:', error));