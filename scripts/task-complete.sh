#!/bin/bash
# ============================================================
# 任务管理系统 - 完成任务
# 用法: ./task-complete.sh 任务编号 [交付物描述] [验证结果]
# 示例: ./task-complete.sh 001 "CSS文件" "✅ 代码可运行"
# ============================================================

WORKSPACE="/root/.openclaw/workspace"
TASKS_FILE="$WORKSPACE/TASKS.md"
LOG_FILE="$WORKSPACE/memory/task-system.log"

# 参数
TASK_ID="$1"
DELIVERABLE="${2:-见相关文件}"
VERIFY_RESULT="${3:-✅ 已完成}"

# 检查参数
if [ -z "$TASK_ID" ]; then
  echo "❌ 错误：请提供任务编号"
  echo "用法: $0 任务编号 [交付物] [验证结果]"
  echo "示例: $0 001 'CSS文件' '✅ 代码可运行'"
  exit 1
fi

# 查找任务
TASK_LINE=$(grep "^| $TASK_ID |" $TASKS_FILE 2>/dev/null)
if [ -z "$TASK_LINE" ]; then
  echo "❌ 错误：找不到任务 $TASK_ID"
  exit 1
fi

# 提取任务信息
TASK_DESC=$(echo $TASK_LINE | awk -F'|' '{print $3}' | sed 's/^ *//;s/ *$//')
PRIORITY=$(echo $TASK_LINE | awk -F'|' '{print $4}' | sed 's/^ *//;s/ *$//')
CREATE_TIME=$(echo $TASK_LINE | awk -F'|' '{print $6}' | sed 's/^ *//;s/ *$//')
COMPLETE_TIME=$(date '+%Y-%m-%d %H:%M')

echo "完成任务：$TASK_ID - $TASK_DESC"

# 从"进行中"删除
sed -i "/^| $TASK_ID |/d" $TASKS_FILE

# 添加到"今日已完成"
sed -i "/## ✅ 今日已完成任务/,/## 📋/{ 
  /| 编号 | 任务 | 优先级 | 完成时间 | 交付物 | 验证结果 |/a\\
| $TASK_ID | $TASK_DESC | $PRIORITY | $COMPLETE_TIME | $DELIVERABLE | $VERIFY_RESULT |
}" $TASKS_FILE

# 记录日志
echo "[$(date '+%H:%M:%S')] COMPLETE: $TASK_ID | $TASK_DESC | $COMPLETE_TIME" >> $LOG_FILE

# 更新统计
sed -i "s/| 进行中 | [0-9]* |/| 进行中 | $(grep -c '🔄 进行中' $TASKS_FILE 2>/dev/null || echo 0) |/" $TASKS_FILE
sed -i "s/| 今日已完成 | [0-9]* |/| 今日已完成 | $(grep -c '2026-' $TASKS_FILE | head -1) |/" $TASKS_FILE

# 更新时间
sed -i "s/*最后更新：.*/*最后更新：$(date '+%Y-%m-%d %H:%M')/" $TASKS_FILE

echo "✅ 任务已完成：$TASK_ID"
echo "📄 查看任务：cat $TASKS.md"
