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
router.post("/deleteMissings", async (req, res) => {
  try {
    const MissingIdsToDelete = req.body.missingIds;
    console.log(MissingIdsToDelete); // Assuming offenderIds is an array of offender IDs to delete

    // Ensure offenderIdsToDelete is an array
    if (!Array.isArray(MissingIdsToDelete)) {
      return res.status(400).json({ error: 'Invalid request. offenderIds must be an array.' });
    }

    for (const missingId of MissingIdsToDelete) {
      await Missing.findByIdAndDelete(missingId);
    }

    res.status(200).json({ message: 'Offenders deleted successfully' });
  } catch (error) {
    console.error('Error deleting offenders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateMissing', async (req, res) => {
  try {
    const { missingId, updatedValues } = req.body;
    console.log('missingId');

    // Ensure required fields are present
    if (!missingId|| !updatedValues) {
      return res.status(400).json({ error: 'Invalid request. Please provide missingId and updatedValues.' });
    }

    // Find and update the offender
    const updatedMissing = await Missing.findByIdAndUpdate(missingId, updatedValues, { new: true });

    if (!updatedMissing) {
      return res.status(404).json({ error: 'Offender not found' });
    }

    res.status(200).json({ message: 'Offender updated successfully', updatedMissing });
  } catch (error) {
    console.error('Error updating offender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
