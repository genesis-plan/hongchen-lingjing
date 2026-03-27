@echo off
chcp 65001 >nul
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     红尘灵境网页版 - 批量上传工具                          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd "C:\Users\Administrator\Desktop\红尘灵境网页版"

echo 正在上传文件到腾讯云...
echo.

REM 使用curl直接上传文件到云开发静态网站托管
REM 这需要正确的API认证

REM 上传主文件
echo [1/8] 上传 index.html...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/index.html" --data-binary @index.html

echo [2/8] 上传 styles.css...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/styles.css" --data-binary @styles.css

echo [3/8] 上传 app.js...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/app.js" --data-binary @app.js

echo [4/8] 上传 smart-assistant.css...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/smart-assistant.css" --data-binary @smart-assistant.css

echo [5/8] 上传 login.html...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/login.html" --data-binary @login.html

echo [6/8] 上传 register.html...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/register.html" --data-binary @register.html

echo [7/8] 上传 privacy-policy.html...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/privacy-policy.html" --data-binary @privacy-policy.html

echo [8/8] 上传 terms-of-service.html...
curl -X PUT "https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com/terms-of-service.html" --data-binary @terms-of-service.html

echo.
echo 上传完成！
echo.
echo 访问地址：https://hclj-8g46g9fd06e2a760.tcloudbaseapp.com
echo.
pause
