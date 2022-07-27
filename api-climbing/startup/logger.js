const {createLogger, format, transports} = require('winston')
const {combine, printf, prettyPrint, colorize, timestamp} = format
const myFormat = printf(({level, message, timestamp})=> {
    return `${timestamp} [${level}: ${message}]`
})


const winstonOptions = {
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console()
    ]
}

const logger = createLogger(winstonOptions)

const infoLog = (info)=> {
    logger.add(new transports.File({filename: "info.log"}))
    logger.info(info)
}

const errorLog = (err, req, res, next) => {
    logger.add(new transports.File({filename: "error.log"}))
    logger.error(err.message)
    res.status(500).send("Opps! Something went wrong")
    next()
}

module.exports = {infoLog, errorLog}