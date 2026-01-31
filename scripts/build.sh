#!/bin/bash

set -e

echo "🚀 构建 AISENSE 网站..."
echo ""

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf .next out

# 构建网站
echo "🏗️ 构建网站..."
npm run build

echo ""
echo "✅ 构建完成！"
echo ""
echo "📦 构建输出：.next/"
echo "📦 静态输出：out/"
echo ""
echo "🚀 下一步："
echo "   1. 复制 .next/* 到 out/"
echo "   2. 提交并推送"
echo "   3. 启用 GitHub Pages"
echo ""
