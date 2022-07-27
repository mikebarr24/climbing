const {createLogger, transports} = require('winston')

const winstonOptions = {
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