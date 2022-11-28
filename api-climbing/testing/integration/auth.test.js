const request = require("supertest");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/userModel");

describe("/api/auth", () => {
  describe("POST /login", () => {
    let name = "Test";
    let email = "test@test.com";
    let password = "Test1234";
    let user;
    let server;
    beforeEach(async () => {
      server = require("../../index");
      const salt = await bcrypt.genSalt(10);
      user = new User({
        name,
        email,
        password,
      });
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
    });
    afterEach(async () => {
      await User.deleteMany();
      return server.close();
    });

    function exec() {
      return request(server).post("/api/auth/login").send({
        email,
        password,
      });
    }
    it("should return JSON web token", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it("should return 404 if email is wrong", async () => {
      email = "wrong@test.com";
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should return 404 if password is wrong", async () => {
      password = "WrongPassword123";
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /password", () => {
    let name = "Test";
    let email = "test@test.com";
    let password = "Test1234";
    let user;
    let server;
    beforeEach(async () => {
      server = require("../../index");
      const salt = await bcrypt.genSalt(10);
      user = new User({
        name,
        email,
        password,
      });
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
    });
    afterEach(async () => {
      await User.deleteMany();
      return server.close();
    });

    function exec() {
      return request(server).put("/api/auth/password").send({
        email,
        password,
      });
    }

    it("Should return 200 for password change", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toBe(true);
    });

    it("should return 401 if user not found", async () => {
      email = "wrong@test.com";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 401 if password not correct", async () => {
      password = "WrongPassword1234";
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });
});
