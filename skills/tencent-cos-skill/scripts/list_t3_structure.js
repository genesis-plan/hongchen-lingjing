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
        resolve(data.Contents || []);
      }
    });
  });
}

async function main() {
  const files = await listAll('');
  
  // 按目录分组
  const dirs = {};
  files.forEach(f => {
    const parts = f.Key.split('/');
    const dir = parts[0];
    if (!dirs[dir]) dirs[dir] = [];
    dirs[dir].push({
      key: f.Key,
      size: parseInt(f.Size, 10),
      modified: f.LastModified,
    });
  });
  
  console.log('=== t3-1409755229 桶文件结构 ===\n');
  Object.keys(dirs).forEach(dir => {
    console.log(`📁 ${dir}/ (${dirs[dir].length} 个文件)`);
    dirs[dir].slice(0, 5).forEach(f => {
      console.log(`   - ${f.key.split('/').pop()} (${(f.size/1024).toFixed(1)} KB)`);
    });
    if (dirs[dir].length > 5) {
      console.log(`   ... 还有 ${dirs[dir].length - 5} 个文件`);
    }
    console.log('');
  });
  
  // 搜索可能的小说文件
  console.log('=== 可能的小说相关文件 ===\n');
  const novelKeywords = ['小说', '人工智能教育', '第一卷', '第二卷', '第三卷', '第四卷', '第五卷', '第六卷', '卷', '章', '节'];
  const novelFiles = files.filter(f => 
    novelKeywords.some(kw => f.Key.toLowerCase().includes(kw.toLowerCase()))
  );
  
  if (novelFiles.length > 0) {
    novelFiles.forEach(f => {
      console.log(`📄 ${f.Key} (${(parseInt(f.Size)/1024).toFixed(1)} KB)`);
    });
  } else {
    console.log('没找到明显的小说文件');
  }
}

main();
