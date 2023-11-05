const pool = require('../db.js');

const createFilial = (filial) => {
  const { image, address, location, longuage, name, description, phone, creator, min_time } = filial;
  const query = `
    INSERT INTO filyal (image, address, location, longuage, name, description, phone, creator, min_time)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  console.log(image, address, location, longuage, name, description, phone, creator, min_time);

  return pool.query(query, [image, address, location, longuage, name, description, phone, creator, min_time]);
};

const getFiliais = async () => {
  const query1 =pool.query('SELECT * FROM filyal');

  console.log(await query1);
  // const query2 = (pool.query('SELECT * FROM mutahasis')).rows[0] ;
  // console.log(query2);
// for (let i = 0; i < query.length; i++) {
//  for (let j = 0; j < query2.length; j++) {
 
  
//  }
  
// }

  return query1;
};

const getFilialById = (id) => {
  const query = 'SELECT * FROM filyal WHERE id = $1';
  return pool.query(query, [id]);
};

const updateFilial = (id, filial) => {
  const { image, address, location, longuage, name, description, phone, min_time } = filial;
  const query = `
    UPDATE filyal
    SET image = $1, address = $2, location = $3, longuage = $4, name = $5, description = $6, phone = $7, min_time = $8
    WHERE id = $9
    RETURNING *;
  `;

  return pool.query(query, [image, address, location, longuage, name, description, phone, min_time, id]);
};

const deleteFilial = (id) => {
  const query = 'DELETE FROM filyal WHERE id = $1 RETURNING *';
  return pool.query(query, [id]);
};

module.exports = {
  createFilial,
  getFiliais,
  getFilialById,
  updateFilial,
  deleteFilial,
};