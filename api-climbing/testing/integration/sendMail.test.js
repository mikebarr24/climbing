const request = require("supertest");
const logger = require("../../startup/logger");

const sendMailMock = jest.fn().mockReturnValue(200);
jest.mock("nodemailer");
const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

describe("/api/contact", () => {
  let from;
  let message;
  let server;
  beforeEach(async () => {
    server = require("../../index");
    from = "abcd@abcd.com";
    message = "abcde123";
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
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
  describe("post /", () => {
    it("should return 200", async () => {
      const res = await exec();
      console.log(res.body);
    });
  });
});
