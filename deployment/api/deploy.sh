#!/bin/bash

echo "开始部署红尘灵境后端服务..."

# 安装依赖
npm install

# 创建生产环境变量文件
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
DB_HOST=159.75.154.206
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hongchen_lingjing
DB_PORT=3306
JWT_SECRET=hongchen_production_secret_2026
EOF

# 启动服务
npm start

echo "部署完成！服务运行于端口 3000"