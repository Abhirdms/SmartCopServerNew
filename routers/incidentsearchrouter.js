const express = require('express');
const router = express.Router();
const Incident = require('../model/incident');

// Search incidents by crime number
router.get('/searching', async (req, res) => {
    console.log('Request received for /incsearch');
    try {
    const searchQuery = req.query.crimeNumber;
    console.log('Search query:', searchQuery); // You should pass the 'name' as a query parameter
    const results = await Incident.find({ crimeNumber: searchQuery });
    console.log('Search results:', results);
    res.json(results);
    console.log(results);
} catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/crimenumb', async (req, res) => {
  try {
    const results = await Incident.find({}); // Adjust the query as needed
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
