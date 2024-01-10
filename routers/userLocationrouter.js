const express = require('express');
const router = express.Router();
const UserLocationController = require('../controller/userLocationController');

// Define endpoint for user location
router.post("/userLocation", UserLocationController.updateUserLocation);


// Define endpoint for fetching nearby users
router.get("/fetchNearbyUsers", UserLocationController.getUsersNearby);
router.get("/fetchNearbyParking", UserLocationController.getParkingNearby);
router.get("/fetchNearbyTowerpage", UserLocationController.getTowerpageNearby);
router.get("/fetchNearbyCctvpage", UserLocationController.getCctvpageNearby);



module.exports = router;
