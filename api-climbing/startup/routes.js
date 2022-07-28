const users = require("../routes/users");
const express = require("express");
const { errorReqLog } = require("../startup/logger");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use(errorReqLog);
};
