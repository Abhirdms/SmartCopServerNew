const express = require('express');
const multer = require('multer');
const Visitor = require('../model/visitor');
const Offender=require('../model/Offender');

const router = express.Router();

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'visitor/'); // Save uploaded files to the 'public/visitor' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Express route to handle file uploads
router.post('/visitorimg', upload.single('files'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

router.post('/submitVisitorFormData', async (req, res) => {
  try {
    const { offenderId,offenderName,crimeHead, visitorName, designation, visitingDate, duration, highQualityPhotographs } = req.body;

    // Check if the offender already exists
    let existingVisitor = await Visitor.findOne({ offenderId });

    if (existingVisitor) {
      // Offender exists, append visitor data
      existingVisitor.visitors.push({ visitorName, designation, visitingDate, duration, highQualityPhotographs });
      await existingVisitor.save();
    } else {
      // Offender does not exist, create new visitor document
      const newVisitor = new Visitor({
        offenderId,
        offenderName,
        crimeHead,
        visitors: [{ visitorName, designation, visitingDate, duration, highQualityPhotographs }]
      });
      await newVisitor.save();
    }

    const offender = await Offender.findOneAndUpdate(
      { _id: offenderId }, // Find the offender by ID
      { $inc: { totalVisitors: 1 } }, // Increment totalVisitors by 1
      { new: true } // Return the updated document
    );

    if (!offender) {
      console.error('Offender not found');
    }

    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Failed to add data' });
  }
});
//Notneeded


// router.post('/submitVisitorFormData', async (req, res) => {
//     try {
//       const { name, designation, uploadedFiles,crimeNumber } = req.body;
  
//       console.log('Received form data:');
//       console.log('Name:', name);
//       console.log('Designation:', designation);
//       console.log('Uploaded Files:', uploadedFiles);
//       console.log('Crime Number:', crimeNumber);
  
//       // Save the form data to the database using the Visitor model
//       const newVisitor = new Visitor({
//         name,
//         designation,
//         uploadedFiles,
//         isVisited: true,
//         crimeNumber
//          // Assuming the form submission implies a visit
//       });
  
//       await newVisitor.save();
  
//       res.status(200).send('Form data saved successfully');
//     } catch (error) {
//       console.error('Error handling form submission:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

  router.get('/getVisitedCrimeNumbers', async (req, res) => {
    try {
      const visitors = await Visitor.find({});
      const visitedCrimeNumbers = visitors.map(visitor => visitor.crimeNumber);
      res.json({ visitedCrimeNumbers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  router.get('/fetchDetails/:crimeNumber', async (req, res) => {
    console.log("Hi");
    try {
      const crimeNumber = req.params.crimeNumber;
      const sanitizedCrimeNumber = decodeURIComponent(crimeNumber);
  
      console.log('Request received for /fetchDetails/' + crimeNumber);
      console.log('Request received for /fetchDetails/' + sanitizedCrimeNumber);
  
      // Find the visitor in the database based on the crime number
      const visitor = await Visitor.findOne({ crimeNumber: sanitizedCrimeNumber });
      console.log('Visitor:', visitor);
  
      if (visitor) {
        res.json(visitor);
        console.log('Response sent:', visitor);
      } else {
        res.status(404).json({ error: 'Visitor not found' });
        console.log('Not found');
      }
    } catch (error) {
      console.error('Error fetching visitor details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  

// Export the router
module.exports = router;
