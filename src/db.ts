let client: any;

async function getClient() {
  if (!client) {
    const { Client } = await import('pg');
    client = new Client({
      connectionString: import.meta.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  return client;
}

export async function connectDB() {
  try {
    const client = await getClient();
    await client.connect();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error('Error de conexión a PostgreSQL:', error);
  }
}

export async function disconnectDB() {
  try {
    const client = await getClient();
    await client.end();
    console.log('Desconectado de PostgreSQL');
  } catch (error) {
    console.error('Error al desconectar de PostgreSQL:', error);
  }
}

export async function query(text: string, params?: any[]) {
  const client = await getClient();
  return client.query(text, params);
}

export default { connectDB, disconnectDB, query };