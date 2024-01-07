const express = require('express');
const multer = require('multer');


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

  // Define a route for handling multiple image uploads
  router.post('/multipleimage', upload.array('files', 10), (req, res) => {
    // Handle the uploaded files
    const files = req.files;
  
    // Process files (save to storage, update database, etc.)
    // For demonstration, just send back a response with file details
    res.json({ files });
  });

module.exports = router;
