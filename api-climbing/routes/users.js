const router = require("express").Router();
const {User, validateUser} = require("../models/userModel")

router.get("/me", (req, res) => {
  res.send("user");
});

router.post('/', (req, res) => {
  const {error} = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  res.send("Got it!")
  console.log(user)
})

module.exports = router;
