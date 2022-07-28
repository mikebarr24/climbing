const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const {infoLog} = require('./startup/logger')
require('dotenv').config()
require("./startup/routes")(app);
require("./startup/db")()

app.listen(port, () => {
  infoLog(`Listening on Port ${port}`)
});
