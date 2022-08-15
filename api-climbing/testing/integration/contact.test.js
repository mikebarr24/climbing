const request = require("supertest");
const nodemailer = require("nodemailer");
jest.mock("nodemailer");

describe("/api/contact", () => {
  let server;
  let name;
  let email;
  let message;
  beforeAll(() => {});
  beforeEach(() => {
    server = require("../../index");
    name = "abc";
    email = "abc@abc.com";
    message = "abcdefg";
  });
  afterEach(async () => {
    await server.close();
  });
  afterAll(async () => {});
  const exec = () => {
    return request(server).post("/api/contact").send({
      name,
      email,
      message,
    });
  };
  describe("POST /", () => {
    /*     it("should return status 200", async () => {
      const res = await exec();
      console.log(res.body);
      expect(res.status).toBe(200);
    }); */
    it("should return status 400 if name not present or long enough", async () => {
      name = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return status 400 if email not present or not long enough", async () => {
      email = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return status 400 if message not present or not long enough", async () => {
      message = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return status 400 if name too long", async () => {
      name = new Array(260).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
