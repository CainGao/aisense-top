#!/bin/bash

set -e

echo "🚀 部署 AISENSE 网站到 GitHub Pages..."
echo ""

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf .next out

# 构建网站
echo "🏗️ 构建网站..."
npm run build

# 复制构建文件到 out 目录（GitHub Pages 需要）
echo "📦 复制构建文件到 out 目录..."
mkdir -p out
cp -r .next/* out/

echo ""
echo "✅ 构建和部署准备完成！"
echo ""
echo "📦 构建输出：out/"
echo ""
echo "🚀 下一步："
echo "   1. git add ."
echo "   2. git commit -m \"Update website\""
echo "   3. git push origin main"
echo "   4. 在 GitHub 上启用 GitHub Pages"
echo ""
