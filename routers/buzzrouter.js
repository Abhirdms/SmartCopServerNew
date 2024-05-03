// buzzrouter.js

const express = require('express');
const router = express.Router();
const buzzService = require('../services/buzzservice');

// Route for fetching nearby users and sending notifications
router.get('/buzznearby', async (req, res) => {
  try {
    const { latitude, longitude, maxDistance, userId } = req.query;
    const notificationSent = await buzzService.sendNotificationsNearby(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(maxDistance),
      userId
    );
    res.status(200).json({ success: notificationSent });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
