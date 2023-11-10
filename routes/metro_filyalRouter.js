const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bilan ishlash uchun konfiguratsiya

// CREATE - Yozish (POST)
router.post('/metro_filyal', async (req, res) => {
  try {
    const { metro_id, filyal_id } = req.body;
    const time_create = new Date();
    const time_update = new Date();
    
    const result = await db.query('INSERT INTO metro_filyal (metro_id, filyal_id, time_create, time_update) VALUES ($1, $2, $3, $4) RETURNING *', [metro_id, filyal_id, time_create, time_update]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// READ - O'qish (GET)
router.get('/metro_filyal', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM metro_filyal');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// UPDATE - Yangilash (PUT)
router.put('/metro_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { metro_id, filyal_id } = req.body;
    const time_update = new Date();
    
    const result = await db.query('UPDATE metro_filyal SET metro_id = $1, filyal_id = $2, time_update = $3 WHERE id = $4 RETURNING *', [metro_id, filyal_id, time_update, id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Malumot topilmadi.' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// DELETE - O'chirish (DELETE)
router.delete('/metro_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM metro_filyal WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Malumot topilmadi.' });
    } else {
      res.json({ message: 'Malumot o\'chirildi.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message});
  }
});

module.exports = router;