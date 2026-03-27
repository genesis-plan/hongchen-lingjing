#!/bin/bash
# 同步学习资料到COS桶

LOG_FILE="/root/.openclaw/workspace/ziwei-knowledge/learning/cos-sync-$(date +%Y%m%d).log"

echo "=== 同步学习资料到COS $(date '+%Y-%m-%d %H:%M:%S') ===" >> $LOG_FILE

# COS桶信息
COS_BUCKET="t3-1409755229"
COS_REGION="ap-guangzhou"
COS_PATH="learning-resources/"

# 本地学习目录
LOCAL_PATH="/root/.openclaw/workspace/ziwei-knowledge/learning"

echo "源目录: $LOCAL_PATH" >> $LOG_FILE
echo "目标桶: $COS_BUCKET" >> $LOG_FILE
echo "目标路径: $COS_PATH" >> $LOG_FILE

# 检查是否有新资料
NEW_FILES=$(find $LOCAL_PATH -name "*.log" -mmin -60 2>/dev/null | wc -l)
echo "新资料数: $NEW_FILES" >> $LOG_FILE

if [ $NEW_FILES -gt 0 ]; then
    echo "状态: 有新资料待同步" >> $LOG_FILE
    # 实际同步需要coscmd工具
    echo "命令: coscmd upload -r $LOCAL_PATH /$COS_PATH" >> $LOG_FILE
else
    echo "状态: 无新资料" >> $LOG_FILE
fi

echo "" >> $LOG_FILE
