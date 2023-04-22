const router = require("express").Router();
const { User, validateUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const logger = require("../startup/logger");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Email already exists");
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();

  const token = newUser.genAuthToken();
  logger.info(`User ${newUser._id} created`);
  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(newUser, ["_id", "name", "email"]));
});

router.put("/update", auth, async (req, res) => {
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck && emailCheck.email !== req.user.email) {
    return res.status(400).send("Email already exists.");
  }
  const user = await User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  }).select("-password");
  res.send(user);
});

router.put("/password", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(req.body.originalPassword, user.password);
  console.log(match);
  if (!match) return res.status(400).send("Wrong Password");
  const same = await bcrypt.compare(req.body.newPassword, user.password);
  if (same) return res.status(400).send("Can't use the same password");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.newPassword, salt);
  user.save();
  res.send("Password Changed");
});

router.post("/setImage", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("User Not Found");
});

module.exports = router;
