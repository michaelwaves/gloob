const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://api.verbwire.com/v1/nft/mint/quickMintFromFile',
  headers: {
    accept: 'application/json',
    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
  },
  data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="allowPlatformToOperateToken"\r\n\r\ntrue\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="chain"\r\n\r\ngoerli\r\n-----011000010111000001101001--\r\n\r\n'
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });