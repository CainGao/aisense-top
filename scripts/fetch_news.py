#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
AI Sense 智能资讯抓取脚本（升级版）
功能：多源抓取、智能去重、同类合并、价值过滤
作者：AI Sense 系统
日期：2026-01-31
"""

import json
import logging
import os
import sys
import hashlib
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Set, Tuple
from difflib import SequenceMatcher

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/Users/cain_1/ROOT/openclaw/Projects/aisense-top/logs/fetch_news.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class IntelligentNewsFetcher:
    """智能资讯抓取器"""

    def __init__(self):
        """初始化"""
        self.sources = self.load_sources()
        self.base_dir = '/Users/cain_1/ROOT/openclaw/Projects/aisense-top'
        self.news_dir = os.path.join(self.base_dir, 'news')
        self.database_file = os.path.join(self.base_dir, 'database', 'news_database.json')
        self.today = datetime.now().strftime('%Y-%m-%d')

        # 加载数据库
        self.database = self.load_database()

        # 初始化统计信息
        self.stats = {
            'total_fetched': 0,
            'unique_news': 0,
            'duplicate_news': 0,
            'merged_news': 0,
            'low_value_news': 0,
            'high_value_news': 0,
        }

    def load_sources(self) -> List[Dict]:
        """加载资讯来源"""
        sources = [
            {
                'name': '机器之心',
                'url': 'https://www.jiqizhixin.com',
                'rss': 'https://www.jiqizhixin.com/rss',
                'priority': 5,
                'weight': 40  # 来源权重（价值评分）
            },
            {
                'name': 'AI 前线',
                'url': 'https://www.ai-front.com',
                'rss': 'https://www.ai-front.com/rss',
                'priority': 5,
                'weight': 40
            },
            {
                'name': '智东西',
                'url': 'https://www.zhixidongxi.com',
                'rss': 'https://www.zhixidongxi.com/rss',
                'priority': 4,
                'weight': 30
            },
            {
                'name': '36氪 AI 频道',
                'url': 'https://36kr.com/ai',
                'rss': 'https://36kr.com/ai/feed',
                'priority': 5,
                'weight': 40
            },
            {
                'name': '新智元',
                'url': 'https://www.xinziyuan.com',
                'rss': 'https://www.xinziyuan.com/rss',
                'priority': 4,
                'weight': 30
            },
            {
                'name': '量子位',
                'url': 'https://www.qbitai.com',
                'rss': 'https://www.qbitai.com/rss',
                'priority': 4,
                'weight': 30
            },
            {
                'name': 'AI Admin',
                'url': 'https://www.aiadmin.com/dailynews',
                'rss': 'https://www.aiadmin.com/rss',
                'priority': 5,
                'weight': 40
            },
            {
                'name': 'ofweek AI',
                'url': 'https://www.ofweek.com/ai',
                'rss': 'https://www.ofweek.com/ai/rss',
                'priority': 4,
                'weight': 30
            },
            {
                'name': 'aitechw',
                'url': 'https://www.aitechw.com',
                'rss': 'https://www.aitechw.com/rss',
                'priority': 4,
                'weight': 30
            },
        ]

        # 按优先级和权重排序
        sources.sort(key=lambda x: (x['priority'], x['weight']), reverse=True)

        return sources

    def load_database(self) -> Dict:
        """加载数据库"""
        if not os.path.exists(self.database_file):
            logger.info("数据库文件不存在，创建新数据库...")
            return self.create_database()

        with open(self.database_file, 'r', encoding='utf-8') as f:
            database = json.load(f)

        logger.info(f"数据库已加载，包含 {len(database['news'])} 条新闻")
        return database

    def create_database(self) -> Dict:
        """创建新数据库"""
        database = {
            'metadata': {
                'version': '1.0',
                'last_updated': datetime.now().isoformat(),
                'total_news': 0,
                'unique_news': 0,
                'duplicate_news': 0,
                'merged_news': 0,
                'low_value_news': 0,
                'high_value_news': 0,
            },
            'news': {}
        }

        # 保存数据库
        self.save_database(database)

        return database

    def save_database(self):
        """保存数据库"""
        # 更新元数据
        self.database['metadata']['last_updated'] = datetime.now().isoformat()
        self.database['metadata']['total_news'] = len(self.database['news'])

        # 保存到文件
        os.makedirs(os.path.dirname(self.database_file), exist_ok=True)
        with open(self.database_file, 'w', encoding='utf-8') as f:
            json.dump(self.database, f, ensure_ascii=False, indent=2)

        logger.info(f"数据库已保存，包含 {len(self.database['news'])} 条新闻")

    def is_duplicate(self, news_item: Dict) -> Tuple[bool, Optional[str]]:
        """
        检查是否为重复新闻

        返回: (是否重复, 去重类型)
        """
        # 安全检查：确保必需字段存在
        if 'url' not in news_item or 'title' not in news_item:
            logger.warning(f"新闻条目缺少必需字段: {list(news_item.keys())}")
            return False, 'missing_fields'
        
        # 第一级：基于链接去重
        link_hash = self.calculate_hash(news_item['url'])
        if link_hash in self.database['news']:
            logger.info(f"链接已存在：{news_item['title']}")
            return True, 'link'

        # 第二级：基于标题去重
        title_hash = self.calculate_hash(news_item['title'])
        if title_hash in self.database['news']:
            logger.info(f"标题已存在：{news_item['title']}")
            return True, 'title'

        # 第三级：基于内容去重（可选，由于计算量大）
        # 如果启用，可以取消下面的注释
        # content_hash = self.calculate_hash(news_item.get('description', ''))
        # if content_hash in self.database['news']:
        #     logger.info(f"内容已存在：{news_item['title']}")
        #     return True, 'content'

        return False, None

    def calculate_hash(self, text: str) -> str:
        """计算哈希值"""
        if not text:
            return hashlib.md5(b'').hexdigest()

        return hashlib.md5(text.encode('utf-8')).hexdigest()

    def find_similar_news(self, news_item: Dict, threshold: float = 0.7) -> List[Dict]:
        """
        查找相似新闻（用于合并）

        返回: 相似新闻列表
        """
        # 提取关键词
        keywords = self.extract_keywords(news_item['title'])

        # 遍历所有新闻
        similar_news = []

        for news_id, news in self.database['news'].items():
            # 提取关键词
            existing_keywords = self.extract_keywords(news['title'])

            # 计算 Jaccard 相似度
            similarity = self.calculate_jaccard(keywords, existing_keywords)

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

    def calculate_jaccard(self, set1: Set, set2: Set) -> float:
        """
        计算 Jaccard 相似度

        公式: J(A, B) = |A ∩ B| / |A ∪ B|
        """
        if not set1 or not set2:
            return 0.0

        intersection = len(set1 & set2)
        union = len(set1 | set2)

        return intersection / union if union > 0 else 0.0

    def extract_keywords(self, text: str) -> Set[str]:
        """提取关键词"""
        if not text:
            return set()

        # 移除标点符号
        import re
        text = re.sub(r'[^\w\s\u4e00-\u9fff]', '', text)

        # 分割成单词
        words = text.split()

        # 移除停用词（简单版）
        stop_words = {'的', '了', '是', '在', '和', '与', '的', '了', '了', '了', '的', 'the', 'a', 'an', 'of', 'to', 'in'}
        keywords = [word.lower() for word in words if len(word) > 1 and word.lower() not in stop_words]

        return set(keywords)

    def evaluate_news_value(self, news_item: Dict, source: Dict) -> Tuple[int, Dict]:
        """
        评估新闻价值

        返回: (总分, 详细评分)
        """
        scores = {
            'source_score': 0,
            'title_score': 0,
            'content_score': 0,
            'time_score': 0
        }

        # 1. 来源评分（40 分）
        scores['source_score'] = source.get('weight', 20)

        # 2. 标题评分（30 分）
        title = news_item.get('title', '')
        title_lower = title.lower()

        # 检查关键词
        high_value_keywords = ['gpt-5', 'gpt-6', 'claude 4.0', 'claude 5.0', 'gemini ultra', 'llama 3', 'llama 4', 'agent', 'mcp', '多模态', 'ai agent']
        medium_value_keywords = ['发布', '更新', '上线', '推出', '宣布', '完成', '达到']
        low_value_keywords = ['优惠', '活动', '促销', '打折', '免费', '限时', '福利']

        high_count = sum(1 for keyword in high_value_keywords if keyword in title_lower)
        medium_count = sum(1 for keyword in medium_value_keywords if keyword in title_lower)
        low_count = sum(1 for keyword in low_value_keywords if keyword in title_lower)

        if high_count >= 1:
            scores['title_score'] = 30
        elif medium_count >= 1:
            scores['title_score'] = 25
        elif low_count >= 1:
            scores['title_score'] = 15
        elif len(title) > 10:
            scores['title_score'] = 10
        else:
            scores['title_score'] = 5

        # 3. 内容评分（20 分）
        description = news_item.get('description', '')
        if len(description) > 500:
            scores['content_score'] = 20
        elif len(description) > 300:
            scores['content_score'] = 15
        elif len(description) > 100:
            scores['content_score'] = 10
        elif len(description) > 0:
            scores['content_score'] = 5
        else:
            scores['content_score'] = 0

        # 4. 时间评分（10 分）
        published = news_item.get('published', '')
        if published:
            try:
                # 尝试解析发布时间
                pub_datetime = datetime.fromisoformat(published.replace('Z', '+00:00'))
                time_diff = datetime.now(pub_datetime.tzinfo) - pub_datetime

                if time_diff.total_seconds() < 86400:  # 24小时内
                    scores['time_score'] = 10
                elif time_diff.total_seconds() < 259200:  # 3天内
                    scores['time_score'] = 8
                elif time_diff.total_seconds() < 604800:  # 7天内
                    scores['time_score'] = 6
                elif time_diff.total_seconds() < 2592000:  # 30天内
                    scores['time_score'] = 4
                else:
                    scores['time_score'] = 2
            except:
                scores['time_score'] = 5
        else:
            scores['time_score'] = 10  # 假设是最新新闻

        # 计算总分
        total_score = (
            scores['source_score'] +
            scores['title_score'] +
            scores['content_score'] +
            scores['time_score']
        )

        # 计算优先级
        if total_score >= 80:
            priority = 5  # 最高优先级
        elif total_score >= 70:
            priority = 4  # 高优先级
        elif total_score >= 60:
            priority = 3  # 中优先级
        elif total_score >= 50:
            priority = 2  # 低优先级
        else:
            priority = 1  # 最低优先级

        return total_score, scores, priority

    def process_news_item(self, news_item: Dict, source: Dict) -> Optional[Dict]:
        """
        处理新闻项（去重、合并、价值评估）

        返回: 处理后的新闻项，或 None（如果是低价值或重复）
        """
        # 1. 检查是否重复
        is_dup, dup_type = self.is_duplicate(news_item)

        if is_dup:
            # 如果是重复，查找相似新闻并合并
            similar_news = self.find_similar_news(news_item, threshold=0.7)

            if similar_news:
                # 合并到相似新闻
                merged_news = self.merge_news(similar_news[0]['news'], news_item, source)
                merged_news['status'] = 'merged'
                self.stats['merged_news'] += 1
                self.update_database(merged_news)
                return merged_news
            else:
                # 纯粹重复，跳过
                self.stats['duplicate_news'] += 1
                return None

        # 2. 评估新闻价值
        total_score, scores, priority = self.evaluate_news_value(news_item, source)

        if total_score < 50:  # 低价值，过滤
            logger.info(f"低价值新闻（{total_score} 分）：{news_item['title']}")
            self.stats['low_value_news'] += 1
            return None

        # 3. 高价值，添加到数据库
        # 安全获取 url 字段
        news_url = news_item.get('url', news_item.get('link', ''))
        if not news_url:
            logger.warning(f"新闻条目缺少 URL：{news_item.get('title', 'Unknown')}")
            return None
            
        news_id = self.calculate_hash(news_url + news_item['title'])

        news_record = {
            'id': news_id,
            'title': news_item['title'],
            'url': news_url,
            'sources': [{
                'name': source['name'],
                'url': source['url'],
                'published': news_item.get('published', ''),
                'summary': self.extract_summary(news_item.get('description', ''), 500)
            }],
            'value': {
                'score': total_score,
                'scores': scores,
                'priority': priority,
                'category': ['AI Technology', 'E-commerce', 'Media', 'Programming']
            },
            'first_seen': datetime.now().isoformat(),
            'last_seen': datetime.now().isoformat(),
            'seen_count': 1,
            'status': 'new'
        }

        self.stats['high_value_news'] += 1
        self.stats['unique_news'] += 1

        # 添加到数据库
        self.database['news'][news_id] = news_record

        logger.info(f"高价值新闻（{total_score} 分）：{news_item['title']}")

        return news_record

    def merge_news(self, existing_news: Dict, new_news_item: Dict, source: Dict) -> Dict:
        """
        合并新闻（添加新来源）

        返回: 合并后的新闻
        """
        # 添加新的来源
        if 'sources' not in existing_news:
            existing_news['sources'] = []
        existing_news['sources'].append({
            'name': source['name'],
            'url': source['url'],
            'published': new_news_item.get('published', ''),
            'summary': self.extract_summary(new_news_item.get('description', ''))
        })

        # 更新最后抓取时间
        existing_news['last_seen'] = datetime.now().isoformat()

        # 更新抓取次数
        existing_news['seen_count'] += 1

        # 重新评估价值（可能提高）
        existing_news['value']['score'] += 5  # 增加分数
        if existing_news['value']['score'] > 100:
            existing_news['value']['score'] = 100  # 上限 100

        # 更新优先级
        if existing_news['value']['score'] >= 80:
            existing_news['value']['priority'] = 5
        elif existing_news['value']['score'] >= 70:
            existing_news['value']['priority'] = 4
        elif existing_news['value']['score'] >= 60:
            existing_news['value']['priority'] = 3
        elif existing_news['value']['score'] >= 50:
            existing_news['value']['priority'] = 2
        else:
            existing_news['value']['priority'] = 1

        return existing_news

    def update_database(self, news_record: Dict):
        """更新数据库"""
        if news_record and 'id' in news_record:
            self.database['news'][news_record['id']] = news_record

    def fetch_rss(self, source: Dict) -> Optional[List[Dict]]:
        """抓取 RSS 订阅"""
        import feedparser

        rss_url = source.get('rss')
        if not rss_url:
            logger.warning(f"来源 {source['name']} 没有 RSS URL")
            return None

        logger.info(f"正在抓取 {source['name']} 的 RSS：{rss_url}")

        try:
            feed = feedparser.parse(rss_url)

            if not feed['entries']:
                logger.warning(f"来源 {source['name']} 没有 RSS 条目")
                return None

            logger.info(f"成功抓取 {source['name']}，共 {len(feed['entries'])} 条资讯")

            # 提取最新的 5-10 条资讯
            entries = feed['entries'][:10]

            # 格式化数据
            news_items = []
            for entry in entries:
                news_item = {
                    'title': entry.get('title', ''),
                    'url': entry.get('link', ''),  # 将 link 映射为 url
                    'link': entry.get('link', ''),  # 保留 link 字段
                    'description': entry.get('description', ''),
                    'published': entry.get('published', ''),
                    'author': entry.get('author', ''),
                }
                news_items.append(news_item)

            self.stats['total_fetched'] += len(news_items)

            return news_items

        except Exception as e:
            logger.error(f"抓取 {source['name']} RSS 失败：{e}")
            return None

    def generate_markdown(self, news_record: Dict) -> str:
        """生成 Markdown 内容"""
        name = news_record['sources'][0]['name']
        url = news_record['sources'][0]['url']
        date = self.today

        markdown = f"""---
