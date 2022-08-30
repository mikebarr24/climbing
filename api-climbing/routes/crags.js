const router = require("express").Router();
const { Crag, validateCrag } = require("../models/cragModel");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const _ = require("lodash");

router.get("/all", async (req, res) => {
  const crags = await Crag.find();
  res.send(crags);
});

router.get("/:cragName", async (req, res) => {
  const crag = await Crag.findOne({ cragName: req.params.cragName });
  if (!crag)
    return res
      .status(400)
      .send(`The crag ${req.params.cragName} cannot be found`);
  res.send(crag);
});

router.post("/newcrag", [auth, validate(validateCrag)], async (req, res) => {
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
