const express = require('express');
const loginRouter = express.Router();
const userController = require('../controllers/userController');
const user = new userController()

loginRouter.post('/', user.login);

module.exports = loginRouter;