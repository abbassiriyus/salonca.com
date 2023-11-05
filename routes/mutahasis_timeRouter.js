const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish



// CREATE (Qo'shish)
router.post('/mutahasis_time', async (req, res) => {
    const { time, mutahasis_id } = req.body;
    const query = 'INSERT INTO mutahasis_time ("time", "mutahasis_id") VALUES ($1, $2) RETURNING *';
    const values = [time, mutahasis_id];
  
    try {
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error:err.message });
    }
  });
  
  // READ (O'qish)
  router.get('/mutahasis_time', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM mutahasis_time');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  
  // UPDATE (Tahrirlash)
  router.put('/mutahasis_time/:id', async (req, res) => {
    const id = req.params.id;
    const { time, mutahasis_id } = req.body;
    const query = 'UPDATE mutahasis_time SET "time" = $1, "mutahasis_id" = $2 WHERE "id" = $3 RETURNING *';
    const values = [time, mutahasis_id, id];
  
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Malumot topilmadi' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message});
    }
  });
  
  // DELETE (O'chirish)
  router.delete('/mutahasis_time/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM mutahasis_time WHERE "id" = $1 RETURNING *';
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Malumot topilmadi' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error:err.message });
    }
  });
  
  module.exports = router;