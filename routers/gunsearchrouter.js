// search.route.js
const express = require('express');
const router = express.Router();
const Gun = require('../model/gun'); // Import your Mongoose model

// router.get('/gunsearch', async (req, res) => {
//   const searchQuery = req.query.licenseno; // You should pass the 'name' as a query parameter
//   const results = await Gun.find({ Licenseno: searchQuery });
//   res.json(results);
//   console.log(results);
// });
router.get('/gunsearch', async (req, res) => {
  try {
    const results = await Gun.find({}); // Adjust the query as needed
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/deletegunsearch", async (req, res) => {
  try {
    const GunIdsToDelete = req.body.gunlicIds;
    console.log(GunIdsToDelete); // Assuming offenderIds is an array of offender IDs to delete

    // Ensure offenderIdsToDelete is an array
    if (!Array.isArray(GunIdsToDelete)) {
      return res.status(400).json({ error: 'Invalid request. offenderIds must be an array.' });
    }

    for (const gunId of GunIdsToDelete) {
      await Gun.findByIdAndDelete(gunId);
    }

    res.status(200).json({ message: 'Offenders deleted successfully' });
  } catch (error) {
    console.error('Error deleting offenders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateGunlic', async (req, res) => {
  try {
    const { gunlicId, updatedValues } = req.body;
    console.log('gunlicId');

    // Ensure required fields are present
    if (!gunlicId|| !updatedValues) {
      return res.status(400).json({ error: 'Invalid request. Please provide gunlicId and updatedValues.' });
    }

    // Find and update the offender
    const updatedMissing = await Gun.findByIdAndUpdate(gunlicId, updatedValues, { new: true });

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
