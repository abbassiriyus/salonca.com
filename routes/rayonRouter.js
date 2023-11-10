const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish



router.post('/rayon', async (req, res) => {
    const { title } = req.body;
    const query = 'INSERT INTO rayon (title) VALUES ($1) RETURNING *';
    const values = [title];
    
    try {
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message});
    }
  });

  router.get('/rayon', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM rayon');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/rayon/:id', async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    const query = 'UPDATE rayon SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
    const values = [title, id];
    
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'rayon topilmadi.' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error:  err.message });
    }
  });
  router.delete('/rayon/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM rayon WHERE id = $1 RETURNING *';
    const values = [id];
    
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'rayon topilmadi.' });
      } else {
        res.json({ message: 'rayon o\'chirildi.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
