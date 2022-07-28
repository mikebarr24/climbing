const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 255,
    min: 3,
    required: true,
  },
  email: {
    type: String,
    max: 255,
    min: 3,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    max: 1024,
    min: 8,
    required: true,
  },
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean()
  });
  return schema.validate(user);
};

exports.validateUser = validateUser;
exports.User = User;
