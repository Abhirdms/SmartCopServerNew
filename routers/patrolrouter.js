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


router.put('/patrolmarkstatus', async (req, res) => {
  try {
    const { destinationId, marked } = req.body;
    console.log(req.body);

    // Find the destination by ID and update its marked status
    const updatedDestination = await Destination.findOneAndUpdate(
      { "destinations._id": destinationId },
      { $set: { "destinations.$.marked": marked } },
      { new: true }
    );

    if (!updatedDestination) {
      console.log("Not found");
      return res.status(404).json({ message: 'Destination not found' });
      
    }

    res.status(200).json({ updatedDestination });
    console.log("Updated succesffully");
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
