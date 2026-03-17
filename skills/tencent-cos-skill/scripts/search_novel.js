const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: 'process.env.TENCENT_SECRET_ID',
  SecretKey: 'process.env.TENCENT_SECRET_KEY',
});

async function listAll(marker = '') {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: 't3-1409755229',
      Region: 'ap-guangzhou',
      Prefix: '人工智能教育20251229',
      MaxKeys: 1000,
      Marker: marker,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function main() {
  console.log('=== 搜索: 人工智能教育20251229 ===\n');
  
  const data = await listAll();
  const files = data.Contents || [];
  
  console.log(`找到 ${files.length} 个文件:\n`);
  
  files.forEach(f => {
    const sizeKB = (parseInt(f.Size) / 1024).toFixed(1);
    console.log(`📄 ${f.Key} (${sizeKB} KB)`);
  });
}

main();
