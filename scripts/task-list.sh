#!/bin/bash
# ============================================================
# 任务管理系统 - 查看任务
# 用法: ./task-list.sh [状态过滤]
# 示例: ./task-list.sh 进行中
# ============================================================

WORKSPACE="/root/.openclaw/workspace"
TASKS_FILE="$WORKSPACE/TASKS.md"

FILTER="${1:-all}"

echo "=== 任务管理系统 ==="
echo "时间：$(date '+%Y-%m-%d %H:%M')"
echo ""

# 显示统计
echo "【任务统计】"
grep "^| 进行中\|^| 今日已完成\|^| 待处理\|^| 总计" $TASKS_FILE 2>/dev/null | tail -4
echo ""

# 根据过滤显示
if [ "$FILTER" = "进行中" ] || [ "$FILTER" = "all" ]; then
  echo "【进行中的任务】"
  sed -n '/## 🎯 进行中的任务/,/## ✅/p' $TASKS_FILE | grep "^| [0-9]" || echo "  暂无进行中的任务"
  echo ""
fi

if [ "$FILTER" = "已完成" ] || [ "$FILTER" = "all" ]; then
  echo "【今日已完成任务】"
  sed -n '/## ✅ 今日已完成任务/,/## 📋/p' $TASKS_FILE | grep "^| [0-9]" | tail -5 || echo "  暂无今日已完成任务"
  echo ""
fi

if [ "$FILTER" = "待处理" ] || [ "$FILTER" = "all" ]; then
  echo "【待处理任务】"
  sed -n '/## 📋 待处理任务/,/## 🗓️/p' $TASKS_FILE | grep "^| [0-9]" || echo "  暂无待处理任务"
  echo ""
fi

echo "【周期性任务】"
sed -n '/## 🗓️ 周期性任务/,/## 📊/p' $TASKS_FILE | grep "^|" | tail -5
