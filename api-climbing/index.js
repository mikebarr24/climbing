const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("./startup/routes")(app);
const logger = require("./startup/logger")();

app.listen(port, () => {
  logger.info(`Listening on Port ${port}`);
});
