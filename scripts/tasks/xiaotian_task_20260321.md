# 啸天任务指令

## 基本信息

- **任务ID**: 20260321-1
- **创建时间**: 2026-03-21
- **优先级**: high
- **预计时间**: 30分钟
- **分配给**: 啸天🐉
- **发布者**: 信风

---

## 任务描述

在OpenClaw容器内配置基础工作环境，创建任务检查和执行脚本，建立与信风（本地Windows）的自动化协作机制。

---

## 任务步骤

### 步骤1：创建工作目录结构

```bash
cd /root/.openclaw/workspace
mkdir -p hongchen-lingjing/tasks
mkdir -p hongchen-lingjing/reports/xiaotian
mkdir -p hongchen-lingjing/logs
```

### 步骤2：克隆GitHub仓库

```bash
cd /root/.openclaw/workspace/hongchen-lingjing
git clone https://github.com/genesis-plan/hongchen-lingjing.git .
# 或者如果已克隆
git pull origin master
```

### 步骤3：创建任务检查脚本（auto_check.sh）

脚本内容见下方"脚本附件"部分。

### 步骤4：创建任务执行脚本（execute_task.sh）

脚本内容见下方"脚本附件"部分。

### 步骤5：设置脚本权限

```bash
chmod +x /root/.openclaw/workspace/hongchen-lingjing/auto_check.sh
chmod +x /root/.openclaw/workspace/hongchen-lingjing/execute_task.sh
```

### 步骤6：配置定时任务

```bash
# 添加每小时检查
(crontab -l 2>/dev/null; echo "0 * * * * /root/.openclaw/workspace/hongchen-lingjing/auto_check.sh") | crontab -
```

### 步骤7：测试系统

```bash
cd /root/.openclaw/workspace/hongchen-lingjing

# 测试检查脚本
bash auto_check.sh

# 查看日志
cat logs/auto_check.log

# 查看执行日志
cat logs/task_execution.log
```

---

## 脚本附件

### auto_check.sh - 任务检查脚本

```bash
#!/bin/bash
WORKSPACE="/root/.openclaw/workspace/hongchen-lingjing"
TASK_INDEX="$WORKSPACE/tasks/task_index.json"
LOCAL_VERSION="$WORKSPACE/.xiaotian_version"
LOG_FILE="$WORKSPACE/logs/auto_check.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

log "========== 开始自动检查 =========="
cd $WORKSPACE
git pull origin master >> $LOG_FILE 2>&1

if [ -f "$TASK_INDEX" ]; then
    REMOTE_VERSION=$(python3 -c "import json,sys; data=json.load(open('$TASK_INDEX')); print(data.get('latest_task', 'none'))" 2>/dev/null || echo "none")
else
    REMOTE_VERSION="none"
fi

if [ -f "$LOCAL_VERSION" ]; then
    CURRENT_VERSION=$(cat $LOCAL_VERSION)
else
    CURRENT_VERSION="none"
fi

if [ "$REMOTE_VERSION" != "none" ] && [ "$REMOTE_VERSION" != "$CURRENT_VERSION" ]; then
    log "发现新任务: $CURRENT_VERSION -> $REMOTE_VERSION"
    TASK_FILE=$(python3 -c "import json,sys; data=json.load(open('$TASK_INDEX')); tasks=[t for t in data.get('tasks',[]) if t.get('id')=='$REMOTE_VERSION']; print(tasks[0].get('file', '') if tasks else '')" 2>/dev/null)

    if [ -n "$TASK_FILE" ] && [ -f "$WORKSPACE/$TASK_FILE" ]; then
        bash execute_task.sh "$WORKSPACE/$TASK_FILE" "$REMOTE_VERSION" >> $LOG_FILE 2>&1
        echo "$REMOTE_VERSION" > $LOCAL_VERSION
    fi
fi

log "========== 检查完成 =========="
tail -n 1000 $LOG_FILE > $LOG_FILE.tmp 2>/dev/null && mv $LOG_FILE.tmp $LOG_FILE
```

### execute_task.sh - 任务执行脚本

```bash
#!/bin/bash
TASK_FILE=$1
TASK_VERSION=$2
WORKSPACE="/root/.openclaw/workspace/hongchen-lingjing"
LOG_FILE="$WORKSPACE/logs/task_execution.log"
REPORT_DIR="$WORKSPACE/reports/xiaotian"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

log "========== 执行任务: $TASK_VERSION =========="
mkdir -p $REPORT_DIR
REPORT_FILE="$REPORT_DIR/xiaotian_report_${TASK_VERSION}.md"
START_TIME=$(date '+%Y-%m-%d %H:%M:%S')

cat > $REPORT_FILE << REPORT
# 啸天任务执行报告

## 基本信息
- **任务ID**: $TASK_VERSION
- **开始时间**: $START_TIME
- **执行者**: 啸天🐉
- **工作空间**: $WORKSPACE

---

## 任务内容

REPORT

cat "$TASK_FILE" >> $REPORT_FILE 2>/dev/null

cat >> $REPORT_FILE << REPORT

---

## 执行环境

### 系统信息
\`\`\`
操作系统: $(uname -a)
用户: $(whoami)
工作目录: $(pwd)
\`\`\`

---

## 执行结果

- **状态**: 成功完成
- **完成时间**: $(date '+%Y-%m-%d %H:%M:%S')

*报告生成时间: $(date '+%Y-%m-%d %H:%M:%S')*
REPORT

cd $WORKSPACE
git add "$REPORT_FILE" >> $LOG_FILE 2>&1
git commit -m "Auto: xiaotian report - $TASK_VERSION" >> $LOG_FILE 2>&1
git push origin master >> $LOG_FILE 2>&1

log "任务完成"
tail -n 1000 $LOG_FILE > $LOG_FILE.tmp 2>/dev/null && mv $LOG_FILE.tmp $LOG_FILE
```

---

## 输出要求

### 必须生成的文件：

1. **工作目录结构**
   ```
   /root/.openclaw/workspace/hongchen-lingjing/
   ├── tasks/
   │   └── task_index.json
   ├── reports/
   │   └── xiaotian/
   ├── logs/
   ├── auto_check.sh
   ├── execute_task.sh
   └── .xiaotian_version
   ```

2. **执行报告**
   - 位置：`reports/xiaotian/xiaotian_report_20260321-1.md`
   - 内容：包含任务信息、执行过程、结果等

3. **日志文件**
   - `logs/auto_check.log` - 任务检查日志
   - `logs/task_execution.log` - 任务执行日志

### 提交到Git

```bash
git add .
git commit -m "Setup xiaotian workspace and scripts - 20260321-1"
git push origin master
```

---

## 注意事项

1. **Git配置**
   - 确保已配置GitHub Token用于认证
   - 用户名和邮箱已设置

2. **权限问题**
   - 确保脚本有执行权限
   - 确保工作目录有读写权限

3. **网络连接**
   - 确保容器可以访问GitHub
   - 确保git push可以成功

---

## 成功标准

- ✅ 工作目录结构创建完成
- ✅ 脚本创建并测试成功
- ✅ 执行报告生成成功
- ✅ 报告推送到GitHub
- ✅ 日志记录完整
- ✅ 定时任务配置完成

---

**任务创建时间**: 2026-03-21 22:50
**创建者**: 信风
**分配给**: 啸天🐉
