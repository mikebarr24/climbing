const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

const db = () => {
  let connectionString;
  let connectedDB;
  if (process.env.NODE_ENV === "test") {
    connectedDB = "Test";
    connectionString = "mongodb://localhost:27017/climbingTest";
  } else {
    connectedDB = "Dev";
    connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/climbingDev?retryWrites=true&w=majority`;
  }
  mongoose
    .connect(connectionString)
    .then(() => {
      logger.info(`Connected to MongoDB (${connectedDB})`);
    })
    .catch((err) => infoLog(err));
};

module.exports = db;
