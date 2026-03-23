@echo off
chcp 65001 >nul
echo ========================================
echo    红尘灵境小程序 - 自动化部署脚本
echo ========================================
echo.

echo [步骤 1/6] 检查微信开发者工具...
if exist "C:\Program Files (x86)\Tencent\微信web开发者工具\cli.bat" (
    echo ✓ 微信开发者工具已安装
    set WECHAT_CLI="C:\Program Files (x86)\Tencent\微信web开发者工具\cli.bat"
) else if exist "%LOCALAPPDATA%\微信web开发者工具\cli.bat" (
    echo ✓ 微信开发者工具已安装
    set WECHAT_CLI="%LOCALAPPDATA%\微信web开发者工具\cli.bat"
) else (
    echo ✗ 微信开发者工具未安装
    echo.
    echo 请先下载安装微信开发者工具：
    echo https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
    echo.
    pause
    exit /b 1
)

echo.
echo [步骤 2/6] 打开微信开发者工具...
start "" "C:\Users\Administrator\Desktop\红尘灵境小程序"

echo.
echo [步骤 3/6] 等待您在微信开发者工具中操作...
echo.
echo ========================================
echo 请在微信开发者工具中完成以下操作：
echo ========================================
echo.
echo 1. 选择测试号或填入AppID
echo 2. 点击"云开发"按钮开通云开发
echo 3. 环境ID: hclj-8g46g9fd06e2a760
echo 4. 环境名称: hclj-production
echo.
echo 完成后按任意键继续...
pause >nul

echo.
echo [步骤 4/6] 项目信息...
echo 项目目录: C:\Users\Administrator\Desktop\红尘灵境小程序
echo 环境ID: hclj-8g46g9fd06e2a760
echo 云函数数量: 19个
echo 数据库集合: 15个

echo.
echo [步骤 5/6] 云函数列表...
echo ========================================
echo 需要上传的云函数（请逐个右键上传）：
echo ========================================
echo.
echo 基础功能：
echo   1. login
echo   2. getSkills
echo   3. submitWish
echo   4. saveProgress
echo   5. saveExamResult
echo   6. saveCharacter
echo   7. getUserStats
echo.
echo 扩展功能：
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

echo [步骤 6/6] 数据库集合列表...
echo ========================================
echo 需要创建的数据库集合（请在控制台创建）：
echo ========================================
echo.
echo   1. users
echo   2. skills
echo   3. wishes
echo   4. honors
echo   5. examResults
echo   6. userCharacters
echo   7. letters
echo   8. posts
echo   9. activities
echo   10. friendRequests
echo   11. friends
echo   12. marketItems
echo   13. transactions
echo   14. challenges
echo   15. challengeRecords
echo.

echo ========================================
echo 准备工作完成！
echo ========================================
echo.
echo 接下来请在微信开发者工具中：
echo.
echo 1. 对每个云函数右键 → 上传并部署：云端安装依赖
echo 2. 在云开发控制台创建15个数据库集合
echo 3. 设置权限：所有用户可读，仅创建者可写
echo 4. 点击"编译"测试运行
echo.
echo 详细步骤请查看：超简单部署流程.md
echo.
echo 按任意键打开部署文档...
pause >nul

start "" "C:\Users\Administrator\Desktop\红尘灵境小程序\超简单部署流程.md"

echo.
echo 部署脚本执行完成！祝您部署顺利！🚀
echo.
pause
