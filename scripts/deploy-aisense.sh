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

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 项目信息
PROJECT_NAME="AISENSE"
REPO_NAME="aisense-top"
GITHUB_USER="CainGao"
DOMAIN="aisense.top"
PROJECT_PATH="/Users/caingao/aisense-top"

echo "========================================="
echo "🚀 AISENSE 项目自动化部署"
echo "========================================="
echo ""

# 阶段一：配置Git使用SSH
log_info "阶段一：配置Git使用SSH"

# 删除全局URL重写规则
log_info "删除Git全局URL重写规则..."
git config --global --unset-all url 2>/dev/null || true
log_success "Git全局URL重写规则已删除"

# 配置Git远程仓库
log_info "配置Git远程仓库..."
cd "$PROJECT_PATH"
git remote remove origin 2>/dev/null || true
git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
log_success "Git远程仓库已配置为：git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

# 验证SSH连接
log_info "测试SSH连接到GitHub..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    log_success "SSH连接测试成功"
else
    log_error "SSH连接测试失败"
    log_warning "这可能是因为SSH Key没有正确添加到GitHub"
    log_info "请在 https://github.com/${GITHUB_USER}/settings/keys 检查SSH Key"
    exit 1
fi

echo ""
log_success "阶段一：Git配置完成"
echo ""

# 阶段二：检查并创建GitHub仓库
log_info "阶段二：检查并创建GitHub仓库"

# 检查GitHub仓库是否存在
log_info "检查GitHub仓库是否存在：https://github.com/${GITHUB_USER}/${REPO_NAME}"
if curl -s "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}" | jq -e '.id' 2>/dev/null | grep -q "null"; then
    log_warning "GitHub仓库不存在，需要创建"

    # 提示用户创建GitHub仓库
    log_info "请在GitHub上创建仓库："
    echo "1. 访问：https://github.com/${GITHUB_USER}/new"
    echo "2. 仓库名称：${REPO_NAME}"
    echo "3. 可见性：Public（公开）"
    echo "4. 初始化：不要勾选任何选项"
    echo "5. 点击 \"Create repository\""
    echo ""
    log_info "创建完成后，请按回车继续..."
    read -p "按回车键确认仓库已创建："

    # 验证仓库是否创建成功
    log_info "验证GitHub仓库是否创建成功..."
    if curl -s "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}" | jq -e '.id' 2>/dev/null | grep -q "null"; then
        log_error "GitHub仓库验证失败，请检查仓库地址：https://github.com/${GITHUB_USER}/${REPO_NAME}"
        exit 1
    fi
    log_success "GitHub仓库创建成功：https://github.com/${GITHUB_USER}/${REPO_NAME}"
else
    log_success "GitHub仓库已存在：https://github.com/${GITHUB_USER}/${REPO_NAME}"
fi

echo ""
log_success "阶段二：GitHub仓库已就绪"
echo ""

# 阶段三：推送代码到GitHub
log_info "阶段三：推送代码到GitHub"

# 验证本地Git仓库
log_info "验证本地Git仓库..."
if [ ! -d "$PROJECT_PATH/.git" ]; then
    log_error "Git仓库不存在：$PROJECT_PATH"
    exit 1
fi
log_success "本地Git仓库验证通过"

# 推送代码到GitHub
log_info "推送代码到GitHub（30+个文件）..."
git push -u origin main 2>&1
if [ $? -eq 0 ]; then
    log_success "代码推送到GitHub成功"
    log_info "仓库地址：https://github.com/${GITHUB_USER}/${REPO_NAME}"
else
    log_error "代码推送失败"
    log_info "请检查Git配置和网络连接"
    exit 1
fi

echo ""
log_success "阶段三：代码已推送到GitHub"
echo ""

# 阶段四：配置Vercel部署
log_info "阶段四：配置Vercel自动部署"

