const express = require('express');
const bodyParser = require('body-parser');
const filial = require('../controllers/filial.js');

const router = express.Router();
router.use(bodyParser.json());

// Create a new filial
router.post('/filial', async (req, res) => {
  try {
    const newFilial = await filial.createFilial(req.body);
    res.json(newFilial.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all filials
router.get('/filials', async (req, res) => {
  try {
    const filials = await filial.getFiliais();
    res.json(filials.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a filial by ID
router.get('/filial/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filialData = await filial.getFilialById(id);
    if (filialData.rows.length === 0) {
      res.status(404).json({ error: 'Filial not found' });
    } else {
      res.json(filialData.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a filial by ID
router.put('/filial/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedFilial = await filial.updateFilial(id, req.body);
    if (updatedFilial.rows.length === 0) {
      res.status(404).json({ error: 'Filial not found' });
    } else {
      res.json(updatedFilial.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a filial by ID
router.delete('/filial/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedFilial = await filial.deleteFilial(id);
    if (deletedFilial.rows.length === 0) {
      res.status(404).json({ error: 'Filial not found' });
    } else {
      res.json(deletedFilial.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;