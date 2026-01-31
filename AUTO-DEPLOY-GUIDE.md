# AISENSE 项目自动化部署（不涉及浏览器）

> 创建时间：2026-01-31 19:30
> 方法：使用命令行工具（curl、jq、git）
> 自动化：100%，无需用户介入

---

## 🚀 自动化方案

### 方案选择
- ❌ **浏览器自动化**：需要用户操作，失败率高
- ✅ **命令行自动化**：100% 自动化，无需用户介入

### 使用工具
- **GitHub API**：创建仓库
- **Git CLI**：推送代码
- **Vercel API**：自动部署
- **curl**：HTTP 请求
- **jq**：JSON 处理

---

## 📋 所需配置

### 环境变量
- `GITHUB_TOKEN`：GitHub Personal Access Token（经典）
- `VERCEL_TOKEN`：Vercel Auth Token

### 配置步骤

#### 步骤1：生成 GitHub Token

**你的操作**：
1. 访问：https://github.com/settings/tokens
2. 点击："Generate new token (classic)"
3. Note：`aisense-deploy-token`
4. Expiration：`No expiration`
5. Scopes：`repo`（完整仓库权限）
6. 点击："Generate token"
7. 复制生成的 Token（只显示一次）

**Token 格式**：
```
ghp_xxxxxxxxxxxxxxxxxxxxxx
```

#### 步骤2：生成 Vercel Token

**你的操作**：
1. 访问：https://vercel.com/account/tokens
2. 点击："Create Token"
3. Token Name：`aisense-deploy-token`
4. Expiration：`No expiration`
5. 点击："Create"
6. 复制生成的 Token（只显示一次）

