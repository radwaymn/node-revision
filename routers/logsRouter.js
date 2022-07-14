const express = require("express");
const logsRouter = express.Router();
const adminAuthentication = require("../middlewares/adminAuthentication");
const fs = require("fs");
const path = require("path");

logsRouter.get("/", adminAuthentication, (req, res) => {
  const logs = fs.readFileSync(path.join(__dirname, "../access.log")).toString();
  res.send(logs);
});

module.exports = logsRouter;