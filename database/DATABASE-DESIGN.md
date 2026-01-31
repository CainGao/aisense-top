# AI Sense 新闻数据库

> 最后更新：2026-01-31
> 状态：🟢 活跃

---

## 📊 数据库结构

### 新闻记录

每条新闻记录包含以下字段：

```json
{
  "id": "唯一标识符（MD5 哈希）",
  "title": "新闻标题",
  "url": "新闻链接",
  "sources": [
    {
      "name": "来源名称",
      "url": "来源链接",
      "published": "发布时间",
      "summary": "摘要"
    }
  ],
  "value": {
    "score": 0-100（价值评分）,
    "priority": 1-5（优先级）,
    "category": ["AI技术", "电商", "自媒体", "程序员"]
  },
  "first_seen": "首次抓取时间（ISO 8601）",
  "last_seen": "最后抓取时间（ISO 8601）",
  "seen_count": 1,
  "status": "new|merged|duplicate|low_value"
}
```

---

## 🔍 去重算法

### 基于链接的去重

**算法**：
1. 计算新闻链接的 MD5 哈希
2. 检查数据库中是否已存在该哈希
3. 如果存在，标记为 `duplicate`（重复）

**优点**：
- 简单快速
- 准确率高

**缺点**：
- 可能误判同一新闻的不同链接

---

### 基于标题的去重

**算法**：
1. 提取新闻标题
2. 移除特殊字符和空格
3. 计算标题的 MD5 哈希
4. 检查数据库中是否已存在该哈希
5. 如果存在，标记为 `duplicate`（重复）

**优点**：
- 可以识别同一新闻的不同链接
- 比链接去重更准确

**缺点**：
- 可能误判标题相似的不同新闻

---

### 基于内容的去重

**算法**：
1. 提取新闻摘要或内容
2. 计算内容的 MD5 哈希
3. 检查数据库中是否已存在该哈希
4. 如果存在，标记为 `duplicate`（重复）

**优点**：
- 可以识别内容相似的新闻
- 最准确

**缺点**：
- 计算量大，速度慢

---

### 推荐方案

**多级去重**：
1. **第一级**：基于链接去重（快速，99% 准确）
2. **第二级**：基于标题去重（中等速度，95% 准确）
3. **第三级**：基于内容去重（慢速，99% 准确）

**流程**：
```python
def is_duplicate(news_item):
    # 第一级：基于链接
    link_hash = hashlib.md5(news_item['url'].encode()).hexdigest()
    if link_hash in database:
        return True, 'link'

    # 第二级：基于标题
    title_hash = hashlib.md5(news_item['title'].encode()).hexdigest()
    if title_hash in database:
        return True, 'title'

    # 第三级：基于内容（可选，由于计算量大）
    # content_hash = hashlib.md5(news_item['summary'].encode()).hexdigest()
    # if content_hash in database:
    #     return True, 'content'

    return False, None
```

---

## 🔄 合并算法

### 基于关键词的合并

**算法**：
1. 提取新闻标题中的关键词
2. 计算两个新闻标题的关键词相似度（Jaccard 相似度）
3. 如果相似度 > 0.7（70%），标记为 `merged`（需要合并）
4. 将多个来源的同类新闻合并到一个记录

**Jaccard 相似度公式**：
```
J(A, B) = |A ∩ B| / |A ∪ B|
```

**示例**：
- 新闻 A 标题：GPT-5 发布预告，性能提升 300%
- 新闻 B 标题：GPT-5 将于下月发布，性能提升 300%
- 关键词 A：["GPT-5", "发布", "预告", "性能", "提升", "300%"]
- 关键词 B：["GPT-5", "将于", "下月", "发布", "性能", "提升", "300%"]
- 交集：["GPT-5", "发布", "性能", "提升", "300%"]
- 并集：["GPT-5", "发布", "预告", "性能", "提升", "300%", "将于", "下月"]
- 相似度：5 / 7 = 0.714（71.4%）
- 结果：合并

---

## 📊 价值评估算法

### 评分维度

#### 1. 来源评分（40 分）
- ⭐⭐⭐⭐⭐ 机器之心、AI Admin：40 分
- ⭐⭐⭐⭐ AI 前线、36氪 AI 频道：35 分
- ⭐⭐⭐⭐ 智东西、新智元、量子位：30 分
- ⭐⭐⭐ ofweek AI、aitechw：25 分
- ⭐⭐ 其他：20 分

#### 2. 标题评分（30 分）
- ⭐⭐⭐⭐⭐ 包含关键词（GPT-5、Claude 4.0、Gemini Ultra）：30 分
- ⭐⭐⭐⭐ 包含数字和数据：25 分
- ⭐⭐⭐ 突发性新闻：20 分
- ⭐⭐ 常规更新：15 分
- ⭐ 低价值内容：10 分

