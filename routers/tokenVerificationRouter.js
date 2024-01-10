// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// router.get('/checkToken', (req, res) => {
//   // Middleware for checking if the token is valid
//   const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

//   // Replace 'your_secret_key' with the actual secret key used for token signing
//   const secretKey = process.env.SECRET_KEY;

//   // Verify the token
//   jwt.verify(token, secretKey, async(err, decoded) => {
//     if (err) {
//       // Token verification failed
//       console.error('Error verifying token:', err);
//       return res.sendStatus(401); // Unauthorized
//     } else {
//       // Token is valid
//       console.log('Token verified. Decoded payload:', decoded);
//       res.sendStatus(200); // OK
    
//     try {
//       const user = await User.findById(decoded.userId);
//       if (user) {
//         res.status(200).json({
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           // Add other user details as needed
//         });
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//     }
//   });
// });



// module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/checkToken', (req, res) => {
  // Middleware for checking if the token is valid
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  // Replace 'your_secret_key' with the actual secret key used for token signing
  const secretKey = process.env.SECRET_KEY;

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Token verification failed
      console.error('Error verifying token:', err);
      return res.sendStatus(401); // Unauthorized
    } else {
      // Token is valid
      console.log('Token verified. Decoded payload:', decoded);
      res.sendStatus(200); // OK
    }
  });
});

module.exports = router;
