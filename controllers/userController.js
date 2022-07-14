const UserModel = require("../models/userModel");
const userValidator = require("../utils/userValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  async addUser(req, res, next) {
    const isValid = userValidator(req.body);
    if (isValid) {
      await UserModel.create(req.body)
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((err) => {
          err.statusCode = 400;
          next(err);
        });
    } else {
      const err = new Error("Invalid input data");
      err.statusCode = 400;
      return next(err);
    }
  }

  async getAllUsers(req, res, next) {
    await UserModel.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  async getUserById(req, res, next) {
    await UserModel.findOne({ id: req.params.id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  async updateUserById(req, res, next) {
    const isValid = userValidator(req.body);
    if (isValid) {
      await UserModel.findOneAndUpdate({ id: req.params.id }, req.body, {
        new: true,
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          err.statusCode = 400;
          next(err);
        });
    } else {
      const err = new Error("Invalid input data");
      err.statusCode = 400;
      return next(err);
    }
  }

  async deleteUserById(req, res, next) {
    await UserModel.findOneAndDelete({ id: req.params.id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  async login(req, res, next) {
    let user;
    if (req.body.email) {
      user = await UserModel.findOne({ email: req.body.email });
    } else if (req.body.phone) {
      user = await UserModel.findOne({ phone: req.body.phone });
    }
    if (!user) {
      const err = new Error("Unthorized user");
      err.statusCode = 401;
      return next(err);
    }
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) {
      const err = new Error("Unthorized user, invalid password");
      err.statusCode = 401;
      return next(err);
    }
    const token = await jwt.sign(
      { id: user._id, admin: user.admin },
      process.env.SECRET_KEY
    );
    res.header("x-auth-token", token);
    res.status(202).send(`hello ${user.name}`);
  }

  async getProfile(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
      const err = new Error("Access denied");
      err.statusCode = 401;
      return next(err);
    }
    const { id, admin } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(id);
    if (admin) {
      res.status(202).send(`welcome admin ${user.name}`);
    } else {
      res.status(202).send(`welcome user ${user.name}`);
    }
  }
}

module.exports = userController;
