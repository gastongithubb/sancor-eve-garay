import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT as string) || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/metrics', async (req, res) => {
  try {
    console.log('Realizando consulta a la base de datos');
    const result = await pool.query('SELECT * FROM metrics');
    console.log('Resultado de la consulta:', result.rows); // Log para verificar los datos obtenidos
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta a la base de datos:', err); // Log más detallado del error
    res.status(500).send('Error al cargar las métricas. Por favor, intenta de nuevo más tarde.');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
