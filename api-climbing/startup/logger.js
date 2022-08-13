const { createLogger, format, transports } = require("winston");
const { combine, printf, prettyPrint, colorize, timestamp } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}: ${message}]`;
});

const winstonOptions = {
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console()],
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

const infoLog = (info) => {
  logger.add(new transports.File({ filename: "info.log" }));
  logger.info(info);
};

const errorLog = (err) => {
  logger.add(new transports.File({ filename: "error.log" }));
  logger.error(err.message);
};

const errorReqLog = (err, req, res, next) => {
  logger.add(new transports.File({ filename: "error.log" }));
  logger.error(err.message);
  res.status(500).send("Opps! Something went wrong");
  next();
};

module.exports = { infoLog, errorReqLog, errorLog, logger };
