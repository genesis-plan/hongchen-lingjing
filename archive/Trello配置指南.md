# Trello API 配置指南

## 获取步骤

### 1. 获取API Key
1. 访问：https://trello.com/app-key
2. 登录你的Trello账号
3. 页面会显示你的API Key（一串32位的字符）
4. 复制保存

### 2. 生成Token
1. 在同一页面，找到"Token"链接
2. 点击链接，授权应用访问
3. 复制生成的Token（一串更长的字符）
4. 保存好，这个只显示一次

### 3. 配置环境变量
将以下内容添加到 `~/.openclaw/workspace/.env`：

```bash
export TRELLO_API_KEY="你的API Key"
export TRELLO_TOKEN="你的Token"
```

## 配置完成后

我将为你创建：
- ✅ "红尘灵境项目"看板
- ✅ 列表：待办/进行中/已完成/待审核
- ✅ 当前任务卡片
- ✅ 自动化提醒

## 示例

**API Key格式：**
```
1234567890abcdef1234567890abcdef
```

**Token格式：**
```
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

---

请提供你的API Key和Token，我立即完成配置。
