#!/bin/bash
# GitHub 智能调度脚本
# 根据网络时间分析，在最佳时间段执行GitHub操作

WORKSPACE="/root/.openclaw/workspace"
LOG_FILE="$WORKSPACE/memory/automation-logs/github-smart-push.log"
ANALYSIS_FILE="$WORKSPACE/network-time-analysis.md"

# 获取当前时间
HOUR=$(date +%H)
MINUTE=$(date +%M)
CURRENT_TIME="$HOUR:$MINUTE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 检查网络状态..." >> $LOG_FILE

# 判断当前是否在最佳时间段
is_good_time() {
    # 15:00 - 16:30 是最佳时间
    if [ "$HOUR" -eq 15 ] || ([ "$HOUR" -eq 16 ] && [ "$MINUTE" -le 30 ]); then
        return 0
    fi
    # 17:00 - 18:00 是良好时间
    if [ "$HOUR" -eq 17 ] || ([ "$HOUR" -eq 18 ] && [ "$MINUTE" -eq 0 ]); then
        return 0
    fi
    return 1
}

# 判断是否在避免时间段
is_bad_time() {
    # 16:30 - 17:00 避免
    if [ "$HOUR" -eq 16 ] && [ "$MINUTE" -gt 30 ]; then
        return 0
    fi
    if [ "$HOUR" -eq 17 ] && [ "$MINUTE" -lt 5 ]; then
        return 0
    fi
    return 1
}

# 执行GitHub推送
do_push() {
    cd $WORKSPACE
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始推送..." >> $LOG_FILE
    
    if git push origin main 2>&1 >> $LOG_FILE; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ 推送成功" >> $LOG_FILE
        return 0
    else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ 推送失败" >> $LOG_FILE
        return 1
    fi
}

# 主逻辑
main() {
    if is_bad_time; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ 当前是网络差的时间段，跳过推送" >> $LOG_FILE
        echo "建议时间: 15:00-16:30 或 17:00-18:00"
        exit 1
    fi
    
    if is_good_time; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ 当前是网络最佳时间，执行推送" >> $LOG_FILE
        do_push
    else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ℹ️ 非最佳时间，但尝试推送..." >> $LOG_FILE
        do_push
    fi
}

# 检查工作区是否有未推送的提交
check_pending() {
    cd $WORKSPACE
    if git log origin/main..HEAD --oneline | grep -q "."; then
        echo "有未推送的提交:"
        git log origin/main..HEAD --oneline
        return 0
    else
        echo "没有待推送的提交"
        return 1
    fi
}

# 根据参数执行不同操作
case "$1" in
    "check")
        check_pending
        ;;
    "push")
        main
        ;;
    "force-push")
        cd $WORKSPACE && git push origin main --force
        ;;
    "status")
        echo "当前时间: $CURRENT_TIME"
        if is_good_time; then
            echo "网络状态: 🟢 最佳时间"
        elif is_bad_time; then
            echo "网络状态: 🔴 避免时间"
        else
            echo "网络状态: 🟡 一般"
        fi
        check_pending
        ;;
    "schedule")
        echo "推荐操作时间:"
        echo "  🥇 最佳: 15:00-16:30"
        echo "  🥈 良好: 17:00-18:00"
        echo "  ❌ 避免: 16:30-17:00"
        ;;
    *)
        echo "用法: $0 {check|push|force-push|status|schedule}"
        echo ""
        echo "  check      - 检查是否有待推送的提交"
        echo "  push       - 智能推送（根据网络时间）"
        echo "  force-push - 强制推送"
        echo "  status     - 显示当前状态和待推送提交"
        echo "  schedule   - 显示推荐操作时间表"
        ;;
esac
