const { User } = require("../../models/userModel");
const request = require("supertest");
const mongoose = require("mongoose");

describe("api/users", () => {
  let name;
  let email;
  let password;
  let server;

  beforeEach(async () => {
    server = require("../../index");
    name = "12345";
    email = "abcde@abcde.com";
    password = "12345678";
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });
  const exec = () => {
    return request(server).post("/api/users").send({
      name,
      email,
      password,
    });
  };
  describe("POST /", () => {
    it("should return response 200 if saved correctly", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it("should return response 400 issue with name", async () => {
      name = "aa";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return response 400 issue with email", async () => {
      email = "aaa";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return response 400 issue with password. Not 8 chars", async () => {
      password = "123";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return response 400 if email already exists", async () => {
      const newUser = new User({
        name: "12345",
        email,
        password,
      });
      await newUser.save();
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should generate auth token for user login", async () => {
      const res = await exec();
      expect(res.header["x-auth-token"]).not.toBeUndefined();
    });
  });
});
