# AISENSE AI资讯平台

> AI资讯、工具分享、开发者社区
> 域名：aisense.top

---

## 📋 项目概览

AISENSE 是一个面向 AI 开发者和爱好者的社区平台，提供：
- **最新 AI 资讯**：大模型动态、Agent 开发、商业化应用
- **工具推荐**：开源项目、效率工具、Agent 模板
- **技术博客**：开发经验、最佳实践、教程分享

---

## 🚀 快速开始

### 开发环境
```bash
# 克隆项目
git clone https://github.com/aisense/aisense-top.git
cd aisense-top

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 项目结构
```
aisense-top/
├── app/                # Next.js 应用目录
│   ├── (page).tsx   # 页面文件
│   ├── layout/       # 布局组件
│   ├── components/   # React 组件
│   ├── lib/          # 工具库
│   ├── styles/       # 样式文件
│   └── config/       # 配置文件
├── content/          # 内容数据（Markdown）
│   ├── news/         # AI资讯
│   ├── tools/        # 工具推荐
│   └── blog/         # 技术博客
├── public/           # 静态资源
├── docs/             # 项目文档
└── scripts/          # 构建和部署脚本
```

---

## 📄 功能特性

### 资讯模块
- 大模型动态更新（GPT、Claude、Gemini）
- Agent 开发新工具和框架
- AI 商业化应用案例
- 技术趋势分析

### 工具模块
- 开源项目推荐（GitHub 星标榜）
- 效率工具评测和推荐
- AI 辅助开发工具集
- Agent 模板和插件

### 博客模块
- AI 学习心得和笔记
- 项目开发记录
- 工具评测和使用体验
- 技术趋势分析

### 变现模块
- CSDN 广告联盟（技术内容）
- 百度联盟广告（搜索流量）
- 会员订阅系统
- 付费内容和课程

---

## 🛠️ 技术栈

- **前端框架**：Next.js 15 (App Router)
- **UI 库**：shadcn/ui + Tailwind CSS
- **状态管理**：Zustand
- **部署平台**：Vercel (免费，全球 CDN)
- **数据库**：GitHub Issues (初期) + Contentful (会员系统)
- **域名**：aisense.top

---

## 🌐 部署信息

### Vercel 部署
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 链接项目
cd aisense-top
vercel link

# 生产部署
vercel --prod
```

### GitHub 集成
- 仓库：https://github.com/aisense/aisense-top
- 自动部署：Git push → Vercel 自动部署
- 域名绑定：aisense.top 已配置

---

## 📊 项目里程碑

### v0.1.0 (2026-01-31)
- [x] 项目初始化
- [x] 基础页面开发（首页、资讯列表、工具推荐）
- [x] 示例内容创建
- [ ] Vercel 部署
- [ ] 域名 aisense.top 绑定
- [ ] CSDN 广告接入

### v0.2.0 (2026-02-28)
- [ ] 会员系统基础版
- [ ] 搜索功能完善
- [ ] 评论和互动
- [ ] 用户收藏
- [ ] 百度联盟广告接入

### v0.3.0 (2026-03-31)
- [ ] 付费内容系统
- [ ] RSS 订阅
- [ ] 数据分析
- [ ] 社区功能
- [ ] Discord 集成

---

## 📝 内容贡献指南

### 提交资讯
- 标题：简洁明确，包含项目/工具名称
- 来源：提供官方链接或 GitHub 仓库
- 分类：选择合适的分类（大模型、Agent、工具等）
- 摘要：2-3 句话说明核心价值

### 提交工具
- 提供完整的工具信息（名称、简介、功能列表）
- 包含截图或使用示例
- 提供官方文档或 GitHub 仓库
- 添加标签（开源、免费、付费等）

### 写技术博客
- 提供清晰的学习路径和经验总结
- 包含代码示例或最佳实践
- 添加相关的资源和链接
- 保持客观和实用

---

## 🎯 开发路线图

### Q1 2026 (1-3月)
- [ ] 基础网站上线
- [ ] 每日内容更新（3-5 条资讯 + 2-3 个工具）
- [ ] CSDN 广告接入和优化
- [ ] 流量达到 1,000 访问/天

### Q2 2026 (4-6月)
- [ ] 会员系统上线
- [ ] 付费内容开发
- [ ] 数据分析功能
- [ ] 流量达到 5,000 访问/天

### Q3 2026 (7-9月)
- [ ] 多广告联盟接入
- [ ] 社区功能上线
- [ ] 内容管理系统
- [ ] 流量达到 10,000 访问/天

### Q4 2026 (10-12月)
- [ ] 完整变现体系
- [ ] 企业功能上线
- [ ] 移动端应用
- [ ] 流量达到 50,000 访问/天

---

## 📞 联系我们

- **邮箱**：contact@aisense.top
- **GitHub**：https://github.com/aisense/aisense-top
- **文档**：https://docs.aisense.top
- **问题反馈**：https://github.com/aisense/aisense-top/issues

---

## 📄 许可证

MIT License - 查看 [LICENSE](./LICENSE) 文件

---

**最后更新**: 2026-01-31
**版本**: v0.1.0
**状态**: 🚀 开发中

---

欢迎来到 AISENSE！探索 AI 的无限可能 🚀
