const VehicleLocation = require('../model/vehicleLocation');

class VehicleLocationService {
  // static async addVehicleLocation(vehicleId,latitude, longitude) {
  //   try {

  //     let existingVehicleLocation = await VehicleLocation.findOne({ vehicleId: vehicleId });
  //     if (existingVehicleLocation) {
  //       existingVehicleLocation.location = {
  //         type: 'Point',
  //         coordinates: [longitude, latitude],
  //       };
  //       const updatedLocation = await existingVehicleLocation.save();
  //       console.log('Vehicle location updated in the database:', updatedLocation);
  //       return updatedLocation;
  //     } else {
  //       const newVehicleLocation = new VehicleLocation({
  //         vehicleId: vehicleId,
  //         location: {
  //           type: 'Point',
  //           coordinates: [longitude, latitude],
  //         },
  //       });
  //       const savedLocation = await newVehicleLocation.save();
  //       console.log('New vehicle location added to the database:', savedLocation);
  //       return savedLocation;
  //     }
  //   } catch (error) {
  //     console.error('Error updating vehicle location:', error);
  //     throw error; // Propagate the error to the caller
  //   }
  // }

  // Add a method to get nearby vehicles based on location
  static async getVehiclesNearby(latitude, longitude, maxDistance) {
    try {
      const nearbyVehicles = await VehicleLocation.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        },
      });
      console.log('Vehicles nearby retrieved from the database:', nearbyVehicles);
      return nearbyVehicles;
    } catch (error) {
      console.error('Error retrieving nearby vehicles:', error);
      throw error; 
    }
  }
}

module.exports = VehicleLocationService;
