const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  // Define your schema fields here
  Name: String,
  Age: String,  // Assuming it's a Unix timestamp
  Gender: String,
  MissingDate: String,
  MissingPlace: String,
  Height: String,
  HighQualityPhotographs: String,
  MissingRegno: String,
  Policestation: String,
});

module.exports = mongoose.model('Missing', mySchema);
