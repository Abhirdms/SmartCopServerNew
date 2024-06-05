const express = require('express');
const router = express.Router();
const multer = require('multer');

const NakabandiReport = require('../model/nakabandireport'); // Import your User model

const caseTypeMapping = {
    'Drunk Driving': 'drunkDriving',
    'Tinted Glasses': 'tintedGlasses',
    'No License': 'nolicense',
    'Modified Silencers': 'modifiedSilencer',
    'Fancy Numberplates': 'fancyNumberPlates',
    'No Insurance': 'noInsurance',
    'Triple Seat': 'tripleSeat',
    'Fine Issued': 'fineissued',
    'Illegal Weapons': 'illegalweapons',
    'Arrested': 'arrested',
    'Others': 'others'
  };
  
// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'nakabandiImg'); // Destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    cb(null, file.originalname);
  }
});



const upload = multer({ storage: storage });

// Endpoint to handle report upload
router.post('/uploadnakabandiReport', upload.single('image'), async (req, res) => {
    try {
        const { userId, imageName,caseType, locationName, selectedDate } = req.body;
        console.log(req.body);
        const schemaCaseType = caseTypeMapping[caseType];
        // Find the NakabandiReport document for the selected date
        const report = await NakabandiReport.findOne({ selectedDate });
        console.log(report);
    
        if (!report) {
          return res.status(404).json({ error: 'Nakabandi report not found for the selected date' });
        }
    
        // Find the user in the NakabandiReport document based on user ID and location name
        let userToUpdate;
        let policeStationIndex;
        let locationtoUpdate;
        report.policeStations.forEach(station => {
          station.locations.forEach(location => {
            console.log("Comparing Location Names:", location.nakabandispotname, locationName);
            location.selectedUsers.forEach(user => {

              console.log("Comparing User IDs:", user.id, userId);
          if (user.id.toString() === userId.toString() && location.nakabandispotname === locationName) {
                userToUpdate = user;
                
                locationtoUpdate = location;
                console.log(`Printing inside ${userToUpdate}`);
              }
            });
          });
        });


        console.log(`Printing outside ${userToUpdate}`);
    
        if (!userToUpdate) {
            console.log("Usernotfoud");
          return res.status(404).json({ error: 'User not found in the specified location' });
        }
        console.log(userToUpdate);
        if (!userToUpdate.reports) {
            userToUpdate.reports = { imageNames: [], caseTypes: [] }; // Initialize if reports doesn't exist
        }
        
        // Add the new image name and case type
        userToUpdate.reports.imageNames.push(imageName);
        userToUpdate.reports.caseTypes.push(caseType);
        locationtoUpdate.cases[schemaCaseType]++;

        // report.policeStations[policeStationIndex].locations[locationIndex].cases[schemaCaseType]++;
        // Add the report to the user's reports array
        // userToUpdate.reports.push({ imageNames: [imageName], caseTypes: [caseType] });
        console.log(`User to update ${userToUpdate.reports}`);
        console.log("User to update reports:", userToUpdate.reports);

        console.log(`Saved this report ${report}`);
    
        // Save the updated NakabandiReport document
        await report.save();
    
        res.status(200).json({ message: 'Report uploaded successfully' });
      } catch (error) {
        console.error('Error uploading report:', error);
        res.status(500).json({ error: 'An error occurred while uploading report' });
      }
    });


    router.get('/viewnakabandireport', async (req, res) => {
        try {
          const { userId, selectedDate } = req.query;
      
          // Find the report for the given userId and selectedDate
          const report = await NakabandiReport.findOne({
            selectedDate,
            'policeStations.locations.selectedUsers.id': userId
          });
      
          if (!report) {
            return res.status(404).json({ message: 'Report not found' });
          }
      
          // Extract the specific user's report data from the found report
          const userReportData = [];
      
          report.policeStations.forEach(station => {
            station.locations.forEach(location => {
              location.selectedUsers.forEach(user => {
                if (user.id === userId) {
                  userReportData.push({
                    locationName: location.nakabandispotname,
                    cases: location.cases,
                    reports: user.reports
                  });
                }
              });
            });
          });
      
          res.json(userReportData);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      });
      

    module.exports = router;
