const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: 'AKIDMZZLtMju42nJacRZT8XhcIkyUnrrRmri',
  SecretKey: 'f5KNCZibGjz1shU7XiiW7ViiT1MVdmna',
});

const files = [
  'root-files/小说《人工智能教育》产品概念整理.txt',
  'root-files/红尘灵境产品规划-基于小说融合.txt',
];

async function download(key) {
  return new Promise((resolve, reject) => {
    cos.getObject({
      Bucket: 't3-1409755229',
      Region: 'ap-guangzhou',
      Key: key,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Body.toString());
      }
    });
  });
}

async function main() {
  for (const f of files) {
    console.log('\n=== ' + f + ' ===\n');
    const content = await download(f);
    console.log(content);
  }
}

main();
