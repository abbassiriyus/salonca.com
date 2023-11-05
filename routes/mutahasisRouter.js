const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish

// CREATE (Qo'shish)
router.post('/mutahasis', async (req, res) => {
    try {
      const { category, tavsif, description, filial_id, price } = req.body;
      const query = 'INSERT INTO mutahasis (category, tavsif, description, filial_id, price) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [category, tavsif, description, filial_id, price];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // READ (O'qish)
  router.get('/mutahasis', async (req, res) => {
    try {
      const query = 'SELECT * FROM mutahasis';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // UPDATE (O'zgartirish)
  router.put('/mutahasis/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { category, tavsif, description, filial_id, price } = req.body;
      const query = 'UPDATE mutahasis SET category = $1, tavsif = $2, description = $3, filial_id = $4, price = $5 WHERE id = $6 RETURNING *';
      const values = [category, tavsif, description, filial_id, price, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE (O'chirish)
  router.delete('/mutahasis/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = 'DELETE FROM mutahasis WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
