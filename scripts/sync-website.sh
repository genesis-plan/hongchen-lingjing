#!/bin/bash
# 红尘灵境网站同步脚本
# 版本: v1.3.0
# 日期: 2026-03-30

echo "========================================"
echo "红尘灵境网站同步脚本"
echo "版本: v1.3.0"
echo "日期: 2026-03-30"
echo "========================================"

# 设置变量
WORKSPACE="/root/.openclaw/workspace"
GITHUB_REPO="https://github.com/genesis-plan/hongchen-lingjing.git"
WEB_DIR="$WORKSPACE/hongchen-lingjing/web"

echo ""
echo "1. 进入工作目录..."
cd "$WORKSPACE" || exit 1

echo ""
echo "2. 检查Git仓库..."
if [ ! -d "hongchen-lingjing" ]; then
    echo "仓库不存在，正在克隆..."
    git clone "$GITHUB_REPO" hongchen-lingjing
    cd hongchen-lingjing
else
    echo "仓库已存在，正在拉取最新代码..."
    cd hongchen-lingjing
    git fetch origin
    git reset --hard origin/main
fi

echo ""
echo "3. 检查web目录..."
if [ -d "$WEB_DIR" ]; then
    echo "web目录存在，正在更新..."
    # 复制最新文件到服务器部署目录
    cp -r "$WEB_DIR"/* /var/www/html/
    echo "文件已复制到 /var/www/html/"
else
    echo "错误：web目录不存在"
    exit 1
fi

echo ""
echo "4. 重启Nginx服务（如果使用Nginx）..."
systemctl reload nginx 2>/dev/null || echo "Nginx未安装或未运行"

echo ""
echo "========================================"
echo "✅ 网站同步完成！"
echo "版本: v1.3.0"
echo "更新时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================"
