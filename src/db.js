import { Client } from '@vercel/postgres';

// Configura tu cliente de PostgreSQL
const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Función para conectar al cliente
export async function connectDB() {
  await client.connect();
}

// Función para desconectar
export async function disconnectDB() {
  await client.end();
}

export default client;
