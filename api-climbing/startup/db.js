const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const logger = require("./logger");
require("dotenv").config();

const db = () => {
  let connectionString;
  let connectedDB;
  if (process.env.NODE_ENV === "test") {
    connectedDB = "Testing";
    connectionString = "mongodb://localhost:27017/climbingTest";
  } else if (process.env.NODE_ENV === "development") {
    connectedDB = "Local Development";
    connectionString = "mongodb://db_climbing/climbingDev";
  } else {
    connectedDB = "Production";
    connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/climbingProd?retryWrites=true&w=majority`;
  }

  mongoose
    .connect(connectionString)
    .then(() => {
      logger.info(`Connected to MongoDB (${connectedDB})`);
    })
    .catch((err) => logger.error(err));
};

module.exports = db;
