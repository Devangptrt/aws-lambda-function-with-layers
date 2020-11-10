const FileType = require('file-type');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.saveImage = async (imageName, buffer) => {
  const contentType = await FileType.fromBuffer(buffer);
  const key = `${imageName}.${contentType.ext}`;
  await s3.putObject({
    ACL: 'public-read',
    Bucket: process.env.IMAGES_BUCKET,
    Key: key,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: contentType.mime,
  }).promise();
  return { imageName: key };
}