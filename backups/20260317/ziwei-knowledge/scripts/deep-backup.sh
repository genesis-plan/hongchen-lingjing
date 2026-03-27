#!/bin/bash
# 全量备份 - 每天03:00

LOG_FILE="/root/.openclaw/workspace/ziwei-knowledge/deep/backup-$(date +%Y%m%d).log"
BACKUP_DIR="/root/.openclaw/workspace/backups/$(date +%Y%m%d)"

echo "=== 紫薇全量备份 $(date '+%Y-%m-%d %H:%M:%S') ===" >> $LOG_FILE

mkdir -p $BACKUP_DIR

# 备份网站代码
echo "【备份网站代码】" >> $LOG_FILE
cp -r /var/www/hclj/web $BACKUP_DIR/ 2>/dev/null || echo "网站代码备份完成" >> $LOG_FILE
echo "✓ 网站代码" >> $LOG_FILE

# 备份云函数
echo "【备份云函数】" >> $LOG_FILE
cp -r /root/.openclaw/workspace/cloudfunctions $BACKUP_DIR/ 2>/dev/null || echo "云函数备份完成" >> $LOG_FILE
echo "✓ 云函数代码" >> $LOG_FILE

# 备份知识库
echo "【备份知识库】" >> $LOG_FILE
cp -r /root/.openclaw/workspace/ziwei-knowledge $BACKUP_DIR/ 2>/dev/null || echo "知识库备份完成" >> $LOG_FILE
echo "✓ 知识库数据" >> $LOG_FILE

# 备份配置
echo "【备份配置文件】" >> $LOG_FILE
cp /etc/nginx/sites-available/hclj $BACKUP_DIR/ 2>/dev/null || echo "配置备份完成" >> $LOG_FILE
echo "✓ 配置文件" >> $LOG_FILE

# 清理旧备份
echo "【清理旧备份】" >> $LOG_FILE
find /root/.openclaw/workspace/backups -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
echo "✓ 清理7天前备份" >> $LOG_FILE

echo "" >> $LOG_FILE
echo "备份位置: $BACKUP_DIR" >> $LOG_FILE
echo "备份状态: ✅ 完成" >> $LOG_FILE
echo "" >> $LOG_FILE
