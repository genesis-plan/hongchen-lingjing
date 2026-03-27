
# 红尘灵境网页版 - PowerShell部署脚本
$envId = "hclj-8g46g9fd06e2a760"
$localPath = "C:\Users\Administrator\Desktop\红尘灵境网页版"
$secretId = "YOUR_SECRET_ID_HERE"
$secretKey = "f6JOHySkofIjxysa6PWQ7apqdCYfYDev"

Write-Host "开始部署..." -ForegroundColor Green

# 使用curl上传文件
$files = Get-ChildItem -Path $localPath -Recurse -File
foreach ($file in $files) {
    $relPath = $file.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    Write-Host "上传: $relPath" -ForegroundColor Yellow

    # 构建上传URL
    $url = "https://$envId.service.tcloudbaseapp.com/tcb/hosting/deploy?path=$relPath"

    try {
        $response = Invoke-RestMethod -Uri $url -Method Put -InFile $file.FullName
        Write-Host "  ✓ 成功" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ 失败: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "部署完成！" -ForegroundColor Green
Write-Host "访问地址: https://$envId.tcloudbaseapp.com" -ForegroundColor Cyan
