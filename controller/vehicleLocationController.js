const VehicleLocationService = require('../services/vehicleLocationService');

class VehicleLocationController {
  static async updateVehicleLocation(req, res) {
    const { vehicleId, latitude, longitude } = req.body;
    try {
      if (!vehicleId || !latitude || !longitude) {
        return res.status(400).send('Invalid request. Missing required fields.');
      }

      const result = await VehicleLocationService.addVehicleLocation(vehicleId, latitude, longitude);

      if (result) {
        res.status(200).send('Vehicle location updated successfully');
      } else {
        res.status(404).send('Vehicle not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async getVehiclesNearby(req, res) {
    console.log("in getvehiclesnearby");
    const { latitude, longitude, maxDistance } = req.query;
    
    try {
      if (!latitude || !longitude || !maxDistance) {
        return res.status(400).send('Invalid request. Missing required parameters.');
      }

      const nearbyVehicles = await VehicleLocationService.getVehiclesNearby(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistance));

      if (nearbyVehicles.length > 0) {
        res.status(200).json(nearbyVehicles);
      } else {
        res.status(404).send('No nearby vehicles found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}




module.exports = VehicleLocationController;
