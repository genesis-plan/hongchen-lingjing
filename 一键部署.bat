@echo off
chcp 65001 >nul
echo ========================================
echo    红尘灵境网页版 - 自动部署工具
echo ========================================
echo.

echo [1/4] 检查必要文件...
if exist "C:\Users\Administrator\Desktop\红尘灵境网页版\index.html" (
    echo ✓ index.html 存在
) else (
    echo ✗ index.html 不存在，请确认文件位置
    pause
    exit /b 1
)

if exist "C:\Users\Administrator\Desktop\红尘灵境网页版\styles.css" (
    echo ✓ styles.css 存在
) else (
    echo ✗ styles.css 不存在
    pause
    exit /b 1
)

if exist "C:\Users\Administrator\Desktop\红尘灵境网页版\app.js" (
    echo ✓ app.js 存在
) else (
    echo ✗ app.js 不存在
    pause
    exit /b 1
)

echo.
echo [2/4] 检查 Node.js 环境...
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Node.js 已安装
    node --version
) else (
    echo ✗ 未检测到 Node.js
    echo.
    echo ========================================
    echo    需要安装 Node.js 才能自动部署
    echo ========================================
    echo.
    echo 方案1: 安装 Node.js（推荐）
    echo   1. 访问 https://nodejs.org/
    echo   2. 下载并安装 LTS 版本
    echo   3. 重新运行此脚本
    echo.
    echo 方案2: 手动上传（无需安装任何东西）
    echo   1. 打开浏览器，访问: https://console.cloud.tencent.com/tcb
    echo   2. 登录腾讯云账号
    echo   3. 进入云开发，选择环境: hclj-8g46g9fd06e2a760
    echo   4. 左侧菜单点击"静态网站托管"
    echo   5. 点击"上传文件"
    echo   6. 选择 C:\Users\Administrator\Desktop\红尘灵境网页版\ 下的所有文件
    echo.
    pause
    exit /b 1
)

echo.
echo [3/4] 检查 npm 和 tcb 命令...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ npm 不存在
    pause
    exit /b 1
)

where tcb >nul 2>&1
if %errorlevel% neq 0 (
    echo 正在安装腾讯云 CLI 工具...
    call npm install -g @cloudbase/cli
    if %errorlevel% neq 0 (
        echo ✗ 安装失败
        pause
        exit /b 1
    )
)

echo ✓ 腾讯云 CLI 工具已就绪

echo.
echo [4/4] 开始上传文件...
echo.
echo 正在登录腾讯云...
echo.
echo 请打开手机微信，扫描下方二维码登录：
echo.
call tcb login

if %errorlevel% neq 0 (
    echo.
    echo 登录失败，请重试
    pause
    exit /b 1
)

echo.
echo 登录成功！
echo.
echo 正在上传文件到云开发环境...
echo.

cd "C:\Users\Administrator\Desktop\红尘灵境网页版"
call tcb hosting deploy hclj-8g46g9fd06e2a760 -e hclj-8g46g9fd06e2a760

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    ✓ 部署成功！
    echo ========================================
    echo.
    echo 访问地址：https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com
    echo.
    echo 现在可以点击上面的链接查看您的网站了！
) else (
    echo.
    echo ========================================
    echo    部署失败
    echo ========================================
    echo.
    echo 请检查错误信息，或使用手动上传方式
)

echo.
pause
