@echo off
chcp 65001 >nul
title 红尘灵境小程序 - 全自动配置助手
echo.
echo ========================================
echo   红尘灵境小程序 - 全自动配置助手
echo ========================================
echo.

REM 检查项目配置文件
if exist "C:\Users\Administrator\Desktop\红尘灵境小程序\project.config.json" (
    echo [✓] 找到项目配置文件
) else (
    echo [✗] 未找到项目配置文件
    pause
    exit /b 1
)

echo.
echo ========================================
echo   当前项目配置信息
echo ========================================
echo.
echo 项目位置: C:\Users\Administrator\Desktop\红尘灵境小程序
echo 云开发环境ID: hclj-8g46g9fd06e2a760
echo 环境名称: hclj-production
echo 页面数量: 15个
echo 云函数数量: 19个
echo 数据库集合: 15个
echo.

echo ========================================
echo   云函数列表
echo ========================================
echo.
echo 基础功能（7个）:
echo   1. login
echo   2. getSkills
echo   3. submitWish
echo   4. saveProgress
echo   5. saveExamResult
echo   6. saveCharacter
echo   7. getUserStats
echo.
echo 扩展功能（12个）:
echo   8. createSkill
echo   9. askAI
echo   10. getLetters
echo   11. sendLetter
echo   12. markLetterRead
echo   13. getPosts
echo   14. createPost
echo   15. getActivities
echo   16. joinActivity
echo   17. sendFriendRequest
echo   18. getFriendRequests
echo   19. acceptFriendRequest
echo.

echo ========================================
echo   数据库集合列表
echo ========================================
echo.
echo   1. users              2. skills
echo   3. wishes             4. honors
echo   5. examResults        6. userCharacters
echo   7. letters            8. posts
echo   9. activities         10. friendRequests
echo   11. friends           12. marketItems
echo   13. transactions      14. challenges
echo   15. challengeRecords
echo.

echo ========================================
echo   操作步骤指南
echo ========================================
echo.
echo 步骤 1/5: 在微信开发者工具中选择测试号
echo   - AppID 下拉菜单
echo   - 选择 "测试号"
echo.
echo 步骤 2/5: 开通云开发
echo   - 点击 "云开发" 按钮
echo   - 选择 "按量付费"
echo   - 环境名称: hclj-production
echo   - 环境ID: hclj-8g46g9fd06e2a760
echo.
echo 步骤 3/5: 上传19个云函数
echo   - 右键 cloudfunctions 下的每个云函数文件夹
echo   - 选择 "上传并部署：云端安装依赖"
echo   - 等待所有图标变成绿色云朵
echo.
echo 步骤 4/5: 创建15个数据库集合
echo   - 云开发控制台 -> 数据库 -> 添加集合
echo   - 依次创建15个集合（见上方列表）
echo   - 权限设置: 所有用户可读，仅创建者可写
echo.
echo 步骤 5/5: 编译测试
echo   - 点击 "编译" 按钮
echo   - 测试基本功能
echo.

echo ========================================
echo   准备打开详细教程...
echo ========================================
echo.

timeout /t 2 >nul

REM 打开详细教程
start "" "C:\Users\Administrator\Desktop\红尘灵境小程序\详细部署教程.md"

echo.
echo 详细教程已打开！
echo 请按照教程中的步骤操作即可。
echo.
echo 按任意键退出...
pause >nul
