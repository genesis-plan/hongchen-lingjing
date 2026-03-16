@echo off
chcp 65001 >nul
title 红尘灵境小程序 - 自动化部署云函数
echo.
echo ========================================
echo 红尘灵境小程序 - 自动化部署云函数
echo ========================================
echo.

REM 设置环境变量
set WECHAT_CLI="D:\微信web开发者工具\cli.bat"
set PROJECT_PATH=C:\Users\Administrator\Desktop\红尘灵境小程序
set CLOUD_FUNCTIONS_PATH=%PROJECT_PATH%\cloudfunctions

echo 项目路径: %PROJECT_PATH%
echo 云函数路径: %CLOUD_FUNCTIONS_PATH%
echo.
echo ========================================
echo 开始上传云函数...
echo ========================================
echo.

REM 需要上传的云函数列表
set FUNCTIONS=login getSkills submitWish saveProgress saveExamResult saveCharacter createSkill askAI getLetters sendLetter markLetterRead getPosts createPost getActivities joinActivity sendFriendRequest getFriendRequests acceptFriendRequest

REM 遍历所有云函数
for %%f in (%FUNCTIONS%) do (
    echo.
    echo [1/2] 上传云函数: %%f
    echo.
    echo 正在上传...
    call %WECHAT_CLI% --upload --path %CLOUD_FUNCTIONS_PATH%\%%f --envId hclj-8g46g9fd06e2a760
    echo.
    echo [2/2] 等待上传完成...
    echo.
    timeout /t 3 >nul
)

echo.
echo ========================================
echo 云函数上传完成！
echo ========================================
echo.
echo 请检查微信开发者工具中的云函数图标
echo 是否都变成了绿色的云朵
echo.
pause
