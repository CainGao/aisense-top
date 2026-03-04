# AI Sense网站每日更新规范

## 📋 任务目标

确保AI Sense网站（https://aisense.top）每日内容更新，包括：
1. 生成HTML文件
2. **更新栏目页面**（关键！）
3. **更新首页**（关键！）
4. 推送到GitHub
5. 验证URL可访问

---

## 📂 网站结构

```
aisense.top/
├── index.md                    # 首页（需要更新最新内容）
├── _pages/
│   ├── ai-news.md              # AI机器人早报栏目（需要更新）
│   ├── github-trending.md      # GitHub热榜栏目（需要更新）
│   ├── robot.md                # 机器人产业栏目（需要更新）
│   ├── novel.md                # 玄幻小说栏目
│   ├── one-person-company.md   # AI一人公司栏目
│   ├── openclaw.md             # OpenClaw指南栏目
│   └── about.md                # 关于页面
└── posts/
    ├── 2026-03-04-ai-news.html           # AI早报HTML
    ├── 2026-03-04-github-trending.html   # GitHub热榜HTML
    └── 2026-03-04-robot-news.html        # 机器人日报HTML
```

---

## ✅ 完整更新流程

### 第1步：生成HTML文件

**AI机器人早报HTML**：
```bash
# 文件名：posts/YYYY-MM-DD-ai-news.html
# 内容：今日头条、工业机器人、服务机器人、投融资、市场数据
```

**GitHub热榜分析HTML**：
```bash
# 文件名：posts/YYYY-MM-DD-github-trending.html
# 内容：TOP 10项目、趋势分析、推荐关注、相关链接
```

**机器人产业日报HTML**：
```bash
# 文件名：posts/YYYY-MM-DD-robot-news.html
# 内容：全球动态、工业机器人、服务机器人、协作机器人、开发技术
```

### 第2步：更新栏目页面（关键！）

#### 更新 _pages/ai-news.md
在 `<article class="post-item">` 列表**最前面**添加新内容：

```html
<article class="post-item">
    <h3><a href="/posts/YYYY-MM-DD-ai-news.html">YYYY-MM-DD AI机器人早报</a></h3>
    <p class="meta">YYYY年MM月DD日</p>
    <p>{早报摘要，50-100字}</p>
</article>
```

#### 更新 _pages/github-trending.md
在 `<article class="post-item">` 列表**最前面**添加新内容：

```html
<article class="post-item">
    <h3><a href="/posts/YYYY-MM-DD-github-trending.html">YYYY-MM-DD GitHub热榜分析</a></h3>
    <p class="meta">YYYY年MM月DD日</p>
    <p>{热榜摘要，50-100字}</p>
</article>
```

#### 更新 _pages/robot.md
在 `<article class="post-item">` 列表**最前面**添加新内容：

```html
<article class="post-item">
    <h3><a href="/posts/YYYY-MM-DD-robot-news.html">YYYY-MM-DD 机器人产业日报</a></h3>
    <p class="meta">YYYY年MM月DD日</p>
    <p>{日报摘要，50-100字}</p>
</article>
```

### 第3步：更新首页（关键！）

编辑 `index.md`，在 `<div class="latest-content">` 部分的**最前面**添加：

```html
<article class="post-preview">
    <h3><a href="/posts/YYYY-MM-DD-ai-news.html">YYYY-MM-DD AI机器人早报</a></h3>
    <p class="meta">YYYY年MM月DD日 | 😴 睡醒就有早报看</p>
    <p>{早报摘要，50-100字}</p>
</article>

<article class="post-preview">
    <h3><a href="/posts/YYYY-MM-DD-github-trending.html">YYYY-MM-DD GitHub热榜分析</a></h3>
    <p class="meta">YYYY年MM月DD日 | ⭐ 今天又Star了啥</p>
    <p>{热榜摘要，50-100字}</p>
</article>

<article class="post-preview">
    <h3><a href="/posts/YYYY-MM-DD-robot-news.html">YYYY-MM-DD 机器人产业日报</a></h3>
    <p class="meta">YYYY年MM月DD日 | 🤖 机器人时代来了</p>
    <p>{日报摘要，50-100字}</p>
</article>
```

