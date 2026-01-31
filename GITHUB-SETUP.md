# GitHub 配置和 SSH Key 信息

> 配置时间：2026-01-31 16:20
> GitHub 账号：https://github.com/CainGao
> 项目：aisense-top

---

## 🔑 SSH Key 信息

### SSH Public Key（添加到 GitHub）
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID6Lpeusp9dXc+WFqhaY+sxNEr5qp73dlwvHeZdc1EZ5 caingao@CainGao
```

**添加步骤**：
1. 访问：https://github.com/CainGao/settings/keys
2. 点击 "New SSH key"
3. Title（标题）：`aisense-top-deploy-key`
4. Key（密钥）：粘贴上面的完整内容
5. 点击 "Add SSH key"

**完成标志**：看到 "Key added successfully"

---

## 🚀 Git 配置

### Git 全局配置
```bash
git config --global user.name "CainGao"
git config --global user.email "your.email@example.com"
```

### Git 远程仓库（待添加）
```bash
cd /Users/caingao/aisense-top

# 添加 SSH 远程仓库
git remote add origin git@github.com:CainGao/aisense-top.git

# 验证远程仓库
git remote -v
```

### 推送代码到 GitHub（SSH）
```bash
# 推送 main 分支
git push -u origin main

# 如果提示输入密码或用户名
# 说明 SSH Key 配置成功
# 直接回车即可（不需要密码）
```

---

## 📋 GitHub 仓库创建步骤

### 第1步：创建仓库
1. 访问：https://github.com/new
2. 仓库名称：`aisense-top` ⭐
3. 可见性：`Public`（公开）⭐
4. 初始化：**不要选任何选项**（已初始化）⭐
5. 点击 "Create repository"

### 第2步：添加 SSH Key
1. 访问：https://github.com/CainGao/settings/keys
2. 点击 "New SSH key"
3. Title：`aisense-top-deploy-key`
4. Key：复制上面的 SSH Public Key 完整粘贴
5. 点击 "Add SSH key"

### 第3步：创建仓库（如果还没创建）
1. 访问：https://github.com/new
2. 仓库名称：`aisense-top`
3. 可见性：`Public`
4. 初始化：不要选
5. 点击 "Create repository"

---

## 🔧 Vercel 部署准备

### 安装 Vercel CLI
```bash
npm install -g vercel
```

### 登录 Vercel
```bash
vercel login
```

### 链接项目
```bash
cd /Users/caingao/aisense-top
vercel link
```

### 生产部署
```bash
vercel --prod
```

### 配置域名 aisense.top
1. 在 Vercel Dashboard 找到 `aisense-top` 项目
2. 进入 Settings → Domains
3. 添加域名：`aisense.top`
4. Vercel 会提供 DNS 配置信息

---

## 🎯 完成清单

### SSH Key 配置
- [x] 生成 SSH Key (ED25519)
- [x] 添加到 ssh-agent
- [ ] 将 SSH Public Key 添加到 GitHub（需要你操作）

### GitHub 仓库
- [ ] 创建 `aisense-top` 仓库（需要你操作）
- [ ] 验证 SSH Key 添加成功（需要你操作）

### Git 配置
- [x] 本地仓库初始化
- [x] 所有代码已提交
- [ ] 等待链接远程仓库（需要你先创建仓库）
- [ ] 等待推送到 GitHub（需要你先添加 SSH Key）

### Vercel 部署
- [ ] 安装 Vercel CLI（我自动执行）
- [ ] 登录 Vercel（我自动执行）
- [ ] 链接项目（我自动执行）
- [ ] 生产部署（我自动执行）

### 域名配置
- [ ] 在 Vercel 添加域名（我自动执行）
- [ ] 配置 DNS（我提供具体配置）
- [ ] 验证域名访问（我自动执行）

---

## 🚨 重要提醒

### SSH Key 安全
- ✅ Private Key 已安全保存：`~/.ssh/id_ed25519_cainGao`
- ⚠️ **不要**：分享、上传或发送 Private Key
- ⚠️ **不要**：提交到 Git 仓库
- ⚠️ **不要**：添加到任何配置文件

### GitHub 账户
- GitHub 账号：`CainGao`
- 仓库 URL：`https://github.com/CainGao/aisense-top.git`
- SSH 远程地址：`git@github.com:CainGao/aisense-top.git`

