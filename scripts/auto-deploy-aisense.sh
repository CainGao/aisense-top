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
REPO_DESCRIPTION="AISENSE AI资讯平台 - AI资讯、工具分享、开发者社区"
PROJECT_PATH="/Users/caingao/aisense-top"

echo "========================================="
echo "🚀 AISENSE 项目自动化部署（不涉及浏览器）"
echo "========================================="
echo ""

# 检查GitHub Token（需要用户提供）
if [ -z "$GITHUB_TOKEN" ]; then
    log_error "GITHUB_TOKEN 环境变量未设置"
    echo "请设置 GITHUB_TOKEN: export GITHUB_TOKEN='your_token'"
    echo "获取 Token: https://github.com/settings/tokens"
    exit 1
fi

# 阶段一：创建GitHub仓库
log_step "阶段一：创建GitHub仓库"

# 检查仓库是否存在
log_info "检查仓库是否存在：https://github.com/${GITHUB_USER}/${REPO_NAME}"
REPO_EXISTS=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" "https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}" | jq -r '.id' 2>/dev/null || echo "null")

if [ "$REPO_EXISTS" == "null" ]; then
    log_info "仓库不存在，开始创建..."
    
    # 使用 GitHub API 创建仓库
    log_info "通过 GitHub API 创建仓库..."
    RESPONSE=$(curl -s -X POST \
        -H "Authorization: token ${GITHUB_TOKEN}" \
        -H "Accept: application/vnd.github.v3+json" \
        -d "{
            \"name\": \"${REPO_NAME}\",
            \"description\": \"${REPO_DESCRIPTION}\",
            \"private\": false,
            \"has_issues\": true,
            \"has_projects\": true,
            \"has_wiki\": true,
            \"auto_init\": false
        }" \
        "https://api.github.com/user/repos")
    
    # 检查创建结果
    if echo "$RESPONSE" | jq -e '.id' > /dev/null 2>&1; then
        log_success "GitHub仓库创建成功！"
        REPO_URL=$(echo "$RESPONSE" | jq -r '.html_url')
        log_success "仓库地址：${REPO_URL}"
    else
        log_error "GitHub仓库创建失败"
        log_error "响应：$RESPONSE"
        exit 1
    fi
else
    log_success "仓库已存在：https://github.com/${GITHUB_USER}/${REPO_NAME}"
    REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}"
fi

echo ""
log_success "阶段一：GitHub仓库已就绪"
echo ""

# 阶段二：推送代码到GitHub
log_step "阶段二：推送代码到GitHub"

# 进入项目目录
cd "$PROJECT_PATH"

# 配置 Git 使用 SSH
log_info "配置 Git 使用 SSH..."
git remote remove origin 2>/dev/null || true
git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

# 验证远程仓库
log_info "验证 Git 远程仓库配置..."
git remote -v

# 推送代码到 GitHub
log_info "推送代码到 GitHub..."
if git push -u origin main 2>&1 | tail -1; then
    log_success "代码推送到 GitHub成功"
else
    log_error "代码推送失败"
    exit 1
fi

echo ""
log_success "阶段二：代码已推送到 GitHub"
echo ""

# 阶段三：配置Vercel部署
log_step "阶段三：配置Vercel部署"

# 检查 VERCEL_TOKEN
if [ -z "$VERCEL_TOKEN" ]; then
    log_error "VERCEL_TOKEN 环境变量未设置"
    echo "请设置 VERCEL_TOKEN: export VERCEL_TOKEN='your_token'"
    echo "获取 Token: https://vercel.com/account/tokens"
    exit 1
fi

# 创建 Vercel 项目
log_info "创建 Vercel 项目..."
PROJECT_ID=$(curl -s -X POST \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
        \"name\": \"${REPO_NAME}\",
        \"framework\": \"nextjs\",
        \"gitRepository\": {
            \"id\": \"${GITHUB_USER}/${REPO_NAME}\",
            \"url\": \"https://github.com/${GITHUB_USER}/${REPO_NAME}\"
        }
    }" \
    "https://api.vercel.com/v9/projects" | jq -r '.id')

if [ -z "$PROJECT_ID" ]; then
    log_error "Vercel 项目创建失败"
    exit 1
fi

log_success "Vercel 项目创建成功，项目ID：${PROJECT_ID}"

