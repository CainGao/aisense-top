#!/bin/bash
# AI Sense 每日自动更新脚本
# 由 OpenClaw cron 触发，在子代理中执行
# 用法: bash scripts/daily_update.sh

set -e
REPO_DIR="/tmp/aisense-top"
DATE=$(date +%Y-%m-%d)
DATE_SHORT=$(date +%m/%d)

cd "$REPO_DIR" || { echo "ERROR: Repo not found at $REPO_DIR, clone first"; exit 1; }
git pull origin main 2>&1 || true

echo "=== AI Sense Daily Update: $DATE ==="
echo "Content generation is handled by the OpenClaw subagent."
echo "This script handles git operations."

# Subagent should have written files to posts/ and updated index.html
# Now commit and push

git add -A

if git diff --staged --quiet; then
    echo "No changes to commit."
    exit 0
fi

git commit -m "📅 Daily update: $DATE - AI新闻、GitHub Trending、机器人资讯

- AI Sense 每日自动更新
- 更新时间: $(date '+%Y-%m-%d %H:%M:%S')
- AI Sense - AI工具导航站

Powered by AI Sense Auto-Update System"

git push origin main 2>&1
echo "=== Push complete ==="
