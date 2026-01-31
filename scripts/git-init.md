# Git 初始化脚本

> 用于初始化 Git 仓库和推送到 GitHub

---

## 🚀 操作步骤

### 1. 初始化 Git 仓库
```bash
cd /Users/caingao/aisense-top
git init
git add .
git commit -m "Initial commit: AISENSE AI资讯平台

- 首页组件和布局
- 示例资讯内容
- 示例工具推荐
- 基础样式和配置

技术栈: Next.js 15 + shadcn/ui + Tailwind CSS
部署: Vercel
域名: aisense.top"
```

### 2. 创建 GitHub 仓库（需要手动）
1. 访问 https://github.com/new
2. 仓库名称：`aisense-top`
3. 可见性：Public
4. 初始化：不要选（已初始化）
5. 添加 .gitignore（推荐）
6. 点击 "Create repository"

### 3. 链接本地仓库到远程
```bash
cd /Users/caingao/aisense-top
git remote add origin https://github.com/yourusername/aisense-top.git
git branch -M main
```

### 4. 推送到 GitHub
```bash
git push -u origin main
```

### 5. 配置 Vercel 部署
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 链接项目
vercel link

# 生产部署
vercel --prod

# 配置域名
# 在 Vercel 控制台添加 aisense.top
```

---

## 📝 .gitignore 配置

```gitignore
# 依赖
node_modules
.pnp
.pnp.js

# 测试
coverage
.nyc_output

# Next.js
.next/
out/
build
dist

# 生产
*.log
*.log.*

# 环境变量
.env
.env*.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# 编辑器
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# 临时文件
*.tmp
*.temp
```

---

## 🚨 注意事项

1. **敏感信息**
   - 不要提交 `.env` 文件
   - 不要提交 API 密钥
   - 不要提交广告联盟的敏感代码

2. **GitHub 仓库配置**
   - 确保仓库名称是 `aisense-top`
   - 选择 Public 以便获得更多曝光
   - 添加项目描述和标签

3. **Vercel 部署**
   - 使用 `vercel --prod` 进行生产部署
   - 在 Vercel 控制台配置域名 `aisense.top`
   - 设置环境变量（如有需要）

---

## 🎯 推送清单

- [ ] 初始化 Git 仓库
- [ ] 创建 GitHub 仓库
- [ ] 链接远程仓库
- [ ] 推送代码到 GitHub
- [ ] 配置 Vercel 部署
- [ ] 绑定域名 aisense.top
- [ ] 测试生产环境
- [ ] 配置 CSDN 广告联盟

---

**下一步**: 等待手动创建 GitHub 仓库后，执行链接和推送操作

---

**创建时间**: 2026-01-31 15:45
