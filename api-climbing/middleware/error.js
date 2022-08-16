const winston = require("winston");

module.exports = (error, req, res) => {
  winston.error(error.message, error);
  res.status(500).send("Opps... Something hasn't quite worked");
};
