const { saveImage } = require('./helpers/s3Helper');
const { downloadImage, resizeImage } = require('./helpers/imageMagicHelper');

exports.handler = async (event) => {
  const imageBuffer = await downloadImage(event.url);
  const resized = await resizeImage(imageBuffer, 500, 500);
  const resObj = await saveImage(event.name, resized);
  return resObj;
};