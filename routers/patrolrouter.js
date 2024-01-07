const express = require('express');
const router = express.Router();
const Destination = require('../model/adminmap');

router.get('/get_destinations', async (req, res) => {
  try {
    const { userID, date } = req.query;

    // Assuming your Destination model has fields user and date
    const destinations = await Destination.find({ userID, date });

    res.status(200).json({ destinations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
