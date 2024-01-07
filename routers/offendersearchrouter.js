// search.route.js
const express = require("express");
const router = express.Router();
const Offender = require("../model/Offender");

router.get("/searchOffender", async (req, res) => {
  try {
    const searchQuery = req.query.name;

    // Use a regular expression to perform a case-insensitive and partial search
    const regex = new RegExp(searchQuery, "i");

    const results = await Offender.find({ name: regex });
    
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/searchallmos', async (req, res) => {
  try {
    const towers = await Offender.find({}); // Adjust the query as needed
    res.json(towers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

