
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  uploadedFiles: [String],
  isVisited: { type: Boolean, default: false },
  crimeNumber: String,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
