// routes/userloginrouter.js
const express = require('express');
const userLoginRouter = express.Router();
const userLoginController = require('../controller/userlogin.controller');

userLoginRouter.post('/api/userlogin', userLoginController.login);

module.exports = userLoginRouter;
