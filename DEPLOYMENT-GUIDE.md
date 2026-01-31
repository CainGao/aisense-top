# AISENSE 项目部署指南

> 创建时间：2026-01-31 15:45
> 当前状态：✅ Git 仓库已初始化，代码已提交

---

## 🎉 项目初始化成功！

### ✅ 已完成的工作
- [x] 项目结构创建
- [x] 配置文件初始化 (package.json, next.config.mjs)
- [x] 基础布局组件创建 (RootLayout, Header, Footer)
- [x] 首页组件创建 (app/page.tsx)
- [x] 示例内容创建 (AI资讯、工具推荐)
- [x] Git 仓库初始化
- [x] 第一次 commit 完成

---

## 📋 下一步操作清单

### 第1步：创建 GitHub 仓库 ⭐ 必需

**操作步骤**：
1. 访问 GitHub：https://github.com/new
2. **仓库名称**：`aisense-top`
3. **可见性**：选择 `Public`（公开）- 这很重要！
4. **初始化**：**不要选择任何选项**（已初始化）
5. 点击 "Create repository" 按钮

**完成后**：GitHub 会显示一个空的仓库页面，包含仓库 URL（如：`https://github.com/yourusername/aisense-top`）

---

### 第2步：链接本地仓库到 GitHub ⭐ 必需

**操作步骤**：
```bash
cd /Users/caingao/aisense-top

# 添加远程仓库（替换 yourusername）
git remote add origin https://github.com/yourusername/aisense-top.git

# 验证远程仓库已添加
git remote -v
```

**如果添加错误**：
```bash
# 先删除可能存在的远程仓库
git remote remove origin

# 重新添加
git remote add origin https://github.com/yourusername/aisense-top.git
```

---

### 第3步：推送代码到 GitHub ⭐ 必需

**操作步骤**：
```bash
# 推送 main 分支到 GitHub
git push -u origin main

# 如果提示输入 GitHub 用户名和密码
# - 用户名：你的 GitHub 用户名
# - 密码：使用 GitHub Personal Access Token（不是密码）
```

