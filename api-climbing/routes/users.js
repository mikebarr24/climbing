const router = require("express").Router();

router.get("/me", (req, res) => {
  res.send("user");
});

module.exports = router;