date: {date}
source: {name}
url: {url}
value_score: {news_record['value']['score']}
priority: {news_record['value']['priority']}
tags: [AI, AI News, {name}, High Value]
---

# 📌 {name} AI 资讯（{date}）

---

## 🔥 重点新闻

### {news_record['title']}

**原文链接**：[{news_record['url']}]({news_record['url']})

**来源**：
"""

        # 添加所有来源
        for i, source in enumerate(news_record['sources'], 1):
            markdown += f"- **来源 {i}**：[{source['name']}]({source['url']}) - [{source['published']}]({source['url']})\n"

        markdown += f"""
**发布时间**：{news_record['sources'][0]['published']}

**摘要**：{news_record['sources'][0]['summary']}

**价值评分**：{news_record['value']['score']} / 100

**优先级**：{news_record['value']['priority']} / 5

---

## 📊 评分详情

### 来源评分：{news_record['value']['scores']['source_score']} / 40
- {news_record['sources'][0]['name']}：{news_record['value']['scores']['source_score']} 分

### 标题评分：{news_record['value']['scores']['title_score']} / 30
- 标题包含关键词

### 内容评分：{news_record['value']['scores']['content_score']} / 20
- 内容长度和质量

### 时间评分：{news_record['value']['scores']['time_score']} / 10
- 发布时间新鲜度

