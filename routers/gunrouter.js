const express = require('express');
const router = express.Router();
const uploadController = require('../controller/gun.controller');
const multer = require('multer');

// Set up Multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });

router.post('/gun',upload.single('file'), async (req, res) => {
  try {
      const result = await uploadController.uploadFile(req,res);
      res.status(200).json(result);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;


