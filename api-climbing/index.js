const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("./startup/routes")(app);
<<<<<<< HEAD
const {infoLog} = require('./startup/logger')

app.listen(port, () => {
  infoLog(`Listening on Port ${port}`)
=======
const logger = require("./startup/logger")();

app.listen(port, () => {
  logger.info(`Listening on Port ${port}`);
>>>>>>> abf1da6693e56bf11924f329603e458d862dafe4
});
