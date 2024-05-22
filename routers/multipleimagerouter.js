const express = require('express');
const multer = require('multer');
const Missing = require('../model/missed'); 
const mongoose = require('mongoose');


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/'); // Specify the destination folder
    },
    filename: (req, file, cb) => {
      
      cb(null, file.originalname); // Use a unique filename
    },
  });

  const upload = multer({ storage: storage });

router.post('/misingpicupdate', upload.single('file'), async (req, res) => {
    try {
      const { userId, imageName } = req.body;
      console.log(req.body);
  
      // Find the missing person by ID and update the highQualityPhotographs field
      const updateResult = await Missing.findByIdAndUpdate(
        userId,
        { $set: { Highqualityphotographs: imageName } },
        { new: true, useFindAndModify: false }
      );

      if (!updateResult) {
        return res.status(404).json({ message: 'Failed to update! Try again' });
      }
      
  
      res.status(200).json({ message: 'File uploaded and record updated successfully' });
    } catch (error) {
      console.error('Error updating the record:', error);
      res.status(500).json({ message: 'Failed to upload file and update record', error });
    }
  });

  // Define a route for handling multiple image uploads
  router.post('/multipleimage', upload.single('files'), (req, res) => {
    // Handle the uploaded files
    const files = req.files;
  
    // Process files (save to storage, update database, etc.)
    // For demonstration, just send back a response with file details
    res.json({ files });
  });

module.exports = router;
