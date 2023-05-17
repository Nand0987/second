const sizeOf = require('image-size');
const axios = require('axios');

async function getImageDimensions(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const dimensions = sizeOf(buffer);
    return dimensions;
  } catch (error) {
    throw new Error('Failed to retrieve image dimensions.');
  }
}

module.exports.getImageDimensions=getImageDimensions
