const users = require("../routes/users");
const crags = require("../routes/crags");
const express = require("express");
const { errorReqLog } = require("../startup/logger");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/crags", crags);
  app.use(errorReqLog);
};
