const mongoose = require('mongoose');

const patrolCheckinSchema = new mongoose.Schema({
  // Define your schema fields here
  userId: String,
  userName: String,  // Assuming it's a Unix timestamp
  imageName: String,
  address: String,
  date: String,
  time: String,
  imagePath: String,
 
  
});

module.exports = mongoose.model('PatrolCheckin', patrolCheckinSchema);
