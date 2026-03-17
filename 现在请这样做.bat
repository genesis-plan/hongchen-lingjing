@echo off
chcp 65001 >nul
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║            红尘灵境网页版 - 部署操作指南                     ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 您已经登录了，现在按以下步骤操作：
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 第1步：找到云开发环境
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 1. 在控制台顶部搜索框输入：云开发
echo 2. 点击"云开发 CloudBase"
echo 3. 等待加载，进入云开发管理页面
echo 4. 找到环境ID：hclj-8g46g9fd06e2a760
echo 5. 点击这个环境名称
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 第2步：进入静态网站托管
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 1. 在左侧菜单栏找到"静态网站托管"
echo 2. 点击进入
echo 3. 如果提示"开启静态网站托管"，点击开启
echo 4. 等待开通完成
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 第3步：上传文件
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 1. 点击"上传文件"按钮（通常在右上角）
echo 2. 在弹出的文件选择窗口中：
echo    - 导航到：C:\Users\Administrator\Desktop\红尘灵境网页版
echo    - 按下 Ctrl+A 全选所有文件
echo    - 点击"确定"或"打开"
echo 3. 等待上传完成（显示"上传成功"）
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 第4步：测试访问
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 打开浏览器，访问：
echo https://hclj-8g46g9fd06e2a760-1409755229.tcloudbaseapp.com
echo.
echo 应该能看到"红尘灵境"的标题页面
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  完成上述步骤后，网站就可以被任何人访问了！                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 按任意键查看文件清单...
pause >nul

cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║            需要上传的文件清单                                 ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 文件位置：C:\Users\Administrator\Desktop\红尘灵境网页版
echo.
echo ✗ 必需的文件（必须上传）：
echo    ✓ index.html          - 主页面
echo    ✓ styles.css          - 样式文件
echo    ✓ app.js              - JavaScript代码
echo    ✓ smart-assistant.css  - 智能助手样式
echo.
echo ✗ 其他页面（建议上传）：
echo    ✓ login.html          - 登录页面
echo    ✓ register.html       - 注册页面
echo    ✓ privacy-policy.html - 隐私政策
echo    ✓ terms-of-service.html - 服务条款
echo    ✓ age-verification.html - 年龄验证
echo.
echo ✗ 其他文件：
echo    ✓ pages/文件夹        - 包含 library.html 和 practice.html
echo    ✓ 3d-building-models.js
echo    ✓ smart-assistant-integration.js
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  建议：上传所有文件，确保网站功能完整                      ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 按任意键打开文件所在文件夹...
pause >nul

explorer "C:\Users\Administrator\Desktop\红尘灵境网页版"
