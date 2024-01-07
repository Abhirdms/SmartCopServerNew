const express = require('express');
const router = express.Router();
const Tower = require('../model/tower');
router.get('/towersearch', async (req, res) => {
    try {
      const towers = await Tower.find({});
      res.json(towers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
