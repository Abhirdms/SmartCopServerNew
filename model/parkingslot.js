const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
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
  Address: String,
});

// Index the location field for geospatial queries
towerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Parking', towerSchema);
