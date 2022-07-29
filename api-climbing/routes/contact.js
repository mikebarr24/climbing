const router = require("express").Router();
const sendMail = require("../startup/sendMail");

router.post("/", (req, res) => {
  const message = {
    from: req.body.from,
    message: req.body.message,
  };
  sendMail(message);
  res.send("Email sent");
});

module.exports = router;
