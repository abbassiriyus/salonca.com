const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish




// CREATE - Yangi ma'lumot qo'shish
router.post('/create', async (req, res) => {
    try {
      const { image_url, filyal_id } = req.body;
      const query = 'INSERT INTO filyal_image (image_url, filyal_id) VALUES ($1, $2) RETURNING *';
      const values = [image_url, filyal_id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Ma\'lumot qo\'shishda xatolik yuz berdi' });
    }
  });
  
  // READ - Barcha ma'lumotlarni olish
  router.get('/read', async (req, res) => {
    try {
      const query = 'SELECT * FROM filyal_image';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Ma\'lumotlarni olishda xatolik yuz berdi' });
    }
  });
  
  // UPDATE - Ma'lumotni yangilash
  router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { image_url, filyal_id } = req.body;
      const query = 'UPDATE filyal_image SET image_url = $1, filyal_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [image_url, filyal_id, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
    }
  });
  
  // DELETE - Ma'lumotni o'chirish
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM filyal_image WHERE id = $1';
      const values = [id];
      await pool.query(query, values);
      res.json({ message: 'Ma\'lumot o\'chirildi' });
    } catch (error) {
      res.status(500).json({ error: 'Ma\'lumotni o\'chirishda xatolik yuz berdi' });
    }
  });
  
  module.exports = router;