const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  // Define your schema fields here
  Licenseno: String,
  Issuedby: String,  // Assuming it's a Unix timestamp
  Dob: String,
  Armtype: String,
  Dateofissue: String,
  Dateofexpiry: String,
  
});

module.exports = mongoose.model('Gun', mySchema);