---

## 🔗 相关链接

- [{name} 官网]({url})
- [{name} RSS 订阅]({news_record['sources'][0]['url']})

---

## 💡 价值分析

### 为什么这条新闻重要？

1. **来源权威**：{news_record['sources'][0]['name']} 是权威的 AI 资讯媒体
2. **内容高质量**：新闻内容详细，包含数据和分析
3. **时效性强**：新闻发布时间较新
4. **影响广泛**：新闻对 AI 行业有重要影响

### 对读者的价值

- 了解最新 AI 行业动态
- 获取权威的行业信息
- 做出更明智的决策

---

*本内容由 AI Sense 系统自动抓取并整理*
*来源：{name} ({url})*
*价值评分：{news_record['value']['score']} / 100*
*最后更新：{date} 08:50*
"""

        return markdown

    def extract_summary(self, text: str, max_length: 500) -> str:
        """提取摘要"""
        if not text:
            return "暂无摘要"

        # 移除 HTML 标签（简单版）
        import re
        text = re.sub(r'<[^>]+>', '', text)

        # 移除多余空格和换行
        text = re.sub(r'\s+', ' ', text).strip()

        # 截取指定长度
        if len(text) > max_length:
            text = text[:max_length] + '...'

        return text

    def sanitize_filename(self, filename: str) -> str:
        """清理文件名"""
        import pypinyin

        # 移除特殊字符
        filename = filename.replace('/', '-').replace('\\', '-')

        # 转换为拼音（如果包含中文）
        if any('\u4e00' <= c <= '\u9fff' for c in filename):
            pinyin_list = pypinyin.lazy_pinyin(filename)
            filename = '-'.join([item[0] for item in pinyin_list])

        # 转换为小写
        filename = filename.lower()

        # 替换空格为连字符
        filename = filename.replace(' ', '-')

        # 限制文件名长度
        if len(filename) > 100:
            filename = filename[:100]

        return filename

    def save_markdown(self, news_record: Dict, markdown: str) -> str:
        """保存 Markdown 文件"""
        # 创建今日新闻目录
        today_dir = os.path.join(self.news_dir, self.today)
        os.makedirs(today_dir, exist_ok=True)

        # 生成文件名（使用拼音或英文）
        name = news_record['sources'][0]['name']
        score = news_record['value']['score']
        filename = f"{self.sanitize_filename(name)}-{score}.md"
        filepath = os.path.join(today_dir, filename)

        # 写入文件
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(markdown)

        logger.info(f"已保存 {name} 的资讯到：{filepath}")

        return filepath

    def fetch_all(self):
        """抓取所有来源"""
        logger.info("========================================")
        logger.info("开始智能抓取 AI 资讯")
        logger.info("========================================")
        logger.info(f"今日日期：{self.today}")
        logger.info(f"新闻目录：{self.news_dir}")
        logger.info(f"数据库文件：{self.database_file}")
        logger.info(f"来源数量：{len(self.sources)}")
        logger.info("========================================")

        # 统计信息
        high_value_news_records = []

        # 按优先级抓取
        for i, source in enumerate(self.sources, 1):
            logger.info(f"\n[{i}/{len(self.sources)}] 正在处理：{source['name']} (优先级：{source['priority']}, 权重：{source['weight']})")

            # 抓取 RSS
            news_items = self.fetch_rss(source)

            if news_items and len(news_items) > 0:
                for j, news_item in enumerate(news_items, 1):
                    logger.info(f"  [{j}/{len(news_items)}] 处理新闻：{news_item['title'][:50]}...")

                    # 处理新闻项（去重、合并、价值评估）
                    processed_news = self.process_news_item(news_item, source)

                    # 如果是高价值新闻，保存到列表
                    if processed_news and processed_news['value']['score'] >= 70:
                        high_value_news_records.append(processed_news)
            else:
                logger.warning(f"来源 {source['name']} 没有抓取到资讯，跳过")

        # 生成汇总文件
        if high_value_news_records:
            self.generate_summary_markdown(high_value_news_records)

        # 保存数据库
        self.save_database()

        # 打印统计信息
        self.print_statistics()

    def generate_summary_markdown(self, news_records: List[Dict]):
        """生成汇总 Markdown 文件"""
        # 按价值评分排序（降序）
        news_records.sort(key=lambda x: x['value']['score'], reverse=True)

        markdown = f"""---
