const router = require("express").Router();
require("dotenv");

router.get("/maps", (req, res) => {
  if (process.env.NODE_ENV === "development") {
    return res.send("dev");
  } else if (process.env.NODE_ENV === "production") {
    return res.send(process.env.MAPS_API);
  }
});

module.exports = router;
