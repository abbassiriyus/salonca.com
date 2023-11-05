const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const { upload_file, put_file, delete_file } = require('../middleware/file_upload');


router.get('/mutahasis_image', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM mutahasis_image');
      res.json(result.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message:error.message});
    }
  });
  
  router.post('/mutahasis_image', async (req, res) => {
    const { mutahasis_id } = req.body;
    try {
      var image=upload_file(req)
      const result = await pool.query('INSERT INTO mutahasis_image (image, mutahasis_id) VALUES ($1, $2) RETURNING *', [image, mutahasis_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message:error.message});
    }
  });
  
  router.put('/mutahasis_image/:id', async (req, res) => {
    const { id } = req.params;
    const { mutahasis_id } = req.body;
    const image = await pool.query('SELECT * FROM mutahasis_image WHERE id = $1', [id]);
    var auto_img=put_file(image.rows[0].image,req)
    try {
      const result = await pool.query('UPDATE mutahasis_image SET image = $1, mutahasis_id = $2 WHERE id = $3 RETURNING *', [auto_img, mutahasis_id, id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message:error.message});
    }
  });
  
  router.delete('/mutahasis_image/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM mutahasis_image WHERE id = $1 RETURNING *', [id]);
      if(result.rows.length>0){
       delete_file(result.rows[0].image)
      res.json(result.rows[0]);
      }else{
        res.status(500).json({ error:"no data"});
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message:error.message});
    }
  });
  
  module.exports = router;