# 检查是否安装Vercel CLI
log_info "检查Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    log_info "Vercel CLI未安装，开始安装..."
    npm install -g vercel 2>&1 | tail -5
    log_success "Vercel CLI已安装"
else
    log_success "Vercel CLI已安装"
fi

# 登录Vercel
log_info "登录Vercel..."
vercel login
if [ $? -eq 0 ]; then
    log_success "Vercel登录成功"
else
    log_error "Vercel登录失败"
    exit 1
fi

# 链接项目到Vercel
log_info "链接${PROJECT_NAME}项目到Vercel..."
vercel link
if [ $? -eq 0 ]; then
    log_success "Vercel项目链接成功"
else
    log_error "Vercel项目链接失败"
    exit 1
fi

# 生产部署
log_info "开始生产部署..."
vercel --prod
if [ $? -eq 0 ]; then
    log_success "Vercel生产部署成功"
    # 获取部署URL
    DEPLOY_URL=$(vercel ls --prod | head -1 | awk '{print $2}')
    log_success "Vercel部署URL：${DEPLOY_URL}"
else
    log_error "Vercel生产部署失败"
    exit 1
fi

echo ""
log_success "阶段四：Vercel部署完成"
echo ""

# 阶段五：配置域名aisense.top
log_info "阶段五：配置域名${DOMAIN}"

# 提示用户配置域名
log_info "请在Vercel Dashboard配置域名：${DOMAIN}"
echo ""
echo "1. 访问：https://vercel.com/dashboard"
echo "2. 找到${PROJECT_NAME}项目"
echo "3. 进入 Settings → Domains"
echo "4. 添加域名：${DOMAIN}"
echo "5. Vercel会提供DNS配置信息"
echo ""
log_info "推荐的DNS配置方案："
echo "   选项A：使用Vercel Nameservers（推荐）"
echo "   选项B：手动配置CNAME记录"
echo ""
echo "   CNAME记录："
echo "   - 主机记录：@"
echo "   - 记录类型：CNAME"
echo "   - 记录值：cname.vercel-dns.com"
echo ""
log_info "配置完成后，请按回车继续..."
read -p "域名配置完成后，按回车键继续："

# 验证域名解析
log_info "验证域名${DOMAIN}解析..."
if nslookup "$DOMAIN" 2>&1 | grep -q "can't find"; then
    log_warning "域名${DOMAIN}解析可能失败"
    log_info "DNS传播可能需要10-60分钟"
else
    log_success "域名${DOMAIN}解析成功"
fi

echo ""
log_success "阶段五：域名配置完成"
echo ""

# 阶段六：测试网站访问
log_info "阶段六：测试网站访问"

# 测试Vercel默认域名
log_info "测试Vercel默认域名访问..."
if curl -s "I https://${DEPLOY_URL}" | head -1 | grep -q "200 OK"; then
    log_success "Vercel默认域名访问成功：${DEPLOY_URL}"
else
    log_warning "Vercel默认域名访问可能失败"
fi

# 测试域名aisense.top
log_info "测试域名${DOMAIN}访问..."
if curl -s "I https://${DOMAIN}" | head -1 | grep -q "200 OK"; then
    log_success "域名${DOMAIN}访问成功：https://${DOMAIN}"
else
    log_warning "域名${DOMAIN}访问可能失败"
    log_info "DNS传播可能需要10-60分钟"
fi

echo ""
log_success "阶段六：网站访问测试完成"
echo ""

# 总结
echo "========================================="
echo "🎉 自动化部署完成！"
echo "========================================="
echo ""
log_success "部署信息："
echo "   - GitHub仓库：https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo "   - Vercel部署：${DEPLOY_URL}"
echo "   - 域名访问：https://${DOMAIN}"
echo ""
log_info "后续步骤："
echo "1. 访问网站：https://${DOMAIN}"
echo "2. 验证所有页面正常工作"
echo "3. 检查SEO和性能"
echo "4. 开始每日内容更新"
echo ""
log_success "祝使用愉快！🚀"
echo ""
