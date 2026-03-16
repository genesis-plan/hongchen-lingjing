# 红尘灵境小程序 - 使用指南

## 项目简介

红尘灵境是一个技能传承元宇宙小程序，旨在让技能突破时空、师资、体感限制，实现全球无壁垒传承。

## 核心功能 - 十四殿

### 1. 🚪 灵槎津渡
用户登录入口，生成匿名身份，开启灵境之旅。

### 2. 📜 琅嬛福地
技能图书馆，浏览、搜索、学习各类传统技能。

### 3. 📋 考工实训庐
技能实操练习，分步骤学习技能要领。

### 4. ⚖️ 百炼鉴心台
考核认证，通过测验获得技能证书。

### 5. 🛠️ 天工开物坊
技能创作，将自己的技能转化为可传承的典籍。

### 6. 🧠 神机枢阁
AI智慧中枢，提供智能问答和技能推荐。

### 7. 👥 群贤毕至堂
社区共治，发起提案参与平台治理。

### 8. 🏆 荣光麟阁
荣誉殿堂，展示获得的成就和证书。

### 9. 🕊️ 青鸟星驿
时空交互，给古人或未来的自己写信。

### 10. ☯️ 两仪墟市
社交休闲，热门话题推荐和交流。

### 11. 🌐 万象璇玑阁
资源中枢，发布需求或寻找合作伙伴。

### 12. 💰 泉府通衢
经济市场，作品价值展示和交易。

### 13. 🪷 芥子藏虚
个人空间，定制灵相和生成足迹故事。

### 14. 🌟 星枢问道台
活动挑战，参与赛季挑战赢取荣誉。

## 技术架构

### 前端
- 微信小程序原生框架
- 云开发 SDK
- 微信云开发能力

### 后端
- 微信云函数
- 云数据库
- 云存储

### 数据库设计

#### users（用户表）
```javascript
{
  _id: String,
  userId: String,           // 用户唯一ID
  openid: String,           // 微信openid
  userInfo: Object,         // 用户信息
  createTime: Date,         // 创建时间
  lastLoginTime: Date,     // 最后登录时间
  skills: Array,           // 学习的技能列表
  progress: Object,         // 学习进度
  honor: Array,            // 荣誉列表
  character: Object        // 灵相配置
}
```

#### skills（技能表）
```javascript
{
  _id: String,
  name: String,            // 技能名称
  icon: String,            // 技能图标
  desc: String,            // 技能描述
  category: String,         // 技能分类
  difficulty: String,      // 难度等级
  steps: Array,            // 学习步骤
  questions: Array,        // 考核题目
  learners: Number         // 学习人数
}
```

#### wishes（心愿表）
```javascript
{
  _id: String,
  userId: String,           // 用户ID
  wish: String,            // 心愿内容
  status: String,          // 状态
  createTime: Date         // 创建时间
}
```

#### honors（荣誉表）
```javascript
{
  _id: String,
  userId: String,           // 用户ID
  honorId: String,         // 荣誉ID
  honorName: String,       // 荣誉名称
  obtainTime: Date         // 获得时间
}
```

#### examResults（考核结果表）
```javascript
{
  _id: String,
  userId: String,           // 用户ID
  examId: String,           // 考核ID
  examName: String,         // 考核名称
  score: Number,            // 得分
  totalScore: Number,       // 总分
  passed: Boolean,          // 是否通过
  examTime: Date            // 考核时间
}
```

## 部署步骤

### 1. 准备工作

- 下载并安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 注册微信小程序账号，获取 AppID
- 开通微信云开发

### 2. 创建项目

1. 打开微信开发者工具
2. 新建小程序项目
3. 填入 AppID
4. 后端服务选择"微信云开发"
5. 填入云开发环境ID：`hclj-8g46g9fd06e2a760`

### 3. 初始化数据库

在微信云开发控制台创建以下集合（表）：
- users（用户表）
- skills（技能表）
- wishes（心愿表）
- honors（荣誉表）
- examResults（考核结果表）

### 4. 上传云函数

