const express = require('express');
const router = express.Router();
const VehicleLocationController = require('../controller/vehicleLocationController');

// Define endpoint for vehicle location

// use the below router to modify the logic for adding vehicle location cause curretly it is fetching userlocation not the vehicle location
// router.post("/vehicleLocation", VehicleLocationController.updateVehicleLocation);



// Define endpoint for fetching nearby vehicle2s
router.get("/fetchNearbyVehicles", VehicleLocationController.getVehiclesNearby);

module.exports = router;
