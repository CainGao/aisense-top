#!/bin/bash

# AI Sense 自动更新脚本（每小时一次）
# 功能：每小时调用 Python 脚本抓取资讯，然后推送到 GitHub
# 作者：AI Sense 系统
# 日期：2026-01-31

set -e

# 项目目录
PROJECT_DIR="/Users/caingao/aisense-top"
cd "$PROJECT_DIR"

# 日志文件
LOG_FILE="$PROJECT_DIR/logs/auto_update.log"

# 记录日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 开始日志
log "========================================"
log "AI Sense 自动更新开始（每小时一次）"
log "========================================"

# 1. 获取当前时间
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
log "当前时间：$CURRENT_TIME"

# 2. 安装 Python 依赖（如果需要）
log "检查 Python 依赖..."

if ! command -v pip3 &> /dev/null; then
    log "错误：pip3 未找到，请安装 Python 3"
    exit 1
fi

# 安装依赖（如果需要）
pip3 list | grep -q "feedparser" || {
    log "安装 feedparser..."
    pip3 install feedparser
}

pip3 list | grep -q "pypinyin" || {
    log "安装 pypinyin..."
    pip3 install pypinyin
}

pip3 list | grep -q "difflib" || {
    log "安装 difflib..."
    pip3 install difflib
}

log "Python 依赖检查完成"

# 3. 运行智能资讯抓取脚本
log "开始智能抓取资讯..."

cd "$PROJECT_DIR/scripts"
python3 feth_news.py || {
    log "错误：智能资讯抓取失败"
    exit 1
}

log "智能资讯抓取完成"

# 4. 返回项目目录
cd "$PROJECT_DIR"

# 5. 提交到 Git
log "提交到 Git..."

git add . || {
    log "错误：Git add 失败"
    exit 1
}

# 检查是否有变更
if git diff --staged --quiet; then
    log "没有新的变更，跳过提交和推送"
    exit 0
fi

# 6. 创建提交信息
HOUR=$(date +%H)
COMMIT_MSG="Update news and tools: Hourly ($H:00)

- 智能抓取最新 AI 资讯（每小时一次）
- 多来源抓取（机器之心、AI 前线、36氪 AI频道、智东西、新智元、量子位、AI Admin、ofweek AI、aitechw）
- 智能去重（基于链接、标题、内容）
- 智能合并（基于关键词相似度）
- 价值过滤（基于来源、标题、内容、时间）
- 只发布高价值资讯（价值评分 >= 70）
- 更新时间：$(date +%H:%M:%S)

- 抓取来源数量：$(find news/$(date +%Y-%m-%d) -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
- 资讯文件数量：$(find news/$(date +%Y-%m-%d) -name "*.md" 2>/dev/null)
- 系统：AI Sense 智能自动更新系统（升级版）

技术实现：
- Python 3.x + feedparser + pypinyin + difflib
- 多级去重（链接、标题、内容）
- Jaccard 相似度算法（用于合并）
- 多维度价值评分（来源、标题、内容、时间）
- 自动过滤低价值资讯
- 优先级排序
- 智能生成 Markdown 文件
- 包含引用来源和发布时间
- 价值评分和优先级标注

---

🔥 重要说明：
- 已抓取的资讯不再发布（智能去重）
- 同类资讯自动合并（关键词相似度 >= 70%）
- 低价值资讯自动过滤（价值评分 < 50）
- 只发布高价值资讯（价值评分 >= 70）
- 每小时更新一次，确保资讯是最新的

---

AI Sense - AI News Platform
Last Updated: $(date '+%Y-%m-%d %H:%M:%S')
Update Frequency: Hourly (every hour at :00)"

log "提交信息：$COMMIT_MSG"

# 7. 提交更改
git commit -m "$COMMIT_MSG" || {
    log "错误：Git commit 失败"
    exit 1
}

# 8. 推送到 GitHub
log "推送到 GitHub..."

git push origin main || {
    log "错误：Git push 失败"
    exit 1
}

# 9. 成功日志
log "========================================"
log "AI Sense 自动更新完成！"
log "========================================"

log "新闻目录：$PROJECT_DIR/news/$(date +%Y-%m-%d)"
log "资讯文件：$(find $PROJECT_DIR/news/$(date +%Y-%m-%d) -name "*.md" 2>/dev/null | wc -l | tr -d ' ') 个"
log "Git 提交：$(git log -1 --oneline)"
log "部署状态：GitHub Pages 将自动检测并部署"
log "========================================"

log "访问网站：https://aisense.top"
log "查看资讯：https://github.com/CainGao/aisense-top/tree/main/news/$(date +%Y-%m-%d)"

# 10. 通知（可选）
# 可以在这里添加邮件/飞书通知
# log "发送通知到飞书..."

exit 0
