const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bilan ishlash uchun konfiguratsiya

// CREATE - Yozish (POST)
router.post('/xususiyat_filyal', async (req, res) => {
  try {
    const { xususiyat_id, filyal_id } = req.body;
    const time_create = new Date();
    const time_update = new Date();
    
    const result = await db.query('INSERT INTO xususiyat_filyal (xususiyat_id, filyal_id, time_create, time_update) VALUES ($1, $2, $3, $4) RETURNING *', [xususiyat_id, filyal_id, time_create, time_update]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Malumotlarni qo\'shishda xatolik yuz berdi.' });
  }
});

// READ - O'qish (GET)
router.get('/xususiyat_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM xususiyat_filyal WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Malumot topilmadi.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Malumotlarni olishda xatolik yuz berdi.' });
  }
});

// UPDATE - Yangilash (PUT)
router.put('/xususiyat_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { xususiyat_id, filyal_id } = req.body;
    const time_update = new Date();
    
    const result = await db.query('UPDATE xususiyat_filyal SET xususiyat_id = $1, filyal_id = $2, time_update = $3 WHERE id = $4 RETURNING *', [xususiyat_id, filyal_id, time_update, id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Malumot topilmadi.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Malumotlarni yangilashda xatolik yuz berdi.' });
  }
});

// DELETE - O'chirish (DELETE)
router.delete('/xususiyat_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM xususiyat_filyal WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Malumot topilmadi.' });
    } else {
      res.json({ message: 'Malumot o\'chirildi.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Malumotlarni o\'chirishda xatolik yuz berdi.' });
  }
});

module.exports = router;