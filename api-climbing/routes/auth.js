const router = require("express").Router();
const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User or password is incorrect.");
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(404).send("User or password is incorrect.");
  const token = user.genAuthToken();
  res.send(token);
});

router.put("/password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("No User Found");
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(404).send("Password is not correct");
  res.send(true);
});

module.exports = router;
