const mongoose = require("mongoose");
require("dotenv").config();

describe("MongoDB connection", () => {
  let connection;
  let error;
  let connectionString = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/climbingDev?retryWrites=true&w=majority`;
  afterEach(async () => {
    mongoose.connection.close();
    connection = null;
  });
  it("should connect to mongoDB service", async () => {
    connection = await mongoose.connect(connectionString);
    expect(connection.connections).not.toBe(null);
  });
  it("should return error if connection is unsuccessful", async () => {
    connectionString = `admin:${process.env.MONGO_PASSWORD}@climbing.p5ug7c5.mongodb.net/climbingDev?retryWrites=true&w=majority`;
    try {
      connection = await mongoose.connect(connectionString);
    } catch (err) {
      error = err;
    }
    expect(connection).toBe(null);
    expect(error).not.toBe(null);
  });
});
