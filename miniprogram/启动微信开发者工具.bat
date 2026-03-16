@echo off
chcp 65001 >nul
echo ========================================
echo 红尘灵境小程序 - 启动微信开发者工具
echo ========================================
echo.

echo 正在启动微信开发者工具...
echo 项目位置: C:\Users\Administrator\Desktop\红尘灵境小程序
echo.

REM 启动微信开发者工具CLI
"D:\微信web开发者工具\cli.bat" --open "C:\Users\Administrator\Desktop\红尘灵境小程序"

echo.
echo 微信开发者工具应该已经打开了！
echo.
echo 如果没有自动打开，请手动打开微信开发者工具
echo 然后导入项目文件夹: C:\Users\Administrator\Desktop\红尘灵境小程序
echo.
pause
