#!/bin/bash
# 重命名根目录英文文件为中文

cd /root/.openclaw/workspace

echo "开始重命名根目录英文文件..."

# 重命名JS文件
mv 3d-building-models.js 3D建筑模型.js 2>/dev/null || echo "3d-building-models.js 可能不存在"
mv api.js 接口服务.js 2>/dev/null || echo "api.js 可能不存在"
mv app.js 应用主程序.js 2>/dev/null || echo "app.js 可能不存在"
mv auto-deploy.js 自动部署.js 2>/dev/null || echo "auto-deploy.js 可能不存在"
mv smart-assistant-integration.js 智能助手集成.js 2>/dev/null || echo "smart-assistant-integration.js 可能不存在"

# 重命名配置文件
mv cloudbaserc.json 腾讯云配置.json 2>/dev/null || echo "cloudbaserc.json 可能不存在"
mv package-lock.json 包锁定.json 2>/dev/null || echo "package-lock.json 可能不存在"

# 重命名HTML文件
mv index.html 首页.html 2>/dev/null || echo "index.html 可能存在或需要特殊处理"
mv privacy-policy.html 隐私政策.html 2>/dev/null || echo "privacy-policy.html 可能不存在"
mv terms-of-service.html 服务条款.html 2>/dev/null || echo "terms-of-service.html 可能不存在"
mv threejs-demo.html 3D演示.html 2>/dev/null || echo "threejs-demo.html 可能不存在"
mv update-index.html 更新首页.html 2>/dev/null || echo "update-index.html 可能不存在"

echo "重命名完成！"
echo ""
echo "需要更新的文件引用："
echo "- package.json 中的 main 字段"
echo "- 任何引用这些文件的代码"
