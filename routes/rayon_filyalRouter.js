const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bilan ishlash uchun konfiguratsiya

// CREATE - Yozish (POST)
router.post('/rayon_filyal', async (req, res) => {
  try {
    const { rayon_id, filyal_id } = req.body;
    const time_create = new Date();
    const time_update = new Date();
    
    const result = await db.query('INSERT INTO rayon_filyal (rayon_id, filyal_id, time_create, time_update) VALUES ($1, $2, $3, $4) RETURNING *', [rayon_id, filyal_id, time_create, time_update]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// READ - O'qish (GET)
router.get('/rayon_filyal', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM rayon_filyal');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// UPDATE - Yangilash (PUT)
router.put('/rayon_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rayon_id, filyal_id } = req.body;
    const time_update = new Date();
    
    const result = await db.query('UPDATE rayon_filyal SET rayon_id = $1, filyal_id = $2, time_update = $3 WHERE id = $4 RETURNING *', [rayon_id, filyal_id, time_update, id]);
    
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
router.delete('/rayon_filyal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM rayon_filyal WHERE id = $1 RETURNING *', [id]);
    
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