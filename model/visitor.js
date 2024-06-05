
const mongoose = require('mongoose');

const visitorreportSchema = new mongoose.Schema({
  visitorName: {
    type: String,
  },
  designation: {
    type: String,
  },
  visitingDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  highQualityPhotographs: {
    type: String,// If this field is not always present, you can set it to optional
  }
});

const visitorSchema = new mongoose.Schema({
  offenderId: {
    type: String,
    required: true,
    unique: true
  },
  offenderName: {
    type: String,
  },
  crimeHead: {
    type: String,
  },
  visitors: [visitorreportSchema] // Array of visitor objects
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;


