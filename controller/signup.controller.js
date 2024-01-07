
// controllers/signup.controller.js
const User = require('../model/user');
const crypto = require('crypto');

const signup = async (req, res) => {
  const { name, gender, dob, post, contact, email, password, policeStation, } = req.body;

  try {
    // Check if the user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User with this email already exists');
    }

    // Hash the password
    console.log('Input Password in signup :', password);
    const p1 = crypto.createHash('sha256').update(password).digest('hex');
    console.log('hashed pass on signup', p1);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      gender,
      dob,
      post,
      contact,
      email,
      password: p1,
      policeStation,
    });

    await newUser.save();
    console.log('New User Details:', newUser);
    res.status(200).send('User signed up successfully!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { signup };
