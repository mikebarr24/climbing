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

  describe("GET /", () => {
    it("should return a list of submitted crags", async () => {
      const crag = new Crag({
        cragName,
        cragLocation,
        information,
      });
      await crag.save();
      const res = await request(server).get("/api/crags/all");
      expect(res.body[0]).toHaveProperty("cragName");
    });
  });

  describe("POST /", () => {
    const exec = () => {
      return request(server)
        .post("/api/crags/addcrag")
        .set("x-auth-token", token)
        .send({
          cragName,
          cragLocation,
          information,
        });
    };
    it("should return include property 'cragName' if crag created", async () => {
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

  describe("PUT /archiveSector", () => {
    let crag;
    let cragId;
    let sectorId;
    beforeEach(async () => {
      crag = new Crag({
        cragName,
        information,
        cragLocation,
      });
      crag.sectors.push({
        sectorName: "test",
        sectorLocation: cragLocation,
      });
      await crag.save();
      cragId = crag._id;
      sectorId = crag.sectors[0]._id;
    });
    afterEach(() => {
      Crag.deleteMany({});
    });
    const exec = () => {
      return request(server)
        .put("/api/crags/archiveSector")
        .set("x-auth-token", token)
        .send({ cragId, sectorId });
    };
    it("should return 200 if sector is removed", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it("should return 400 if incorrect sector not Object ID", async () => {
      sectorId = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("Sector Not Found");
    });
    it("should return 400 if incorrect crag not Object ID", async () => {
      cragId = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("Problem finding Crag or Sector");
    });
    it("should return 400 if incorrect crag Object ID", async () => {
      cragId = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("Crag Not Found");
    });
  });

  describe("PUT /archiveCrag", () => {
    let crag;
    let cragId;
    beforeEach(async () => {
      crag = new Crag({
        cragName,
        information,
        cragLocation,
      });
      await crag.save();
      cragId = crag._id;
    });
    afterEach(() => {
      Crag.deleteMany();
    });
    const exec = () => {
      return request(server)
        .put("/api/crags/archiveCrag")
        .set("x-auth-token", token)
        .send({ cragId });
    };
    it("should return 200 if crag is archived", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
