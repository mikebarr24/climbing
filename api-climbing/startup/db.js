const mongoose = require("mongoose");
const { infoLog, errorLog } = require("./logger");

const db = () => {
  let connectionString;
  let connectedDB;
  if (process.env.NODE_ENV === "test") {
    connectedDB = "Test";
    connectionString = "mongodb://localhost:27017/climbingTest";
  } else {
    connectedDB = "Dev";
    connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/?retryWrites=true&w=majority`;
  }
  mongoose
    .connect(connectionString)
    .then(() => {
      infoLog(`Connected to MongoDB (${connectedDB})`);
    })
    .catch((err) => errorLog(err));
};

module.exports = db;
