# AI Sense - Jekyll网站

> AI时代的技术和商业洞察
> 网址：https://aisense.top

---

## 🌐 网站介绍

**AI Sense** 是一个基于Jekyll构建的多页面静态网站，专注于AI时代的技术和商业洞察。

### 核心内容

- 📰 **AI机器人早报** - 每日更新，掌握机器人行业最新动态
- 📊 **GitHub热榜分析** - 深度解析开源项目，发现技术趋势
- 💼 **AI一人公司** - 独立创业者的AI时代成功路径
- 🦞 **OpenClaw指南** - 个人AI助手的使用最佳实践

---

## 🚀 快速开始

### 本地预览

```bash
# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

### 部署到GitHub Pages

1. 推送到GitHub仓库
2. 启用GitHub Pages（Settings → Pages）
3. 选择main分支
4. 等待自动构建

---

## 📁 网站结构

```
aisense-top/
├── _config.yml          # Jekyll配置
├── Gemfile              # Ruby依赖
├── CNAME                # 域名配置
├── _layouts/            # 页面模板
│   ├── default.html
│   ├── post.html
│   └── page.html
├── _includes/           # 公共组件
│   ├── header.html
│   └── footer.html
├── _posts/              # 文章内容
│   ├── ai-news/
│   ├── github-trending/
│   ├── one-person-company/
│   └── openclaw/
├── _pages/              # 静态页面
├── assets/              # 静态资源
│   ├── css/
│   └── js/
└── index.md             # 首页
```

---

## 📝 内容发布

### 创建新文章

1. 在 `_posts/` 对应目录创建Markdown文件
2. 文件名格式：`YYYY-MM-DD-title.md`
3. 添加Front Matter：

```yaml
---
layout: post
title: "文章标题"
date: 2026-02-27
author: 功哥
category: 分类
tags: [标签1, 标签2]
description: "文章描述"
---

# 文章内容
```

4. 推送到GitHub，自动部署

---

## 🎨 自定义样式

### 修改颜色

编辑 `assets/css/main.scss`：

```scss
$accent-blue: #00f7ff;    // 主色调
$accent-purple: #bc13fe;  // 辅助色
$accent-pink: #ff00ff;    // 强调色
```

### 修改布局

编辑 `_layouts/` 目录下的模板文件。

---

## 🔧 配置说明

### _config.yml

```yaml
title: AI Sense              # 网站标题
tagline: 网站标语             # 网站标语
description: 网站描述         # 网站描述
author: 功哥                 # 作者
email: your-email@example.com # 邮箱
url: "https://aisense.top"   # 网站URL
timezone: Asia/Shanghai      # 时区
```

---

## 📊 功能特性

### 已实现

- ✅ 多页面结构
- ✅ 响应式设计
- ✅ SEO优化
- ✅ RSS订阅
- ✅ Sitemap自动生成
- ✅ 代码高亮
- ✅ 分类和标签

### 计划中

- [ ] 评论系统（Giscus）
- [ ] 搜索功能
- [ ] 暗黑模式切换
- [ ] 阅读进度条
- [ ] 返回顶部按钮

---

## 🌐 域名配置

### DNS设置

```
类型：A
名称：@
值：185.199.108.153
值：185.199.109.153
值：185.199.110.153
值：185.199.111.153

类型：CNAME
名称：www
值：caingao.github.io
```

---

## 📚 技术栈

- **Jekyll** - 静态网站生成器
- **GitHub Pages** - 免费托管服务
- **Markdown** - 内容格式
- **SCSS** - 样式预处理
- **JavaScript** - 交互功能

---

## 📄 许可证

MIT License

---

## 📧 联系方式

- **站长：** 功哥
- **邮箱：** your-email@example.com
- **GitHub：** [@CainGao](https://github.com/CainGao)

---

**© 2026 AI Sense | Powered by Jekyll & GitHub Pages**
