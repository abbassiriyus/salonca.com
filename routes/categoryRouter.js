const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish

router.post('/category', async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await pool.query('INSERT INTO category ("category") VALUES ($1) RETURNING *', [category]);

    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Ma`lumotni qo`shishda xatolik yuz berdi' });
  }
});
router.get('/category', async (req, res) => {
    try {
      const allCategories = await pool.query('SELECT * FROM category');
      res.json(allCategories.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Ma`lumotlarni olishda xatolik yuz berdi' });
    }
  });
  router.put('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category } = req.body;
      const updatedCategory = await pool.query('UPDATE category SET "category" = $1 WHERE "id" = $2 RETURNING *', [category, id]);
  
      if (updatedCategory.rows.length === 0) {
        return res.status(404).json({ error: 'Kategoriya topilmadi' });
      }
  
      res.json(updatedCategory.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Ma`lumotlarni yangilashda xatolik yuz berdi' });
    }
  });
  router.delete('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCategory = await pool.query('DELETE FROM category WHERE "id" = $1 RETURNING *', [id]);
  
      if (deletedCategory.rows.length === 0) {
        return res.status(404).json({ error: 'Kategoriya topilmadi' });
      }
  
      res.json({ message: 'Kategoriya o`chirildi' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Ma`lumotni o`chirishda xatolik yuz berdi' });
    }
  });
  
module.exports = router;
