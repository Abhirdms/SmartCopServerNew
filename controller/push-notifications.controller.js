var admin= require("firebase-admin");
const User = require('../model/fileupload'); // Replace with your User model
const UserToken = require('../model/usertoken');
const cron = require('node-cron');

// var fcm=require("fcm-notification");

var serviceAccount=require("../config/push-notification-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Function to send a notification
async function sendNotification(tokens, userIds, title, body) {
  console.log(userIds);
  try {
    const message = {
      tokens: tokens,
      data: {
        userIds: JSON.stringify(userIds),
          // Include the userId in the data payload
      },
       // The FCM token of the device to receive the notification
      notification: {
        title: title,
        body: body,
      },
    };
    

    // Send the message
    const response = await admin.messaging().sendMulticast(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

cron.schedule('08 16 * * *', async () => {
  try {
    // Get today's date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const todayDate = `${dd}.${mm}.${yyyy}`;
    console.log(todayDate);

    // Find users whose date of release is today
    const users = await User.find({ Dateofrelease: todayDate });
    console.log(users);

    // Group users by police station
    const usersByPoliceStation = {};
    users.forEach(user => {
      const Policestation = user.Policestation.toLowerCase();
      if (!usersByPoliceStation[Policestation]) {
        usersByPoliceStation[Policestation] = [];
      }
      usersByPoliceStation[Policestation].push(user._id);
    });
    console.log(usersByPoliceStation);

    // Iterate over each police station
    for (const [policeStation, userIds] of Object.entries(usersByPoliceStation)) {
      // Find tokens for the current police station
      const userTokens = await UserToken.find({ policeStation: { $regex: new RegExp(policeStation, 'i') } });
      const tokens = userTokens.map(userToken => userToken.token);
      console.log(tokens);

      // Check if tokens array is empty
      if (tokens.length === 0) {
        console.log('No tokens found for police station:', policeStation);
        continue; // Skip sending notifications for this police station
      }

      // Send notifications to users with tokens
      await sendNotification(tokens, userIds, 'Alert', 'This person is releasing from jail today');
    }

    console.log('Notifications sent successfully.');
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
});

