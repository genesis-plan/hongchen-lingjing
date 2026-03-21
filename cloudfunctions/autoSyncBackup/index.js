const cloud = require('@cloudbase/node-sdk');
const fs = require('fs');
const path = require('path');

// 初始化云开发
const app = cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = app.database();
const _ = db.command;

/**
 * 自动同步备份到云存储
 * 触发方式：定时触发（每天凌晨2点）
 * 功能：
 * 1. 压缩本地工作目录
 * 2. 上传到云存储
 * 3. 清理过期备份（保留最近7天）
 * 4. 记录同步日志
 */
exports.main = async (event, context) => {
  const timestamp = new Date().toISOString();
  const date = timestamp.split('T')[0];
  
  console.log(`[${timestamp}] 开始自动同步备份...`);
  
  try {
    // 1. 获取云存储实例
    const storage = app.storage();
    
    // 2. 上传备份文件
    const localPath = '/root/.openclaw/workspace/backup-daily.tar.gz';
    const cloudPath = `backup/auto-sync/${date}.tar.gz`;
    
    // 检查本地备份是否存在
    if (!fs.existsSync(localPath)) {
      console.log(`[${timestamp}] 本地备份不存在: ${localPath}`);
      return {
        success: false,
        message: '本地备份文件不存在',
        timestamp
      };
    }
    
    // 3. 上传到云存储
    console.log(`[${timestamp}] 上传文件到: ${cloudPath}`);
    await storage.uploadFile({
      localPath,
      cloudPath,
    });
    
    console.log(`[${timestamp}] 上传成功: ${cloudPath}`);
    
    // 4. 获取文件信息
    const fileInfo = await storage.getFileInfo(cloudPath);
    
    // 5. 记录同步日志到数据库
    await db.collection('sync_logs').add({
      date,
      timestamp,
      cloudPath,
      size: fileInfo.size,
      status: 'success',
      type: 'auto_sync'
    });
    
    // 6. 清理过期备份（保留最近7天）
    await cleanOldBackups(storage, date);
    
    return {
      success: true,
      message: '自动同步完成',
      date,
      cloudPath,
      size: fileInfo.size,
      timestamp
    };
    
  } catch (error) {
    console.error(`[${timestamp}] 同步失败:`, error);
    
    // 记录失败日志
    await db.collection('sync_logs').add({
      date,
      timestamp,
      status: 'failed',
      error: error.message,
      type: 'auto_sync'
    });
    
    return {
      success: false,
      message: error.message,
      timestamp
    };
  }
};

/**
 * 清理过期备份
 * 保留最近7天的备份
 */
async function cleanOldBackups(storage, currentDate) {
  const daysToKeep = 7;
  const current = new Date(currentDate);
  
  try {
    // 获取所有备份文件列表
    const { fileList } = await storage.listDirectoryFiles('backup/auto-sync/');
    
    for (const file of fileList) {
      // 从文件名提取日期
      const match = file.fileId.match(/(\d{4}-\d{2}-\d{2})\.tar\.gz$/);
      if (match) {
        const fileDate = new Date(match[1]);
        const diffDays = (current - fileDate) / (1000 * 60 * 60 * 24);
        
        // 删除超过7天的备份
        if (diffDays > daysToKeep) {
          console.log(`[${currentDate}] 删除过期备份: ${file.fileId}`);
          await storage.deleteFile(file.fileId);
        }
      }
    }
    
    console.log(`[${currentDate}] 过期备份清理完成`);
  } catch (error) {
    console.error(`[${currentDate}] 清理过期备份失败:`, error);
  }
}
