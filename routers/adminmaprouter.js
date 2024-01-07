const express = require('express');
const router = express.Router();

const adminmapController = require('../controller/adminmap.controller');
router.get('/address', (req, res) => {
  console.log("Hitted me");
    // Implement logic for handling GET requests if needed
    res.send('This is the GET endpoint for address');
  });
router.post('/address', adminmapController.createDestination);

module.exports = router;
