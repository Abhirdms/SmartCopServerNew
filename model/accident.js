const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  // Define your schema fields here
  
  Crimeno: String,
  Policestation: String,  // Assuming it's a Unix timestamp
  Occurancedate:String,
  Occurancetime:String,
  Registerdate:String,
  Description:String,
  Lat:String,
  Long:String,

  
  
});

module.exports = mongoose.model('Accident', mySchema);
