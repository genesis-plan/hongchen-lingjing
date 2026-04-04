@echo off
chcp 65001 > nul
echo ====================================
echo 红尘灵境 - Git提交推送脚本
echo ====================================
echo.

cd /d "C:\Users\Administrator\Desktop\红尘灵境项目\hongchen-lingjing"

echo [1/5] 检查Git状态...
git status
echo.

echo [2/5] 添加新文件...
git add web/courses.html
git add web/lingcha-jindu-onboarding.html
git add web/index.html
echo ✅ 文件已添加到暂存区
echo.

echo [3/5] 提交更改...
git commit -m "feat: 添加琅嬛福地课程中心和新手引导页面

- 新增courses.html展示4个已发布课程
- 新增lingcha-jindu-onboarding.html新手引导页面
- 主页index.html添加课程中心和新手引导入口
- 课程涵盖：大模型微调、提示词工程、多模态AI、AI工具使用
- 总计40个课程节，200分钟时长，120+代码示例
- 响应式设计，支持PC/平板/手机
- 4步新手引导流程，包含新手礼包展示"
if %errorlevel% neq 0 (
    echo ❌ 提交失败！
    pause
    exit /b 1
)
echo ✅ 提交成功
echo.

echo [4/5] 推送到GitHub...
git push origin master
if %errorlevel% neq 0 (
    echo ❌ 推送失败！
    echo 请检查网络连接和GitHub仓库状态
    pause
    exit /b 1
)
echo ✅ 推送成功
echo.

echo [5/5] 部署完成！
echo.
echo ====================================
echo 🎉 部署成功完成！
echo ====================================
echo.
echo 📱 访问地址：
echo   - 主页: https://genesis-plan.github.io/hongchen-lingjing/
echo   - 课程中心: https://genesis-plan.github.io/hongchen-lingjing/courses.html
echo   - 新手引导: https://genesis-plan.github.io/hongchen-lingjing/lingcha-jindu-onboarding.html
echo.
echo ⏳ GitHub Pages正在自动部署，预计1-5分钟后可访问
echo.
echo 按任意键退出...
pause > nul
