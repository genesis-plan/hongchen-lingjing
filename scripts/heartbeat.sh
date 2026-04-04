#!/bin/bash
# 紫薇自动化工作脚本
# 每小时执行一次

WORKSPACE="/root/.openclaw/workspace"
MEMORY="$WORKSPACE/memory"
LOG_FILE="$MEMORY/heartbeat-reports/$(date +%Y-%m-%d-%H).log"

mkdir -p "$MEMORY/heartbeat-reports"
mkdir -p "$MEMORY/external-resources"

echo "=== 紫薇心跳 $(date '+%Y-%m-%d %H:%M') ===" > "$LOG_FILE"

# 1. 检查服务器状态
echo -e "\n## 服务器状态" >> "$LOG_FILE"
echo "运行时间: $(uptime -p)" >> "$LOG_FILE"
echo "内存: $(free -h | grep 'Mem:' | awk '{print $3 "/" $2}')" >> "$LOG_FILE"
echo "磁盘: $(df -h / | tail -1 | awk '{print $3 "/" $2 " (" $5 " used)"}')" >> "$LOG_FILE"

# 2. 检查云函数状态
echo -e "\n## 云函数状态" >> "$LOG_FILE"
tcb fn list --envId h4-6g0tfhaqc1bbcdb5 2>/dev/null | grep -E "^lam-" >> "$LOG_FILE" || echo "无法获取" >> "$LOG_FILE"

# 3. 检查GitHub状态
echo -e "\n## GitHub状态" >> "$LOG_FILE"
cd "$WORKSPACE"
git fetch origin 2>/dev/null
LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse origin/main 2>/dev/null)
if [ "$LOCAL" = "$REMOTE" ]; then
    echo "本地与远程同步" >> "$LOG_FILE"
else
    echo "需要推送: $LOCAL -> $REMOTE" >> "$LOG_FILE"
fi

# 4. 更新心跳状态
STATE_FILE="$MEMORY/heartbeat-state.json"
if [ -f "$STATE_FILE" ]; then
    CHECK_COUNT=$(cat "$STATE_FILE" | grep checkCount | head -1 | cut -d: -f2 | tr -d ',')
    NEW_COUNT=$((CHECK_COUNT + 1))
    sed -i "s/\"checkCount\": $CHECK_COUNT/\"checkCount\": $NEW_COUNT/" "$STATE_FILE"
    sed -i "s/\"lastCheck\": \"[^\"]*\"/\"lastCheck\": \"$(date -Iseconds)\"/" "$STATE_FILE"
fi

echo -e "\n心跳完成" >> "$LOG_FILE"
