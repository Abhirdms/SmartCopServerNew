const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  post: String,
  contact: String,
  policeStation: String
});

const locationSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  selectedUsers: [userSchema],
  locationName: String,
  latitude: Number,
  longitude: Number
});
const nakabandiSchema = new mongoose.Schema({
  selectedDate: {
    type: String,
    required: true,
  },
  policeStations: [
    {
      policeStation: String,
      locations: [locationSchema]
    }
  ]
  // locations: [
  //   {
  //     startTime: String,
  //     endTime: String,
  //     selectedUsers: Array,
  //     locationName: String,
  //     latitude: Number,
  //     longitude: Number
  //   },
  // ],
});

const Nakabandi = mongoose.model('Nakabandi', nakabandiSchema);

module.exports = Nakabandi;
