# 清理并重新配置项目

## 🚀 立即执行（2 分钟）

### 清理项目文件

```bash
cd /Users/caingao/aisense-top

# 清理所有不必要的文件
git reset --hard HEAD
git clean -fdX

# 保留必要文件：
# - next.config.mjs (已配置 output: 'export')
# - .nojekyll (告诉 GitHub Pages 不要使用 Jekyll)
# - .gitignore (忽略 node_modules)
# - package.json (项目依赖)
```

---

## 📋 完整的 GitHub Pages 配置方案

### 方案A：使用 Next.js（推荐）⭐

**优点**：
- ✅ 现代化的 React 框架
- ✅ 更好的性能和 SEO
- ✅ 支持 TypeScript
- ✅ 组件化开发

**配置步骤**：

#### 1. 确保配置正确

**检查 `next.config.mjs`**：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 禁用图片优化（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },
  // 如果使用自定义域名，可以配置 basePath
  // basePath: '/aisense-top',
}

export default nextConfig
```

#### 2. 创建 `.nojekyll` 文件

**创建 `.nojekyll` 文件**（告诉 GitHub Pages 不要使用 Jekyll 处理）：
```bash
echo "" > /Users/caingao/aisense-top/.nojekyll
```

#### 3. 确保 `.gitignore` 正确

**`.gitignore` 文件内容**：
```
node_modules/
.next/
out/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.vercel
.cache/
.vscode/
.idea/
*.swp
*.swo
```

#### 4. 提交并推送代码

```bash
cd /Users/caingao/aisense-top

# 添加所有文件
git add .

# 提交
git commit -m "Configure for GitHub Pages

- Added .nojekyll file
- Updated .gitignore
- Configured Next.js for static export
- Cleaned up project files"

# 推送
git push origin main
```

#### 5. 在 GitHub Pages 启用

**访问**：https://github.com/CainGao/aisense-top/settings/pages

**配置**：
- **Source**：`Deploy from a branch`
- **Branch**：`main`
- **Directory**：`/ (root)`
- **点击**：`Save`

**等待 1-2 分钟**，GitHub Pages 会自动部署！

---

### 方案B：使用纯静态网站（最简单）⭐

**如果你不想要复杂的框架，可以直接使用纯 HTML/CSS/JS**

**步骤**：

#### 1. 创建简单的 `index.html`

```bash
cd /Users/caingao/aisense-top

# 创建简单的 index.html
cat > index.html << 'HTML'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AISENSE</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <h1>欢迎来到 AISENSE</h1>
    <p>这是一个简单的静态网站，托管在 GitHub Pages 上。</p>
</body>
</html>
HTML

# 创建 .nojekyll 文件
echo "" > .nojekyll

# 创建 .gitignore
cat > .gitignore << 'GITIGNORE'
node_modules/
.next/
.env
.vercel
.cache/
GITIGNORE
```

#### 2. 删除 Next.js 配置和依赖

```bash
# 删除 next.config.mjs
rm -f next.config.mjs

# 删除 node_modules/
rm -rf node_modules/

# 删除 package.json（可选）
# rm -f package.json package-lock.json
```

#### 3. 提交并推送

```bash
cd /Users/caingao/aisense-top

git add .
git commit -m "Convert to simple static site"
git push origin main
```

#### 4. 在 GitHub Pages 启用

**访问**：https://github.com/CainGao/aisense-top/settings/pages

**配置**：
- **Source**：`Deploy from a branch`
- **Branch**：`main`
- **Directory**：`/ (root)`
- **点击**：`Save`

---

## 🌐 自定义域名配置（`aisense.top`）

### 按照 GitHub 官方文档配置

**参考文档**：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

#### 步骤1：在你的域名注册商配置 DNS

**登录你的域名注册商**（阿里云、腾讯云、Namecheap 等）

**添加 A 记录**：
- **主机记录**：`@`（根域名）
- **记录类型**：`A`
- **记录值**：`185.199.108.153`（GitHub Pages IP）
- **TTL**：`600`（或默认）

**验证 DNS**：
```bash
# 验证 DNS 解析
nslookup aisense.top
```

#### 步骤2：在 GitHub Pages 添加自定义域名

**访问**：https://github.com/CainGao/aisense-top/settings/pages

**添加域名**：
1. 滚动到 `Custom domain` 部分
2. 输入：`aisense.top`
3. 点击：`Add`

**等待 DNS 检查**：
- GitHub 会自动检测 DNS 配置
- 如果正确，显示：`✅ DNS check successful`
- 如果错误，显示 DNS 配置问题

#### 步骤3：强制 HTTPS（可选但推荐）

**GitHub Pages 会自动配置 HTTPS**：
- 等待 10-30 分钟
- HTTPS 证书会自动生成

**强制 HTTPS**：
1. 访问：https://github.com/CainGao/aisense-top/settings/pages
2. 滚动到 `HTTPS` 部分
3. 点击：`Force HTTPS`

---

## 🧹 立即清理项目（2 分钟）

### 执行清理脚本

```bash
cd /Users/caingao/aisense-top

