const mongoose = require("mongoose");
const { infoLog, errorLog } = require("./logger");

const db = () => {
  mongoose
    .connect(
      `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      infoLog("Connected to MongoDB");
    })
    .catch((err) => errorLog(err));
};

module.exports = db;
