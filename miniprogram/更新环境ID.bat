@echo off
chcp 65001 >nul
title 更新云函数环境ID
echo.
echo ========================================
echo 红尘灵境小程序 - 更新云函数环境ID
echo ========================================
echo.

echo 旧环境ID: hclj-8g46g9fd06e2a760
echo 新环境ID: cloud1-6g38qqfz90d5e5d1
echo.

echo 正在更新所有云函数的环境ID...
echo.

cd "C:\Users\Administrator\Desktop\红尘灵境小程序\cloudfunctions"

REM 逐个更新每个云函数
for /d %%d in (*) do (
    echo 正在更新: %%d
    cd "%%d"
    if exist index.js (
        powershell -Command "(Get-Content index.js) -replace 'hclj-8g46g9fd06e2a760', 'cloud1-6g38qqfz90d5e5d1' | Set-Content index.js"
        echo ✓ %%d 已更新
    )
    cd ..
)

echo.
echo ========================================
echo 所有云函数环境ID已更新完成！
echo ========================================
echo.
echo 现在可以在微信开发者工具中重新上传云函数了
echo.
pause
