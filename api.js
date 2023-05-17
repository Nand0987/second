const axios = require('axios');
async function detectFaces(imageUrl) {
  const apiURL = 'https://api-us.faceplusplus.com/facepp/v3/detect';
  const apiKey = '24ngYm1xwFpxkGPZ4Ravds1dRtkDP5VE';
  const apiSecret = '9ueKAQ7ZocxCOqjMxvywxeG6B8bnL0xB';

  try {
    const formData = new URLSearchParams();
    formData.append('api_key', apiKey);
    formData.append('api_secret', apiSecret);
    formData.append('image_url', imageUrl);

    const response = await axios.post(apiURL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        return_landmark: 1,
        return_attributes: 'gender,age'
      }
    });
    return response.data
    
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

module.exports.detectFaces=detectFaces;

