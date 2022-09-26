//process.env.NODE_ENV = "development";
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const logger = require("./startup/logger");
require("dotenv").config();
require("./startup/routes")(app);
require("./startup/db")();

const server = app.listen(port, () => {
  logger.info(`Listening on Port ${port}`);
});

module.exports = server;
