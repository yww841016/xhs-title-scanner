# 小红书标题评分器 - 部署说明

## 📁 项目结构
```
小红书标题评分器_Vercel版/
├── api/
│   ├── verify-code.js    # 激活码验证 API（安全）
│   └── rewrite.js        # AI 改写代理 API（隐藏 Key）
├── index.html            # 前端页面（单文件）
├── vercel.json           # Vercel 配置
├── .gitignore
├── DEPLOY.md             # 本文件
└── 一键部署.ps1           # 自动化部署脚本
```

## 🔧 部署步骤

### 1. 推送到 GitHub
将本项目推送到你的 GitHub 仓库 `xhs-title-scanner`。

### 2. 在 Vercel 上部署
1. 登录 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 点击 "Deploy"

### 3. 配置环境变量（重要！）
在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|------|------|
| `VALID_ACTIVATION_CODES` | `XHPRO202,TITLE888,AFDIAN99,VIPTITLE,YWW84101` | 逗号分隔的激活码列表 |
| `AGNES_API_KEY` | `sk-xxx...` | Agnes AI API Key |
| `AGNES_API_BASE` | `https://apihub.agnes-ai.com/v1` | API 地址（可选） |

### 4. 绑定自定义域名
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加 `yww841016.cn`
3. 按照提示配置 DNS 记录

## 🔒 安全改进

- ✅ 激活码存储在 Vercel 环境变量中，不暴露给前端
- ✅ API Key 由后端代理，不暴露给所有用户
- ✅ 前端无硬编码敏感信息

## 📝 管理激活码

在 Vercel Dashboard -> Settings -> Environment Variables 修改 `VALID_ACTIVATION_CODES`，重新部署即可生效。
