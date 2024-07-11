export const config = {
  tursoConnectionUrl: import.meta.env.PUBLIC_TURSO_CONNECTION_URL,
  tursoAuthToken: import.meta.env.PUBLIC_TURSO_AUTH_TOKEN
};

if (!config.tursoConnectionUrl || !config.tursoAuthToken) {
  throw new Error('Las variables de entorno PUBLIC_TURSO_CONNECTION_URL y PUBLIC_TURSO_AUTH_TOKEN deben estar definidas');
}