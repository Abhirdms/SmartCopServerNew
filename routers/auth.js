const express = require("express");
const crypto = require('crypto');
const User = require("../model/user");
const Admin = require('../model/admin');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require('dotenv').config();


const ACCESS_CODE = process.env.ACCESS_CODE;


// Sign Up
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, accesscode, password,gender,dob,post,contact,policeStation } = req.body;

   // const existingEmailUser = await User.findOne({ email });
   //  if (existingEmailUser) {
   //    return res.status(400).json({ msg: "User with the same email already exists!" });
   //  }
    if (accesscode !== ACCESS_CODE) {
      return res.status(400).json({ msg: "Invalid access code!" });
    }

    // Check if a user with the same contact exists
    const existingContactUser = await User.findOne({ contact });
    if (existingContactUser) {
      return res.status(400).json({ msg: "User with the same contact already exists!" });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    let user = new User({
      password: hashedPassword,
      name,
      gender,
      dob,
      post,
      contact,
      policeStation,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign In

authRouter.post("/userlogin", async (req, res) => {
  try {
    const { phoneNumber, password, accesscode } = req.body;

    // const admin = await Admin.findOne({ contact: phoneNumber });

    // if (admin && password === admin.password) {
    //   // Admin login successful
    //   const token = jwt.sign({ id: admin._id, isAdmin: true }, "passwordKey");
    //   res.json({ token, ...admin._doc });
    //   console.log('Admin login successful');
    //   return;
    // }





    const user = await User.findOne({ contact: phoneNumber });
      if (accesscode !== ACCESS_CODE) {
      return res.status(400).json({ msg: "Invalid access code!" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this mobile number does not exist!" });
    }



    if (user.role == "admin" && password !== user.password) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const isMatch = crypto.createHash('sha256').update(password).digest('hex');
      if (isMatch  !== user.password && user.role == "user") {
      return res.status(400).json({ msg: "Incorrect password." });
    }


    const token = jwt.sign({ id: user._id }, "passwordKey");
    if (user.role === 'admin') {
      console.log("Admin login successful");
      res.json({ msg: 'Admin login successful', token,role: 'admin', ...user._doc });
    } else {
      res.json({ msg: 'User login successful', token,role: 'user', ...user._doc });
      console.log("user login successful");
    }
    // res.json({ token, ...user._doc });
    console.log(res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

module.exports = authRouter;
