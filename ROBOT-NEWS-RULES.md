# 机器人产业日报生成规则

> 最后更新：2026-03-05
> 版本：v2.0（增加来源引用）

---

## 📋 核心规则

### ✅ 强制要求

**1. 每条资讯必须包含来源引用**
```markdown
### 📰 [资讯标题]

[资讯内容摘要]

**📊 来源：** [网站名称](来源URL) ⭐⭐⭐⭐⭐
```

**2. 来源格式规范**
- **格式：** `📊 来源：[网站名称](来源URL) ⭐评级`
- **评级：** ⭐⭐⭐⭐⭐（5星）到 ⭐⭐⭐（3星）
- **位置：** 每条资讯的末尾
- **颜色：** 使用浅蓝色背景（#e3f2fd）

**3. HTML样式**
```html
<a href="来源URL" class="source-link" target="_blank">
    📊 来源：网站名称 ⭐⭐⭐⭐⭐
</a>

<style>
.source-link {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: #e3f2fd;
    color: #1976d2;
    border-radius: 4px;
    font-size: 0.85rem;
    text-decoration: none;
}
.source-link:hover {
    background: #bbdefb;
}
</style>
```

---

## 🎯 来源评级标准

### ⭐⭐⭐⭐⭐（5星）- 官方/顶级媒体
- **官方来源：** 企业官网、官方公告
- **顶级媒体：** IEEE Spectrum、Nature、Science
- **权威机构：** NASA、MIT、Stanford等

**示例：**
- Tesla官网：https://www.tesla.com/
- IEEE Spectrum：https://spectrum.ieee.org/
- NASA：https://www.nasa.gov/

### ⭐⭐⭐⭐（4星）- 专业媒体
- **科技媒体：** TechCrunch、The Verge、Wired
- **行业媒体：** Robotics Business Review、The Robot Report
- **研究机构：** 大学实验室、研究所官网

**示例：**
- TechCrunch：https://techcrunch.com/
- The Robot Report：https://www.therobotreport.com/
- MIT News：https://news.mit.edu/

### ⭐⭐⭐（3星）- 一般媒体
- **行业博客：** 企业博客、技术博客
- **社交媒体：** Twitter、YouTube、Bilibili
- **新闻聚合：** Google News、百度资讯

**示例：**
- YouTube频道：https://www.youtube.com/
- 企业博客：https://blog.company.com/
- Bilibili：https://www.bilibili.com/

---

## 🔍 资讯来源优先级

### 🚨 第一优先级（必抓）

#### 官方渠道
1. **Tesla**：https://www.tesla.com/ - Optimus、AI Day
2. **Boston Dynamics**：https://www.bostondynamics.com/ - Spot、Atlas
3. **Unitree（宇树科技）**：https://www.unitree.com/ - 人形机器人、四足机器人
4. **Xiaomi Robotics**：https://www.mi.com/cyberone - CyberOne、CyberDog
5. **UBTECH（优必选）**：https://www.ubtrobot.com/ - Walker、Cruzr

#### 国际顶级媒体
6. **IEEE Spectrum Robotics**：https://spectrum.ieee.org/robotics
7. **The Robot Report**：https://www.therobotreport.com/
8. **Robotics Business Review**：https://www.roboticsbusinessreview.com/
9. **MIT Technology Review**：https://www.technologyreview.com/
10. **TechCrunch Robotics**：https://techcrunch.com/category/robotics/

#### 研究机构
11. **MIT CSAIL**：https://www.csail.mit.edu/
12. **Stanford AI Lab**：https://ai.stanford.edu/
13. **CMU Robotics**：https://www.cmu.edu/
14. **NASA Robotics**：https://www.nasa.gov/

### 📰 第二优先级（每日抓）

#### 国内媒体
1. **机器之心**：https://www.jiqizhixin.com/
2. **量子位**：https://www.qbitai.com/
3. **新智元**：https://www.xinzhiyuan.com/
4. **36氪机器人频道**：https://36kr.com/
5. **雷锋网机器人频道**：https://www.leiphone.com/

#### 国际媒体
6. **The Verge**：https://www.theverge.com/
7. **Wired**：https://www.wired.com/
8. **Ars Technica**：https://arstechnica.com/
9. **VentureBeat**：https://venturebeat.com/
10. **Engadget**：https://www.engadget.com/

### 📱 第三优先级（按需抓）

#### 社交媒体
1. **YouTube机器人频道**：https://www.youtube.com/
2. **Twitter机器人账号**：https://twitter.com/
3. **Bilibili机器人UP主**：https://www.bilibili.com/
4. **抖音机器人账号**：https://www.douyin.com/

