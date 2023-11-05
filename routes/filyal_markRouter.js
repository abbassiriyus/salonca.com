const express = require('express');
const router = express.Router();
const pool = require('../db'); // Yuklab olingan PostgreSQL pool

// CREATE (POST)
router.post('/filyal_mark', async (req, res) => {
  try {
    const { mark, text, look, creator, filyal_id } = req.body;
    const query = 'INSERT INTO filyal_mark (mark, text, look, creator, filyal_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [mark, text, look, creator, filyal_id];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message});
  }
});

// READ (GET)
router.get('/filyal_mark', async (req, res) => {
  try {
    const query = 'SELECT * FROM filyal_mark';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE (PUT)
router.put('/filyal_mark/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { mark, text, look, creator, filyal_id } = req.body;
    const query = 'UPDATE filyal_mark SET mark = $1, text = $2, look = $3, creator = $4, filyal_id = $5, time_update = current_timestamp WHERE id = $6 RETURNING *';
    const values = [mark, text, look, creator, filyal_id, id];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Malumot topilmadi' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:error.message});
  }
});

// DELETE (DELETE)
router.delete('/filyal_mark/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM filyal_mark WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Malumot topilmadi' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;