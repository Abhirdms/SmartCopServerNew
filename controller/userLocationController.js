const UserLocationService = require('../services/userLocationService');

class UserLocationController {
  static async updateUserLocation(req, res) {
    const { userId, name,post,contact ,policeStation, latitude, longitude } = req.body;
    console.log(req.body);
    try {
      if (!userId || !name || !post || !contact || !policeStation || !latitude || !longitude) {
        return res.status(400).send('Invalid request. Missing required fields.');
      }

      const result = await UserLocationService.addUserLocation(userId,name,post,contact ,policeStation,latitude, longitude);

      if (result) {
        res.status(200).send('User location updated successfully');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async getUsersNearby(req, res) {
    const { latitude, longitude, maxDistance } = req.query;
    
    try {
      if (!latitude || !longitude || !maxDistance) {
        return res.status(400).send('Invalid request. Missing required parameters.');
      }

      const nearbyUsers = await UserLocationService.getUsersNearby(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistance));

      if (nearbyUsers.length > 0) {
        res.status(200).json(nearbyUsers);
      } else {
        res.status(404).send('No nearby users found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  static async getParkingNearby(req, res) {
    console.log("park here");
    const { latitude, longitude, maxDistance } = req.query;
    
    try {
      if (!latitude || !longitude || !maxDistance) {
        return res.status(400).send('Invalid request. Missing required parameters.');
      }

      const nearbyParking = await UserLocationService.getParkingNearby(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistance));

      if (nearbyParking.length > 0) {
        res.status(200).json(nearbyParking);
      } else {
        res.status(404).send('No nearby parking slots found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async getTowerpageNearby(req, res) {
    console.log("in getparkingby");
    const { latitude, longitude, maxDistance } = req.query;
    
    try {
      if (!latitude || !longitude || !maxDistance) {
        return res.status(400).send('Invalid request. Missing required parameters.');
      }

      const nearbyUsers = await UserLocationService.getTowerpageNearby(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistance));

      if (nearbyUsers.length > 0) {
        res.status(200).json(nearbyUsers);
      } else {
        res.status(404).send('No nearby parkings found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getCctvpageNearby(req, res) {
    console.log("in getparkingby");
    const { latitude, longitude, maxDistance } = req.query;
    
    try {
      if (!latitude || !longitude || !maxDistance) {
        return res.status(400).send('Invalid request. Missing required parameters.');
      }

      const nearbyUsers = await UserLocationService.getCctvpageNearby(parseFloat(latitude), parseFloat(longitude), parseFloat(maxDistance));

      if (nearbyUsers.length > 0) {
        res.status(200).json(nearbyUsers);
      } else {
        res.status(404).send('No nearby parkings found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
 
}




module.exports = UserLocationController;
