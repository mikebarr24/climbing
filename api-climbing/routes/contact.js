const router = require("express").Router();
const { sendMail, emailValidation } = require("../startup/sendMail");
const validator = require("../middleware/validate");

router.post("/", [validator(emailValidation)], (req, res) => {
  const message = {
    from: req.body.from,
    message: req.body.message,
  };
  sendMail(message);
  res.send("Email sent");
});

module.exports = router;