右键点击 `cloudfunctions` 文件夹，选择"上传并部署：云端安装依赖"所有云函数：
- login（登录云函数）
- getSkills（获取技能列表）
- submitWish（提交心愿）
- saveProgress（保存学习进度）
- saveExamResult（保存考核结果）
- saveCharacter（保存灵相）

### 5. 配置小程序

1. 修改 `project.config.json` 中的 AppID
2. 修改 `app.js` 中的云开发环境ID

### 6. 上传小程序

点击工具栏的"上传"按钮，填写版本号和备注，上传小程序代码。

### 7. 提交审核

在微信公众平台提交小程序审核，审核通过后即可发布。

## 测试账号

暂无测试账号，需要使用真实的微信账号进行测试。

## 开发说明

### 目录结构

```
红尘灵境小程序/
├── app.js                    # 小程序主入口
├── app.json                  # 小程序全局配置
├── app.wxss                  # 全局样式
├── sitemap.json             # 站点地图
├── project.config.json      # 项目配置
├── cloudfunctions/          # 云函数目录
│   ├── login/              # 登录云函数
│   ├── getSkills/          # 获取技能列表
│   ├── submitWish/         # 提交心愿
│   └── ...
├── pages/                  # 页面目录
│   ├── landing/            # 灵槎津渡（登岸页）
│   ├── home/               # 首页
│   ├── library/            # 琅嬛福地
│   ├── practice/           # 考工实训庐
│   ├── exam/               # 百炼鉴心台
│   ├── honor/              # 荣光麟阁
│   ├── space/              # 芥子藏虚
│   └── ...                 # 其他页面
└── images/                 # 图片资源
    └── tab/                # 底部导航图标
```

### 云函数开发

每个云函数都需要：
1. `index.js` - 云函数入口文件
2. `package.json` - 依赖配置
3. 上传并部署到云端

### 页面开发

每个页面包含：
1. `.wxml` - 页面结构
2. `.js` - 页面逻辑
3. `.wxss` - 页面样式
4. `.json` - 页面配置

## 用户测试

### 测试流程

1. **用户注册**
   - 打开小程序
   - 点击"灵槎登岸"
   - 授权获取用户信息
   - 生成匿名ID

2. **技能学习**
   - 进入琅嬛福地
   - 浏览技能列表
   - 选择技能开始学习

3. **技能练习**
   - 进入考工实训庐
   - 按步骤完成练习
   - 完成所有步骤

4. **技能考核**
   - 进入百炼鉴心台
   - 参加技能考核
   - 通过考核获得证书

5. **查看荣誉**
   - 进入荣光麟阁
   - 查看获得的荣誉
   - 查看学习统计

6. **定制灵相**
   - 进入芥子藏虚
   - 选择服饰、配饰、纹饰
   - 保存灵相配置
   - 生成足迹故事

### 测试要点

- [ ] 用户登录流程是否顺畅
- [ ] 技能搜索和筛选是否正常
- [ ] 学习步骤是否清晰易懂
- [ ] 考核题目是否合理
- [ ] 荣誉获取是否正确
- [ ] 灵相定制是否保存成功
- [ ] 云函数调用是否正常
- [ ] 数据存储是否完整
- [ ] 页面跳转是否流畅
- [ ] UI样式是否美观

## 常见问题

### Q1: 云函数调用失败？
A: 检查云开发环境ID是否正确，云函数是否已上传部署。

### Q2: 数据无法保存？
A: 检查数据库权限设置，确保云函数有读写权限。

### Q3: 页面跳转失败？
A: 检查页面路径是否正确，tab页面需要使用 switchTab。

### Q4: 样式显示异常？
A: 检查 rpx 单位是否正确，小程序使用 rpx 而非 px。

## 更新日志

### v1.0.0 (2026-03-12)
- ✅ 完成基础架构搭建
- ✅ 实现核心功能：登录、技能库、练习、考核
- ✅ 实现个人空间和荣誉系统
- ✅ 集成微信云开发
- ✅ 准备用户测试

## 联系方式

- 项目地址：https://github.com/genesis-plan/hongchen-lingjing
- 邮箱：hongchen@lingjing.com
- 网页版：https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com

---

**红尘灵境 - 技能传承元宇宙**

让技能突破时空、师资、体感限制，实现全球无壁垒传承！
