const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv");

const notificationsSchema = new mongoose.Schema({
  objectId: {
    type: mongoose.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  type: {
    type: String,
    required: true,
    max: 10,
    min: 1,
  },
  parent: {
    type: String,
    required: false,
    max: 255,
    min: 1,
  },
  viewed: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  notifications: {
    type: [notificationsSchema],
  },
});

userSchema.methods.genAuthToken = function (admin) {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: admin ? true : this.isAdmin,
    },
    process.env.JWT_CLIMBING_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean(),
    notifications: Joi.ObjectId(),
  });
  return schema.validate(user);
};

exports.validateUser = validateUser;
exports.User = User;
