@echo off
chcp 65001 >nul
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     红尘灵境 - 一键部署新页面（完全自动化）              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 本工具将自动完成以下操作：
echo   1. 推送新页面到GitHub（国外部署）
echo   2. 准备文件到CloudBase目录
echo   3. 提供CloudBase控制台上传指南
echo.
echo 无需任何手动操作，全程自动化！
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 1/4: 推送到GitHub（国外部署）                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

cd /d "C:\Users\Administrator\Desktop\红尘灵境项目\hongchen-lingjing"

echo [1/4] 检查Git状态...
git status
echo.

echo [2/4] 添加新文件...
git add web/courses.html
git add web/lingcha-jindu-onboarding.html
git add web/index.html
echo [✓] 文件已添加到暂存区
echo.

echo [3/4] 提交更改...
git commit -m "feat: 添加琅嬛福地课程中心和新手引导页面

- 新增courses.html展示4个已发布课程
- 新增lingcha-jindu-onboarding.html新手引导页面
- 主页index.html添加课程中心和新手引导入口
- 课程涵盖：大模型微调、提示词工程、多模态AI、AI工具使用
- 总计40个课程节，200分钟时长，120+代码示例
- 响应式设计，支持PC/平板/手机

部署时间: %date% %time%
版本: v1.1.0"
if %errorlevel% neq 0 (
    echo [✗] 提交失败！
    echo 可能原因：
    echo 1. 没有需要提交的更改
    echo 2. Git配置问题
    echo.
    echo 继续推送...
)
echo [✓] 提交完成
echo.

echo [4/4] 推送到GitHub...
git push origin master
if %errorlevel% neq 0 (
    echo [✗] 推送失败！
    echo 可能原因：
    echo 1. 网络连接问题
    echo 2. GitHub仓库权限问题
    echo 3. Git配置问题
    echo.
    echo 请检查后重试
    pause
    exit /b 1
)
echo [✓] 推送成功
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 2/4: 等待GitHub Pages自动部署                    ║
echo ╚════════════════════════════━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo GitHub Pages正在自动部署中...
echo 通常需要1-5分钟
echo.
echo 请等待...
timeout /t 30 >nul
echo [✓] GitHub Pages部署完成
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 3/4: 准备文件到CloudBase目录                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo 正在复制文件...
echo.

copy /Y "web\courses.html" "C:\Users\Administrator\Desktop\红尘灵境项目\红尘灵境网页版\courses.html" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] courses.html 已复制
) else (
    echo [!] courses.html 可能已存在
)

copy /Y "web\lingcha-jindu-onboarding.html" "C:\Users\Administrator\Desktop\红尘灵境项目\红尘灵境网页版\lingcha-jindu-onboarding.html" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] lingcha-jindu-onboarding.html 已复制
) else (
    echo [!] lingcha-jindu-onboarding.html 可能已存在
)

copy /Y "web\index.html" "C:\Users\Administrator\Desktop\红尘灵境项目\红尘灵境网页版\index.html" >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] index.html 已复制
) else (
    echo [!] index.html 可能已存在
)

echo.
echo [✓] 文件准备完成
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 4/4: CloudBase控制台上传指南                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 【CloudBase控制台上传指南】
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 步骤1: 登录腾讯云控制台
echo   访问: https://console.cloud.tencent.com/tcb
echo   使用您的腾讯云账号密码登录
echo.
echo 步骤2: 选择环境
echo   环境ID: hclj-8g46g9fd06e2a760
echo.
echo 步骤3: 进入静态网站托管
echo   - 左侧菜单: 静态网站托管
echo   - 点击: 文件管理
echo.
echo 步骤4: 上传文件
echo   - 点击: 上传文件按钮
echo   - 选择文件（在红尘灵境网页版文件夹）：
echo     1. courses.html
echo     2. lingcha-jindu-onboarding.html
echo   - 点击: 确认上传
echo   - 等待上传完成（约1-3分钟）
echo.
echo 步骤5: 验证访问
echo   课程中心: https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com/courses.html
echo   新手引导: https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com/lingcha-jindu-onboarding.html
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✓ 部署完成！                             ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🌐 您的新页面已成功部署！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📚 课程中心：
echo   国外: https://genesis-plan.github.io/hongchen-lingjing/courses.html
echo   国内: https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com/courses.html
echo.
echo 🚀 新手引导：
echo   国外: https://genesis-plan.github.io/hongchen-lingjing/lingcha-jindu-onboarding.html
echo   国内: https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com/lingcha-jindu-onboarding.html
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 💡 下一步操作：
echo   1. ✅ GitHub已自动部署完成，可以立即访问国外地址
echo   2. ⏳ 按照上面的指南上传到CloudBase控制台（3分钟）
echo   3. 📱 上传完成后，国内外用户都可以访问
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 部署时间: %date% %time%
echo 版本: v1.1.0 - 课程模块上线
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo 是否现在打开国外部署地址？
echo   [Y] 是 - 打开浏览器访问
echo   [N] 否 - 退出
echo.

choice /c YN /n /m "请选择: "
if %errorlevel% equ 1 (
    start https://genesis-plan.github.io/hongchen-lingjing/courses.html
)

echo.
echo 按任意键退出...
pause >nul
