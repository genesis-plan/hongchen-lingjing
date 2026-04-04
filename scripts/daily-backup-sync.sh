#!/bin/bash
# 每日自动备份并同步到云存储
# 执行时间：每天凌晨2:00

WORKSPACE="/root/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y%m%d_%H%M)
BACKUP_FILE="backup-${DATE}.tar.gz"
ENV_ID="h4-6g0tfhaqc1bbcdb5"

echo "[$(date)] 开始每日自动备份..."

# 1. 创建备份
cd $WORKSPACE
tar -czf $BACKUP_FILE \
  技能内容/ \
  知识库/ \
  memory/ \
  *.md \
  *.sh \
  *.json \
  *.txt \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='clawatar' \
  --exclude='backups' \
  --exclude='*.tar.gz' \
  2>/dev/null

if [ $? -ne 0 ]; then
  echo "[$(date)] 备份创建失败"
  exit 1
fi

BACKUP_SIZE=$(ls -lh $BACKUP_FILE | awk '{print $5}')
echo "[$(date)] 备份创建成功: $BACKUP_FILE ($BACKUP_SIZE)"

# 2. 上传到云存储
/root/.nvm/current/bin/tcb storage upload $BACKUP_FILE --envId $ENV_ID 2>&1 | tee /tmp/upload.log

if [ $? -eq 0 ]; then
  echo "[$(date)] 上传成功: cos://$ENV_ID/$BACKUP_FILE"
  
  # 3. 记录日志
  echo "[$(date)] BACKUP_SUCCESS: $BACKUP_FILE ($BACKUP_SIZE)" >> $WORKSPACE/memory/automation-logs/backup-sync.log
  
  # 4. 清理本地备份（保留最近3天）
  find $WORKSPACE -name "backup-*.tar.gz" -mtime +3 -delete 2>/dev/null
  echo "[$(date)] 清理完成，保留最近3天备份"
else
  echo "[$(date)] 上传失败，查看日志: /tmp/upload.log"
  echo "[$(date)] BACKUP_FAILED: $BACKUP_FILE" >> $WORKSPACE/memory/automation-logs/backup-sync.log
  exit 1
fi

echo "[$(date)] 每日自动备份完成"
