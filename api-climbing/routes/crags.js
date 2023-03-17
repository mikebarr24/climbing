const router = require("express").Router();
const mongoose = require("mongoose");
const { Crag, validateCrag, Sector } = require("../models/cragModel");
const { User } = require("../models/userModel");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const _ = require("lodash");
const logger = require("../startup/logger");
const sendToBucket = require("../modules/bucket/sendToBucket");
const getUrl = require("../modules/bucket/getUrl");
const upload = require("../middleware/upload");
const randomFilename = require("../startup/randomFilename");
const jimp = require("../modules/jimp");

router.get("/all", async (req, res) => {
  const crags = await Crag.find();
  try {
    res.send(crags);
  } catch (error) {
    logger.error(error);
  }
});

//Get Signed filename for image on AWS Bucket
router.get("/images/:folder/:fileName", async (req, res) => {
  const folder = req.params.folder;
  const fileName = req.params.fileName;
  if (!fileName || !folder)
    return res.status(400).send("Folder or Filename not supplied");
  try {
    const url = await getUrl(`${folder}/${fileName}`);
    res.send(url);
  } catch (error) {
    logger.error(error);
  }
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

router.post("/addcrag", [validate(validateCrag), auth], async (req, res) => {
  const data = req.body;
  const existingCrag = await Crag.findOne({ cragName: data.cragName.trim() });
  if (existingCrag) return res.status(400).send("Crag Name Already Exists");
  const cragId = mongoose.Types.ObjectId();
  const crag = new Crag({
    _id: cragId,
    cragName: data.cragName.trim(),
    information: data.information.trim(),
    cragLocation: data.cragLocation,
  });
  try {
    const response = await crag.save();
    res.send(response);
    await User.updateMany(
      {},
      {
        $push: {
          notifications: {
            objectId: cragId,
            title: data.cragName.trim(),
            description: data.information.trim(),
            type: "crag",
            parent: crag.cragName,
          },
        },
      }
    );
  } catch (error) {
    logger.error(error);
  }
});

router.post("/addsector", [auth, upload.single("file")], async (req, res) => {
  const crag = await Crag.findOne({ cragName: req.body.currentCrag });
  if (!crag) return res.status(400).send("Crag cannot be found");

  //Sends file to AWS bucket
  let uniqueFilename;
  if (req.file) {
    uniqueFilename = randomFilename();
    try {
      const resize = await jimp(req.file.buffer);
      await sendToBucket(resize, uniqueFilename, "sectors", req.file.mimetype);
    } catch (error) {
      console.log("here", error);
    }
  }

  //Creates Database entry for route
  const sectorId = mongoose.Types.ObjectId();
  const newSector = {
    _id: sectorId,
    sectorName: req.body.sectorName,
    sectorLocation: {
      lat: req.body.sectorLocationLat,
      lng: req.body.sectorLocationLng,
    },
    information: req.body.information,
    sectorImageName: uniqueFilename,
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

  //Sends Sector to Notificatinons
  try {
    await User.updateMany(
      {},
      {
        $push: {
          notifications: {
            objectId: sectorId,
            title: req.body.sectorName,
            parent: `${crag.cragName}/${newSector.sectorName}`,
            description: req.body.information,
            type: "sector",
          },
        },
      }
    );
  } catch (error) {
    logger.error(error);
  }
});

router.post("/addroute", upload.single("file"), async (req, res) => {
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

  //Sends file to AWS bucket
  const uniqueFilename = randomFilename();
  try {
    const resize = await jimp(req.file.buffer);
    sendToBucket(resize, uniqueFilename, "routes", req.file.mimetype);
  } catch (error) {
    logger.error(error);
  }

  //Creates Database entry for route
  const routeId = mongoose.Types.ObjectId();
  sector.routes.push({
    _id: routeId,
    routeName,
    routeGrade,
    routeDescription,
    routeRating,
    routeImageName: uniqueFilename,
  });
  try {
    await crag.save();
    res.send(sector);
  } catch (error) {
    logger.error(error);
  }

  //Sends Route to Notificatinons
  try {
    await User.updateMany(
      {},
      {
        $push: {
          notifications: {
            objectId: routeId,
            title: routeName,
            parent: `${crag.cragName}/${sector.sectorName}`,
            description: routeDescription,
            type: "route",
          },
        },
      }
    );
  } catch (error) {
    logger.error(error);
  }
});

router.put("/archiveSector", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).send("Not Authorised");
  const { cragName, sectorName } = req.body;
  const crag = await Crag.findOne({ cragName: cragName });
  if (!crag) return res.status(400).send("Crag Not Found");
  const [sector] = crag.sectors.filter(
    (item) => item.sectorName === sectorName
  );
  if (!sector) return res.status(400).send("Sector Not Found");
  sector.archived = true;
  try {
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
    res.send("Crag Archived");
  } catch (error) {
    return res.status(400).send("Problem finding Crag");
  }
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
    logger.error(error);
  }
});

router.post("/removeNotification", async (req, res) => {
  const user = await User.findById(req.body.userId);
  let notToRemove;
  user.notifications.filter((item, index) => {
    item._id === req.body.notificationId;
    notToRemove = index;
  });
  user.notifications.splice(notToRemove, 1);
  try {
    user.save();
    res.send(user.notifications);
  } catch (error) {
    logger.error(error);
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
