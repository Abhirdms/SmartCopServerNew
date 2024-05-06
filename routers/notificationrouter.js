const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controller/push-notifications.controller');

// Route for sending notifications
router.post('/send-notification', async (req, res) => {
    try {
        // Extract necessary information from request body
        const { token, title, body } = req.body;

        // Call the sendNotification function
        await sendNotification(token, title, body);

        // Send a success response
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

module.exports = router;
