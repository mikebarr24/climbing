const mongoose = require("mongoose");
const Joi = require("joi");

const routeSchema = new mongoose.Schema({
  routeName: String,
  routeGrade: String,
  routeDescription: String,
  routeRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  routeImageUrl: String,
  addedBy: mongoose.ObjectId,
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const sectorSchema = new mongoose.Schema({
  sectorName: String,
  sectorImageUrl: String,
  information: String,
  sectorLocation: {
    lat: Number,
    lng: Number,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  addedBy: mongoose.ObjectId,
  routes: [routeSchema],
  archived: {
    type: Boolean,
    default: false,
  },
});

const cragSchema = new mongoose.Schema({
  cragName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  information: {
    type: String,
    required: true,
    max: 4000,
    min: 3,
  },
  sectors: {
    type: [sectorSchema],
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
  archived: {
    type: Boolean,
    default: false,
  },
});
const Crag = mongoose.model("Crag", cragSchema);

const validateCrag = (crag) => {
  const schema = Joi.object({
    cragName: Joi.string().min(3).max(255).required(),
    information: Joi.string().min(3).max(4000).required(),
    cragLocation: {
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    },
  });
  return schema.validate(crag);
};

exports.Crag = Crag;
exports.validateCrag = validateCrag;
