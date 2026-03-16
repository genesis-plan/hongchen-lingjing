# 项目架构 | Project Architecture

## 📁 目录结构 | Directory Structure

```
hongchen-lingjing/
├── 📖 docs/                     # 文档目录
│   ├── architecture.md         # 架构设计文档
│   ├── api.md                  # API 接口文档
│   ├── database.md             # 数据库设计
│   └── deployment.md          # 部署文档
│
├── 🌐 web/                     # 网页版项目
│   ├── index.html              # 主页
│   ├── login.html              # 登录页面
│   ├── register.html           # 注册页面
│   ├── privacy-policy.html     # 隐私政策
│   ├── terms-of-service.html   # 服务条款
│   ├── age-verification.html  # 年龄验证
│   ├── styles.css              # 样式文件
│   ├── app.js                  # 主应用脚本
│   ├── pages/                  # 页面目录
│   │   ├── library.html        # 技能图书馆
│   │   └── practice.html      # 实践场
│   └── auto-deploy.js          # 自动部署脚本
│
├── 📱 miniprogram/            # 微信小程序
│   ├── app.js                  # 小程序主文件
│   ├── app.json                # 小程序配置
│   ├── pages/                  # 页面目录
│   │   ├── home/              # 首页
│   │   ├── library/           # 技能图书馆
│   │   ├── practice/          # 实践场
│   │   ├── market/            # 技能市场
│   │   ├── social/            # 社交中心
│   │   ├── economy/           # 经济系统
│   │   ├── honor/             # 荣誉殿堂
│   │   ├── exam/              # 技能认证
│   │   ├── letters/           # 书信系统
│   │   ├── space/             # 个人空间
│   │   └── landing/           # 引导页
│   ├── cloudfunctions/        # 云函数
│   │   ├── login/             # 登录验证
│   │   ├── register/          # 用户注册
│   │   ├── createSkill/       # 创建技能
│   │   ├── askAI/             # AI对话
│   │   └── ...                # 更多云函数
│   └── database-init.js       # 数据库初始化
│
├── 📂 红尘灵境/               # 文档资产
│   ├── 1号.docx               # 核心文档
│   ├── 2号.docx
│   └── ...                    # 14份文档
│
├── 🎨 assets/                 # 图片资源
│   ├── 版权证书.png
│   ├── 数字分身.png
│   └── 生成灵槎津渡插画 (1).png
│
├── 🔧 scripts/                # 部署脚本
│   └── full-deploy.bat        # 一键部署脚本
│
├── 📝 README.md               # 项目说明
├── 📜 LICENSE                 # MIT 许可证
├── 📋 CONTRIBUTING.md         # 贡献指南
├── 📖 COPYRIGHT.md            # 版权声明
└── 🚀 TECHNICAL_ROADMAP.md   # 技术路线图
```

## 🏗️ 技术架构 | Technical Architecture

### 前端架构 | Frontend Architecture

#### 网页版 (Web Version)
- **技术栈**: HTML5 + CSS3 + Vanilla JavaScript
- **3D引擎**: Three.js
- **部署**: 腾讯云 CloudBase 静态托管
- **域名**: https://红尘灵境.com

#### 微信小程序 (WeChat Mini Program)
- **技术栈**: 原生小程序框架
- **云开发**: 腾讯云 CloudBase
- **环境ID**: hclj-8g46g9fd06e2a760
- **数据库**: 15个集合（users, skills, wishes 等）

### 后端架构 | Backend Architecture

#### 云函数 (Cloud Functions)
- **用户认证**: login, register, logout
- **技能系统**: createSkill, getSkill, updateSkill
- **AI对话**: askAI
- **社交功能**: sendFriendRequest, acceptFriendRequest
- **内容管理**: createPost, getActivities
- **经济系统**: getEconomyData, updatePoints

#### 数据库设计 | Database Design
```
users          # 用户表
skills         # 技能表
wishes         # 愿望表
posts          # 帖子表
friends        # 好友关系
points         # 积分系统
certificates   # 技能证书
exams          # 考试记录
letters        # 书信系统
market         # 技能市场
activities     # 活动记录
notifications  # 通知系统
statistics     # 统计数据
invite_codes   # 邀请码
```

### 部署架构 | Deployment Architecture

```
┌─────────────────┐
│  用户访问层      │
│  (Web/小程序)    │
└────────┬────────┘
         │
┌────────▼────────┐
│  腾讯云 CloudBase│
│  ┌────────────┐ │
│  │ 静态托管   │ │  ← 网页版
│  ├────────────┤ │
│  │ 云函数     │ │  ← 业务逻辑
│  ├────────────┤ │
│  │ 数据库     │ │  ← 数据存储
│  └────────────┘ │
└─────────────────┘
```

## 🔐 安全架构 | Security Architecture

- **身份验证**: 微信授权登录
- **数据加密**: HTTPS + 数据库加密
- **访问控制**: 云函数权限管理
- **合规认证**:
  - 隐私政策
  - 服务条款
  - 年龄验证
  - ICP备案（进行中）

## 📊 数据流 | Data Flow

```
用户操作 → 前端界面 → 云函数 → 数据库
         ↓           ↓         ↓
    界面反馈   业务逻辑处理   数据持久化
```

## 🚀 开发流程 | Development Workflow

1. **本地开发**: 在 web/ 或 miniprogram/ 目录开发
2. **测试验证**: 使用云开发环境测试
3. **代码提交**: Git 提交到 GitHub
4. **自动部署**: 使用部署脚本推送到云端
5. **线上监控**: CloudBase 监控系统

## 📈 性能优化 | Performance Optimization

- **静态资源**: CDN加速
- **数据库**: 索引优化
- **云函数**: 冷启动优化
- **前端**: 代码压缩、懒加载

---

**最后更新**: 2026-03-16  
**维护者**: genesis-plan
