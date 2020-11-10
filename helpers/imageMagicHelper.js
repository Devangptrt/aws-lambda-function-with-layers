const GM = require('gm');
const gm = GM.subClass({ imageMagick: true });
const axios = require('axios');

exports.downloadImage = async (url) => {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(res.data, 'binary');
};

exports.resizeImage = async (imageBuffer, width, height) => {
  return new Promise((resolve, reject) => {
    gm(imageBuffer, width, height).resize(width, height).noProfile().toBuffer((err, buffer) => err ? reject(err) : resolve(buffer));
  });
};