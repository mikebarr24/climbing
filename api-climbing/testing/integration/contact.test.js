const { iteratee } = require("lodash");
const request = require("supertest");

describe("/api/contact", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
  });
  afterAll(() => {
    return server.close();
  });
  const exec = () => {
    return request(server).get("/api/crags");
  };
  describe("POST /", () => {
    it("should return status 200", async () => {
      expect(res.status).toBe(200);
    });
  });
});
