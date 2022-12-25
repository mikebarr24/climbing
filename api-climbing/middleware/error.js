const logger = require("../startup/logger");

module.exports = (err, res) => {
  logger.error(err.message, err);
  res.status(500).send("Opps... Something hasn't quite worked");
};
