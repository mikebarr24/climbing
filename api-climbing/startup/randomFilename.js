const crypto = require("crypto");

const randomFilename = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = randomFilename;
