# 微信开发者工具使用指南

## 📦 项目打包

我已为你创建了项目压缩包：

**文件位置**: `/root/.openclaw/workspace/hongchen-miniprogram.tar.gz`

<qqfile>/root/.openclaw/workspace/hongchen-miniprogram.tar.gz</qqfile>

## 🚀 上传步骤

### 1. 下载项目文件
- 点击上方文件链接下载 `hongchen-miniprogram.tar.gz`
- 解压到本地目录，如：`C:\Projects\hongchen-miniprogram`

### 2. 打开微信开发者工具
- 下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- 使用微信扫码登录

### 3. 导入项目
- 点击「+」新建项目
- 项目目录：选择解压后的文件夹
- AppID：选择「测试号」（或申请正式AppID）
- 项目名称：「红尘灵境」
- 模板选择：「不使用云服务」（我们会手动配置）

### 4. 配置云开发环境
```javascript
// 在 app.js 中已配置
wx.cloud.init({
  env: 'h2-5gr149lm91736a6e', // h2云开发环境
  traceUser: true
});
```

### 5. 项目结构验证
确保以下文件存在：
```
hongchen-miniprogram/
├── app.js          // ✅ 已配置云开发
├── app.json        // ✅ 14个页面路由
├── app.wxss        // ✅ 赛博国风样式
├── pages/
│   ├── index/      // ✅ 灵槎津渡页面
│   └── profile/    // ✅ 芥子藏虚页面
└── ...
```

## ⚠️ 常见问题解决

### Q1: 云开发环境连接失败
**解决方案**:
1. 在微信开发者工具中点击「云开发」按钮
2. 开通云开发服务（免费额度足够开发测试）
3. 确认环境ID：`h2-5gr149lm91736a6e`

### Q2: 页面显示空白
**检查项目**:
- 确认 `app.json` 中页面路径正确
- 检查 `.wxml` 语法是否正确
- 查看控制台错误信息（F12）

### Q3: 样式显示异常
**调试步骤**:
- 检查 `app.wxss` 是否加载
- 确认类名拼写正确
- 使用微信开发者工具的「调试器」查看元素

## 🔧 开发调试技巧

### 快捷键
- `Ctrl + Shift + R`: 强制刷新
- `F5`: 编译并刷新
- `Ctrl + Shift + F`: 全局搜索

### 调试面板
- **Console**: 查看日志输出
- **Sources**: 断点调试JavaScript
- **Network**: 监控网络请求
- **Storage**: 查看本地存储

## 📱 测试账号

使用以下测试账号体验功能：
- 用户名：test_user
- 密码：test123456

## 🎯 测试重点

### 功能测试
- [ ] 页面跳转是否正常
- [ ] 用户信息获取是否成功
- [ ] 建筑导航是否响应
- [ ] 云数据库调用是否成功

### UI测试
- [ ] 在不同设备上显示效果
- [ ] 横竖屏切换适配
- [ ] 深色模式兼容性
- [ ] 动画效果流畅度

## 📞 技术支持

如果在测试中遇到问题：
1. 截图保存错误信息
2. 记录复现步骤
3. 联系开发团队

---
*红尘灵境项目组*
*技术支持时间：工作日 9:00-18:00*