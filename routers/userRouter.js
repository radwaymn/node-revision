const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const user = new userController()

userRouter.get('/', user.getAllUsers);

userRouter.get('/:id', user.getUserById);

userRouter.post('/', user.addUser);

userRouter.put('/:id', user.updateUserById);

userRouter.delete('/:id', user.deleteUserById);

module.exports = userRouter;