### 项目信息
- 项目名称：`aisense-top`
- 本地路径：`/Users/caingao/aisense-top`
- 远程仓库：待创建（需要你操作）

---

## 📊 当前进度

| 任务 | 状态 | 详情 |
|------|------|--------|
| SSH Key 生成 | ✅ 完成 | ED25519，已添加到 ssh-agent |
| GitHub 仓库 | ⏳ 等待 | 需要你先创建仓库 |
| Git 推送 | ⏳ 等待 | 需要你先添加 SSH Key |
| Vercel 部署 | ⏳ 等待 | 需要 Git 推送后执行 |
| 域名配置 | ⏳ 等待 | 需要 Vercel 部署后配置 |

---

## 💡 常见问题

### Q1：如何验证 SSH Key 是否已添加到 GitHub？
**A**：
```bash
ssh -T git@github.com
```
**成功输出**：
```
Hi CainGao! You've successfully authenticated, but GitHub does not provide shell access.
```
**失败输出**：
```
Permission denied (publickey)
```
**解决方案**：检查 GitHub SSH Keys 页面，确保 `aisense-top-deploy-key` 已添加

### Q2：git push 时提示 "Permission denied (publickey)"？
**A**：检查 SSH Key 是否正确添加到 GitHub
1. 访问：https://github.com/CainGao/settings/keys
2. 确认 `aisense-top-deploy-key` 是否存在
3. 如果不存在，重新添加

### Q3：如何删除并重新生成 SSH Key？
**A**：
```bash
# 删除旧的 SSH Key
rm -f ~/.ssh/id_ed25519_cainGao*
rm -f ~/.ssh/id_ed25519_cainGao.pub

# 从 GitHub 删除
# 1. 访问：https://github.com/CainGao/settings/keys
# 2. 找到 `aisense-top-deploy-key`
# 3. 点击 "Delete"

# 重新生成 SSH Key（我会帮你做）
# 然后重新添加到 GitHub
```

---

## 📁 相关文件

| 文件 | 路径 | 说明 |
|------|------|--------|
| SSH Private Key | `~/.ssh/id_ed25519_cainGao` | 私钥（仅本地保存） |
| SSH Public Key | `~/.ssh/id_ed25519_cainGao.pub` | 公钥（已复制到上面） |
| SSH 配置 | `~/.ssh/config` | SSH 配置文件（可选） |
| Git 配置 | `.git/config` | Git 仓库配置 |

---

## 🚀 立即行动

### 你现在需要做的（5 分钟）

#### 第1步：添加 SSH Key 到 GitHub ⭐ 必做

1. **访问**：https://github.com/CainGao/settings/keys
2. **点击**："New SSH key"
3. **标题**：`aisense-top-deploy-key`
4. **密钥**：粘贴下面的完整内容

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID6Lpeusp9dXc+WFqhaY+sxNEr5qp73dlwvHeZdc1EZ5 caingao@CainGao
```

5. **点击**："Add SSH key"
6. **验证**：看到 "Key added successfully"

#### 第2步：创建 GitHub 仓库 ⭐ 必做

1. **访问**：https://github.com/new
2. **仓库名称**：`aisense-top`
3. **可见性**：`Public` ⭐
4. **初始化**：不要选任何选项
5. **点击**："Create repository"

#### 第3步：验证配置

```bash
# 测试 SSH 连接到 GitHub
ssh -T git@github.com

# 应该显示：
# Hi CainGao! You've successfully authenticated...
```

---

**最后更新**: 2026-01-31 16:25
**当前状态**: ✅ **SSH Key 已生成，等待添加到 GitHub**
**你的任务**: 添加 SSH Key + 创建 GitHub 仓库（5 分钟）

---

## 📞 帮助和支持

### 如果遇到问题

1. **SSH Key 添加失败**
   - 检查是否完整复制了 SSH Public Key
   - 确保没有多出或遗漏的字符
   - 尝试删除并重新添加

2. **GitHub 仓库创建失败**
   - 检查仓库名称是否为 `aisense-top`
   - 确保可见性为 `Public`
   - 检查是否已有同名仓库

3. **SSH 连接失败**
   - 检查网络连接
   - 检查 SSH Key 是否正确添加到 GitHub
   - 尝试 `ssh -T git@github.com` 测试

---

**准备好了吗？现在就添加 SSH Key 到 GitHub！** 🚀

（添加完成后告诉我，我立即推送代码并配置 Vercel 部署！）
