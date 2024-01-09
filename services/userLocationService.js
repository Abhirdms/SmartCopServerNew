const ParkingSlot = require('../model/parkingslot');
const UserLocation = require('../model/userLocation');


class UserLocationService {
  static async addUserLocation(userId,name,post,contact ,policeStation,latitude, longitude) {
    try {

      let existingUserLocation = await UserLocation.findOne({ userId: userId });
      if (existingUserLocation) {
        existingUserLocation.location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };
        const updatedLocation = await existingUserLocation.save();
        console.log('User location updated in the database:', updatedLocation);
        return updatedLocation;
      } else {
        const newUserLocation = new UserLocation({
          userId: userId,
          name: name,
          post: post,
          contact: contact,
          policeStation: policeStation,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        });
        const savedLocation = await newUserLocation.save();
        console.log('New user location added to the database:', savedLocation);
        return savedLocation;
      }
    } catch (error) {
      console.error('Error updating user location:', error);
      throw error; 
    }
  }

  static async getUsersNearby(latitude, longitude, maxDistance) {
    try {
      const nearbyUsers = await UserLocation.find({
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
      console.log('Users nearby retrieved from the database:', nearbyUsers);
      return nearbyUsers;
    } catch (error) {
      console.error('Error retrieving nearby users:', error);
      throw error; 
    }
  }
  static async getParkingNearby(latitude, longitude, maxDistance) {
    try {
      const nearbyParking = await ParkingSlot.find({
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
      console.log('Parking nearby retrieved from the database:', nearbyUsers);
      return nearbyUsers;
    } catch (error) {
      console.error('Error retrieving nearby users:', error);
      throw error; 
    }
  }
}

module.exports = UserLocationService;
