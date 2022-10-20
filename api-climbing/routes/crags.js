const router = require("express").Router();
const { Crag, validateCrag } = require("../models/cragModel");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const _ = require("lodash");
const logger = require("../startup/logger");

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

router.post("/addcrag", [validate(validateCrag), auth], async (req, res) => {
  const data = req.body;
  const crag = new Crag({
    cragName: data.cragName,
    information: data.information,
    sectors: [],
    cragLocation: data.cragLocation,
  });
  try {
    const response = await crag.save();
    res.send(response);
  } catch (error) {
    logger.error(error);
  }
});

router.post("/addsector", auth, async (req, res) => {
  const crag = await Crag.findOne({ cragName: req.body.currentCrag });
  crag.sectors.push({
    sectorName: req.body.sectorName,
    sectorLocation: req.body.sectorLocation,
    information: req.body.information,
  });
  try {
    await crag.save();
    res.send(crag);
  } catch (error) {
    logger.error(error);
  }
});

router.post("/addroute", async (req, res) => {
  const data = req.body;
  const crag = await Crag.findOne({ _id: data.currentCrag });
  const sectors = crag.sectors[0]._id;
  console.log(sectors);
  res.send("done");
});

module.exports = router;
