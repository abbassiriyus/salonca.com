const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish



app.post('/xususiyatlar', async (req, res) => {
    const { title } = req.body;
    const query = 'INSERT INTO xususiyat (title) VALUES ($1) RETURNING *';
    const values = [title];
    
    try {
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Malumotni qo\'shishda xato yuz berdi.' });
    }
  });

  app.get('/xususiyatlar', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM xususiyat');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Malumotni olishda xato yuz berdi.' });
    }
  });

  app.put('/xususiyatlar/:id', async (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    const query = 'UPDATE xususiyat SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
    const values = [title, id];
    
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Xususiyat topilmadi.' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Malumotni o\'zgartirishda xato yuz berdi.' });
    }
  });
  app.delete('/xususiyatlar/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM xususiyat WHERE id = $1 RETURNING *';
    const values = [id];
    
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Xususiyat topilmadi.' });
      } else {
        res.json({ message: 'Xususiyat o\'chirildi.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Malumotni o\'chirishda xato yuz berdi.' });
    }
  });

module.exports = router;
