#!/bin/bash
# ============================================================
# 任务管理系统 - 添加任务
# 用法: ./task-add.sh "任务描述" [优先级] [截止时间]
# 示例: ./task-add.sh "完成14建筑CSS" P1 "2026-03-21 18:00"
# ============================================================

WORKSPACE="/root/.openclaw/workspace"
TASKS_FILE="$WORKSPACE/TASKS.md"
LOG_FILE="$WORKSPACE/memory/task-system.log"

# 参数
TASK_DESC="$1"
PRIORITY="${2:-P2}"  # 默认P2
DEADLINE="${3:-未设定}"

# 检查参数
if [ -z "$TASK_DESC" ]; then
  echo "❌ 错误：请提供任务描述"
  echo "用法: $0 '任务描述' [优先级P0/P1/P2/P3] [截止时间]"
  exit 1
fi

# 生成任务编号（基于现有任务数+1）
TASK_NUM=$(grep -c "^| [0-9]" $TASKS_FILE 2>/dev/null || echo "0")
TASK_NUM=$((TASK_NUM + 1))
TASK_ID=$(printf "%03d" $TASK_NUM)

# 当前时间
CREATE_TIME=$(date '+%Y-%m-%d %H:%M')

# 添加到进行中的任务
echo "添加任务：$TASK_DESC (优先级: $PRIORITY)"

# 使用sed插入到"进行中的任务"表格
sed -i "/## 🎯 进行中的任务/,/## ✅/{ 
  /| 编号 | 任务 | 优先级 | 状态 | 创建时间 | 截止时间 | 验证方式 |/a\\
| $TASK_ID | $TASK_DESC | $PRIORITY | 🔄 进行中 | $CREATE_TIME | $DEADLINE | 待定义 |
}" $TASKS_FILE

# 记录日志
echo "[$(date '+%H:%M:%S')] ADD: $TASK_ID | $TASK_DESC | $PRIORITY | $CREATE_TIME" >> $LOG_FILE

# 更新统计
total_tasks=$(grep -c "^| [0-9]" $TASKS_FILE 2>/dev/null || echo "0")
sed -i "s/| 总计 | [0-9]* |/| 总计 | $total_tasks |/" $TASKS_FILE
sed -i "s/| 进行中 | [0-9]* |/| 进行中 | $(grep -c '🔄 进行中' $TASKS_FILE) |/" $TASKS_FILE

# 更新时间
sed -i "s/*最后更新：.*/*最后更新：$(date '+%Y-%m-%d %H:%M')/" $TASKS_FILE

echo "✅ 任务已添加：$TASK_ID"
echo "📄 查看任务：cat $TASKS.md"
