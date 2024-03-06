// crimeRoutes.js

const express = require('express');
const router = express.Router();
const Theft = require('../model/theft');
const Accident = require('../model/accident');
const Robbery = require('../model/robbery');
const Dacoity = require('../model/dacoity');
const Harass = require('../model/harass');


router.get('/accidentsearch', async (req, res) => {
  try {
    const towers = await Accident.find({}); // Adjust the query as needed
    res.json(towers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/theftsearch', async (req, res) => {
  console.log('hi');
  try {
    const theft = await Theft.find({});
    res.json(theft);
    console.log(theft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/robberysearch', async (req, res) => {
  console.log('hi');
  try {
    const theft = await Robbery.find({});
    res.json(theft);
    console.log(theft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/dacoitysearch', async (req, res) => {
  console.log('hi');
  try {
    const theft = await Dacoity.find({});
    res.json(theft);
    console.log(theft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/harasssearch', async (req, res) => {
  console.log('hi');
  try {
    const theft = await Harass.find({});
    res.json(theft);
    console.log(theft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getCrimeCollection(crimeType) {
  switch (crimeType) {
    case 'accidentsearch':
      return Accident;
    case 'theftsearch':
      return Theft;
    case 'robberysearch':
      return Robbery;
    case 'dacoitysearch':
      return Dacoity;
    case 'harasssearch':
      return Harass;
    default:
      throw new Error('Invalid crime type');
  }
}



router.post('/deleteCrimeMappings/:crimeType', async (req, res) => {
  try {
    const crimeType = req.params.crimeType;
    const crimeMappingIdsToDelete = req.body.crimemappingIds;

    // Ensure crimeMappingIdsToDelete is an array
    if (!Array.isArray(crimeMappingIdsToDelete)) {
      return res.status(400).json({ error: 'Invalid request. crimeMappingIds must be an array.' });
    }

    const crimeCollection = getCrimeCollection(crimeType);

    for (const crimeMappingId of crimeMappingIdsToDelete) {
      await crimeCollection.findByIdAndDelete(crimeMappingId);
    }

    res.status(200).json({ message: 'Crime mappings deleted successfully' });
  } catch (error) {
    console.error('Error deleting crime mappings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateCrimeMapping/:crimeType', async (req, res) => {
  try {
    const crimeType = req.params.crimeType;
    const { crimemappingId, updatedValues } = req.body;

    // Ensure required fields are present
    if (!crimemappingId || !updatedValues) {
      return res.status(400).json({ error: 'Invalid request. Please provide crimeMappingId and updatedValues.' });
    }

    const crimeCollection = getCrimeCollection(crimeType);
    const updatedCrimeMapping = await crimeCollection.findByIdAndUpdate(
      crimemappingId,
      updatedValues,
      { new: true }
    );

    if (!updatedCrimeMapping) {
      return res.status(404).json({ error: 'Crime mapping not found' });
    }

    res.status(200).json({ message: 'Crime mapping updated successfully', updatedCrimeMapping });
  } catch (error) {
    console.error('Error updating crime mapping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Add more routes for other crime types

module.exports = router;
