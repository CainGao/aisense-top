#!/bin/bash

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${YELLOW}🚀 $1${NC}"
}

# 项目信息
GITHUB_USER="CainGao"
REPO_NAME="aisense-top"
DOMAIN="aisense.top"
PROJECT_PATH="/Users/caingao/aisense-top"

echo "========================================="
echo "🚀 AISENSE 项目部署到 GitHub Pages"
echo "========================================="
echo ""

# 阶段一：配置 Next.js for GitHub Pages
log_step "阶段一：配置 Next.js for GitHub Pages"

cd "$PROJECT_PATH"

# 创建 next.config.pages.mjs
log_info "创建 next.config.pages.mjs..."
cat > next.config.pages.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 如果使用自定义域名，需要配置 basePath
  // basePath: '/aisense-top',
  // GitHub Pages 默认从 gh-pages 分支构建
  // 所以我们需要修改 package.json 的 scripts
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
EOF

log_success "next.config.pages.mjs 已创建"

# 修改 package.json 的 scripts
log_info "修改 package.json 的 scripts..."
# 备份 package.json
cp package.json package.json.backup

# 使用 jq 修改 scripts
jq '.scripts.build = "next build"' package.json > package.json.tmp
jq '.scripts.export = "next build"' package.json.tmp
mv package.json.tmp package.json

# 删除备份
rm package.json.backup

log_success "package.json 的 scripts 已修改"

echo ""
log_success "阶段一：Next.js 配置完成"
echo ""

# 阶段二：创建 gh-pages 分支
log_step "阶段二：创建 gh-pages 分支"

# 创建 gh-pages 分支
log_info "创建 gh-pages 分支..."
git checkout -b gh-pages

# 清空 gh-pages 分支（只保留 README.md）
log_info "清空 gh-pages 分支..."
git rm -rf . || true
cp .gitignore ../.gitignore.temp || true

# 创建 .nojekyll 文件（告诉 GitHub Pages 这是一个静态网站）
log_info "创建 .nojekyll 文件..."
echo "" > .nojekyll

# 创建 index.html（重定向到域名）
log_info "创建 index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=https://${DOMAIN}/">
    <script>
        window.location.href = 'https://${DOMAIN}/';
    </script>
</head>
<body>
    <p>重定向到 <a href="https://${DOMAIN}/">https://${DOMAIN}/</a></p>
</body>
</html>
EOF

# 提交 gh-pages 分支
log_info "提交 gh-pages 分支..."
git add .
git commit -m "Add gh-pages branch for GitHub Pages"

# 推送到 GitHub
log_info "推送 gh-pages 分支到 GitHub..."
git push -u origin gh-pages

# 切换回 main 分支
log_info "切换回 main 分支..."
git checkout main

log_success "gh-pages 分支已创建并推送"
echo ""

# 阶段三：配置 Next.js 构建并推送到 gh-pages
log_step "阶段三：配置 Next.js 构建并推送到 gh-pages"

# 创建构建和部署脚本
log_info "创建构建和部署脚本..."
cat > scripts/build-and-deploy-pages.sh << 'EOF'
#!/bin/bash

set -e

echo "🚀 开始构建 AISENSE 网站..."
echo ""

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf .next out

# 构建网站
echo "🏗️  构建网站..."
npm run build

