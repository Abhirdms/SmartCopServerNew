// search.route.js
const express = require('express');
const router = express.Router();
const MyModel = require('../model/fileupload'); // Import your Mongoose model

// router.get('/search', async (req, res) => {
//   const searchQuery = req.query.name; // You should pass the 'name' as a query parameter
//   const results = await MyModel.find({ Name: searchQuery });
//   res.json(results);
//   console.log(results);
// });

router.get('/search', async (req, res) => {
  try {
    const results = await MyModel.find({}); // Adjust the query as needed
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
