const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const { upload_file } = require('../middleware/file_upload');




// CREATE - Yangi ma'lumot qo'shish
router.post('/filyal', async (req, res) => {
    try {
      const {address,location,longuage,name,description,phone,creator,min_time } = req.body;
      const query = 'INSERT INTO filyal (image, address,location,longuage,name,description,phone,creator,min_time) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
      var image=upload_file(req)
      const values = [image, address,location,longuage,name,description,phone,creator,min_time];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // READ - Barcha ma'lumotlarni olish
  router.get('/filyal', async (req, res) => {
    try {
      const query = 'SELECT * FROM filyal';
      const result = await pool.query(query);
      const query2= 'SELECT * FROM mutahasis';
      const result2= await pool.query(query2);
      const query3= 'SELECT * FROM filyal_image';
      const result3= await pool.query(query3);
      const query4= 'SELECT * FROM xususiyat_filyal';
      const result4= await pool.query(query4);
      const query5= 'SELECT * FROM xususiyat';
      const result5= await pool.query(query5);
      const query6= 'SELECT * FROM filyal_mark';
      const result6= await pool.query(query6);
      


      const query7= 'SELECT * FROM mutahasis_time';
      const result7= await pool.query(query7);

      const query8= 'SELECT * FROM mutahasis_image';
      const result8= await pool.query(query8);

      const query9= 'SELECT * FROM xususiyat_mutahasis';
      const result9= await pool.query(query9);

for (let i = 0; i < result4.rows.length; i++) {
 for (let j = 0; j < result5.rows.length; j++) {
  if(result5.rows[j].id==result4.rows[i].xususiyat_id){
    result4.rows[i].title=result5.rows[j].title
   }
 }
}

for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].mutahasis_time=[]
  result2.rows[i].mutahasis_image=[]
  result2.rows[i].xususiyat_mutahasis=[]

  for (let j = 0; j < result7.rows.length; j++) {
   if(result2.rows[i].id==result7.rows[j].mutahasis_id){
    result2.rows[i].mutahasis_time=result7.rows[j]
    }
  }
  for (let j = 0; j < result8.rows.length; j++) {
    if(result2.rows[i].id==result8.rows[j].mutahasis_id){
      result2.rows[i].mutahasis_image=result8.rows[j]
     }
   }
   for (let j = 0; j < result9.rows.length; j++) {
    if(result2.rows[i].id==result9.rows[j].mutahasis_id){
      rresult2.rows[i].xususiyat_mutahasis=result9.rows[j]
     }
   }
 }




for (let i = 0; i < result.rows.length; i++) {
 result.rows[i].master=[]
result.rows[i].images=[]
result.rows[i].xususiyat=[]
result.rows[i].filyal_mark=[]
  for (let j = 0; j < result2.rows.length; j++) {
 if(result.rows[i].id==result2.rows[j].filial_id){
  result.rows[i].master.push(result2.rows[j])
 }
 }

   for (let j = 0; j < result3.rows.length; j++) {
  if(result.rows[i].id==result3.rows[j].filyal_id){
   result.rows[i].images.push(result3.rows[j])
  }
  }

  for (let j = 0; j < result4.rows.length; j++) {
    if(result.rows[i].id==result4.rows[j].filyal_id){
     result.rows[i].xususiyat.push(result4.rows[j])
    }
    }
    for (let j = 0; j < result6.rows.length; j++) {
      if(result.rows[i].id==result6.rows[j].filyal_id){
       result.rows[i].filyal_mark.push(result6.rows[j])
      }
      }
}
 

      res.json(result.rows);



    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message});
    }
  });
  
  // UPDATE - Ma'lumotni yangilash
  router.put('/filyal/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { address,location,longuage,name,description,phone,creator,min_time } = req.body;
      const image = await pool.query('SELECT * FROM filyal WHERE id = $1', [id]);
      var auto_img=put_file(image.rows[0].image,req)
      const query = 'UPDATE filyal SET  image=$1, address = $2,location=$3,longuage=$4,name=$5,description=$6,phone=$7,creator=$8,min_time=$9 time_update = current_timestamp WHERE id = $10 RETURNING *';
      const values = [auto_img,address,location,longuage,name,description,phone,creator,min_time, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE - Ma'lumotni o'chirish
  router.delete('/filyal/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM filyal WHERE id = $1';
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