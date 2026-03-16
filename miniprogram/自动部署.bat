@echo off
chcp 65001 >nul
echo ========================================
echo 红尘灵境小程序 - 自动化部署脚本
echo ========================================
echo.

echo [1/5] 正在下载微信开发者工具...
echo.
echo 请按照以下步骤操作：
echo.
echo 1. 点击下方链接下载微信开发者工具
echo https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
echo.
echo 2. 下载完成后，安装微信开发者工具
echo 3. 安装完成后，重新运行此脚本
echo.

pause

echo.
echo ========================================
echo 微信开发者工具下载地址：
echo https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
echo ========================================
echo.

start https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

echo 浏览器已自动打开，请下载并安装微信开发者工具
echo.
pause
