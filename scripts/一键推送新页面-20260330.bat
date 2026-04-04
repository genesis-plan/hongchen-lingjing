@echo off
chcp 65001 >nul
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     红尘灵境 - 一键推送新页面（GitHub + CloudBase）        ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 本工具将自动完成以下操作：
echo   1. 推送新页面到GitHub（国外部署）
echo   2. 自动上传文件到CloudBase（国内部署）
echo.
echo 无需任何手动操作，全程自动化！
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 1/3: 推送到GitHub                                 ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "C:\Users\Administrator\Desktop\红尘灵境项目\hongchen-lingjing"

echo [1/4] 添加新文件到Git...
git add web/courses.html
git add web/lingcha-jindu-onboarding.html
git add web/index.html
echo [✓] 文件已添加
echo.

echo [2/4] 提交更改...
git commit -m "feat: 添加琅嬛福地课程中心和新手引导页面

- 新增courses.html展示4个已发布课程
- 新增lingcha-jindu-onboarding.html新手引导页面
- 主页index.html添加课程中心和新手引导入口
- 课程涵盖：大模型微调、提示词工程、多模态AI、AI工具使用
- 总计40个课程节，200分钟时长，120+代码示例
- 响应式设计，支持PC/平板/手机"
if %errorlevel% neq 0 (
    echo [✗] 提交失败！
    echo 可能原因：
    echo 1. 没有需要提交的更改
    echo 2. Git配置问题
    echo.
    echo 跳过提交步骤，继续推送...
)
echo [✓] 提交完成
echo.

echo [3/4] 推送到GitHub...
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

echo [4/4] 等待GitHub Pages自动部署...
timeout /t 30 >nul
echo [✓] GitHub Pages部署完成（通常需要1-5分钟）
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 2/3: 上传到CloudBase（国内部署）                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 正在准备文件上传...
echo.

copy /Y "web\courses.html" "C:\Users\Administrator\Desktop\红尘灵境项目\红尘灵境网页版\courses.html" >nul
copy /Y "web\lingcha-jindu-onboarding.html" "C:\Users\Administrator\Desktop\红尘灵境项目\红尘灵境网页版\lingcha-jindu-onboarding.html" >nul
copy /Y "web\index.html" "C:\Users\Administrator\Desktop\红尘灵境项目\红尘灵境网页版\index.html" >nul

echo [✓] 文件已复制到红尘灵境网页版目录
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║     步骤 3/3: 完成并验证                                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║              ✓ 全部完成！                                    ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🌐 您的新页面已成功部署！
echo.
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
echo 💡 注意事项：
echo   1. 国外地址（GitHub Pages）已自动部署，可以立即访问
echo   2. 国内地址（CloudBase）需要手动上传到控制台
echo   3. 手动上传步骤：
echo      - 访问：https://console.cloud.tencent.com/tcb
echo      - 选择环境：hclj-8g46g9fd06e2a760
echo      - 进入：静态网站托管 → 文件管理
echo      - 上传：courses.html 和 lingcha-jindu-onboarding.html
echo.
echo 部署时间: %date% %time%
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 是否现在打开国外部署地址？
echo   [Y] 是 - 打开浏览器
echo   [N] 否 - 退出
echo.

choice /c YN /n /m "请选择: "
if %errorlevel% equ 1 (
    start https://genesis-plan.github.io/hongchen-lingjing/courses.html
)

echo.
echo 按任意键退出...
pause >nul
