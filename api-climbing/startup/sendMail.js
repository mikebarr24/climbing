const nodemailer = require("nodemailer");
require("dotenv").config();
const Joi = require("joi");

const emailValidation = (email) => {
  const schema = Joi.object({
    from: Joi.string().min(3).max(255).email().required(),
    message: Joi.string().min(3).required(),
  });
  return schema.validate(email);
};

const sendMail = async (message) => {
  let mailConfig;
  if (process.env.NODE_ENV === "test") {
    mailConfig = {
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: process.env.TEST_EMAIL,
        pass: process.env.TEST_PASS,
      },
    };
  } else {
    mailConfig = {
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    };
  }
  transporter = nodemailer.createTransport(mailConfig);
  const mailOptions = {
    from: `"Climbing " <${process.env.EMAIL}>`, // sender address (who sends)
    to: `${process.env.EMAIL}`, // list of receivers (who receives)
    subject: "From Climbing ", // Subject line
    html: `<b>From: ${message.from}</b><br /><br />${message.message}`, // html body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

exports.sendMail = sendMail;
exports.emailValidation = emailValidation;
