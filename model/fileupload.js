const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  // Define your schema fields here
  Name: String,
  Age: String,  // Assuming it's a Unix timestamp
  Gender: String,
  Jailserialno: String,
  Crimenosection:String,
  Policestation:String,
  Dateofarrest:String,
  Dateofrelease:String,
  Majorhead: String,
  Minorhead: String,
  Mobileno:String,
  Address:String,
  Previouscrime: String,
  Action:String
});

module.exports = mongoose.model('MyModel', mySchema);
