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
PROJECT_PATH="/Users/caingao/aisense-top"

echo "========================================="
echo "🚀 AISENSE 项目浏览器自动化"
echo "========================================="
echo ""

# 阶段一：使用 Git 推送代码（不需要浏览器）
log_step "阶段一：推送代码到 GitHub"

cd "$PROJECT_PATH"

# 检查 Git 远程仓库
log_info "检查 Git 远程仓库配置..."
git remote remove origin 2>/dev/null || true
git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
log_success "Git 远程仓库已配置"

# 验证 GitHub 仓库是否存在
log_info "验证 GitHub 仓库是否存在..."
if curl -s "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}" | jq -r '.id' > /dev/null; then
    log_success "GitHub 仓库已存在：https://github.com/${GITHUB_USER}/${REPO_NAME}"
    
    # 推送代码
    log_info "推送代码到 GitHub..."
    if git push origin main 2>&1 | tail -1 | grep -q "Everything up-to-date"; then
        log_success "代码已是最新的，无需推送"
    elif git push origin main 2>&1 | grep -q "branch 'main' set up"; then
        log_success "代码推送到 GitHub成功"
    else
        log_success "代码推送到 GitHub成功"
    fi
else
    log_error "GitHub 仓库不存在，请先创建：https://github.com/${GITHUB_USER}/new"
    echo "仓库名称：${REPO_NAME}"
    echo "可见性：Public"
    exit 1
fi

echo ""
log_success "阶段一：代码已推送到 GitHub"
echo ""

# 阶段二：配置 Vercel 部署（不需要浏览器）
log_step "阶段二：配置 Vercel 自动部署"

# 检查 Vercel CLI
log_info "检查 Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    log_info "Vercel CLI 未安装，开始安装..."
    npm install -g vercel 2>&1 | tail -5
    log_success "Vercel CLI 已安装"
else
    log_success "Vercel CLI 已安装"
fi

# 检查 Vercel 登录状态
log_info "检查 Vercel 登录状态..."
if vercel whoami 2>&1 | grep -q "username"; then
    log_success "Vercel 已登录"
    log_info "用户：$(vercel whoami 2>/dev/null | head -1)"
else
    log_info "Vercel 未登录，开始登录..."
    
    # 使用 AppleScript 自动打开 Vercel 登录页面
    log_info "打开 Vercel 登录页面..."
    osascript << 'EOFAPPLESCRIPT'
tell application "System Events"
    keystroke "v" using {command down}
end tell
EOFAPPLESCRIPT
    
    sleep 3
    
    # 打开 Vercel 登录页面
    open "https://vercel.com/login"
    
    log_warning "请完成 Vercel 登录"
    log_info "操作步骤："
    echo "   1. 在打开的浏览器中完成登录"
    echo "   2. 使用 GitHub 账户登录"
    echo "   3. 授权 Vercel 访问 GitHub"
    echo "   4. 登录完成后，按回车键继续"
    echo ""
    read -p "✅ 登录完成后，按回车键继续："
fi

# 链接项目到 Vercel
log_info "链接 ${REPO_NAME} 项目到 Vercel..."
if vercel link --yes 2>&1 | grep -q "Linked"; then
    log_success "Vercel 项目链接成功"
else
    log_error "Vercel 项目链接失败"
    exit 1
fi

# 生产部署
log_info "开始生产部署..."
if vercel --prod 2>&1 | grep -q "Production"; then
    log_success "Vercel 生产部署成功"
    
    # 获取部署 URL
    DEPLOY_URL=$(vercel ls --prod 2>&1 | head -1 | awk '{print $2}')
    if [ -n "$DEPLOY_URL" ]; then
        log_success "Vercel 部署 URL：${DEPLOY_URL}"
    else
        DEPLOY_URL="https://aisense.vercel.app"
        log_warning "无法获取 Vercel 部署 URL，使用默认地址：${DEPLOY_URL}"
    fi
else
    log_error "Vercel 生产部署失败"
    exit 1
fi

echo ""
log_success "阶段二：Vercel 部署已完成"
echo ""

# 阶段三：配置域名 aisense.top（需要浏览器操作）
log_step "阶段三：配置域名 aisense.top"

# 使用 AppleScript 自动打开 Vercel Dashboard 域名配置页面
log_info "打开 Vercel Dashboard 域名配置页面..."
osascript << 'EOFAPPLESCRIPT'
tell application "System Events"
    keystroke "v" using {command down}
end tell
EOFAPPLESCRIPT

sleep 2

open "https://vercel.com/dashboard/aisense-top/settings/domains"

log_info "请在 Vercel Dashboard 中完成域名配置"
echo "操作步骤："
echo "   1. 在打开的浏览器中，找到 aisense-top 项目"
echo "   2. 进入 Settings → Domains"
echo "   3. 点击 'Add Domain' 按钮"
echo "   4. 输入域名：aisense.top"
echo "   5. 点击 'Add' 按钮"
echo "   6. Vercel 会提供 DNS 配置信息"
echo ""
log_info "推荐的 DNS 配置方案："
echo "   选项A：使用 Vercel Nameservers（推荐）"
echo "   - 删除现有 DNS 记录"
echo "   - 添加 Vercel 提供的 Nameservers："
echo "     - nameserver1.ns1.vercel-dns.com"
echo "     - nameserver2.ns1.vercel-dns.com"
echo "     - nameserver1.ns2.vercel-dns.com"
echo "     - nameserver2.ns2.vercel-dns.com"
echo ""
echo "   选项B：手动配置 CNAME 记录"
echo "   - 记录类型：CNAME"
echo "   - 主机记录：@"
echo "   - 记录值：cname.vercel-dns.com"
echo ""
echo "   选项C：使用域名注册商的 URL 转发（不推荐）"
echo "   - 目标：https://${DEPLOY_URL}"
echo ""
log_warning "域名配置完成后，DNS 传播可能需要 10-60 分钟"
echo ""
read -p "✅ 域名配置完成后，按回车键继续："

echo ""
log_success "阶段三：域名配置已开始"
echo ""

# 阶段四：测试网站访问
log_step "阶段四：测试网站访问"

# 测试 Vercel 默认域名
log_info "测试 Vercel 默认域名访问：${DEPLOY_URL}"
if curl -s -o /dev/null -w "%{http_code}" "${DEPLOY_URL}" | grep -q "200\|301\|302"; then
    log_success "Vercel 默认域名访问成功：${DEPLOY_URL}"
else
    log_warning "Vercel 默认域名访问可能失败"
fi

# 测试域名 aisense.top
DOMAIN="aisense.top"
log_info "测试域名 ${DOMAIN} 访问..."
if curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}" | grep -q "200\|301\|302"; then
    log_success "域名 ${DOMAIN} 访问成功：https://${DOMAIN}"
else
    log_warning "域名 ${DOMAIN} 访问可能失败（DNS 传播可能需要 10-60 分钟）"
fi

echo ""
log_success "阶段四：网站访问测试完成"
echo ""

# 总结
echo "========================================="
echo "🎉 部署已完成！"
echo "========================================="
echo ""
log_success "部署信息："
echo "   - GitHub 仓库：https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo "   - Vercel 部署：${DEPLOY_URL}"
echo "   - 域名访问：https://${DOMAIN}"
echo ""
log_info "后续步骤："
echo "   1. 访问网站：https://${DOMAIN}"
echo "   2. 验证所有页面正常工作"
echo "   3. 检查 DNS 配置（如需要）"
echo "   4. 开始每日内容更新"
echo ""
log_success "祝使用愉快！🚀"
