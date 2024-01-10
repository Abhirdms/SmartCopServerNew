const express = require('express');
const router = express.Router();
const Evidence = require('../model/evidence');

// Search incidents by crime number
router.get('/evisearching', async (req, res) => {
    console.log('Request received for /incsearch');
    try {
    const searchQuery = req.query.crimeNumber;
    console.log('Search query:', searchQuery); // You should pass the 'name' as a query parameter
    const results = await Evidence.find({ crimeNumber: searchQuery });
    console.log('Search results:', results);
    res.json(results);
    console.log(results);
} catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
