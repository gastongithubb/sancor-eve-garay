import { createClient } from '@libsql/client';
import { config } from '../../../config';

if (!config.tursoConnectionUrl || !config.tursoAuthToken) {
  console.error('Las variables de entorno PUBLIC_TURSO_CONNECTION_URL y PUBLIC_TURSO_AUTH_TOKEN deben estar definidas');
  throw new Error('Configuración de base de datos incompleta');
}

export const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken,
});