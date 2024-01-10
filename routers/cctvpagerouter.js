const express = require('express');
const router = express.Router();
const uploadController = require('../controller/cctvpage.controller');
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

router.post('/cctvpage', upload.single('file'), uploadController.uploadFile);
module.exports = router;


