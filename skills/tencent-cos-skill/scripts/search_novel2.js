const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: 'AKIDMZZLtMju42nJacRZT8XhcIkyUnrrRmri',
  SecretKey: 'f5KNCZibGjz1shU7XiiW7ViiT1MVdmna',
});

async function listAll(prefix = '') {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: 't3-1409755229',
      Region: 'ap-guangzhou',
      Prefix: prefix,
      MaxKeys: 1000,
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
  // 先搜索包含"人工智能"的文件
  console.log('=== 搜索包含"人工智能"的文件 ===\n');
  
  const data = await listAll('');
  const files = data.Contents || [];
  
  const matches = files.filter(f => 
    f.Key.includes('人工智能') || 
    f.Key.includes('教育') ||
    f.Key.includes('卷') ||
    f.Key.includes('20251229')
  );
  
  console.log(`找到 ${matches.length} 个匹配文件:\n`);
  matches.forEach(f => {
    const sizeKB = (parseInt(f.Size) / 1024).toFixed(1);
    console.log(`📄 ${f.Key} (${sizeKB} KB)`);
  });
  
  // 列出所有目录结构
  console.log('\n\n=== 所有顶级目录 ===\n');
  const dirs = new Set();
  files.forEach(f => {
    const parts = f.Key.split('/');
    if (parts.length > 1) {
      dirs.add(parts[0]);
    }
  });
  
  dirs.forEach(dir => {
    console.log(`📁 ${dir}/`);
  });
}

main();
