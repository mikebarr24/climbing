const router = require("express").Router();
require("dotenv");

router.get("/maps", (req, res) => {
  if (process.env.ENVIRONMENT === "development") {
    return res.send("dev");
  } else if (process.env.ENVIRONMENT === "production") {
    return res.send(process.env.MAPS_API);
  }
});

module.exports = router;
