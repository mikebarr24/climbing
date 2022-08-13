const winston = require("winston");

module.exports = (err, req, res) => {
  winston.error(err.message, err);
  res.status(500).send("Opps... Something hasn't quite worked");
};
