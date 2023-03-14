const Jimp = require("jimp");

const jimp = async (image) => {
  try {
    const file = await Jimp.read(image);
    return await file
      .resize(300, Jimp.AUTO)
      .quality(60)
      .getBufferAsync(Jimp.MIME_JPEG);
  } catch (error) {
    console.log("jimp", error);
  }
};
module.exports = jimp;
