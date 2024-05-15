const express = require('express');
const router = express.Router();
const multer = require('multer');
const PatrolCheckin = require('../model/patrolcheckin'); // Middleware for handling multipart/form-data

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for uploaded files
  },
});

// Initialize multer middleware with the defined storage
const upload = multer({ storage: storage });

// Define a route handler for handling image uploads
router.post('/patrolimage', upload.single('image'), async (req, res) => {
  // Handle the uploaded file here
  if (!req.file) {
    // No file was uploaded
    return res.status(400).send('No file uploaded.');
  }
  
  try {
    const { userId, userName, imageName, address, date, time } = req.body;
    // Create a new instance of the Mongoose model with the parsed data
    const patrolCheckin = new PatrolCheckin({
      userId,
      userName,
      imageName,
      address,
      date,
      time,
      imagePath: req.file.path, // Store the image path in the database
    });

    // Save the instance to the patrolcheckin collection in MongoDB
    await patrolCheckin.save();

    // Send a success response
    res.status(200).send('Data processed and saved successfully!');
  } catch (error) {
    // Handle errors
    console.error('Error processing data:', error);
    res.status(500).send('Internal server error.');
  }
});

module.exports = router;
