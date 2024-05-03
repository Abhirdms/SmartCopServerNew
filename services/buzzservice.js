const UserLocationService = require('../services/userLocationService');
const UserToken = require('../model/usertoken');
var admin= require("firebase-admin");


class BuzzService {
  static async sendNotificationsNearby(latitude, longitude, maxDistance, userId) {
    try {
      // Call getUsersNearby function from UserLocationService
      const nearbyUsers = await UserLocationService.getUsersNearby(latitude, longitude, maxDistance,userId);
      console.log("This is user ",nearbyUsers);

      // const filteredUsers = nearbyUsers.filter(user => user.userId !== userId);
      // console.log("Filtered users:", filteredUsers);

      const userIds = nearbyUsers.map(user => user.userId);
      console.log("UserIds extracted from filteredUsers:", userIds);

// Query UserToken collection to find tokens associated with the userIds
        const userTokens = await UserToken.find({ userId: { $in: userIds } });
        console.log("User tokens found:", userTokens);

        const tokens = userTokens.map(user => user.token);
      console.log("Tokens extracted from userTokens:", tokens);

        await sendPushNotification(tokens,latitude, longitude);


     
      // Process nearbyUsers and send notifications
      // Implement your logic here
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw error;
    }
  }
}

async function sendPushNotification(tokens,latitude, longitude) {
    try {
      const message = {
        tokens: tokens,
        data: {
          latitude: JSON.stringify(latitude),
          longitude: JSON.stringify(longitude),
            // Include the userId in the data payload
        },
        notification: {
          title: 'New Alert',
          body: 'A new alert has been issued.',
        },
      };
  
      // Send the message
      const response = await admin.messaging().sendMulticast(message);
      console.log('Push notification sent successfully:', response);
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  }

module.exports = BuzzService;
