const express = require('express');
const profileRouter = express.Router();
const userController = require('../controllers/userController');
const user = new userController();

profileRouter.get('/', user.getProfile);

module.exports = profileRouter;