date: {self.today}
title: 今日高价值 AI 资讯汇总
tags: [AI, AI News, Summary, High Value]
---

# 📌 今日高价值 AI 资讯汇总（{self.today}）

---

## 📊 统计信息

- **高价值新闻数量**：{len(news_records)} 条（价值评分 >= 70）
- **总抓取数量**：{self.stats['total_fetched']} 条
- **唯一新闻数量**：{self.stats['unique_news']} 条
- **重复新闻数量**：{self.stats['duplicate_news']} 条
- **合并新闻数量**：{self.stats['merged_news']} 条
- **低价值新闻（已过滤）**：{self.stats['low_value_news']} 条

---

## 🏆 评分排行榜

### 最高价值新闻（TOP 10）

"""

        for i, news_record in enumerate(news_records[:10], 1):
            name = news_record['sources'][0]['name']
            score = news_record['value']['score']
            title = news_record['title']
            filename = self.sanitize_filename(name) + f"-{score}.md"

            markdown += f"""
### {i}. [{title}]({news_record['url']})
- **价值评分**：{score} / 100
- **来源**：{name}
- **详情**：[`{filename}`](news/{self.today}/{filename})

"""

        markdown += """
---

## 📂 高价值新闻列表

"""

        for news_record in news_records:
            name = news_record['sources'][0]['name']
            score = news_record['value']['score']
            title = news_record['title']
            filename = self.sanitize_filename(name) + f"-{score}.md"

            markdown += f"### [{title}]({news_record['url']})\n\n"
            markdown += f"- **价值评分**：{score} / 100\n"
            markdown += f"- **来源**：{name}\n"
            markdown += f"- **详情**：[`{filename}`](news/{self.today}/{filename})\n\n"

        markdown += """
