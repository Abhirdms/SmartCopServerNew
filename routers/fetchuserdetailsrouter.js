const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Sample User model
const User = require('../model/user');

router.get('/userDetails', async (req, res) => {
  try {
    // Extract user ID from the decoded JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    // Retrieve user details from the database
    const user = await User.findById(userId);

    if (user) {
      // Send user details in the response
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        // Add other user details as needed
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
