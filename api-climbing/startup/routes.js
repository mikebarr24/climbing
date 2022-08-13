const users = require("../routes/users");
const crags = require("../routes/crags");
const contact = require("../routes/contact");
const error = require("../middleware/error");
const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/users", users);
  app.use("/api/crags", crags);
  app.use("/api/contact", contact);
  app.use(error);
};
