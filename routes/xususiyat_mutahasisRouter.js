const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish

// CREATE (yaratish)
router.post('/xususiyat_mutahasis', async (req, res) => {
    const { xususiyat_id, mutahasis_id } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO xususiyat_mutahasis (xususiyat_id, mutahasis_id) VALUES ($1, $2) RETURNING *',
        [xususiyat_id, mutahasis_id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:  error.message });
    }
  });
  
  // READ (o'qish)
  router.get('/xususiyat_mutahasis', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM xususiyat_mutahasis');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:  error.message });
    }
  });
  
  // UPDATE (o'zgartirish)
  router.put('/xususiyat_mutahasis/:id', async (req, res) => {
    const id = req.params.id;
    const { xususiyat_id, mutahasis_id } = req.body;
    try {
      const result = await pool.query(
        'UPDATE xususiyat_mutahasis SET xususiyat_id = $1, mutahasis_id = $2 WHERE id = $3 RETURNING *',
        [xususiyat_id, mutahasis_id, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:  error.message });
    }
  });
  
  // DELETE (o'chirish)
  router.delete('/xususiyat_mutahasis/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pool.query('DELETE FROM xususiyat_mutahasis WHERE id = $1', [id]);
      res.json({ message: "Muvaffaqiyatli o'chirildi" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:  error.message });
    }
  });
module.exports = router;
