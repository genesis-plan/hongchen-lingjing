const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: 'AKIDMZZLtMju42nJacRZT8XhcIkyUnrrRmri',
  SecretKey: 'f5KNCZibGjz1shU7XiiW7ViiT1MVdmna',
});

const buckets = [
  { name: 'hclj-1409755229', region: 'ap-guangzhou' },
  { name: 't3-1409755229', region: 'ap-guangzhou' },
  { name: 'h3-1409755229', region: 'ap-guangzhou' },
];

async function listBucket(bucket, region) {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: bucket,
      Region: region,
      MaxKeys: 100,
    }, (err, data) => {
      if (err) {
        resolve({ bucket, error: err.message });
      } else {
        resolve({
          bucket,
          count: data.Contents?.length || 0,
          files: (data.Contents || []).map(f => ({
            key: f.Key,
            size: parseInt(f.Size, 10),
            modified: f.LastModified,
          }))
        });
      }
    });
  });
}

async function main() {
  for (const b of buckets) {
    const result = await listBucket(b.name, b.region);
    console.log('\n=== ' + b.name + ' ===');
    console.log(JSON.stringify(result, null, 2));
  }
}

main();