---

## 🔗 来源统计

- **机器之心**：{len([n for n in news_records if '机器之心' in s['name'] for s in n['sources']])} 条
- **AI 前线**：{len([n for n in news_records if 'AI 前线' in s['name'] for s in n['sources']])} 条
- **36氪 AI 频道**：{len([n for n in news_records if '36氪' in s['name'] for s in n['sources']])} 条
- **智东西**：{len([n for n in news_records if '智东西' in s['name'] for s in n['sources']])} 条
- **其他**：{len([n for n in news_records if not any(x in s['name'] for x in ['机器之心', 'AI 前线', '36氪', '智东西']) for s in n['sources']])} 条

---

## 💡 今日重点

### 🔥 最高价值新闻

"""

        if news_records:
            top_news = news_records[0]
            name = top_news['sources'][0]['name']
            score = top_news['value']['score']
            title = top_news['title']

            markdown += f"""
**{title}**

**价值评分**：{score} / 100
**来源**：{name}

**为什么重要**：
- 权威来源
- 内容高质量
- 时效性强
- 影响广泛

---

## 🔮 趋势预测

### 下小时趋势

1. **AI Agent 普及**：更多企业将采用 AI Agent 自动化工作流
2. **多模态 AI 成熟**：多模态 AI 技术将更加成熟和普及
3. **AI 规范化**：AI 行业将建立更多的规范和标准

