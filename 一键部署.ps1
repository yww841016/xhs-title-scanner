# ============================================
# 小红书标题评分器 - 一键部署脚本
# 使用方法：在 PowerShell 中复制粘贴全部代码运行
# ============================================

Write-Host "🚀 开始部署小红书标题评分器..." -ForegroundColor Green
Write-Host ""

# 1. 检查并安装 Node.js（如果需要）
Write-Host "📦 检查 Node.js..." -ForegroundColor Yellow
 = node --version 2>
if () {
    Write-Host "✅ Node.js 已安装: " -ForegroundColor Green
} else {
    Write-Host "❌ 未检测到 Node.js，请先安装: https://nodejs.org" -ForegroundColor Red
    Write-Host "按任意键退出..."
     = System.Management.Automation.Internal.Host.InternalHost.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# 2. 检查并安装 Vercel CLI
Write-Host "📦 检查 Vercel CLI..." -ForegroundColor Yellow
 = vercel --version 2>
if () {
    Write-Host "✅ Vercel CLI 已安装" -ForegroundColor Green
} else {
    Write-Host "⏳ 正在安装 Vercel CLI..." -ForegroundColor Cyan
    npm i -g vercel
    if ( -eq 0) {
        Write-Host "✅ Vercel CLI 安装成功" -ForegroundColor Green
    } else {
        Write-Host "❌ Vercel CLI 安装失败，请手动运行: npm i -g vercel" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "接下来需要手动完成以下步骤：" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  登录 GitHub" -ForegroundColor White
Write-Host "   运行: gh auth login" -ForegroundColor Gray
Write-Host "   选择 HTTPS，按提示在浏览器中授权" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  登录 Vercel" -ForegroundColor White
Write-Host "   运行: vercel login" -ForegroundColor Gray
Write-Host "   选择 GitHub 登录方式" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  创建 GitHub 仓库" -ForegroundColor White
Write-Host "   访问 https://github.com/new 创建新仓库" -ForegroundColor Gray
Write-Host "   仓库名建议：xhs-title-scanner" -ForegroundColor Gray
Write-Host ""
Write-Host "完成后，继续运行以下命令：" -ForegroundColor Green
Write-Host ""
Write-Host 'cd "E:\AI工作区\项目\小红书标题评分器_Vercel版"' -ForegroundColor Gray
Write-Host 'git init' -ForegroundColor Gray
Write-Host 'git add .' -ForegroundColor Gray
Write-Host 'git commit -m "feat: 修复 Pro 激活码安全问题"' -ForegroundColor Gray
Write-Host 'git branch -M main' -ForegroundColor Gray
Write-Host 'git remote add origin https://github.com/你的用户名/你的仓库名.git' -ForegroundColor Gray
Write-Host 'git push -u origin main' -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  部署到 Vercel" -ForegroundColor White
Write-Host "   运行: vercel --prod" -ForegroundColor Gray
Write-Host "   按提示配置环境变量" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  配置环境变量（重要！）" -ForegroundColor White
Write-Host "   在 Vercel Dashboard -> Settings -> Environment Variables" -ForegroundColor Gray
Write-Host "   添加以下变量：" -ForegroundColor Gray
Write-Host "   • VALID_ACTIVATION_CODES: XHPRO202,TITLE888,AFDIAN99,VIPTITLE,YWW84101" -ForegroundColor Gray
Write-Host "   • AGNES_API_KEY: 你的完整 API Key" -ForegroundColor Gray
Write-Host "   • AGNES_API_BASE: https://apihub.agnes-ai.com/v1" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 部署完成！访问你的网站测试功能" -ForegroundColor Green
