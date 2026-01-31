#!/bin/bash

# AI Sense 自动更新脚本（新版）
# 功能：调用 Python 脚本抓取资讯，然后推送到 GitHub
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
log "AI Sense 自动更新开始（新版）"
log "========================================"

# 1. 获取今日日期
TODAY=$(date +%Y-%m-%d)
log "今日日期：$TODAY"

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

log "Python 依赖检查完成"

# 3. 运行资讯抓取脚本
log "开始抓取资讯..."

cd "$PROJECT_DIR/scripts"
python3 fetch_news.py || {
    log "错误：资讯抓取失败"
    exit 1
}

log "资讯抓取完成"

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
COMMIT_MSG="Update news and tools: $TODAY

- 自动抓取最新 AI 资讯
- 使用多来源抓取（机器之心、AI 前线、36氪 AI 频道等）
- 每个来源独立生成 Markdown 文件
- 包含引用来源和链接
- 更新时间：$(date +%H:%M:%S)

- 抓取来源：$(find news/$TODAY -name "*.md" 2>/dev/null | wc -l | tr -d ' ') 个
- 资讯文件：$(find news/$TODAY -name "*.md" 2>/dev/null)
- 系统：AI Sense 自动更新系统（新版）

技术实现：
- Python + feedparser + pypinyin
- 支持多来源 RSS 订阅
- 自动生成 Markdown 文件
- 包含引用来源和发布时间"

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

log "资讯目录：$PROJECT_DIR/news/$TODAY"
log "资讯文件：$(find $PROJECT_DIR/news/$TODAY -name "*.md" 2>/dev/null | wc -l | tr -d ' ') 个"
log "Git 提交：$(git log -1 --oneline)"
log "部署状态：GitHub Pages 将自动检测并部署"
log "========================================"

log "访问网站：https://aisense.top"
log "查看资讯：https://github.com/CainGao/aisense-top/tree/main/news/$TODAY"

# 10. 通知（可选）
# 可以在这里添加邮件/飞书通知
# log "发送通知到飞书..."

exit 0
