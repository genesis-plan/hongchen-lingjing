# GitHub Release 创建指南 | GitHub Release Creation Guide

**版本**: v1.0.0
**准备日期**: 2026-03-16

---

## 📋 前置准备 | Prerequisites

### 必须完成的任务

在创建 GitHub Release 之前，请确保：

- [x] ✅ 所有代码已提交到 master 分支
- [x] ✅ 代码已推送到 GitHub
- [x] ✅ 版本发布说明文档已创建
- [x] ✅ 所有文档完整准确
- [ ] ⏳ 网络连接正常
- [ ] ⏳ GitHub 账号已登录

---

## 🏷️ 创建 Git 标签 | Create Git Tag

### 步骤 1: 确保当前分支为 master

```bash
cd C:\Users\Administrator\Desktop\hongchen-lingjing
C:\Users\Administrator\Desktop\git.bat branch
```

如果当前不是 master 分支，切换到 master：

```bash
C:\Users\Administrator\Desktop\git.bat checkout master
```

### 步骤 2: 确保代码已推送

```bash
C:\Users\Administrator\Desktop\git.bat status
```

应该显示：
```
On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
```

### 步骤 3: 创建标签

```bash
C:\Users\Administrator\Desktop\git.bat tag -a v1.0.0 -m "Release v1.0.0 - 创世纪 | First Public Release"
```

### 步骤 4: 推送标签

```bash
C:\Users\Administrator\Desktop\git.bat push origin v1.0.0
```

---

## 🎉 创建 GitHub Release | Create GitHub Release

### 方法一：通过网页界面（推荐新手）

#### 步骤 1: 访问 Releases 页面

1. 打开浏览器，访问：
   ```
   https://github.com/genesis-plan/hongchen-lingjing/releases
   ```

2. 如果未登录，使用您的 GitHub 账号登录

#### 步骤 2: 点击"Draft a new release"

在 Releases 页面右上角，点击绿色按钮 **"Draft a new release"**

#### 步骤 3: 填写 Release 信息

**Choose a tag**: 选择 `v1.0.0`

**Target**: 选择 `master` 分支（应该会自动选择）

**Release title**: 输入标题
```
🎉 红尘灵境 v1.0.0 - 创世纪 | First Public Release
```

**Describe this release**: 输入发布说明

可以使用以下模板，或者复制 `RELEASE_v1.0.0.md` 的内容：

```markdown
## 🎉 红尘灵境首个公开版本发布！

经过21天的努力，"红尘灵境"的首个公开版本正式发布！

### ✨ 版本亮点

- 🌐 完整的网页体验（网页版）
- 📱 功能完整的小程序
- 📚 详尽的文档
- 🔧 开箱即用的部署

### 🚀 快速开始

**网页版**: 直接访问 https://红尘灵境.com

**小程序**: 在微信搜索"红尘灵境"

**本地运行**:
```bash
git clone https://github.com/genesis-plan/hongchen-lingjing.git
cd hongchen-lingjing/web
python -m http.server 8080
# 访问 http://localhost:8080
```

### 📦 包含内容

- 网页版：8+ HTML 页面
- 小程序：10个页面、19个云函数、15个数据库集合
- 文档：架构说明、部署指南、使用指南
- 总代码：21,496+ 行

### 🎯 核心功能

- 🌾 首个职业"农民"
- 📚 技能系统（学习、实践、认证）
- 🤖 AI对话系统
- 💬 社交系统（好友、书信、社区）
- 💰 经济系统（积分、交易）
- 🏆 荣誉体系（成就、证书）

### 📊 技术栈

**网页版**: HTML5 + CSS3 + JavaScript + Three.js
**小程序**: 原生小程序框架 + 腾讯云 CloudBase

### 🔐 安全与合规

- ✅ 隐私政策
- ✅ 服务条款
- ✅ 年龄验证
- ✅ HTTPS 加密

### 📞 联系方式

- GitHub Issues: https://github.com/genesis-plan/hongchen-lingjing/issues
- 网站: https://红尘灵境.com

### 🙏 致谢

感谢所有参与测试、反馈和贡献的朋友们！

---

**这是红尘灵境的第一个公开版本，一个梦想的起点。**

**This is the first public release of Hongchen Lingjing, the beginning of a dream.**

**发布人**: genesis-plan
**发布日期**: 2026-03-16
**版本**: v1.0.0
```

#### 步骤 4: 添加二进制文件（可选）

如果需要添加编译后的文件或其他二进制文件：

1. 点击 **"Attach binaries by dropping them here or selecting them"**
2. 选择要上传的文件
3. 等待上传完成

#### 步骤 5: 设置发布选项

**Set as the latest release**: 勾选（设置为最新版本）

**Set as a pre-release**: 不勾选（这是正式版本）

**Generate release notes**: 可以使用 GitHub 的自动生成功能

#### 步骤 6: 发布

点击绿色按钮 **"Publish release"**

等待几秒，Release 就会创建成功！

---

### 方法二：通过 GitHub CLI（推荐开发者）

#### 前置要求

需要先安装 GitHub CLI (gh):

