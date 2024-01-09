const mongoose = require('mongoose');

// const userLocationSchema = new mongoose.Schema({
//   userId: { type: String, required: true }, // Add userId field
//   latitude: { type: Number, required: true },
//   longitude: { type: Number, required: true },
//   timestamp: { type: Date, default: Date.now },
// });
const userLocationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  post: { type: String, required: true },
  contact: { type: String, required: true },
  policeStation: { type: String, required: true },
 
  location: {
    type: {
      type: String,
      enum: ['Point'], // Restrict the type to 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // Array of [longitude, latitude] for GeoJSON Point
      required: true,
    },
  },
  timestamp: { type: Date, default: Date.now },
});

// Index the location field for geospatial queries
userLocationSchema.index({ location: '2dsphere' });
const UserLocation = mongoose.model('UserLocation', userLocationSchema);

module.exports = UserLocation;
