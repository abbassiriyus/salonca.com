const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish


  // READ (O'qish)
  router.get('/verify', async (req, res) => {
    try {
      const query = 'SELECT * FROM verify';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // UPDATE (O'zgartirish)
  router.put('/verify/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { email, username, password, code} = req.body;
      const query = 'UPDATE verify SET email = $1, username = $2, password = $3, code = $4 WHERE id = $5 RETURNING *';
      const values = [email, username, password, code,  id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE (O'chirish)
  router.delete('/verify/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = 'DELETE FROM verify WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;