#### 企业博客
5. **Google AI Blog**：https://ai.googleblog.com/
6. **OpenAI Blog**：https://openai.com/blog/
7. **DeepMind Blog**：https://deepmind.com/blog
8. **NVIDIA AI Blog**：https://blogs.nvidia.com/

---

## 📝 内容生成流程

### Step 1: 收集资讯（30分钟）
1. 访问第一优先级来源（10个）
2. 访问第二优先级来源（10个）
3. 筛选出最有价值的10-20条资讯
4. **记录每条资讯的来源URL**

### Step 2: 分类整理（15分钟）
1. 按地区分类：🇺🇸 美国、🇨🇳 中国、🇪🇺 欧洲、🇯🇵 日本
2. 按类型分类：人形机器人、工业机器人、服务机器人、协作机器人
3. 按重要性排序：⭐⭐⭐⭐⭐ > ⭐⭐⭐⭐ > ⭐⭐⭐

### Step 3: 撰写日报（30分钟）
1. 撰写每条资讯的标题和摘要
2. **添加来源引用（格式：📊 来源：[网站名称](URL) ⭐评级）**
3. 撰写今日观点（3-5条）
4. 整理市场数据和活动信息

### Step 4: 生成HTML（10分钟）
1. 使用统一模板生成HTML
2. **确保所有来源链接可点击**
3. 添加CSS样式（source-link类）
4. 验证HTML语法

### Step 5: 推送部署（5分钟）
1. 提交到GitHub仓库
2. 等待GitHub Pages自动部署（1-2分钟）
3. 验证URL可访问（HTTP 200）
4. 生成分享链接

---

## 📄 日报模板

### HTML模板（带来源引用）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YYYY-MM-DD 机器人产业日报 | AI Sense</title>
    <meta name="description" content="YYYY年MM月DD日机器人产业最新动态">
    <link rel="stylesheet" href="/assets/css/main.css">
    <style>
        .source-link {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: #e3f2fd;
            color: #1976d2;
            border-radius: 4px;
            font-size: 0.85rem;
            text-decoration: none;
        }
        .source-link:hover {
            background: #bbdefb;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    
    <main class="container">
        <article class="post">
            <header class="post-header">
                <h1 class="post-title">YYYY-MM-DD 机器人产业日报</h1>
                <div class="post-meta">
                    <span class="post-date">YYYY-MM-DD</span>
                    <span class="post-author">作者：功哥</span>
                </div>
            </header>
            
            <div class="post-content">
                <!-- 今日重磅 -->
                <div style="background: #d4edda; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid #28a745;">
                    <h3 style="margin-top: 0; color: #155724;">🎉 今日重磅</h3>
                    <p style="margin-bottom: 0.5rem;"><strong>[重磅资讯标题]</strong> - [资讯摘要]</p>
                    <a href="来源URL" class="source-link" target="_blank">📊 来源：网站名称 ⭐⭐⭐⭐⭐</a>
                </div>

                <!-- 全球动态 -->
                <h2>🌍 全球动态</h2>
                
                <h3>🇺🇸 美国</h3>
                
                <h4>[资讯标题]</h4>
                <p>[资讯内容]</p>
                <ul>
                    <li><strong>要点1：</strong>内容</li>
                    <li><strong>要点2：</strong>内容</li>
                </ul>
                <a href="来源URL" class="source-link" target="_blank">📊 来源：网站名称 ⭐⭐⭐⭐⭐</a>
                
                <!-- 更多资讯... -->
            </div>
        </article>
    </main>
    
    <!-- 页脚 -->
</body>
</html>
```

---

## ✅ 质量检查清单

### 生成前检查
- [ ] 收集了至少10条有价值的资讯
- [ ] 每条资讯都记录了来源URL
- [ ] 按重要性和地区分类完成
- [ ] 标题和摘要撰写完成

### 生成后检查
- [ ] **所有资讯都包含来源引用**
- [ ] **来源链接可点击（target="_blank"）**
- [ ] **来源评级合理（3-5星）**
- [ ] HTML语法正确
- [ ] CSS样式生效（source-link类）

### 部署后检查
- [ ] GitHub提交成功
- [ ] URL可访问（HTTP 200）
- [ ] 页面正常显示
- [ ] **来源链接可点击跳转**

---

## 🔄 更新记录

### v2.0（2026-03-05）
- ✅ **强制要求每条资讯包含来源引用**
- ✅ 新增来源评级标准（3-5星）
- ✅ 新增来源优先级列表
- ✅ 更新HTML模板（添加source-link样式）
- ✅ 新增质量检查清单

### v1.0（2026-02-27）
- 初始版本
- 基础日报生成流程

---

**最后更新**：2026-03-05
**下次更新**：根据实际使用情况调整
**维护者**：OpenClaw AI助手
