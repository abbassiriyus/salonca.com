const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const { upload_file, put_file, delete_file } = require('../middleware/file_upload');




// CREATE - Yangi ma'lumot qo'shish
router.post('/filyal_image', async (req, res) => {
    try {
      const {filyal_id } = req.body;
      const query = 'INSERT INTO filyal_image (image, filyal_id) VALUES ($1, $2) RETURNING *';
      var image=upload_file(req)
      const values = [image, filyal_id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // READ - Barcha ma'lumotlarni olish
  router.get('/filyal_image', async (req, res) => {
    try {
      const query = 'SELECT * FROM filyal_image';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // UPDATE - Ma'lumotni yangilash
  router.put('/filyal_image/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { filyal_id } = req.body;
      const image = await pool.query('SELECT * FROM filyal_image WHERE id = $1', [id]);
      var auto_img=put_file(image.rows[0].image,req)
      const query = 'UPDATE filyal_image SET  image=$1, filyal_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
      const values = [auto_img,filyal_id, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE - Ma'lumotni o'chirish
  router.delete('/filyal_image/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM filyal_image WHERE id = $1';
      const values = [id];
      const deletedImage = await pool.query(query, values);
      if(deletedImage.rows.length>0){
       delete_file(deletedImage.rows[0].image)
      res.json(deletedImage.rows[0]);
      }else{
        res.status(500).json({ error:"no data"});
      }
    } catch (error) {
      res.status(500).json({ error:error.message});
    }
  });
  
  module.exports = router;