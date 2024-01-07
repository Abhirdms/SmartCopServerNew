const express = require('express');
const router = express.Router();
const CCTV = require('../model/cctv');
router.get('/cctvsearch', async (req, res) => {
    try {
      const towers = await CCTV.find({});
      res.json(towers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
