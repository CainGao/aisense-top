# AI Sense 网站配置指南

## 📊 访问统计配置

### 方案一：Google Analytics（推荐）

**优势：**
- ✅ 功能强大，数据分析全面
- ✅ 免费，无限制
- ✅ 与Google Search Console集成
- ✅ 实时数据监控

**申请步骤：**

1. **访问Google Analytics官网**
   ```
   https://analytics.google.com/
   ```

2. **创建账号**
   - 点击"开始衡量"
   - 填写账号名称（如：AI Sense）
   - 选择数据流类型：网站
   - 输入网站URL：https://aisense.top
   - 数据流名称：AI Sense

3. **获取跟踪ID**
   - 创建完成后，会获得一个跟踪ID
   - 格式：`G-XXXXXXXXXX` 或 `UA-XXXXXXXXX-X`

4. **配置到网站**
   ```yaml
   # 编辑 _config.yml
   google_analytics: G-XXXXXXXXXX  # 替换为你的ID
   ```

5. **验证安装**
   - 24小时后登录Google Analytics查看数据
   - 或使用Google Tag Assistant浏览器插件验证

---

### 方案二：百度统计（国内用户）

**优势：**
- ✅ 国内访问速度快
- ✅ 中文界面友好
- ✅ 符合国内法规

**申请步骤：**

1. **访问百度统计官网**
   ```
   https://tongji.baidu.com/
   ```

2. **注册并登录**
   - 使用百度账号登录
   - 点击"添加网站"

3. **填写网站信息**
   - 网站域名：aisense.top
   - 网站名称：AI Sense
   - 网站首页：https://aisense.top

4. **获取代码**
   - 复制统计代码中的ID
   - 格式：`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

5. **配置到网站**
   ```yaml
   # 编辑 _config.yml
   baidu_tongji: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

---

## 💰 广告联盟配置

### 方案一：Google AdSense（推荐）

**优势：**
- ✅ 全球最大广告联盟
- ✅ 收益高，单价好
- ✅ 广告质量高
- ✅ 自动适配网站内容

**申请步骤：**

1. **访问Google AdSense官网**
   ```
   https://www.google.com/adsense/
   ```

2. **注册账号**
   - 使用Google账号登录
   - 填写网站信息：https://aisense.top
   - 选择付款方式（需要银行账户）

3. **获取发布商ID**
   - 审核通过后（通常1-2天）
   - 进入"账号" → "账号信息"
   - 获取发布商ID：`ca-pub-XXXXXXXXXX`

4. **创建广告单元**
   - 点击"广告" → "按广告单元"
   - 选择"展示广告"
   - 设置广告名称：如"顶部横幅"
   - 选择广告尺寸：自适应
   - 创建后获取广告单元ID：`XXXXXXXXXX`

5. **配置到网站**
   ```yaml
   # 编辑 _config.yml
   google_adsense: ca-pub-XXXXXXXXXX  # 发布商ID
   ```

6. **修改广告单元ID**
   - 编辑 `_includes/ad-top.html`
   - 替换 `data-ad-client` 为你的发布商ID
   - 替换 `data-ad-slot` 为你的广告单元ID
   - 同理修改 `_includes/ad-bottom.html`

---

### 方案二：百度联盟（国内用户）

**优势：**
- ✅ 国内用户友好
- ✅ 中文广告多
- ✅ 收益稳定

**申请步骤：**

1. **访问百度联盟官网**
   ```
   https://union.baidu.com/
   ```

2. **注册账号**
   - 需要企业资质或个人网站备案
   - 网站流量要求：日均PV > 1000

3. **创建广告位**
   - 审核通过后创建广告位
   - 获取广告代码

4. **集成到网站**
   - 将广告代码添加到 `_includes/ad-top.html`

---

## 🔧 配置完成后

### 1. 更新_config.yml

```yaml
# 访问统计和广告配置
google_analytics: G-XXXXXXXXXX  # 你的Google Analytics ID
google_adsense: ca-pub-XXXXXXXXXX  # 你的AdSense发布商ID
baidu_tongji: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  # 你的百度统计ID
```

### 2. 更新广告单元ID

**顶部广告（_includes/ad-top.html）：**
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-你的发布商ID"
     data-ad-slot="你的广告单元ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

**底部广告（_includes/ad-bottom.html）：**
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-你的发布商ID"
     data-ad-slot="你的广告单元ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

### 3. 提交到GitHub

```bash
git add .
git commit -m "✨ 添加访问统计和广告配置"
git push origin main
```

### 4. 验证安装

**访问统计验证：**
- Google Analytics：24小时后查看数据
- 百度统计：2小时后查看数据
- 使用浏览器开发者工具查看网络请求

**广告验证：**
- AdSense广告通常需要1-7天开始展示
- 初期可能显示空白，属正常现象
- 使用AdSense预览工具测试

---

## 📋 推荐配置组合

**最佳实践（国内+国际）：**

1. **访问统计：**
   - Google Analytics（主）+ 百度统计（辅）
   - 全面覆盖国内外用户

2. **广告联盟：**
   - Google AdSense（主）
   - 收益最高，广告质量好

**配置示例：**
```yaml
google_analytics: G-ABC123DEF4
google_adsense: ca-pub-1234567890123456
baidu_tongji: 1234567890abcdef1234567890abcdef
```

---

## ⚠️ 注意事项

1. **AdSense审核要求：**
   - 网站内容必须原创
   - 需要有一定流量
   - 不能有违规内容
   - 域名需满6个月（部分情况）

2. **广告位置建议：**
   - 顶部：横幅广告
   - 文章中间：插入广告
   - 底部：横幅广告
   - 侧边栏：矩形广告

3. **收益优化：**
   - 不要放置过多广告（影响体验）
   - 选择高质量广告位
   - 定期分析收益报告
   - 优化广告尺寸和位置

---

## 🎯 功哥需要做的事情

### 第一步：申请Google Analytics
1. 访问 https://analytics.google.com/
2. 创建账号和数据流
3. 获取跟踪ID（G-XXXXXXXXXX格式）
4. 告诉我ID，我帮你配置

### 第二步：申请Google AdSense
1. 访问 https://www.google.com/adsense/
2. 提交网站审核
3. 审核通过后获取发布商ID（ca-pub-XXXXXXXXXX）
4. 创建广告单元，获取广告单元ID
5. 告诉我这两个ID，我帮你配置

### 第三步：验证和测试
1. 等待GitHub Pages部署完成
2. 24小时后查看统计数据
3. 1-7天后查看广告收益

---

**准备好了就告诉我你的ID，我立即帮你配置！** 🚀
