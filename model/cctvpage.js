const mongoose = require('mongoose');

const cctvSchema = new mongoose.Schema({
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
   POC: String,
});

// Index the location field for geospatial queries
cctvSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Cctvpage', cctvSchema);
