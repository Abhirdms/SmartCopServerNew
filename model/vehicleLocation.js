const mongoose = require('mongoose');
const vehicleLocationSchema = new mongoose.Schema({
  vehicleID: { type: String, required: true },
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
vehicleLocationSchema.index({ location: '2dsphere' });
const VehicleLocation = mongoose.model('VehicleLocation', vehicleLocationSchema);

module.exports = VehicleLocation;
