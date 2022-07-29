const mongoose = require("mongoose");
const Joi = require("joi");

const cragSchema = new mongoose.Schema({
  cragName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  cragLocation: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  addedBy: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const Crag = mongoose.model("Crag", cragSchema);

const validateCrag = (crag) => {
  const schema = Joi.object({
    cragName: Joi.string().min(3).max(255).required(),
    cragLocation: {
      lat: Joi.string().required(),
      lng: Joi.string().required(),
    },
  });
  return schema.validate(crag);
};

exports.Crag = Crag;
exports.validateCrag = validateCrag;
