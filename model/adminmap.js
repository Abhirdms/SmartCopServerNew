const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  user: String,
  userID:String,
  date: String,
  
  destinations: [
    {
      latitude: Number,
      longitude: Number,
      destinationName: String,
    },
  ],
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
