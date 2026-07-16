# 小红书标题评分器 - 部署说明

## 📁 项目结构
`
小红书标题评分器_Vercel版/
├── api/
│   ├── verify-code.js    # 激活码验证 API（安全）
│   └── rewrite.js        # AI 改写代理 API（隐藏 Key）
├── index.html            # 前端页面
├── vercel.json           # Vercel 配置
└── .gitignore
`

## 🔧 部署步骤

### 1. 推送到 GitHub
将 小红书标题评分器_Vercel版 目录推送到你的 GitHub 仓库。

### 2. 在 Vercel 上部署
1. 登录 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 点击 "Deploy"

### 3. 配置环境变量（重要！）
在 Vercel 项目设置中，添加以下环境变量：

#### 激活码列表
- **变量名**: VALID_ACTIVATION_CODES
- **值**: XHPRO202,TITLE888,AFDIAN99,VIPTITLE,YWW84101
- **说明**: 逗号分隔的激活码列表，可随时修改

#### Agnes API Key
- **变量名**: AGNES_API_KEY
- **值**: sk-9BTI4zV...（你的完整 API Key）
- **说明**: 用于 AI 改写功能

#### Agnes API Base（可选）
- **变量名**: AGNES_API_BASE
- **值**: https://apihub.agnes-ai.com/v1
- **说明**: 如果不配置，默认使用上述地址

### 4. 更新 DNS（可选）
如果你要绑定自定义域名 yww841016.cn：
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

## 🔒 安全改进

### 之前的问题
- 激活码明文写在前端 JS 中
- API Key 暴露给所有用户
- 任何人都可以绕过付费

### 现在的方案
- ✅ 激活码存储在 Vercel 环境变量中
- ✅ API Key 由后端代理，不暴露给前端
- ✅ 激活码验证通过后才返回结果
- ✅ 即使前端代码被查看，也无法获取有效激活码

## 📝 管理激活码

### 添加新激活码
1. 登录 Vercel Dashboard
2. 进入项目设置 -> Environment Variables
3. 修改 VALID_ACTIVATION_CODES 的值
4. 重新部署即可生效

### 删除无效激活码
同上，从列表中移除对应的激活码即可。

## 🚀 测试验证

部署完成后，按以下步骤测试：

1. 访问你的网站
2. 输入任意标题进行评分
3. 点击升级按钮，输入测试激活码（如 XHPRO202）
4. 验证是否成功激活 Pro 功能
5. 检查 AI 改写功能是否正常工作

## ⚠️ 注意事项

1. **不要将敏感信息提交到 Git**
   - .env 文件已在 .gitignore 中
   - 环境变量只在 Vercel 服务器上存储

2. **激活码定期更换**
   - 建议每季度更换一次激活码
   - 旧的激活码会自动失效

3. **API 调用限制**
   - Agnes API 有调用频率限制
   - 如需提高限额，联系 API 提供商

## 📞 技术支持

如有问题，请检查：
1. Vercel 部署日志
2. 浏览器控制台错误信息
3. 环境变量是否正确配置
