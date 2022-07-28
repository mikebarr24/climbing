const router = require("express").Router();
const {User, validateUser} = require("../models/userModel")

router.get("/me", (req, res) => {
  res.send("user");
});

router.post('/', async (req, res) => {
  const {error} = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({email:req.body.email})
  if (user) {return res.status(400).send("Email already exists")}

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  })
  await newUser.save()
  res.send("Got it!")
})

module.exports = router;
