const router = require("express").Router();
const { Crag, validateCrag } = require("../models/cragModel");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const crags = await Crag.find();
  res.send(crags);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validateCrag(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const crag = new Crag({
    cragName: req.body.cragName,
    cragLocation: {
      lat: req.body.cragLocation.lat,
      lng: req.body.cragLocation.lng,
    },
    addedBy: req.user._id,
  });
  await crag.save();
  res.send(_.pick(crag, ["_id", "cragName"]));
});

module.exports = router;
