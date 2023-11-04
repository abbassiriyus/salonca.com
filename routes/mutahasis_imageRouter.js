const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish


router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM mutahasis_image');
      res.json(result.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.post('/', async (req, res) => {
    const { image_url, mutahasis_id } = req.body;
    try {
      const result = await pool.query('INSERT INTO mutahasis_image (image_url, mutahasis_id) VALUES ($1, $2) RETURNING *', [image_url, mutahasis_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { image_url, mutahasis_id } = req.body;
    try {
      const result = await pool.query('UPDATE mutahasis_image SET image_url = $1, mutahasis_id = $2 WHERE id = $3 RETURNING *', [image_url, mutahasis_id, id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM mutahasis_image WHERE id = $1 RETURNING *', [id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;