const express = require("express");
const mainRouter = express.Router();

mainRouter.get("/", (req, res, next) => {
  res.send("Hello World");
  next();
});

module.exports = mainRouter;
