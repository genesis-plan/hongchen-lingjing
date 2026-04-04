#!/bin/bash
# GitHub仓库运营 - 每天18:00

REPO="genesis-plan/hongchen-lingjing"
LOG_FILE="/var/log/github-ops.log"

echo "=== GitHub仓库运营 $(date '+%Y-%m-%d %H:%M:%S') ===" >> $LOG_FILE

# 1. 同步本地更改
cd /root/.openclaw/workspace
git add -A
git status --short >> $LOG_FILE 2>&1

# 2. 检查远程更新
git fetch origin >> $LOG_FILE 2>&1
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/master)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "有远程更新，需要合并" >> $LOG_FILE
    git pull origin master >> $LOG_FILE 2>&1
else
    echo "本地与远程同步" >> $LOG_FILE
fi

# 3. 检查是否有待提交内容
if git diff --cached --quiet; then
    echo "有待提交内容" >> $LOG_FILE
    # 自动提交
    git commit -m "auto: $(date '+%Y-%m-%d %H:%M') 更新" >> $LOG_FILE 2>&1
fi

# 4. 推送到远程
git push origin master >> $LOG_FILE 2>&1
echo "推送完成" >> $LOG_FILE
echo "" >> $LOG_FILE
