const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).send("Working");
});

module.exports = router;
