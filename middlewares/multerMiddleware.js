const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3-transform');
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'plzzzz',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
      console.log(path.basename(file.originalname));
    },
  }),
});
module.exports = upload;