**注意**：首页只显示最新的5-6篇文章，旧文章需要移除。

### 第4步：推送到GitHub

```bash
cd /Users/caingao/.openclaw/workspace/aisense-top
git add posts/ _pages/ index.md
git commit -m "📅 Daily update: $(date +%Y-%m-%d)"
git push origin main
```

### 第5步：验证URL可访问

```bash
# 验证HTML文件
curl -I https://aisense.top/posts/YYYY-MM-DD-ai-news.html
curl -I https://aisense.top/posts/YYYY-MM-DD-github-trending.html
curl -I https://aisense.top/posts/YYYY-MM-DD-robot-news.html

# 验证栏目页面
curl -I https://aisense.top/ai-news/
curl -I https://aisense.top/github-trending/
curl -I https://aisense.top/robot/

# 验证首页
curl -I https://aisense.top/
```

---

## 🔍 检查清单

每次更新后，必须检查以下内容：

### HTML文件检查
- [ ] `posts/YYYY-MM-DD-ai-news.html` 已生成
- [ ] `posts/YYYY-MM-DD-github-trending.html` 已生成
- [ ] `posts/YYYY-MM-DD-robot-news.html` 已生成

### 栏目页面检查
- [ ] `_pages/ai-news.md` 已更新（新内容在最前面）
- [ ] `_pages/github-trending.md` 已更新（新内容在最前面）
- [ ] `_pages/robot.md` 已更新（新内容在最前面）

### 首页检查
- [ ] `index.md` 已更新（新内容在最前面）
- [ ] 旧文章已移除（保持5-6篇）

### Git检查
- [ ] 所有文件已 `git add`
- [ ] 已 `git commit`
- [ ] 已 `git push`

### URL检查
- [ ] 所有HTML文件可访问
- [ ] 栏目页面可访问
- [ ] 首页可访问

---

## 📝 模板示例

### 栏目页面更新模板

```html
<article class="post-item">
    <h3><a href="/posts/2026-03-04-ai-news.html">2026-03-04 AI机器人早报</a></h3>
    <p class="meta">2026年03月04日</p>
    <p>苹果祭出地表最强AI PC、GPT-5.4意外泄露、阿里开源Qwen3.5、宇树机器人进化、茅台投资机器人公司</p>
</article>
```

### 首页更新模板

```html
<article class="post-preview">
    <h3><a href="/posts/2026-03-04-ai-news.html">2026-03-04 AI机器人早报</a></h3>
    <p class="meta">2026年03月04日 | 😴 睡醒就有早报看</p>
    <p>苹果祭出地表最强AI PC、GPT-5.4意外泄露、阿里开源Qwen3.5、宇树机器人进化、茅台投资机器人公司</p>
</article>
```

---

## ⚠️ 常见问题

### Q1: 为什么栏目页面没有显示新内容？
**A**: 检查是否在 `<article class="post-item">` 列表的**最前面**添加了新内容，而不是最后面。

### Q2: 为什么首页没有显示新内容？
**A**: 检查是否在 `<div class="latest-content">` 部分的**最前面**添加了新内容，并移除了旧文章。

### Q3: GitHub Pages多久更新？
**A**: 通常1-3分钟，最长不超过5分钟。如果超过5分钟还未更新，检查是否有构建错误。

### Q4: 如何查看GitHub Pages构建状态？
**A**: 访问 https://github.com/{username}/{repo}/actions 查看最新的构建记录。

---

## 🚀 自动化建议

未来可以考虑：
1. **模板化**：使用模板引擎自动生成HTML和更新页面
2. **脚本化**：编写脚本自动更新栏目页面和首页
3. **CI/CD**：使用GitHub Actions自动部署

---

**记住：生成HTML文件后，一定要更新栏目页面和首页！** 🚀
