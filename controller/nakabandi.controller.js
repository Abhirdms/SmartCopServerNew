const Nakabandi = require('../model/nakabandi');
const User = require('../model/user');
const UserToken = require('../model/usertoken');
var admin= require("firebase-admin");
const { createOrUpdateReport } = require('../controller/nakabandireport.controller');

exports.saveNakabandiAllotment = async (req, res) => {
  try {
    const { selectedDate,selectedEndDate, startTime, endTime, selectedUsers, locationName,latitude,longitude, policeStation  } = req.body;
    if (selectedDate !== selectedEndDate) {
      // If the selectedDate and selectedEndDate are different, create or update Nakabandi entries for both dates
      await createOrUpdateNakabandi(selectedDate, startTime, endTime, selectedUsers, locationName, latitude, longitude, policeStation);
      await createOrUpdateNakabandi(selectedEndDate, startTime, endTime, selectedUsers, locationName, latitude, longitude, policeStation);
    } else {
      // If the selectedDate and selectedEndDate are the same, create or update Nakabandi entry for that date only
      await createOrUpdateNakabandi(selectedDate, startTime, endTime, selectedUsers, locationName, latitude, longitude, policeStation);
    }


    

    // await nakabandi.save();
    await createOrUpdateReport(selectedDate, policeStation, locationName, selectedUsers);
    for (const user of selectedUsers) {
        await User.findByIdAndUpdate(user['id'], { status: 'onduty' });
      }

      const userTokens = await UserToken.find({ userId: { $in: selectedUsers.map(user => user['id']) } });

      // Craft notification message
      const notificationMessage = `Nakabandi Duty Alloted on ${selectedDate} and starttime is ${startTime}`;
  
      // Extract tokens from userTokens
      const tokens = userTokens.map(userToken => userToken.token);
  
      // Send notifications to devices
      await sendNotification(tokens, notificationMessage,selectedDate, startTime);
    res.status(200).send('Nakabandi allotment saved successfully');
  } catch (error) {
    console.error('Error saving Nakabandi allotment:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to send a notification
async function sendNotification(tokens, message, selectedDate, startTime) {
    try {
      const notification = {
        tokens: tokens,
        data: {
            selectedDate: selectedDate,
            startTime: startTime,
          },
        notification: {
          title: 'Nakabandi Allotment',
          body: message,
        },
      };
      const response = await admin.messaging().sendMulticast(notification);
      console.log('Notification sent successfully:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  async function createOrUpdateNakabandi(selectedDate, startTime, endTime, selectedUsers, locationName, latitude, longitude, policeStation) {
    let nakabandi = await Nakabandi.findOne({ selectedDate });
  
    if (!nakabandi) {
      nakabandi = new Nakabandi({
        selectedDate,
        policeStations: [{
          policeStation,
          locations: [{ startTime, endTime, selectedUsers, locationName, latitude, longitude }]
        }]
      });
    } else {
      const existingPoliceStation = nakabandi.policeStations.find(station => station.policeStation === policeStation);
  
      if (existingPoliceStation) {
        // If the police station exists, append the location to its locations array
        existingPoliceStation.locations.push({ startTime, endTime, selectedUsers, locationName, latitude, longitude });
      } else {
        // If the police station doesn't exist, create a new entry for it
        nakabandi.policeStations.push({
          policeStation,
          locations: [{ startTime, endTime, selectedUsers, locationName, latitude, longitude }]
        });
      }
    }
  
    await nakabandi.save();
  }

  exports.getNakabandiAllotment = async (req, res) => {
    try {
      const { selectedDate } = req.query; // Get the selectedDate from the query parameters
      if (!selectedDate) {
        return res.status(400).send('selectedDate query parameter is required');
      }
      
      const nakabandiData = await Nakabandi.find({ selectedDate });
      res.status(200).json(nakabandiData);
    } catch (error) {
      console.error('Error fetching Nakabandi data:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.updateUserStatus = async (req, res) => {
    try {
      const { userId, status } = req.body;
  
      // Update user status in the database
      const result = await User.updateOne({ _id: userId }, { status: status });
  
      if (result) {
        res.status(200).json({ message: 'User status updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
