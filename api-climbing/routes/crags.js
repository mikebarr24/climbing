const router = require("express").Router();
const { Crag, validateCrag, Sector } = require("../models/cragModel");
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
  if (!crag) return res.status(400).send(`The crag cannot be found`);
  try {
    return res.send(crag);
  } catch (error) {
    logger.error(error);
  }
});

router.get("/:cragName/:sectorName", async (req, res) => {
  const crag = await Crag.findOne({ cragName: req.params.cragName });
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
  if (!crag) return res.status(400).send("Crag cannot be found");
  const newSector = {
    sectorName: req.body.sectorName,
    sectorLocation: req.body.sectorLocation,
    information: req.body.information,
  };
  const [currentSector] = crag.sectors.filter(
    (item) => item.sectorName === newSector.sectorName
  );
  if (currentSector) return res.status(400).send("Sector already exists.");
  crag.sectors.push(newSector);
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
    routeDescription,
    routeRating,
    currentCrag,
    currentSector,
  } = req.body;
  const crag = await Crag.findOne({ cragName: currentCrag });
  const [sector] = crag.sectors.filter(
    (item) => item.sectorName === currentSector
  );
  const [route] = sector.routes.filter((item) => item.routeName === routeName);
  if (route) return res.status(400).send("Route Name Already Exists");
  sector.routes.push({
    routeName,
    routeGrade,
    routeDescription,
    routeRating,
  });
  await crag.save();
  res.send(sector);
});

router.put("/archiveSector", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).send("Not Authorised");
  const { cragName, sectorName } = req.body;
  try {
    const crag = await Crag.findOne({ cragName: cragName });
    if (!crag) return res.status(400).send("Crag Not Found");
    const [sector] = crag.sectors.filter(
      (item) => item.sectorName === sectorName
    );
    if (!sector) return res.status(400).send("Sector Not Found");
    sector.archived = true;
    await crag.save();
    res.send(crag);
  } catch (error) {
    return res.status(400).send("Problem finding Crag or Sector");
  }
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

router.put("/archiveRoute", async (req, res) => {
  const crag = await Crag.findOne({ cragName: req.body.cragName });
  if (!crag) return res.status(400).send("Crag Not Found");
  const [sector] = crag.sectors.filter(
    (item) => item.sectorName === req.body.sectorName
  );
  if (!sector) return res.status(400).send("Sector Not Found");
  const [route] = sector.routes.filter(
    (item) => item.routeName === req.body.routeName
  );
  if (!route) return res.status(400).send("Sector Not Found");
  route.archived = true;
  try {
    await crag.save();
    res.send(sector);
  } catch (error) {
    console.log(error);
  }
});

router.put("/crag/routes", async (req, res) => {
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
