// 腾讯云API自动部署脚本
// 使用Node.js和腾讯云SDK自动上传文件到静态网站托管

const fs = require('fs');
const path = require('path');
const { CloudBaseManager } = require('@cloudbase/manager-node');
const { CloudBaseUpload } = require('@cloudbase/cli/dist/lib/upload');

// 配置
const config = {
    envId: 'hclj-8g46g9fd06e2a760',
    localPath: 'C:\\Users\\Administrator\\Desktop\\红尘灵境网页版',
    secretId: 'YOUR_SECRET_ID_HERE',
    secretKey: 'f6JOHySkofIjxysa6PWQ7apqdCYfYDev'
};

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║         红尘灵境网页版 - 自动部署工具                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log('');

// 初始化云开发管理器
const app = CloudBaseManager.init({
    secretId: config.secretId,
    secretKey: config.secretKey,
    envId: config.envId
});

// 获取所有需要上传的文件
function getAllFiles(dirPath, fileList = []) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// 部署函数
async function deploy() {
    try {
        console.log('[1/4] 检查本地文件...');
        if (!fs.existsSync(config.localPath)) {
            console.error('✗ 文件夹不存在:', config.localPath);
            process.exit(1);
        }
        
        const files = getAllFiles(config.localPath);
        console.log(`✓ 找到 ${files.length} 个文件`);
        console.log('');
        
        console.log('[2/4] 连接云开发环境...');
        console.log(`环境ID: ${config.envId}`);
        console.log('');
        
        console.log('[3/4] 开始上传文件...');
        console.log('这可能需要几分钟，请耐心等待...');
        console.log('');
        
        const upload = new CloudBaseUpload({
            cloudPath: config.localPath,
            envId: config.envId
        });
        
        await upload.upload();
        
        console.log('');
        console.log('[4/4] 部署完成！');
        console.log('');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✓ 部署成功！                              ║');
        console.log('╚══════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log('访问地址：');
        console.log('https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com');
        console.log('');
        console.log('现在可以点击上面的链接查看您的网站了！');
        
    } catch (error) {
        console.error('');
        console.error('✗ 部署失败：');
        console.error(error.message);
        console.error('');
        console.error('错误详情：', error);
        process.exit(1);
    }
}

// 执行部署
deploy();
