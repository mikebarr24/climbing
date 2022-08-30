const router = require("express").Router();
const { Crag, validateCrag } = require("../models/cragModel");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const crags = await Crag.find();
  res.send(crags);
});

router.post("/newcrag", [validate(validateCrag)], async (req, res) => {
  console.log(req.body);
  const crag = new Crag({
    cragName: req.body.cragName,
    cragLocation: {
      lat: req.body.cragLocation.lat,
      lng: req.body.cragLocation.lng,
    },
  });
  await crag.save();
  res.send(_.pick(crag, ["_id", "cragName"]));
});

module.exports = router;
