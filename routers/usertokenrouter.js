// routes/userRoutes.js
const express = require('express');
const router = express.Router();
// const router = express.Router();
// const { updateUserToken } = require('../services/UserTokenService');
const { updateUserToken } = require('../services/usertokenservice');


// Route to update user token
router.post('/updateToken', async (req, res) => {
  const { userId, name, post, policeStation, contact, token } = req.body;
  try {
    await updateUserToken(userId, name, post, policeStation, contact, token);
    res.status(200).send('User token updated successfully');
  } catch (error) {
    console.error('Error updating user token:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
