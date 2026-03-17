const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: 'AKIDMZZLtMju42nJacRZT8XhcIkyUnrrRmri',
  SecretKey: 'f5KNCZibGjz1shU7XiiW7ViiT1MVdmna',
});

cos.getService(function (err, data) {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
});
