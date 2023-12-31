const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you have a PostgreSQL connection pool

// CREATE zakaz
router.post('/zakaz', async (req, res) => {
  try {
    const { time_end, time_start, day_zakaz, mutahasis_id,message,user_id } = req.body;
    const newZakaz = await pool.query(
      'INSERT INTO zakaz (time_end, time_start, day_zakaz, mutahasis_id,message,user_id) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *',
      [time_end, time_start, day_zakaz, mutahasis_id,message,user_id]
    );
    res.json(newZakaz.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});
router.get('/zakaz', async (req, res) => {
  try {
    const query = 'SELECT * FROM zakaz';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// READ zakaz
router.get('/zakaz/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const zakaz = await pool.query('SELECT * FROM zakaz WHERE id = $1', [id]);
    res.json(zakaz.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// UPDATE zakaz
router.put('/zakaz/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { time_end, time_start, day_zakaz, mutahasis_id,message,user_id  } = req.body;
    const updatedZakaz = await pool.query(
      'UPDATE zakaz SET time_end = $1, time_start = $2, day_zakaz = $3, mutahasis_id = $4,message=$5,user_id=$6 WHERE id = $7 RETURNING *',
      [time_end, time_start, day_zakaz,mutahasis_id,message,user_id,id]
    );
    res.json(updatedZakaz.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// DELETE zakaz
router.delete('/zakaz/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM zakaz WHERE id = $1', [id]);
    res.json('Zakaz deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// Similar CRUD operations can be implemented for other tables as well

module.exports = router;