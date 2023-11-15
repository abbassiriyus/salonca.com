const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bilan ishlash uchun konfiguratsiya

// CREATE - Yozish (POST)
router.post('/contact', async (req, res) => {
  try {
    const { nomer, ism,mutahasis_id } = req.body;
    const time_create = new Date();
    const time_update = new Date();
    
    const result = await db.query('INSERT INTO contact (nomer, ism,mutahasis_id, time_create, time_update) VALUES ($1, $2, $3, $4,$5) RETURNING *', [nomer, ism,mutahasis_id, time_create, time_update]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// READ - O'qish (GET)
router.get('/contact', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:  error.message });
  }
});

// UPDATE - Yangilash (PUT)
router.put('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nomer, ism,mutahasis_id } = req.body;
    const time_update = new Date();
    
    const result = await db.query('UPDATE contact SET nomer = $1, ism = $2,mutahasis_id=$3 time_update = $4 WHERE id = $5 RETURNING *', [nomer, ism,mutahasis_id, time_update, id]);
    
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
router.delete('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM contact WHERE id = $1 RETURNING *', [id]);
    
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