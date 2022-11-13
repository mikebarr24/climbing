const router = require("express").Router();
const Joi = require("joi");
require("dotenv").config();
const validate = require("../middleware/validate");
const nodemailer = require("nodemailer");
const logger = require("../startup/logger");

validateMessage = (message) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    message: Joi.string().min(3).max(4000).required(),
  });
  return schema.validate(message);
};

const sendMail = async (contactForm) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.TEST_PASS,
    },
  });
  const response = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: process.env.EMAIL, // list of receivers
    subject: "ClimbingNI New Message", // Subject line
    html: `<b>Name: ${contactForm.name}</b>
      <br />
      <b>Email: ${contactForm.email}</b>
      <p>${contactForm.message}</p>
      <br />
      `,
  });
  console.log("Message sent: %s", response.messageId);
};

router.post("/", validate(validateMessage), async (req, res) => {
  try {
    await sendMail(req.body);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      error: "Opps... Something went wrong",
    });
  }
  return res.status(200).send({
    success: "Thank you. Your message has been sent",
  });
});

module.exports = router;
