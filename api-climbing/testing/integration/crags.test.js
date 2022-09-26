const request = require("supertest");
const { Crag } = require("../../models/cragModel");
const { User } = require("../../models/userModel");
const mongoose = require("mongoose");

describe("/api/crags", () => {
  let server;
  let token;
  let cragName;
  let cragLocation;
  let information;

  beforeEach(() => {
    server = require("../../index");
    token = new User().genAuthToken();
    cragName = "12345";
    information = "abcd";
    cragLocation = {
      lat: "12345",
      lng: "12345",
    };
  });
  afterEach(async () => {
    await Crag.deleteMany({});
    return server.close();
  });
  const exec = () => {
    return request(server).post("/api/crags").set("x-auth-token", token).send({
      cragName,
      cragLocation,
      information,
    });
  };

  describe("GET /", () => {
    it("should return a list of submitted crags", async () => {
      const crag = new Crag({
        cragName,
        cragLocation,
        information,
      });
      await crag.save();
      const res = await request(server).get("/api/crags/all");
      console.log(res.body);
      expect(res.body[0]).toHaveProperty("cragName");
    });
  });

  describe("POST /", () => {
    it("should return 200 if crag created", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("cragName");
    });
    it("should return 401 if user not authorised", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return 400 if cragName not correct", async () => {
      cragName = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if cragLocation not correct", async () => {
      cragLocation = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
