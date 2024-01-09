const express = require("express");
const crypto = require('crypto');
const User = require("../model/user");
const Admin = require('../model/admin');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


// Sign Up
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password,gender,dob,post,contact,policeStation } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists!" });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    let user = new User({
      email,
      password: hashedPassword,
      name,
      gender,
      dob,
      post,
      contact,
      policeStation
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
    const { phoneNumber, password } = req.body;

    const admin = await Admin.findOne({ contact: phoneNumber });
     console.log("admin password before");

    if (admin && password === admin.password) {
      console.log("admin password");
      console.log(admin);
      console.log(admin.password);
      // Admin login successful
      const token = jwt.sign({ id: admin._id, isAdmin: true }, "passwordKey");
      res.json({ token, ...admin._doc });
      console.log('Admin login 1 successful');
      return;
    }

 console.log("admin password after");



    const user = await User.findOne({ contact: phoneNumber });
    
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this Mobile Number does not exist!" });
    }
    

    const isMatch = crypto.createHash('sha256').update(password).digest('hex');
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }


    






    
    const token = jwt.sign({ id: user._id }, "passwordKey");
     console.log("admin token");
    if (user.role === 'admin') {
      console.log("Admin login 2 successful");
      res.json({ msg: 'Admin login successful', token,role: 'admin', ...user._doc });
    } else {
      res.json({ msg: 'User login successful', token,role: 'user', ...user._doc });
      console.log("user login 3 successful");
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
