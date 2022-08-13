const router = require("express").Router();
const Joi = require("joi");
const validate = require("../middleware/validate");

validateMessage = (message) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    message: Joi.string().min(3).max(4000).required(),
  });
  return schema.validate(message);
};

router.post("/", validate(validateMessage), (req, res) => {
  const inbound = req.body;
  console.log(inbound);
  return res.status(200).send({
    success: "Thank you. Your message has been sent",
  });
});

module.exports = router;
