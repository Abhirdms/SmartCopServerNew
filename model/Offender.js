// models/offenderModel.js

const mongoose = require("mongoose");

const offenderSchema = new mongoose.Schema({
  name: String,
  aliasName: String,
  crimeHead: String,
  crimeSubHead: String,
  mo: String,
  crimeNumber: String,
  mobileno:String,
  address:String,
  state:String,
  district:String,
  policeStation:String,
  lat:String,
  long:String,
  action: String,
  highqualityphotographs: String,
}
);

const Offender = mongoose.model("Offender", offenderSchema);

module.exports = Offender;
