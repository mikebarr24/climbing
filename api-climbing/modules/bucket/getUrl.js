const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3");
require("dotenv").config();
const awsBucketName = process.env.AWS_BUCKET_NAME;

const getUrl = async (getObject) => {
  const command = new GetObjectCommand({
    Bucket: awsBucketName,
    Key: getObject,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

module.exports = getUrl;
