@echo off
chcp 65001 >nul
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         红尘灵境网页版 - 本地服务器                          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 正在启动本地服务器...
echo.
echo 启动后，您可以：
echo   - 在浏览器访问：http://localhost:8080
echo   - 也可以在局域网内其他设备访问
echo.
echo 按任意键启动...
pause >nul

cd "C:\Users\Administrator\Desktop\红尘灵境网页版"

echo.
echo 启动中...
echo.

REM 使用Python启动HTTP服务器
python -m http.server 8080

pause
