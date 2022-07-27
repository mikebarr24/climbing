require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("./startup/routes")(app);
const {infoLog} = require('./startup/logger')
require("./startup/db")()

app.listen(port, () => {
  infoLog(`Listening on Port ${port}`)
});
