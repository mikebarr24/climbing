const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

const db = () => {
  let connectionString;
  let connectedDB;
  if (process.env.ENVIRONMENT === "test") {
    connectedDB = "Test";
    connectionString = "mongodb://localhost:27017/climbingTest";
  } else if (process.env.ENVIRONMENT === "development") {
    connectedDB = "Dev";
    connectionString = "mongodb://db_climbing/climbingDev";
  } else {
    connectedDB = "Prod";
    connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/climbingDev?retryWrites=true&w=majority`;
  }

  mongoose
    .connect(connectionString)
    .then(() => {
      logger.info(`Connected to MongoDB (${connectedDB})`);
    })
    .catch((err) => logger.error(err));
};

module.exports = db;
