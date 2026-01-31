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
echo "🚀 AISENSE 项目部署"
echo "========================================="
echo ""

# 阶段一：推送代码到GitHub
log_step "阶段一：推送代码到GitHub"

# 进入项目目录
cd "$PROJECT_PATH"

# 配置 Git 远程仓库
log_info "配置 Git 远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
log_success "Git 远程仓库已配置"

# 验证 GitHub 仓库是否存在
log_info "验证 GitHub 仓库是否存在..."
if curl -s "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}" | jq -r '.id' > /dev/null; then
    log_success "GitHub 仓库已存在：https://github.com/${GITHUB_USER}/${REPO_NAME}"
else
    log_error "GitHub 仓库不存在，请手动创建：https://github.com/${GITHUB_USER}/new"
    exit 1
fi

# 推送代码到 GitHub
log_info "推送代码到 GitHub..."
if git push -u origin main 2>&1 | tail -5; then
    log_success "代码推送到 GitHub成功"
    log_info "仓库地址：https://github.com/${GITHUB_USER}/${REPO_NAME}"
else
    log_error "代码推送失败"
    log_info "请检查 SSH 配置和网络连接"
    exit 1
fi

echo ""
log_success "阶段一：代码已推送到 GitHub"
echo ""

# 阶段二：配置Vercel部署
log_step "阶段二：配置Vercel自动部署"

# 检查 Vercel CLI
log_info "检查 Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    log_info "Vercel CLI 未安装，开始安装..."
    npm install -g vercel 2>&1 | tail -5
    log_success "Vercel CLI 已安装"
else
    log_success "Vercel CLI 已安装"
fi

# 登录 Vercel
log_info "登录 Vercel..."
if vercel login 2>&1 | grep -q "Logged in"; then
    log_success "Vercel 登录成功"
else
    log_error "Vercel 登录失败"
    exit 1
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
    # 获取部署URL
    DEPLOY_URL=$(vercel ls --prod 2>&1 | grep -o 'https://[^ ]*\.vercel\.app' | head -1)
    if [ -n "$DEPLOY_URL" ]; then
        log_success "Vercel 部署URL：${DEPLOY_URL}"
    else
        log_warning "无法获取 Vercel 部署URL"
        DEPLOY_URL="https://aisense.vercel.app"
    fi
else
    log_error "Vercel 生产部署失败"
    exit 1
fi

echo ""
log_success "阶段二：Vercel 部署已完成"
echo ""

# 阶段三：配置域名
log_step "阶段三：配置域名 ${DOMAIN}"

log_info "在 Vercel Dashboard 添加域名 ${DOMAIN}..."
log_info "1. 访问：https://vercel.com/dashboard"
log_info "2. 找到 ${REPO_NAME} 项目"
log_info "3. 进入 Settings → Domains"
log_info "4. 添加域名：${DOMAIN}"
log_info "5. Vercel 会提供 DNS 配置信息"

log_info "推荐的 DNS 配置："
echo "   选项A：使用 Vercel Nameservers（推荐）"
echo "   - 删除现有 DNS 记录"
echo "   - 添加 Vercel 提供的 Nameservers："
echo "     - nameserver1.ns1.vercel-dns.com"
echo "     - nameserver2.ns1.vercel-dns.com"
echo "     - nameserver1.ns2.vercel-dns.com"
echo "     - nameserver2.ns2.vercel-dns.com"
echo ""
echo "   选项B：手动配置 CNAME 记录"
echo "   - 类型：CNAME"
echo "   - 主机记录：@"
echo "   - 记录值：cname.vercel-dns.com"

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

# 测试域名
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
echo "   3. 配置 DNS（如果还没有）"
echo "   4. 开始每日内容更新"
echo ""
log_success "祝使用愉快！🚀"
