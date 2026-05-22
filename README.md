# AI Sense - AI工具导航

> 🤖 发现最好的AI工具，掌握最前沿AI资讯

## 简介

AI Sense 是中文AI工具导航平台，定位为行业流量入口。每日精选热门AI工具与AI资讯，覆盖10大分类500+工具。

## 网站结构

```
/
├── index.html          # 首页（工具TOP10 + 分类 + 资讯流）
├── style.css           # 全局样式（暗色主题）
├── posts/              # 文章归档
│   ├── index.html      # 文章列表页（带筛选）
│   ├── YYYY-MM-DD-ai-news.html
│   ├── YYYY-MM-DD-github-trending.html
│   └── YYYY-MM-DD-robot-news.html
├── scripts/
│   └── daily_update.sh # 每日更新脚本
├── sitemap.xml         # SEO sitemap
├── robots.txt          # 爬虫规则
├── CNAME               # 自定义域名
└── README.md
```

## 技术栈

- 纯 HTML5 + CSS3，零框架依赖
- 暗色主题，响应式设计
- GitHub Pages 部署
- OpenClaw cron 每日自动更新（01:00 CST）

## 自动更新

由 OpenClaw 定时任务 `aisense-ops` 驱动：
1. 抓取当日AI新闻 + GitHub Trending
2. 生成 HTML 文件到 posts/
3. 更新文章列表页
4. Git commit & push → GitHub Pages 自动部署

## 地址

- 主站: [aisense.top](https://aisense.top/)
- 仓库: [github.com/CainGao/aisense-top](https://github.com/CainGao/aisense-top)

---

© 2026 AI Sense · Powered by AI Sense Auto-Update System
