# GitHub 智能操作调度系统

> 基于网络时间分析，自动选择最佳时段执行GitHub操作

## 系统设计

### 核心问题
GitHub连接不稳定，有时推送成功，有时超时失败。

### 解决方案
1. **记录分析**：记录每次操作的时间和结果
2. **模式识别**：找出网络稳定的时间段
3. **智能调度**：只在最佳时间执行推送

## 使用方法

### 1. 查看当前状态
```bash
./scripts/github-smart-push.sh status
```

输出示例：
```
当前时间: 17:51
网络状态: 🟢 最佳时间
没有待推送的提交
```

### 2. 智能推送（自动判断时间）
```bash
./scripts/github-smart-push.sh push
```

- 如果在最佳时间（15:00-16:30 或 17:00-18:00）：立即推送
- 如果在避免时间（16:30-17:00）：提示等待，不推送
- 其他时间：尝试推送，但可能失败

### 3. 查看推荐时间表
```bash
./scripts/github-smart-push.sh schedule
```

### 4. 检查待推送提交
```bash
./scripts/github-smart-push.sh check
```

## 自动调度（Cron）

已配置定时任务：

| 时间 | 操作 | 说明 |
|------|------|------|
| 15:00 | 推送 | 最佳时间 |
| 15:30 | 推送 | 最佳时间 |
| 16:00 | 推送 | 最佳时间 |
| 16:30 | ❌ | 避免时间，不操作 |
| 17:00 | 推送 | 最佳时间 |
| 17:30 | 推送 | 最佳时间 |

### 启用自动调度
```bash
crontab /root/.openclaw/workspace/crontab-github-smart.txt
```

## 文件结构

```
workspace/
├── network-time-analysis.md    # 网络时间分析记录
├── crontab-github-smart.txt    # 定时任务配置
├── scripts/
│   └── github-smart-push.sh    # 智能推送脚本
└── memory/automation-logs/
    └── github-smart-push.log   # 操作日志
```

## 最佳实践

### 工作流
1. 正常开发，随时提交到本地
2. 不用立即推送，等待系统自动在最佳时间推送
3. 如果紧急，手动执行 `./scripts/github-smart-push.sh push`

### 紧急推送
如果必须在非最佳时间推送：
```bash
# 强制推送（不推荐，可能失败）
./scripts/github-smart-push.sh force-push

# 或者等待到下一个最佳时间窗口
```

## 数据分析

### 已识别的模式

**最佳时间段：**
- 15:00-16:30：成功率100%（6次推送）
- 17:00-18:00：成功率100%（6次推送）

**避免时间段：**
- 16:30-17:00：成功率0%（多次超时）

### 持续优化
每次推送都会记录到 `network-time-analysis.md`，系统会越来越精准。

---
*创建时间：2026-03-21*  
*版本：v1.0*
