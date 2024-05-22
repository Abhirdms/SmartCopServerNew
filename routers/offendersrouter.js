// // routes/offenderRoutes.js

// const express = require("express");
// const router = express.Router();
// const offenderController = require("../controller/offenders.controller");

// router.post("/addoffenders", offenderController.addOffender);
// router.get("/offenders", (req, res) => {
//   console.log("hey offenders");
// });
// router.get("/offenders/search", offenderController.searchOffenders);
// router.get("/offenders/visitors", offenderController.searchVisitors);
// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const Offender = require("../model/Offender");
const uploadController = require("../controller/offenders.controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});
// const upload = multer();
const upload = multer({ storage: storage });
// const csvUpload = upload.single("file"); 
router.post("/addOffender", upload.single('file'), async (req, res) => {
  try {
      const result = await uploadController.uploadFile(req,res);
      res.status(200).json(result);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/searchVisitor", async (req, res) => {
  const searchQuery = req.query.name; // You should pass the 'name' as a query parameter
  const results = await Offender.find({ name: searchQuery });
  res.json(results);
  console.log(results);
});
router.post("/deleteOffenders", async (req, res) => {
  try {
    const offenderIdsToDelete = req.body.offenderIds;
    console.log(offenderIdsToDelete); // Assuming offenderIds is an array of offender IDs to delete

    // Ensure offenderIdsToDelete is an array
    if (!Array.isArray(offenderIdsToDelete)) {
      return res.status(400).json({ error: 'Invalid request. offenderIds must be an array.' });
    }

    for (const offenderId of offenderIdsToDelete) {
      await Offender.findByIdAndDelete(offenderId);
    }

    res.status(200).json({ message: 'Offenders deleted successfully' });
  } catch (error) {
    console.error('Error deleting offenders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateOffender', async (req, res) => {
  try {
    const { offenderId, updatedValues } = req.body;
    console.log(offenderId);

    // Ensure required fields are present
    if (!offenderId || !updatedValues) {
      return res.status(400).json({ error: 'Invalid request. Please provide offenderId and updatedValues.' });
    }

    // Find and update the offender
    const updatedOffender = await Offender.findByIdAndUpdate(offenderId, updatedValues, { new: true });

    if (!updatedOffender) {
      return res.status(404).json({ error: 'Offender not found' });
    }

    res.status(200).json({ message: 'Offender updated successfully', updatedOffender });
  } catch (error) {
    console.error('Error updating offender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

