// // controllers/userlogin.controller.js
// const User = require('../model/user');
// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
// const login = async (req, res) => {
//   const { phoneNumber, password } = req.body;
//   console.log('Received request with phone number:', phoneNumber);
//   console.log('Received request with password:', password);

//   try {
//     // Find the user by phone number
//     const user = await User.findOne({ contact: phoneNumber });
//     console.log('User found in database:', user);

//     // Check if the user exists
//     if (!user) {
//       return res.status(401).send('Invalid credentials');
//     }
//     console.log('password got is ',password);
//     console.log('Hashed Password from Database:', user.password);

//     console.log('Before Comparison - Plain Password:', password);
//     console.log('Before Comparison - Hashed Password from Database:', user.password);
//     console.log('password in login:', password);
//     const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
//     // const passwordMatch = await argon2.verify(user.password, password);

//     console.log('Hashed Entered Password in login:', hashedEnteredPassword);

    
//     const passwordMatch = hashedEnteredPassword === user.password;
//     console.log(passwordMatch);

//     if (passwordMatch) {
//       res.status(200).send('User login successful!');
//       console.log("sucessful");
//     } else {
//       res.status(401).send('Invalid credentials');
//       console.log("Invalid");
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = { login };





//working
// const User = require('../model/user');
// const crypto = require('crypto');
// const Admin = require('../model/admin');

// const login = async (req, res) => {
//   const { phoneNumber, password } = req.body;
//   console.log('Received request with phone number:', phoneNumber);
//   console.log('Received request with password:', password);

//   try {
//     // Check if the user is an admin
//     const adminCredentials = await Admin.findOne({ contact: phoneNumber });
//     if (adminCredentials) {
//       const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
//       const adminPasswordMatch = hashedEnteredPassword === adminCredentials.password;

//       if (adminPasswordMatch) {
//         // Admin login successful
//         res.status(200).send('Admin login successful!');
//         console.log('Admin login successful');
//         return;
//       }
//     }

//     // If not an admin, check regular user credentials
//     const user = await User.findOne({ contact: phoneNumber });
//     if (!user) {
//       // No user found, invalid credentials
//       return res.status(401).send('Invalid credentials');
//     }

//     const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
//     const passwordMatch = hashedEnteredPassword === user.password;

//     if (passwordMatch) {
//       // Regular user login successful
//       res.status(200).send('User login successful!');
//       console.log('User login successful');
//     } else {
//       // Invalid credentials
//       res.status(401).send('Invalid credentials');
//       console.log('Invalid credentials');
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = { login };

const Admin = require('../model/admin'); // Assuming you have a model for admins
const User = require('../model/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const generateRandomKey = () => {
//   return crypto.randomBytes(32).toString('hex'); // 32 bytes for a 64-character hexadecimal string
// };


const generateToken = (userId, isAdmin = false) => {
  // Customize the token payload as needed
  const payload = {
    userId,
    isAdmin,
  };

  // Use a secure secret key for signing the token
  const secretKey = process.env.SECRET_KEY;
console.log(secretKey); // Replace with a secure secret key

  // Set token expiration (e.g., 1 hour)
  const expiresIn = '1h';

  return jwt.sign(payload, secretKey, { expiresIn });
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  console.log('Received request with phone number:', phoneNumber);
  console.log('Received request with password:', password);

  try {
    // Check if the user is an admin
    const admin = await Admin.findOne({ contact: phoneNumber });

    if (admin) {
      
      const adminPasswordMatch = password === admin.password;

      if (adminPasswordMatch) {
        const token = generateToken(admin._id, true);
        res.status(200).json({ token });
  console.log('Admin login successful');
        console.log('Admin login successful');
        return;
      }
    }

    // If not an admin, check regular user credentials
    const user = await User.findOne({ contact: phoneNumber });
    if (!user) {
      // No user found, invalid credentials
      return res.status(401).send('Invalid credentials');
    }

    const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
    const passwordMatch = hashedEnteredPassword === user.password;

    if (passwordMatch) {
      // const token = generateToken(user._id);
      const token=jwt.sign({id: user._id},"passwordKey")
      res.status(200).json({ token,...user._doc });
  console.log('User login successful');
      console.log('User login successful');
    } else {
      // Invalid credentials
      res.status(401).send('Invalid credentials');
      console.log('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { login };
