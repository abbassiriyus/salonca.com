const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const { upload_file, put_file, delete_file } = require('../middleware/file_upload');




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
      
      const query7a= 'SELECT * FROM category';
      const result7a= await pool.query(query7a);

      const query7= 'SELECT * FROM mutahasis_time';
      const result7= await pool.query(query7);

      const query8= 'SELECT * FROM mutahasis_image';
      const result8= await pool.query(query8);

      const query9= 'SELECT * FROM xususiyat_mutahasis';
      const result9= await pool.query(query9);


      const query10= 'SELECT * FROM metro';
      const result10= await pool.query(query10);

      const query11= 'SELECT * FROM metro_filyal';
      const result11= await pool.query(query11);

      const query12= 'SELECT * FROM rayon';
      const result12= await pool.query(query12);

      const query13= 'SELECT * FROM rayon_filyal';
      const result13= await pool.query(query13);

for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].work=""
for (let k = 0; k < result7a.rows.length; k++) {
 if(result2.rows[i].category===result7a.rows[k].id){
  result2.rows[i].work=result7a.rows[k].category
 } 
}}
      

for (let i = 0; i < result4.rows.length; i++) {
 for (let j = 0; j < result5.rows.length; j++) {
  if(result5.rows[j].id==result4.rows[i].xususiyat_id){
    result4.rows[i].title=result5.rows[j].title
   }
 }
}

for (let i = 0; i < result11.rows.length; i++) {
  for (let j = 0; j < result10.rows.length; j++) {
   if(result10.rows[j].id==result11.rows[i].metro_id){
     result11.rows[i].title=result10.rows[j].title
    }
  }
 }
 for (let i = 0; i < result13.rows.length; i++) {
  for (let j = 0; j < result12.rows.length; j++) {
   if(result12.rows[j].id==result13.rows[i].xususiyat_id){
     result13.rows[i].title=result12.rows[j].title
    }
  }
}
for (let i = 0; i < result2.rows.length; i++) {
  result2.rows[i].mutahasis_time=[]
  result2.rows[i].mutahasis_image=[]
  result2.rows[i].xususiyat_mutahasis=[]

  for (let j = 0; j < result7.rows.length; j++) {
   if(result2.rows[i].id==result7.rows[j].mutahasis_id){
    result2.rows[i].mutahasis_time.push(result7.rows[j])
    }
  }
  for (let j = 0; j < result8.rows.length; j++) {
    if(result2.rows[i].id==result8.rows[j].mutahasis_id){
      result2.rows[i].mutahasis_image.push(result8.rows[j])
     }
   }
   for (let j = 0; j < result9.rows.length; j++) {
    if(result2.rows[i].id==result9.rows[j].mutahasis_id){
      result2.rows[i].xususiyat_mutahasis.push(result9.rows[j])
     }
   }
 }




for (let i = 0; i < result.rows.length; i++) {
 result.rows[i].master=[]
result.rows[i].images=[]
result.rows[i].xususiyat=[]
result.rows[i].filyal_mark=[]
result.rows[i].metro=[]
result.rows[i].rayon=[]

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
      for (let j = 0; j < result11.rows.length; j++) {
        if(result.rows[i].id==result11.rows[j].filyal_id){
         result.rows[i].metro.push(result11.rows[j])
        }
        }
        for (let j = 0; j < result13.rows.length; j++) {
          if(result.rows[i].id==result13.rows[j].filyal_id){
           result.rows[i].rayon.push(result13.rows[j])
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
      const query = 'UPDATE filyal SET  image=$1, address = $2,location=$3,longuage=$4,name=$5,description=$6,phone=$7,creator=$8,min_time=$9, time_update = current_timestamp WHERE id = $10 RETURNING *';
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