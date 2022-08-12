const request = require("supertest");

describe("/api/contact", () => {
  let from;
  let message;
  let server;
  beforeEach(async () => {
    server = require("../../index");
    from = "abcd@abcd.com";
    message = "abcde123";
  });
  afterEach(() => {
    server.close();
  });
  const exec = () => {
    return request(server).post("/api/contact").send({
      from,
      message,
    });
  };
  describe("POST /", () => {
    it("should return 200", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});