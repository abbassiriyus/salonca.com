const pool = require('../db.js');

const createFilial = (filial) => {
  const { image, address, location, longuage, name, desc, phone, creator, min_time } = filial;
  const query = `
    INSERT INTO filyal (image, address, location, longuage, name, desc, phone, creator, min_time)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  return pool.query(query, [image, address, location, longuage, name, desc, phone, creator, min_time]);
};

const getFiliais = () => {
  const query = 'SELECT * FROM filyal';
  return pool.query(query);
};

const getFilialById = (id) => {
  const query = 'SELECT * FROM filyal WHERE id = $1';
  return pool.query(query, [id]);
};

const updateFilial = (id, filial) => {
  const { image, address, location, longuage, name, desc, phone, min_time } = filial;
  const query = `
    UPDATE filyal
    SET image = $1, address = $2, location = $3, longuage = $4, name = $5, desc = $6, phone = $7, min_time = $8
    WHERE id = $9
    RETURNING *;
  `;

  return pool.query(query, [image, address, location, longuage, name, desc, phone, min_time, id]);
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