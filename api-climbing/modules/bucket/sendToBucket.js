//Send object/file to AWS bucket

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3");
require("dotenv").config();

const awsBucketName = process.env.AWS_BUCKET_NAME;

//file - file to be sent
//filename - filename object will be saved as
//folder - folder in AWS bucket
//file - type of file being sent

const sendToBucket = async (file, filename, folder, type) => {
  if (!folder || !file || !filename || !type) {
    throw new Error("Args not Complete");
  }

  const params = {
    Bucket: awsBucketName,
    Key: `${folder}/${filename}`,
    Body: file,
    ContentType: type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
};

module.exports = sendToBucket;