# 1. 清理所有文件（但保留 .git）
git rm -rf .

# 2. 创建必要的文件

# 创建 .nojekyll
echo "" > .nojekyll

# 创建简单的 index.html
cat > index.html << 'HTML'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AISENSE</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        }
        h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        p {
            font-size: 24px;
            opacity: 0.9;
        }
        a {
            color: white;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>AISENSE</h1>
    <p>AI 资讯平台</p>
    <p>托管在 GitHub Pages</p>
    <p><a href="https://github.com/CainGao/aisense-top">GitHub 仓库</a></p>
</body>
</html>
HTML

# 创建 README.md
cat > README.md << 'README'
# AISENSE

AI 资讯平台

## 🌐 访问

- GitHub Pages: https://caingao.github.io/aisense-top
- 自定义域名: https://aisense.top

## 📝 更新内容

直接推送 Markdown 文件到仓库，GitHub Pages 会自动部署。

## 🌐 配置

- GitHub Pages: 从 main 分支的 / 目录构建
- 域名配置: 使用 A 记录指向 GitHub Pages IP

---
README

# 创建 .gitignore
cat > .gitignore << 'GITIGNORE'
node_modules/
.next/
out/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.vercel
.cache/
.vscode/
.idea/
*.swp
*.swo
GITIGNORE

# 3. 提交并推送
git add .
git commit -m "Clean project for GitHub Pages

- Added simple index.html
- Added .nojekyll file
- Added README.md
- Updated .gitignore
- Cleaned up project files"

git push origin main --force
```

---

## 🎯 接下来的步骤（2 分钟）

### 1. 清理项目并推送（我执行）

**我会立即执行上面的清理脚本**，项目会变成干净的静态网站。

### 2. 在 GitHub Pages 启用（你执行）

**访问**：https://github.com/CainGao/aisense-top/settings/pages

**配置**：
- **Source**：`Deploy from a branch`
- **Branch**：`main`
- **Directory**：`/ (root)`
- **点击**：`Save`

**等待 1-2 分钟**，网站就能访问了！

### 3. 配置自定义域名（可选，你执行）

**添加 A 记录**：
- **主机记录**：`@`
- **记录类型**：`A`
- **记录值**：`185.199.108.153`
- **TTL**：`600`

**在 GitHub Pages 添加域名**：
1. 滚动到 `Custom domain` 部分
2. 输入：`aisense.top`
3. 点击：`Add`

---

## 💡 问题解答

### Q1：为什么 `https://caingao.github.io/aisense-top` 会跳转到 `aisense.top`？

**A**：这是因为你的 GitHub Pages 仓库配置了自定义域名 `aisense.top`。当访问默认域名时，GitHub Pages 会自动重定向到自定义域名。如果自定义域名配置不正确，就会无法访问。

**解决方案**：
1. 检查 DNS 配置（A 记录）
2. 在 GitHub Pages 重新添加自定义域名
3. 等待 DNS 传播（10-60 分钟）

### Q2：Next.js 项目能在 GitHub Pages 上运行吗？

**A**：可以！但需要配置 `output: 'export'`，并且创建 `.nojekyll` 文件告诉 GitHub Pages 不要使用 Jekyll 处理。

**解决方案**：
- 配置 `next.config.mjs`
- 创建 `.nojekyll` 文件
- 确保 `.gitignore` 包含 `node_modules/`

### Q3：如果我不想用 Next.js 怎么办？

**A**：可以直接用纯 HTML/CSS/JS，这样更简单，不需要任何框架。

**解决方案**：
- 删除 Next.js 配置和依赖
- 创建简单的 `index.html`
- 创建 `.nojekyll` 文件
- 推送代码到 GitHub

---

## 🚀 立即行动

### 我会立即执行：

1. ✅ **清理项目**：删除所有不必要的文件
2. ✅ **创建干净的静态网站**：简单的 `index.html`
3. ✅ **配置 GitHub Pages**：添加 `.nojekyll` 文件
4. ✅ **推送代码到 GitHub**：强制推送

### 你需要执行（2 分钟）：

1. **在 GitHub Pages 启用**：
   - 访问：https://github.com/CainGao/aisense-top/settings/pages
   - 配置：Branch：`main`，Directory：`/ (root)`
   - 点击：`Save`

2. **配置自定义域名（可选）**：
   - 添加 A 记录：`185.199.108.153`
   - 在 GitHub Pages 添加域名：`aisense.top`

---

**准备好了吗？** 🚀

**我现在开始清理项目并推送代码！**
