const router = require("express").Router();
const { sendMail, emailValidation } = require("../startup/sendMail");

router.post("/", (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const message = {
    from: req.body.from,
    message: req.body.message,
  };
  sendMail(message);
  res.send("Email sent");
});

module.exports = router;
