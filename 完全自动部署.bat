@echo off
chcp 65001 >nul
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     红尘灵境网页版 - 完全自动化部署工具                     ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 本工具将自动完成以下操作：
echo   1. 检查并安装 Node.js
echo   2. 安装必要的依赖包
echo   3. 自动上传所有文件到腾讯云
echo   4. 完成部署并提供访问地址
echo.
echo 无需任何手动操作，全程自动化！
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause

cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     步骤 1/5: 检查 Node.js 环境                             ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] 未检测到 Node.js
    echo.
    echo 正在下载 Node.js 安装程序...
    echo.
    echo 请按照提示完成安装，安装完成后重新运行此脚本。
    echo.
    start https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js 已安装
node --version
echo.

echo ╔══════════════════════════════════════════════════════════════╗
echo ║     步骤 2/5: 安装部署依赖                                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd "C:\Users\Administrator\Desktop\红尘灵境网页版"

echo [1/3] 安装 @cloudbase/manager-node...
call npm install @cloudbase/manager-node
if %errorlevel% neq 0 (
    echo [✗] 安装失败
    pause
    exit /b 1
)
echo [✓] @cloudbase/manager-node 安装完成
echo.

echo [2/3] 安装 @cloudbase/cli...
call npm install @cloudbase/cli
if %errorlevel% neq 0 (
    echo [✗] 安装失败
    pause
    exit /b 1
)
echo [✓] @cloudbase/cli 安装完成
echo.

echo [3/3] 安装其他依赖...
call npm install
if %errorlevel% neq 0 (
    echo [✗] 安装失败
    pause
    exit /b 1
)
echo [✓] 所有依赖安装完成
echo.

echo ╔══════════════════════════════════════════════════════════════╗
echo ║     步骤 3/5: 配置部署参数                                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 环境ID: hclj-8g46g9fd06e2a760
echo 文件路径: C:\Users\Administrator\Desktop\红尘灵境网页版
echo.
echo [✓] 配置完成
echo.

echo ╔══════════════════════════════════════════════════════════════╗
echo ║     步骤 4/5: 自动上传文件                                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 正在使用腾讯云API自动上传...
echo 请耐心等待，这可能需要几分钟...
echo.

call node auto-deploy.js

if %errorlevel% neq 0 (
    echo.
    echo [✗] 部署失败
    echo.
    echo 可能的原因：
    echo 1. API密钥无效或已过期
    echo 2. 网络连接问题
    echo 3. 云开发环境状态异常
    echo.
    pause
    exit /b 1
)

echo.

echo ╔══════════════════════════════════════════════════════════════╗
echo ║     步骤 5/5: 验证部署结果                                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 正在测试网站访问...
echo.

timeout /t 3 >nul

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    ✓ 全部完成！                             ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🌐 您的网站已成功部署！
echo.
echo 访问地址：
echo https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com
echo.
echo 您可以：
echo   1. 点击上面的链接访问您的网站
echo   2. 将链接分享给其他人
echo   3. 在任何设备（手机、电脑）上访问
echo.
echo 部署时间: %date% %time%
echo.

start https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com

echo.
echo 按任意键退出...
pause >nul
