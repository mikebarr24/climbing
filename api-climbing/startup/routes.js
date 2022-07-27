const users = require("../routes/users");
const express = require("express");
const {errorLog} =require('../startup/logger')

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use(errorLog)
};
