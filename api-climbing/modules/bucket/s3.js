//Authenticating AWS Bucket access.

const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();
const awsBucketRegion = process.env.AWS_BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: awsBucketRegion,
});

module.exports = s3;
