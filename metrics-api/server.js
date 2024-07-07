const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: 'postgresql://postgres:COubbBIzMFKFqjNzTzPlsXKokfUsqsEu@roundhouse.proxy.rlwy.net:59193/railway',
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

app.get('/metrics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM metrics');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/metrics/:id', async (req, res) => {
  const { id } = req.params;
  const { responses, nps, csat, rd } = req.body;

  try {
    await pool.query(
      'UPDATE metrics SET responses = $1, nps = $2, csat = $3, rd = $4 WHERE id = $5',
      [responses, nps, csat, rd, id]
    );
    res.status(200).json({ message: 'Metric updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
