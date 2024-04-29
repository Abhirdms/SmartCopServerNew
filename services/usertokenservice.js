// services/UserTokenService.js
const UserToken = require('../model/usertoken');

async function updateUserToken(userId, name, post, policeStation, contact, newToken) {
  try {
    let userToken = await UserToken.findOne({ userId });

    if (userToken) {
      userToken.token = newToken;
    } else {
      userToken = new UserToken({
        userId,
        name,
        post,
        policeStation,
        contact,
        token: newToken,
      });
    }

    await userToken.save();
    console.log('User token updated/added successfully:', userToken);
  } catch (error) {
    console.error('Error updating/adding user token:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = { updateUserToken };
