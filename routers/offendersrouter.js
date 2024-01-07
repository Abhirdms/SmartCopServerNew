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
const OffenderController = require("../controller/offenders.controller");
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
const csvUpload = upload.single("file"); 
router.post("/addOffender", csvUpload,OffenderController.offenderData);
// router.get("/searchOffender", async (req, res) => {
//   const searchQuery = req.query.name; // You should pass the 'name' as a query parameter
//   const results = await Offender.find({ name: searchQuery });
//   res.json(results);
//   console.log(results);
// });
router.get("/searchVisitor", async (req, res) => {
  const searchQuery = req.query.name; // You should pass the 'name' as a query parameter
  const results = await Offender.find({ name: searchQuery });
  res.json(results);
  console.log(results);
});


module.exports = router;