**获取 Personal Access Token**（如果需要）：
1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. Note：填写 `AISENSE deploy`
4. Expiration：选择 `No expiration` 或合适的时间
5. Scopes：勾选 `repo` (完整的仓库访问权限）
6. 点击 "Generate token"
7. **复制生成的 token**（只显示一次！）

**使用 Token 推送**：
```bash
git push https://yourtoken@github.com/yourusername/aisense-top.git main
```

---

### 第4步：配置 Vercel 部署 ⭐ 必需

#### 4.1 安装 Vercel CLI
```bash
# 全局安装 Vercel CLI
npm install -g vercel
```

#### 4.2 登录 Vercel
```bash
# 登录 Vercel（会打开浏览器）
vercel login
```

#### 4.3 链接项目到 Vercel
```bash
cd /Users/caingao/aisense-top

# 链接项目
vercel link
```

**选择项目配置**（会提示）：
- Set up and deploy → Next.js
- Project name：`aisense-top` (或保留默认)
- Framework：Next.js
- Directory：`./` (当前目录)

#### 4.4 生产部署
```bash
# 部署到生产环境
vercel --prod
```

**输出示例**：
```
Vercel CLI 34.1.4
🔍  Inspect: Validating Next.js project...
🔍  Inspect: Warning: No "next" package found in "aisense-top"
🔍  Inspect: No "cache" configuration found.
🔍  Inspect: No "build" configuration found.
🚀  Build: Completed in 15.2s
📦  Build Output: .next
✅  Preview: https://aisense-xxx.vercel.app
📦  Production: https://aisense-xxx.vercel.app
```

---

### 第5步：绑定域名 aisense.top ⭐ 必需

#### 5.1 在 Vercel 添加域名
1. 访问：https://vercel.com/dashboard
2. 找到 `aisense-top` 项目
3. 点击 `Settings` → `Domains`
4. 点击 `Add domain` 按钮
5. 输入域名：`aisense.top`
6. 点击 `Add` 按钮

#### 5.2 配置 DNS（自动或手动）

**选项 A：使用 Vercel DNS（推荐）**
- Vercel 会自动配置 DNS
- 只需要在域名注册商修改 DNS 服务器为 Vercel 提供的地址

**选项 B：手动配置 DNS**
- 登录你的域名注册商（阿里云、腾讯云、Namecheap 等）
- 添加 DNS 记录：
  - Type: CNAME
  - Name: `@` (或 `www`，取决于注册商）
  - Value: Vercel 提供的 CNAME 目标

#### 5.3 验证域名
- Vercel 会自动验证 DNS 配置
- 配置完成后会显示 ✅ 有效

---

## 🚀 一键部署脚本

如果你想快速完成部署，运行以下脚本：

```bash
#!/bin/bash
set -e

echo "🚀 开始 AISENSE 部署流程..."

# 步骤 1：推送代码到 GitHub
echo "📦 步骤 1：推送代码到 GitHub..."
git push -u origin main

# 步骤 2：部署到 Vercel
echo "📦 步骤 2：部署到 Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo "🌐 访问网站：https://aisense.top"
```

**使用方法**：
1. 将上述脚本保存为 `deploy.sh`
2. 给予执行权限：`chmod +x deploy.sh`
3. 运行：`./deploy.sh`

---

## 📊 部署验证清单

### Git 仓库
- [ ] GitHub 仓库已创建
- [ ] 本地仓库已链接到远程仓库
- [ ] 代码已成功推送到 GitHub

### Vercel 部署
- [ ] Vercel CLI 已安装
- [ ] 已登录 Vercel
- [ ] 项目已链接到 Vercel
- [ ] 生产部署已完成
- [ ] 访问 URL 可用（https://aisense-xxx.vercel.app）

### 域名配置
- [ ] 域名 aisense.top 已添加到 Vercel
- [ ] DNS 已配置
- [ ] 域名验证通过
- [ ] https://aisense.top 可访问

---

## 💡 常见问题和解决方案

### Q1：Git push 时提示 "Permission denied"
**A**：使用 Personal Access Token 而不是密码
1. 访问：https://github.com/settings/tokens
2. 生成新的 token（scope: repo）
3. 使用 token 推送：
```bash
git push https://yourtoken@github.com/yourusername/aisense-top.git main
```

### Q2：Vercel 部署时提示 "No Next.js package found"
**A**：确保在项目根目录
```bash
cd /Users/caingao/aisense-top
pwd  # 应该显示 /Users/caingao/aisense-top
```

### Q3：域名验证失败
**A**：检查 DNS 配置
1. 使用 `nslookup` 或 `dig` 检查 DNS 记录
2. 确认 DNS 传播完成（可能需要 10-60 分钟）
3. 尝试刷新 Vercel 域名验证

### Q4：网站无法访问
**A**：检查部署日志
1. 访问 Vercel Dashboard → Logs
2. 查看是否有错误或警告
3. 检查 Vercel 构建设置（next.config.mjs）

---

## 📝 后续优化建议

### 内容优化
- [ ] 每天更新 3-5 条 AI 资讯
- [ ] 每周推荐 2-3 个新工具
- [ ] 每周发布 1-2 篇技术博客
- [ ] 收集用户反馈和评论

### 功能开发
- [ ] 添加搜索功能
- [ ] 实现评论和互动系统
- [ ] 添加用户收藏功能
- [ ] 开发会员系统

### 变现优化
- [ ] 接入 CSDN 广告联盟
- [ ] 接入百度联盟广告
- [ ] 开发付费内容
- [ ] 实现会员订阅

### SEO 优化
- [ ] 添加 sitemap.xml
- [ ] 优化 meta 标签
- [ ] 提高页面加载速度
- [ ] 添加结构化数据

---

## 🎯 下一步行动

### 立即可做
1. [ ] 创建 GitHub 仓库
2. [ ] 推送代码到 GitHub
3. [ ] 配置 Vercel 部署
4. [ ] 绑定域名 aisense.top

### 今天内完成
1. [ ] 完成上述所有部署步骤
2. [ ] 测试网站功能
3. [ ] 配置 CSDN 广告联盟
4. [ ] 开始每日内容更新流程

### 本周完成
1. [ ] 发布 20+ 条 AI 资讯
2. [ ] 推荐 10+ 个 AI 工具
3. [ ] 发布 5+ 篇技术博客
4. [ ] 开始内容营销和推广

---

## 📚 参考资源

### GitHub
- GitHub Docs: https://docs.github.com/
- Git Push: https://git-scm.com/docs/git-pull

### Vercel
- Vercel Docs: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Domains: https://vercel.com/docs/concepts/projects/domains

### Next.js
- Next.js Docs: https://nextjs.org/docs
- Deployment: https://nextjs.org/docs/deployment

### 广告联盟
- CSDN: https://union.csdn.net
- 百度联盟: https://www.baidu.com/search/pro

---

**最后更新**: 2026-01-31 15:50
**状态**: ✅ **项目初始化完成，准备部署**
**预计完成时间**: 30-60 分钟

---

AISENSE AI资讯平台，准备上线！🚀
