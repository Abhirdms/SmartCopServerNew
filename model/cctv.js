const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  // Define your schema fields here
  Lat: String,
  Lon: String,  // Assuming it's a Unix timestamp
  Address: String,
  
  
});

module.exports = mongoose.model('CCTV', mySchema);
