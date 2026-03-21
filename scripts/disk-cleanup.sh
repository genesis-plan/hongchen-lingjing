#!/bin/bash
# 磁盘清理执行脚本
# 执行时间：2026-03-21 14:04

WORKSPACE="/root/.openclaw/workspace"
LOG_FILE="$WORKSPACE/memory/optimization-logs/disk-cleanup-$(date +%Y%m%d_%H%M).log"
START_TIME=$(date +%s)

echo "=== 磁盘清理执行报告 ===" | tee -a $LOG_FILE
echo "开始时间：$(date '+%Y-%m-%d %H:%M:%S')" | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE

# 1. 清理前状态
echo "【步骤1】清理前磁盘状态：" | tee -a $LOG_FILE
df -h / | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE

# 2. 查找可清理的大文件/目录
echo "【步骤2】查找可清理的文件..." | tee -a $LOG_FILE

# 2.1 清理旧备份（保留最近3天）
echo "  → 清理旧备份文件（>3天）..." | tee -a $LOG_FILE
BACKUPS_BEFORE=$(find $WORKSPACE -name "backup-*.tar.gz" -type f 2>/dev/null | wc -l)
find $WORKSPACE -name "backup-*.tar.gz" -mtime +3 -type f -delete 2>/dev/null
BACKUPS_AFTER=$(find $WORKSPACE -name "backup-*.tar.gz" -type f 2>/dev/null | wc -l)
BACKUPS_CLEANED=$((BACKUPS_BEFORE - BACKUPS_AFTER))
echo "    清理了 $BACKUPS_CLEANED 个旧备份文件" | tee -a $LOG_FILE

# 2.2 清理日志文件（>7天）
echo "  → 清理旧日志文件（>7天）..." | tee -a $LOG_FILE
LOGS_BEFORE=$(find $WORKSPACE/memory -name "*.log" -type f 2>/dev/null | wc -l)
find $WORKSPACE/memory -name "*.log" -mtime +7 -type f -delete 2>/dev/null
LOGS_AFTER=$(find $WORKSPACE/memory -name "*.log" -type f 2>/dev/null | wc -l)
LOGS_CLEANED=$((LOGS_BEFORE - LOGS_AFTER))
echo "    清理了 $LOGS_CLEANED 个旧日志文件" | tee -a $LOG_FILE

# 2.3 清理临时文件
echo "  → 清理临时文件..." | tee -a $LOG_FILE
TMP_BEFORE=$(find /tmp -name "*claw*" -o -name "*openclaw*" 2>/dev/null | wc -l)
find /tmp -name "*claw*" -mtime +1 -type f -delete 2>/dev/null
find /tmp -name "*openclaw*" -mtime +1 -type f -delete 2>/dev/null
TMP_AFTER=$(find /tmp -name "*claw*" -o -name "*openclaw*" 2>/dev/null | wc -l)
TMP_CLEANED=$((TMP_BEFORE - TMP_AFTER))
echo "    清理了 $TMP_CLEANED 个临时文件" | tee -a $LOG_FILE

# 2.4 清理npm缓存
echo "  → 清理npm缓存..." | tee -a $LOG_FILE
NPM_CACHE_BEFORE=$(du -sh ~/.npm 2>/dev/null | awk '{print $1}')
npm cache clean --force 2>/dev/null || echo "    npm缓存清理跳过"
echo "    npm缓存清理完成" | tee -a $LOG_FILE

# 2.5 清理node_modules中不需要的（可选）
echo "  → 检查node_modules占用..." | tee -a $LOG_FILE
NODE_MODULES_SIZE=$(du -sh $WORKSPACE/node_modules 2>/dev/null | awk '{print $1}')
echo "    node_modules占用: $NODE_MODULES_SIZE" | tee -a $LOG_FILE

# 3. 清理后状态
echo "" | tee -a $LOG_FILE
echo "【步骤3】清理后磁盘状态：" | tee -a $LOG_FILE
df -h / | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE

# 4. 计算释放空间
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo "【执行结果】" | tee -a $LOG_FILE
echo "  执行时长：${DURATION}秒" | tee -a $LOG_FILE
echo "  清理备份文件：$BACKUPS_CLEANED 个" | tee -a $LOG_FILE
echo "  清理日志文件：$LOGS_CLEANED 个" | tee -a $LOG_FILE
echo "  清理临时文件：$TMP_CLEANED 个" | tee -a $LOG_FILE
echo "" | tee -a $LOG_FILE
echo "完成状态：✅ 已执行" | tee -a $LOG_FILE
echo "结束时间：$(date '+%Y-%m-%d %H:%M:%S')" | tee -a $LOG_FILE

# 输出关键信息给调用者
echo ""
echo "DISK_CLEANUP_COMPLETE"
echo "DURATION:${DURATION}"
echo "BACKUPS_CLEANED:${BACKUPS_CLEANED}"
echo "LOGS_CLEANED:${LOGS_CLEANED}"
echo "TMP_CLEANED:${TMP_CLEANED}"
