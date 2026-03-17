const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: 'process.env.TENCENT_SECRET_ID',
  SecretKey: 'process.env.TENCENT_SECRET_KEY',
});

cos.getService(function (err, data) {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
});
