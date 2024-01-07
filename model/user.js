// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: String,
  dob: String,
  post: String,
  contact: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: [100, 'Password exceeds the maximum length (60 characters)'],
  },
  role: {
    type: String, // 'admin' or 'user'
    default: 'user',
  },
  policeStation: {
    type: String, // 'admin' or 'user'
    required: true,
  },
  // You can add more fields as needed
});


const User = mongoose.model('User', userSchema);

module.exports = User;
