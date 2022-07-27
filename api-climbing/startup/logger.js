const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]:  ${message}`;
});

module.exports = () => {
  return (logger = createLogger({
    format: combine(
      timestamp(),
      format.colorize(),
      format.prettyPrint(),
      myFormat
    ),
    level: "info",
    transports: [
      new transports.File({ filename: "log.log" }),
      new transports.Console({ colorize: true, prettyPrint: true }),
    ],
    exceptionHandlers: [
      new transports.File({ filename: "exceptions.log" }),
      new transports.Console({ colorize: true, prettyPrint: true }),
    ],
    rejectionHandlers: [
      new transports.File({ filename: "rejections.log" }),
      new transports.Console({ colorize: true, prettyPrint: true }),
    ],
  }));
};
