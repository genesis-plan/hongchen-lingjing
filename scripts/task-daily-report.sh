#!/bin/bash
# ============================================================
# 任务管理系统 - 每日报告
# 自动生成今日任务执行情况报告
# ============================================================

WORKSPACE="/root/.openclaw/workspace"
TASKS_FILE="$WORKSPACE/TASKS.md"
REPORT_FILE="$WORKSPACE/memory/task-reports/daily-$(date +%Y%m%d).md"

mkdir -p "$WORKSPACE/memory/task-reports"

echo "生成今日任务报告..."

# 统计
total_tasks=$(grep -c "^| [0-9]" $TASKS_FILE 2>/dev/null || echo "0")
ongoing_tasks=$(grep -c "🔄 进行中" $TASKS_FILE 2>/dev/null || echo "0")
completed_tasks=$(sed -n '/## ✅ 今日已完成任务/,/## 📋/p' $TASKS_FILE | grep -c "^| [0-9]" 2>/dev/null || echo "0")

cat > $REPORT_FILE << EOF
# 任务执行日报
**日期：$(date '+%Y-%m-%d')**  
**生成时间：$(date '+%H:%M')**

## 📊 今日概览

| 指标 | 数值 |
|------|------|
| 总任务数 | $total_tasks |
| 进行中 | $ongoing_tasks |
| 今日已完成 | $completed_tasks |

## ✅ 今日已完成任务

EOF

# 添加今日已完成任务
sed -n '/## ✅ 今日已完成任务/,/## 📋/p' $TASKS_FILE | grep "^| [0-9]" >> $REPORT_FILE

# 添加进行中的任务
cat >> $REPORT_FILE << EOF

## 🔄 进行中的任务

EOF
sed -n '/## 🎯 进行中的任务/,/## ✅/p' $TASKS_FILE | grep "^| [0-9]" >> $REPORT_FILE || echo "暂无" >> $REPORT_FILE

# 添加周期性任务执行情况
cat >> $REPORT_FILE << EOF

## ⏰ 周期性任务

EOF
sed -n '/## 🗓️ 周期性任务/,/## 📊/p' $TASKS_FILE | grep "^|" | tail -5 >> $REPORT_FILE

# 添加总结
cat >> $REPORT_FILE << EOF

## 📝 总结

- 今日任务完成率：$(if [ $total_tasks -gt 0 ]; then echo "$((completed_tasks * 100 / total_tasks))%"; else echo "N/A"; fi)
- 明日待办：查看进行中的 $ongoing_tasks 个任务

---
*本报告由任务管理系统自动生成*
EOF

echo "✅ 报告已生成：$REPORT_FILE"
