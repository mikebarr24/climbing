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

router.get("/:cragId", async (req, res) => {
  const crag = await Crag.findById(req.params.cragId);
  if (!crag) return res.status(400).send(`The crag cannot be found`);
  try {
    return res.send(crag);
  } catch (error) {
    logger.error(error);
  }
});

router.post("/addcrag", [validate(validateCrag), auth], async (req, res) => {
  const data = req.body;
  const existingCrag = await Crag.findOne({ cragName: data.cragName.trim() });
  if (existingCrag) return res.status(400).send("Crag Name Already Exists");
  const crag = new Crag({
    cragName: data.cragName.trim(),
    information: data.information.trim(),
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
  const crag = await Crag.findById(req.body.currentCragId);
  if (!crag) return res.status(400).send("Crag cannot be found");
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

router.post("/addroute", auth, async (req, res) => {
  const {
    routeName,
    routeGrade,
    routeInformation,
    routeRating,
    currentCrag,
    currentSector,
  } = req.body;
  const crag = await Crag.findOne({ _id: currentCrag });
  const sector = crag.sectors.id(currentSector);
  sector.routes.push({
    routeName,
    routeGrade,
    routeInformation,
    routeRating,
  });
  await crag.save();
  res.send("Route Added");
});

router.put("/archiveSector", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).send("Not Authorised");
  const { cragId, sectorId } = req.body;
  try {
    const crag = await Crag.findById({ _id: cragId });
    if (!crag) return res.status(400).send("Crag Not Found");
    const sector = crag.sectors.id(sectorId);
    if (!sector) return res.status(400).send("Sector Not Found");
    sector.archived = true;
    await crag.save();
  } catch (error) {
    return res.status(400).send("Problem finding Crag or Sector");
  }
  res.send("Sector Archived");
});

router.put("/archiveCrag", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).send("Not Authorised");
  const { cragId } = req.body;
  try {
    await Crag.findByIdAndUpdate({ _id: cragId }, { archived: true });
  } catch (error) {
    return res.status(400).send("Problem finding Crag");
  }
  res.send("Crag Archived");
});

router.put("/crag/routes", async (req, res) => {
  console.log(req.body);
  const crag = await Crag.findById(req.body.cragId);
  if (!crag) return res.status(400).send(`The crag cannot be found`);
  const sector = crag.sectors.id(req.body.sectorId);
  if (!sector) return res.status(400).send(`The sector cannot be found`);
  try {
    return res.send(sector.routes);
  } catch (error) {
    logger.error(error);
  }
});

module.exports = router;
