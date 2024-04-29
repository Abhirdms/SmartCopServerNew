// UserToken.js
const mongoose = require('mongoose');

// Define the UserToken schema
const userTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  policeStation: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

// Create the UserToken model
const UserToken = mongoose.model('UserToken', userTokenSchema);

// Export the UserToken model
module.exports = UserToken;
