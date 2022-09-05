const { createLogger, format, transports } = require("winston");
const { combine, printf, prettyPrint, colorize, timestamp } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}: ${message}]`;
});

const winstonOptions = {
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({ filename: "info.log" }),
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
};

const logger = createLogger(winstonOptions);

module.exports = logger;
