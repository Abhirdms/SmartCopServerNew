// models/offenderModel.js

const mongoose = require("mongoose");

const offenderSchema = new mongoose.Schema({
  name: String,
  aliasName: String,
  crimeHead: String,
  crimeSubHead: String,
  mo: String,
  crimeNumber: String,
  fpsNumber: String,
  state: String,
  district: String,
  policeStation: String,
  latLon: String,
  highqualityphotographs: String,
}
);

const Offender = mongoose.model("Offender", offenderSchema);

module.exports = Offender;