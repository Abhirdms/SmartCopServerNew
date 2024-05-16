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

router.post("/deleteJail", async (req, res) => {
  try {
    const JailIdsToDelete = req.body.jailreleaseIds;
    console.log(JailIdsToDelete); // Assuming offenderIds is an array of offender IDs to delete

    // Ensure offenderIdsToDelete is an array
    if (!Array.isArray(JailIdsToDelete)) {
      return res.status(400).json({ error: 'Invalid request. offenderIds must be an array.' });
    }

    for (const jailId of JailIdsToDelete) {
      await MyModel.findByIdAndDelete(jailId);
    }

    res.status(200).json({ message: 'Offenders deleted successfully' });
  } catch (error) {
    console.error('Error deleting offenders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateJailRelease', async (req, res) => {
  try {
    const { jailreleaseId, updatedValues } = req.body;
    console.log('jailreleaseId');

    // Ensure required fields are present
    if (!jailreleaseId|| !updatedValues) {
      return res.status(400).json({ error: 'Invalid request. Please provide jailreleaseId and updatedValues.' });
    }

    // Find and update the offender
    const updatedJail = await MyModel.findByIdAndUpdate(jailreleaseId, updatedValues, { new: true });

    if (!updatedJail) {
      return res.status(404).json({ error: 'Offender not found' });
    }

    res.status(200).json({ message: 'Offender updated successfully', updatedJail });
  } catch (error) {
    console.error('Error updating offender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/userDetails/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await MyModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