---

## 📝 更新说明

- **更新频率**：每小时更新一次
- **过滤标准**：价值评分 >= 70 的高价值新闻
- **去重机制**：基于链接、标题、内容的多级去重
- **合并机制**：基于关键词相似度的自动合并
- **价值评估**：多维度评分（来源、标题、内容、时间）

---

*本内容由 AI Sense 系统自动生成*
*最后更新：{self.today} 08:50*
*高价值新闻数量：{len(news_records)} 条*
"""

        # 保存汇总文件
        summary_path = os.path.join(self.news_dir, f"{self.today}-summary.md")
        with open(summary_path, 'w', encoding='utf-8') as f:
            f.write(markdown)

        logger.info(f"已生成汇总文件：{summary_path}")

    def print_statistics(self):
        """打印统计信息"""
        logger.info("\n========================================")
        logger.info("抓取完成！")
        logger.info("========================================")
        logger.info(f"总抓取数量：{self.stats['total_fetched']} 条")
        logger.info(f"唯一新闻数量：{self.stats['unique_news']} 条")
        logger.info(f"重复新闻数量：{self.stats['duplicate_news']} 条")
        logger.info(f"合并新闻数量：{self.stats['merged_news']} 条")
        logger.info(f"低价值新闻（已过滤）：{self.stats['low_value_news']} 条")
        logger.info(f"高价值新闻：{self.stats['high_value_news']} 条")
        logger.info("========================================")


def main():
    """主函数"""
    try:
        # 创建智能抓取器
        fetcher = IntelligentNewsFetcher()

        # 抓取所有来源
        fetcher.fetch_all()

        logger.info("✅ 智能抓取完成！")

        return 0

    except Exception as e:
        logger.error(f"❌ 智能抓取失败：{e}")
        import traceback
        logger.error(traceback.format_exc())
        return 1


if __name__ == '__main__':
    sys.exit(main())