```bash
# 使用 winget 安装
winget install GitHub.cli

# 或访问官网下载
# https://cli.github.com/
```

#### 步骤 1: 创建标签

```bash
cd C:\Users\Administrator\Desktop\hongchen-lingjing
C:\Users\Administrator\Desktop\git.bat tag -a v1.0.0 -m "Release v1.0.0"
```

#### 步骤 2: 推送标签

```bash
C:\Users\Administrator\Desktop\git.bat push origin v1.0.0
```

#### 步骤 3: 创建 Release

```bash
gh release create v1.0.0 --title "🎉 红尘灵境 v1.0.0 - 创世纪" --notes "See RELEASE_v1.0.0.md for details"
```

或者从文件读取说明：

```bash
gh release create v1.0.0 --title "🎉 红尘灵境 v1.0.0 - 创世纪" --notes-file RELEASE_v1.0.0.md
```

---

## ✅ 验证 Release | Verify Release

### 检查 Release 是否创建成功

1. 访问 Releases 页面：
   ```
   https://github.com/genesis-plan/hongchen-lingjing/releases
   ```

2. 应该看到：
   - ✅ Release 标题正确
   - ✅ 标签 v1.0.0 显示
   - ✅ 发布说明完整
   - ✅ 标记为"Latest release"

3. 点击标签查看详细信息：
   - ✅ 可以看到提交记录
   - ✅ 可以看到所有文件
   - ✅ Release 描述正确

---

## 📢 发布后操作 | Post-Release Actions

### 1. 更新 README.md

在 README.md 中添加版本徽章：

```markdown
![GitHub Release](https://img.shields.io/github/release/genesis-plan/hongchen-lingjing)
```

### 2. 通知社区

- 📧 发送邀请邮件（使用 PROMOTION_MATERIALS.md 中的模板）
- 📱 发布社交媒体公告（微信朋友圈、微博、Twitter）
- 💻 发布技术社区公告（掘金、SegmentFault）

### 3. 监控反馈

- 📊 查看 GitHub Stars、Forks、Issues
- 💬 回复早期反馈
- 🐛 处理 Bug 报告
- 💡 收集功能建议

### 4. 更新文档

- 📝 根据反馈更新文档
- 📸 添加实际截图
- 🎬 添加演示视频

---

## 🔧 常见问题 | FAQ

### Q: 推送标签失败？

**A**:
1. 检查网络连接
2. 确认是否登录 GitHub
3. 检查 GitHub 账号权限
4. 尝试重新推送

### Q: Release 标题显示为英文？

**A**:
1. 确认浏览器编码
2. 使用英文标题
3. 或在描述中使用中文

### Q: 如何删除 Release？

**A**:
1. 在 Release 页面找到删除按钮
2. 点击删除
3. 同时删除对应的标签
```bash
C:\Users\Administrator\Desktop\git.bat push origin :refs/tags/v1.0.0
C:\Users\Administrator\Desktop\git.bat tag -d v1.0.0
```

### Q: 如何编辑 Release？

**A**:
1. 在 Release 页面点击编辑按钮
2. 修改标题和描述
3. 保存更改

---

## 📅 时间线示例 | Timeline Example

### 发布当天

**9:00 AM** - 代码推送
```bash
C:\Users\Administrator\Desktop\git.bat push origin master
```

**9:30 AM** - 创建标签
```bash
C:\Users\Administrator\Desktop\git.bat tag -a v1.0.0 -m "Release v1.0.0"
C:\Users\Administrator\Desktop\git.bat push origin v1.0.0
```

**10:00 AM** - 创建 GitHub Release
- 访问 GitHub Releases 页面
- 点击"Draft a new release"
- 填写信息并发布

**10:30 AM** - 验证 Release
- 检查 Release 是否显示
- 验证所有链接正常

**11:00 AM** - 通知社区
- 发布社交媒体公告
- 发送邀请邮件

**全天** - 监控反馈
- 回复早期反馈
- 处理紧急问题

---

## 🎯 成功标准 | Success Criteria

### Release 成功的标准

- [x] ✅ 标签 v1.0.0 已创建
- [x] ✅ Release 已发布到 GitHub
- [x] ✅ Release 标题和描述完整
- [x] ✅ 标记为"Latest release"
- [x] ✅ 所有链接可访问
- [x] ✅ 下载功能正常

### 社区响应成功的标准

- [ ] 🎯 50+ GitHub Stars（发布后1周内）
- [ ] 🎯 100+ 网站访问（发布后1周内）
- [ ] 🎯 20+ 小程序下载（发布后1周内）
- [ ] 🎯 10+ 开发者关注（发布后1周内）

---

## 📚 相关文档 | Related Documents

- [RELEASE_v1.0.0.md](../RELEASE_v1.0.0.md) - 版本发布详细说明
- [docs/RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) - 发布检查清单
- [docs/PROMOTION_MATERIALS.md](./PROMOTION_MATERIALS.md) - 宣传材料
- [docs/USER_GUIDE.md](./USER_GUIDE.md) - 用户使用指南

---

**文档最后更新**: 2026-03-16
**维护者**: genesis-plan
**版本**: v1.0.0
