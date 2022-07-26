const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("./startup/routes")(app);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