# 创建生产环境部署
log_info "创建生产环境部署..."
DEPLOYMENT_ID=$(curl -s -X POST \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
        \"name\": \"production\",
        \"project\": \"${PROJECT_ID}\",
        \"target\": \"production\"
    }" \
    "https://api.vercel.com/v1/projects/${PROJECT_ID}/deployments" | jq -r '.id')

if [ -z "$DEPLOYMENT_ID" ]; then
    log_error "Vercel 部署创建失败"
    exit 1
fi

log_success "Vercel 部署创建成功，部署ID：${DEPLOYMENT_ID}"

echo ""
log_success "阶段三：Vercel部署已配置"
echo ""

# 阶段四：配置域名
log_step "阶段四：配置域名 aisense.top"

DOMAIN="aisense.top"

# 添加域名到 Vercel 项目
log_info "添加域名 ${DOMAIN} 到 Vercel 项目..."
DOMAIN_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
        \"name\": \"${DOMAIN}\",
        \"redirect\": null
    }" \
    "https://api.vercel.com/v9/projects/${PROJECT_ID}/domains")

# 检查域名配置
if echo "$DOMAIN_RESPONSE" | jq -e '.name' > /dev/null 2>&1; then
    log_success "域名 ${DOMAIN} 已添加到 Vercel 项目"
    
    # 获取域名配置信息
    log_info "获取域名 DNS 配置信息..."
    DNS_CONFIG=$(curl -s -H "Authorization: Bearer ${VERCEL_TOKEN}" \
        "https://api.vercel.com/v9/projects/${PROJECT_ID}/domains/${DOMAIN}/config")
    
    log_success "DNS 配置信息："
    echo "$DNS_CONFIG" | jq -r '.'
else
    log_warning "域名配置可能失败"
    log_info "请手动在 Vercel Dashboard 配置域名：https://vercel.com/dashboard"
fi

echo ""
log_success "阶段四：域名配置已开始"
echo ""

# 阶段五：测试网站访问
log_step "阶段五：测试网站访问"

# 等待 Vercel 部署完成（最多5分钟）
log_info "等待 Vercel 部署完成（最多5分钟）..."
for i in {1..30}; do
    sleep 10
    
    # 检查部署状态
    DEPLOYMENT_STATUS=$(curl -s -H "Authorization: Bearer ${VERCEL_TOKEN}" \
        "https://api.vercel.com/v13/deployments/${DEPLOYMENT_ID}" | jq -r '.ready')
    
    if [ "$DEPLOYMENT_STATUS" == "true" ]; then
        log_success "Vercel 部署已完成！"
        break
    fi
    
    echo -n "."
done

echo ""

# 测试 Vercel 域名访问
VERCEL_URL="https://aisense-xxx.vercel.app"
log_info "测试 Vercel 默认域名访问：${VERCEL_URL}"
if curl -s -o /dev/null -w "%{http_code}" "${VERCEL_URL}" | grep -q "200\|301\|302"; then
    log_success "Vercel 默认域名访问成功：${VERCEL_URL}"
else
    log_warning "Vercel 默认域名访问可能失败"
fi

# 测试域名访问
DOMAIN_URL="https://${DOMAIN}"
log_info "测试域名访问：${DOMAIN_URL}"
if curl -s -o /dev/null -w "%{http_code}" "${DOMAIN_URL}" | grep -q "200\|301\|302"; then
    log_success "域名访问成功：${DOMAIN_URL}"
else
    log_warning "域名访问可能失败（DNS传播可能需要10-60分钟）"
fi

echo ""
log_success "阶段五：网站访问测试完成"
echo ""

# 总结
echo "========================================="
echo "🎉 自动化部署完成！"
echo "========================================="
echo ""
log_success "部署信息："
echo "   - GitHub仓库：https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo "   - Vercel项目：https://vercel.com/dashboard"
echo "   - Vercel部署：https://vercel.com/dashboard/${PROJECT_ID}"
echo "   - 域名访问：https://${DOMAIN}"
echo ""
log_success "后续步骤："
echo "   1. 访问网站：https://${DOMAIN}"
echo "   2. 验证所有页面正常工作"
echo "   3. 检查 DNS 配置（如需要）"
echo "   4. 开始每日内容更新"
echo ""
log_success "祝使用愉快！🚀"
