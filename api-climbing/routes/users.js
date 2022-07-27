const router = require("express").Router();

router.get("/me", (req, res) => {
  throw new Error("Oh shit!")
  res.send("user");
});

module.exports = router;
