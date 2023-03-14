//Set up middleware to pull image files from a frontend request.

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
