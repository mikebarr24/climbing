const router = require("express").Router();
require("dotenv");

router.get("/maps", (req, res) => {
  res.send(process.env.MAPS_API);
});

module.exports = router;
