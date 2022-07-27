const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("./startup/routes")(app);
const {infoLog} = require('./startup/logger')

app.listen(port, () => {
  infoLog(`Listening on Port ${port}`)
});
