#!/bin/bash
# 红尘灵境小程序 - 命令行自动部署脚本

echo "========================================"
echo "红尘灵境小程序 - 命令行自动部署"
echo "========================================"
echo ""

# 设置微信开发者工具路径
WECHAT_DEVTOOLS_PATH="D:\微信web开发者工具"
PROJECT_PATH="C:\Users\Administrator\Desktop\红尘灵境小程序"

echo "项目路径: $PROJECT_PATH"
echo "微信开发者工具路径: $WECHAT_DEVTOOLS_PATH"
echo ""

# 尝试使用CLI命令
echo "尝试打开项目..."
"D:\微信web开发者工具\cli.bat" --open "C:\Users\Administrator\Desktop\红尘灵境小程序"

echo ""
echo "微信开发者工具应该已经打开了！"
echo ""
