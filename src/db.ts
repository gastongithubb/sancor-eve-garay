// db.js

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
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware para permitir solicitudes JSON
app.use(express.json());

// Endpoint para obtener métricas
app.get('/api/metrics', async (req, res) => {
  try {
    console.log('Realizando consulta a la base de datos');
    const result = await pool.query('SELECT * FROM metrics');
    console.log('Resultado de la consulta:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta a la base de datos:', err);
    res.status(500).send('Error al cargar las métricas. Detalles en los logs.');
  }
});

// Manejo de errores 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
