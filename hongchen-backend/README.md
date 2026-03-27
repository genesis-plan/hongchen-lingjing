# 红尘灵境后端服务

## 项目概述
基于Node.js + Express的后端API服务，为红尘灵境网页版提供用户认证、技能管理、学习进度跟踪等核心功能。

## 技术栈
- Node.js + Express
- MySQL + Sequelize ORM
- JWT身份认证
- Docker容器化

## API接口
- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录
- GET /api/skills - 技能列表
- GET /api/skills/:id - 技能详情
- GET /api/progress/:userId - 用户进度
- PUT /api/progress/:userId/:skillId - 更新进度

## 部署方式
1. 安装依赖：npm install
2. 配置环境变量：复制.env.production
3. 启动服务：npm start
4. 或使用Docker：docker build -t hongchen-backend .

## 服务器配置
- 目标服务器：159.75.154.206
- 端口：3000
- 数据库：hongchen_lingjing