#### 3. 内容评分（20 分）
- ⭐⭐⭐⭐⭐ 包含深度分析：20 分
- ⭐⭐⭐⭐ 包含专家观点：15 分
- ⭐⭐⭐ 包含数据图表：10 分
- ⭐⭐ 简短摘要：5 分
- ⭐ 无内容：0 分

#### 4. 时间评分（10 分）
- ⭐⭐⭐⭐⭐ 今日新闻：10 分
- ⭐⭐⭐⭐ 昨日新闻：8 分
- ⭐⭐⭐ 3 日内新闻：6 分
- ⭐⭐ 1 周内新闻：4 分
- ⭐ 1 周前新闻：2 分

### 总分计算

```
总分 = 来源评分(40) + 标题评分(30) + 内容评分(20) + 时间评分(10)
```

### 过滤阈值

- **必须发布**：总分 >= 70
- **建议发布**：总分 >= 50
- **低价值**：总分 < 50（过滤）

---

## 🗂️ 数据库文件

### JSON 文件结构

**文件位置**：`/Users/caingao/aisense-top/database/news_database.json`

**文件内容**：
```json
{
  "metadata": {
    "version": "1.0",
    "last_updated": "2026-01-31T21:00:00Z",
    "total_news": 0,
    "unique_news": 0
  },
  "news": [
    {
      "id": "md5-hash",
      "title": "新闻标题",
      "url": "新闻链接",
      "sources": [
        {
          "name": "来源名称",
          "url": "来源链接",
          "published": "发布时间",
          "summary": "摘要"
        }
      ],
      "value": {
        "score": 85,
        "priority": 5,
        "category": ["AI技术"]
      },
      "first_seen": "2026-01-31T21:00:00Z",
      "last_seen": "2026-01-31T21:00:00Z",
      "seen_count": 1,
      "status": "new"
    }
  ]
}
```

---

## 🔄 数据库操作

### 添加新闻

```python
def add_news(news_item):
    # 检查是否已存在
    existing_news = find_news(news_item['url'], news_item['title'])

    if existing_news:
        # 已存在，更新记录
        return update_news(existing_news['id'], news_item)
    else:
        # 不存在，添加新记录
        return create_news(news_item)
```

### 查找新闻

```python
def find_news(url, title):
    # 基于链接查找
    link_hash = hashlib.md5(url.encode()).hexdigest()
    if link_hash in database['news']:
        return database['news'][link_hash]

    # 基于标题查找
    title_hash = hashlib.md5(title.encode()).hexdigest()
    if title_hash in database['news']:
        return database['news'][title_hash]

    return None
```

### 更新新闻

```python
def update_news(news_id, news_item):
    # 更新新闻记录
    news = database['news'][news_id]

    # 添加新的来源
    if 'sources' not in news_item:
        news_item['sources'] = []
    news_item['sources'].append({
        'name': news_item.get('source_name'),
        'url': news_item.get('source_url'),
        'published': news_item.get('published'),
        'summary': news_item.get('summary')
    })

    # 更新最后抓取时间
    news['last_seen'] = datetime.now().isoformat()

    # 更新抓取次数
    news['seen_count'] += 1

    # 更新状态
    news['status'] = 'merged'

    return news
```

### 查找相似新闻

```python
def find_similar_news(news_item, threshold=0.7):
    # 提取关键词
    keywords = extract_keywords(news_item['title'])

    # 遍历所有新闻
    similar_news = []

    for news_id, news in database['news'].items():
        # 提取关键词
        existing_keywords = extract_keywords(news['title'])

        # 计算 Jaccard 相似度
        similarity = calculate_jaccard(keywords, existing_keywords)

        # 如果相似度超过阈值，添加到结果
        if similarity >= threshold:
            similar_news.append({
                'id': news_id,
                'similarity': similarity,
                'news': news
            })

    # 按相似度排序（降序）
    similar_news.sort(key=lambda x: x['similarity'], reverse=True)

    return similar_news
```

---

## 📊 数据库统计

### 统计信息

```json
{
  "metadata": {
    "version": "1.0",
    "last_updated": "2026-01-31T21:00:00Z",
    "total_news": 1000,
    "unique_news": 800,
    "duplicate_news": 150,
    "merged_news": 50,
    "low_value_news": 50,
    "high_value_news": 300,
    "medium_value_news": 500
  }
}
```

---

## 🔄 数据库维护

### 每周维护

1. **清理过期新闻**：删除 1 个月前的新闻
2. **更新来源权重**：根据新闻质量和更新频率调整
3. **优化评分算法**：根据反馈调整评分维度和权重

### 每月维护

1. **备份数据库**：备份到 GitHub
2. **分析统计数据**：生成月度报告
3. **优化去重算法**：根据实际情况调整去重阈值

---

## 🚀 下一步行动

1. ✅ 创建新闻数据库文件
2. ✅ 实现去重算法
3. ✅ 实现合并算法
4. ✅ 实现价值评估算法
5. ✅ 更新抓取脚本（每小时一次）
6. ✅ 更新定时任务配置

---

**最后更新**：2026-01-31
**下次更新**：根据实际使用情况调整
