const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  // Define your schema fields here
  Name: String,
  Age: String,  // Assuming it's a Unix timestamp
  Gender: String,
  Missingdate: String,
  Missingplace: String,
  Height: String,
  Highqualityphotographs: String,
  Missingregno: String,
  Policestation: String,
});

module.exports = mongoose.model('Missing', mySchema);