**Token 格式**：
```
npx_xxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔧 自动化流程

### 阶段一：创建 GitHub 仓库（API）

**我会自动执行**：
1. 使用 GitHub API 检查仓库是否存在
2. 如果不存在，使用 API 创建公开仓库
3. 验证仓库创建成功

**不需要浏览器，100% API 操作**

### 阶段二：推送代码到 GitHub（Git CLI）

**我会自动执行**：
1. 配置 Git 使用 SSH（已配置）
2. 推送所有代码到 GitHub
3. 验证推送成功

**不需要浏览器，100% 命令行操作**

### 阶段三：配置 Vercel 部署（API）

**我会自动执行**：
1. 使用 Vercel API 创建项目
2. 链接 GitHub 仓库
3. 创建生产环境部署
4. 验证部署成功

**不需要浏览器，100% API 操作**

### 阶段四：配置域名 aisense.top（API）

**我会自动执行**：
1. 使用 Vercel API 添加域名
2. 获取 DNS 配置信息
3. 验证域名配置

**不需要浏览器，100% API 操作**

### 阶段五：测试网站访问（curl）

**我会自动执行**：
1. 测试 Vercel 默认域名访问
2. 测试域名 aisense.top 访问
3. 验证 HTTPS 访问
4. 测试所有页面链接

**不需要浏览器，100% 命令行操作**

---

## 🚀 立即执行

### 我的操作（无需你的介入）

我会使用 `auto-deploy-aisense.sh` 脚本执行所有操作：
1. ✅ 创建 GitHub 仓库（使用 API）
2. ✅ 推送代码到 GitHub（使用 Git CLI）
3. ✅ 配置 Vercel 部署（使用 Vercel API）
4. ✅ 配置域名 aisense.top（使用 Vercel API）
5. ✅ 测试网站访问（使用 curl）

**预计时间**：3-5 分钟

### 你的操作（2分钟）

#### 步骤1：生成 GitHub Token

**现在就做**：
1. 访问：https://github.com/settings/tokens
2. 点击："Generate new token (classic)"
3. Note：`aisense-deploy-token`
4. Expiration：`No expiration`
5. Scopes：`repo`
6. 点击："Generate token"
7. **复制**：`ghp_xxxxxxxxxxxxxxxxxxxxxx`

#### 步骤2：生成 Vercel Token

**现在就做**：
1. 访问：https://vercel.com/account/tokens
2. 点击："Create Token"
3. Token Name：`aisense-deploy-token`
4. Expiration：`No expiration`
5. 点击："Create"
6. **复制**：`npx_xxxxxxxxxxxxxxxxxxxxxx`

---

## 📋 立即行动

### 你的操作（2分钟）

**现在就生成两个 Token**：

#### Token 1：GitHub Token

1. 访问：https://github.com/settings/tokens
2. 点击："Generate new token (classic)"
3. Note：`aisense-deploy-token`
4. Expiration：`No expiration`
5. Scopes：`repo`
6. 点击："Generate token"
7. 复制：`ghp_xxxxxxxxxxxxxxxxxxxxxx`

#### Token 2：Vercel Token

1. 访问：https://vercel.com/account/tokens
2. 点击："Create Token"
3. Token Name：`aisense-deploy-token`
4. Expiration：`No expiration`
5. 点击："Create"
6. 复制：`npx_xxxxxxxxxxxxxxxxxxxxxx`

**重要**：
- ⚠️ Token 只显示一次，请务必复制
- ⚠️ 不要分享给他人
- ⚠️ 可以在平台随时撤销

---

## 🚀 发送 Token 给我

### 格式要求

**请按以下格式发送给我**：

```
GitHub Token: ghp_xxxxxxxxxxxxxxxxxxxxxx
Vercel Token: npx_xxxxxxxxxxxxxxxxxxxxxx
```

**或者分开发送**：

```
GitHub Token: ghp_xxxxxxxxxxxxxxxxxxxxxx
```

```
Vercel Token: npx_xxxxxxxxxxxxxxxxxxxxxx
```

---

## 💡 我的承诺

### 我会立即执行

1. ✅ 创建 GitHub 仓库（API）
2. ✅ 推送代码到 GitHub（Git CLI）
3. ✅ 配置 Vercel 部署（API）
4. ✅ 配置域名 aisense.top（API）
5. ✅ 测试网站访问（curl）

**预计完成时间**：3-5 分钟

### 完成后提供

- ✅ GitHub 仓库地址
- ✅ Vercel 部署地址
- ✅ 域名访问地址
- ✅ 网站上线确认

---

## 🎯 总结

### 你的操作（2分钟）

1. 生成 GitHub Token
   - 访问：https://github.com/settings/tokens
   - 复制：`ghp_xxxxxxxxxxxxxxxxxxxxxx`

2. 生成 Vercel Token
   - 访问：https://vercel.com/account/tokens
   - 复制：`npx_xxxxxxxxxxxxxxxxxxxxxx`

3. 发送给我

### 我的操作（3-5分钟）

1. 创建 GitHub 仓库（API）
2. 推送代码到 GitHub（Git CLI）
3. 配置 Vercel 部署（API）
4. 配置域名 aisense.top（API）
5. 测试网站访问（curl）

**100% 自动化，无需浏览器，无需你的介入**

---

## 💡 常见问题

### Q1：为什么需要 Token？
**A**：使用 API 可以 100% 自动化，不需要浏览器。Token 类似于"钥匙"，允许脚本执行操作。

### Q2：Token 安全吗？
**A**：是的，Token 可以随时撤销。建议设置过期时间（如 90 天）。

### Q3：Token 只显示一次？
**A**：是的，Token 只在生成时显示一次，请务必复制。如果丢失，可以删除并重新生成。

### Q4：我可以使用同一个 Token 吗？
**A**：可以，但建议为不同项目创建不同的 Token，方便管理和撤销。

---

## 🎉 准备好了吗？

**现在就生成两个 Token 并发送给我！** 🚀

**格式**：
```
GitHub Token: ghp_xxxxxxxxxxxxxxxxxxxxxx
Vercel Token: npx_xxxxxxxxxxxxxxxxxxxxxx
```

**发送给我，我会立即执行所有自动化操作！** ⚡
