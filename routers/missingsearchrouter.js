// search.route.js
const express = require('express');
const router = express.Router();
const Missing = require('../model/missed'); // Import your Mongoose model

// router.get('/missingsearch', async (req, res) => {
//   const searchQuery = req.query.name; // You should pass the 'name' as a query parameter
//   const results = await Missing.find({ Name: searchQuery });
//   res.json(results);
//   console.log(results);
// });

router.get('/missingsearch', async (req, res) => {
  try {
    const results = await Missing.find({}); // Adjust the query as needed
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
