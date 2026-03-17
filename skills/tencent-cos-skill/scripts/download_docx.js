const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');

const cos = new COS({
  SecretId: 'AKIDMZZLtMju42nJacRZT8XhcIkyUnrrRmri',
  SecretKey: 'f5KNCZibGjz1shU7XiiW7ViiT1MVdmna',
});

cos.getObject({
  Bucket: 't3-1409755229',
  Region: 'ap-guangzhou',
  Key: '人工智能教育-20251229.docx',
  Output: '/tmp/人工智能教育-20251229.docx',
}, function(err, data) {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Downloaded to /tmp/人工智能教育-20251229.docx');
    console.log('Size:', data.headers?.['content-length'], 'bytes');
  }
});
