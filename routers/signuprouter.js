// routes/signuprouter.js
const express = require('express');
const signupRouter = express.Router();
const signupController = require('../controller/signup.controller');

signupRouter.post('api/signup', signupController.signup);

module.exports = signupRouter;