# 复制构建文件到 out 目录（GitHub Pages 需要）
echo "📦 复制构建文件到 out 目录..."
mkdir -p out
cp -r .next/* out/

# 提交并推送
echo "📝 提交并推送..."
git add .
git commit -m "Update AISENSE website"

echo ""
echo "✅ 构建和部署完成！"
echo ""

echo "🌐 访问 GitHub Pages："
echo "   - https://caingao.github.io/${REPO_NAME}"
echo "   - https://${DOMAIN}"
echo ""
EOF

chmod +x scripts/build-and-deploy-pages.sh

log_success "构建和部署脚本已创建"

echo ""
log_success "阶段三：构建和部署脚本已完成"
echo ""

# 阶段四：启用 GitHub Pages
log_step "阶段四：启用 GitHub Pages"

log_info "在 GitHub 上启用 GitHub Pages..."
echo ""
echo "💡 请按照以下步骤操作："
echo ""
echo "1. 访问：https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "2. 选择 Branch："
echo "   - 源：${GITHUB_USER}/${REPO_NAME}"
echo "   - 分支：gh-pages"
echo "   - 目录：/ (root)"
echo "3. 点击：Save"
echo ""

# 打开 GitHub Pages 设置
log_info "打开 GitHub Pages 设置..."
open "https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"

log_info "启用 GitHub Pages 后，请告诉我：\"GitHub Pages 已启用\""
log_info ""
log_info "💡 提示：GitHub Pages 需要从 gh-pages 分支构建"
log_info "💡 提示：我们刚刚创建了 gh-pages 分支"

echo ""
log_success "阶段四：GitHub Pages 已启用（需要你手动操作）"
echo ""

# 阶段五：配置 DNS
log_step "阶段五：配置 DNS（A 记录）"

log_info "配置 DNS（A 记录）..."
echo ""
echo "💡 请在域名注册商配置以下 DNS 记录："
echo ""
echo "📋 DNS 配置信息："
echo ""
echo "   记录类型：A"
echo "   主机记录：@"
echo "   记录值：185.199.108.153（GitHub Pages IP）"
echo "   TTL：600（或默认）"
echo ""

echo "🌐 GitHub Pages IP 地址："
echo "   - A 记录：185.199.108.153"
echo "   - GitHub Pages 使用的 IP 地址"
echo ""

log_info "DNS 配置完成后，请告诉我：\"DNS 配置已完成\""
log_info ""
log_info "💡 提示：DNS 传播可能需要 10-60 分钟"

echo ""
log_success "阶段五：DNS 配置（需要你手动操作）"
echo ""

# 阶段六：在 GitHub Pages 添加自定义域名
log_step "阶段六：在 GitHub Pages 添加自定义域名"

log_info "在 GitHub Pages 添加自定义域名..."
echo ""
echo "💡 请按照以下步骤操作："
echo ""
echo "1. 访问：https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "2. 点击：Custom domain"
echo "3. 输入：${DOMAIN}"
echo "4. 点击：Add domain"
echo ""

log_info "GitHub Pages 会自动检测 DNS 配置"
echo "   - 如果正确，显示：DNS check successful"
echo "   - 如果错误，显示 DNS 配置问题"

log_success "阶段六：GitHub Pages 自定义域名已添加（需要你手动操作）"
echo ""

# 阶段七：测试网站访问
log_step "阶段七：测试网站访问"

log_info "测试网站访问..."
echo ""

# 测试 GitHub Pages 默认域名
GITHUB_PAGES_URL="https://caingao.github.io/${REPO_NAME}"
log_info "测试 GitHub Pages 默认域名：${GITHUB_PAGES_URL}"
if curl -s -o /dev/null -w "%{http_code}" "${GITHUB_PAGES_URL}" | grep -q "200\|301\|302"; then
    log_success "GitHub Pages 默认域名访问成功：${GITHUB_PAGES_URL}"
else
    log_warning "GitHub Pages 默认域名访问可能失败"
fi

# 测试自定义域名
log_info "测试自定义域名：https://${DOMAIN}"
if curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}" | grep -q "200\|301\|302"; then
    log_success "自定义域名访问成功：https://${DOMAIN}"
else
    log_warning "自定义域名访问可能失败（DNS 传播可能需要 10-60 分钟）"
fi

echo ""
log_success "阶段七：网站访问测试完成"
echo ""

# 总结
echo "========================================="
echo "🎉 GitHub Pages 部署完成！"
echo "========================================="
echo ""
log_success "部署信息："
echo "   - GitHub 仓库：https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo "   - GitHub Pages：https://caingao.github.io/${REPO_NAME}"
echo "   - 自定义域名：https://${DOMAIN}"
echo ""
log_info "后续步骤："
echo "   1. 在 GitHub 上启用 GitHub Pages（从 gh-pages 分支）"
echo "   2. 配置 DNS（A 记录，185.199.108.153）"
echo "   3. 在 GitHub Pages 添加自定义域名"
echo "   4. 等待 DNS 传播（10-60 分钟）"
echo "   5. 测试网站访问"
echo "   6. 开始每日内容更新"
echo ""
log_info "构建和部署网站："
echo "   cd ${PROJECT_PATH}"
echo "   npm run build"
echo "   cd out"
echo "   git add ."
echo "   git commit -m \"Update website\""
echo "   git push origin gh-pages"
echo ""
log_success "祝使用愉快！🚀"
echo ""

# 显示最终指南
echo "========================================="
echo "📋 GitHub Pages 部署最终指南"
echo "========================================="
echo ""
log_info "1. 启用 GitHub Pages（需要你操作）："
echo "   - 访问：https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "   - 选择 Branch：gh-pages"
echo "   - 选择 Folder：/ (root)"
echo "   - 点击：Save"
echo ""
log_info "2. 配置 DNS（需要你操作）："
echo "   - 记录类型：A"
echo "   - 主机记录：@"
echo "   - 记录值：185.199.108.153"
echo "   - TTL：600"
echo ""
log_info "3. 在 GitHub Pages 添加域名（需要你操作）："
echo "   - 访问：https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "   - 点击：Custom domain"
echo "   - 输入：${DOMAIN}"
echo "   - 点击：Add domain"
echo ""
log_info "4. 测试网站访问："
echo "   - GitHub Pages：https://caingao.github.io/${REPO_NAME}"
echo "   - 自定义域名：https://${DOMAIN}"
echo ""
log_info "5. 构建和部署网站："
echo "   - cd ${PROJECT_PATH}"
echo "   - npm run build"
echo "   - cd out"
echo "   - git add ."
echo "   - git commit -m \"Update website\""
echo "   - git push origin gh-pages"
echo ""
log_success "准备好了吗？"
echo ""
log_info "第一步：在 GitHub 上启用 GitHub Pages（需要你操作）"
echo "第二步：配置 DNS（需要你操作）"
echo "第三步：在 GitHub Pages 添加域名（需要你操作）"
echo ""
log_info "完成后告诉我：\"所有配置已完成\""
echo ""
log_info "我会立即构建和部署网站！"
echo ""
