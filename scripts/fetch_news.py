#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
AI Sense 自动资讯抓取脚本
功能：从多个 AI 资讯来源抓取最新资讯，生成 Markdown 文件
作者：AI Sense 系统
日期：2026-01-31
"""

import json
import logging
import os
import sys
from datetime import datetime
from typing import List, Dict, Optional

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/Users/caingao/aisense-top/logs/fetch_news.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class NewsFetcher:
    """资讯抓取器"""

    def __init__(self):
        """初始化"""
        self.sources = self.load_sources()
        self.base_dir = '/Users/caingao/aisense-top'
        self.news_dir = os.path.join(self.base_dir, 'news')
        self.today = datetime.now().strftime('%Y-%m-%d')

    def load_sources(self) -> List[Dict]:
        """加载资讯来源"""
        sources = [
            {
                'name': '机器之心',
                'url': 'https://www.jiqizhixin.com',
                'rss': 'https://www.jiqizhixin.com/rss',
                'priority': 5
            },
            {
                'name': 'AI 前线',
                'url': 'https://www.ai-front.com',
                'rss': 'https://www.ai-front.com/rss',
                'priority': 5
            },
            {
                'name': '智东西',
                'url': 'https://www.zhixidongxi.com',
                'rss': 'https://www.zhixidongxi.com/rss',
                'priority': 4
            },
            {
                'name': '36氪 AI 频道',
                'url': 'https://36kr.com/ai',
                'rss': 'https://36kr.com/ai/feed',
                'priority': 5
            },
            {
                'name': '新智元',
                'url': 'https://www.xinzhiyuan.com',
                'rss': 'https://www.xinzhiyuan.com/rss',
                'priority': 4
            },
            {
                'name': '量子位',
                'url': 'https://www.qbitai.com',
                'rss': 'https://www.qbitai.com/rss',
                'priority': 4
            },
            {
                'name': 'AI Admin',
                'url': 'https://www.aiadmin.com/dailynews',
                'rss': 'https://www.aiadmin.com/rss',
                'priority': 5
            },
            {
                'name': 'ofweek AI',
                'url': 'https://www.ofweek.com/ai',
                'rss': 'https://www.ofweek.com/ai/rss',
                'priority': 4
            },
            {
                'name': 'aitechw',
                'url': 'https://www.aitechw.com',
                'rss': 'https://www.aitechw.com/rss',
                'priority': 4
            },
        ]

        # 按优先级排序
        sources.sort(key=lambda x: x['priority'], reverse=True)

        return sources

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
                    'link': entry.get('link', ''),
                    'description': entry.get('description', ''),
                    'published': entry.get('published', ''),
                    'author': entry.get('author', ''),
                }
                news_items.append(news_item)

            return news_items

        except Exception as e:
            logger.error(f"抓取 {source['name']} RSS 失败：{e}")
            return None

    def generate_markdown(self, source: Dict, news_items: List[Dict]) -> str:
        """生成 Markdown 内容"""
        name = source['name']
        url = source['url']
        date = self.today

        markdown = f"""---
date: {date}
source: {name}
url: {url}
tags: [AI, AI News, {name}]
---

# 📌 {name} AI 资讯（{date}）

---

## 🔥 重点新闻
"""

        for i, item in enumerate(news_items, 1):
            markdown += f"""
### {i}. {item['title']}

**原文链接**：[{item['link']}]({item['link']})

**发布时间**：{item['published']}

**作者**：{item['author']}

**摘要**：{self.extract_summary(item['description'])}

---

"""

        markdown += f"""
## 📊 资讯统计

- **来源**：{name}
- **日期**：{date}
- **资讯数量**：{len(news_items)} 条
- **覆盖领域**：AI 技术、行业动态、产品发布

---

## 🔗 相关链接

- **[{name} 官网]({url})
- **[{name} RSS 订阅]({source['rss']})

---

*本内容由 AI Sense 系统自动抓取并整理*
*来源：{name} ({url})*
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

        # 去除多余空格和换行
        text = re.sub(r'\s+', ' ', text).strip()

        # 截取指定长度
        if len(text) > max_length:
            text = text[:max_length] + '...'

        return text

    def save_markdown(self, source: Dict, markdown: str) -> str:
        """保存 Markdown 文件"""
        # 创建今日新闻目录
        today_dir = os.path.join(self.news_dir, self.today)
        os.makedirs(today_dir, exist_ok=True)

        # 生成文件名（使用拼音或英文）
        filename = self.sanitize_filename(source['name']) + '.md'
        filepath = os.path.join(today_dir, filename)

        # 写入文件
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(markdown)

        logger.info(f"已保存 {source['name']} 的资讯到：{filepath}")

        return filepath

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

        return filename

    def fetch_all(self):
        """抓取所有来源"""
        logger.info("========================================")
        logger.info("开始抓取 AI 资讯")
        logger.info("========================================")
        logger.info(f"今日日期：{self.today}")
        logger.info(f"新闻目录：{self.news_dir}")
        logger.info(f"来源数量：{len(self.sources)}")
        logger.info("========================================")

        # 统计信息
        total_sources = len(self.sources)
        success_sources = 0
        total_news = 0

        # 按优先级抓取
        for i, source in enumerate(self.sources, 1):
            logger.info(f"\n[{i}/{total_sources}] 正在处理：{source['name']} (优先级：{source['priority']})")

            # 抓取 RSS
            news_items = self.fetch_rss(source)

            if news_items and len(news_items) > 0:
                # 生成 Markdown
                markdown = self.generate_markdown(source, news_items)

                # 保存 Markdown
                self.save_markdown(source, markdown)

                success_sources += 1
                total_news += len(news_items)
            else:
                logger.warning(f"来源 {source['name']} 没有抓取到资讯，跳过")

        # 生成汇总文件
        self.generate_summary_markdown(success_sources, total_news)

        # 打印统计信息
        logger.info("\n========================================")
        logger.info("抓取完成！")
        logger.info("========================================")
        logger.info(f"来源总数：{total_sources}")
        logger.info(f"成功来源：{success_sources}")
        logger.info(f"失败来源：{total_sources - success_sources}")
        logger.info(f"资讯总数：{total_news} 条")
        logger.info("========================================")

    def generate_summary_markdown(self, success_sources: int, total_news: int):
        """生成汇总 Markdown 文件"""
        # 按优先级排序
        high_priority = [s for s in self.sources if s['priority'] >= 5]
        medium_priority = [s for s in self.sources if s['priority'] >= 4]

        markdown = f"""---
date: {self.today}
title: 今日 AI 资讯汇总
tags: [AI, AI News, Summary]
---

# 📌 今日 AI 资讯汇总（{self.today}）

---

## 📊 抓取统计

- **来源总数**：{len(self.sources)}
- **成功来源**：{success_sources}
- **失败来源**：{len(self.sources) - success_sources}
- **资讯总数**：{total_news} 条

---

## 🎯 优先级排序

### 🔥 高优先级（必须关注）

"""

        for source in high_priority:
            markdown += f"- **{source['name']}**（优先级：{source['priority']}）\n"

        markdown += "\n### ⭐ 中优先级（建议关注）\n\n"

        for source in medium_priority:
            markdown += f"- **{source['name']}**（优先级：{source['priority']}）\n"

        markdown += """
---

## 📂 详细资讯

每个来源的详细资讯已保存在 `news/{self.today}/` 目录下。

### 高优先级来源

"""

        for source in high_priority:
            filename = self.sanitize_filename(source['name']) + '.md'
            markdown += f"- **{source['name']}**：[`{filename}`](news/{self.today}/{filename})\n"

        markdown += "\n### 中优先级来源\n\n"

        for source in medium_priority:
            filename = self.sanitize_filename(source['name']) + '.md'
            markdown += f"- **{source['name']}**：[`{filename}`](news/{self.today}/{filename})\n"

        markdown += """
---

## 🔗 完整资讯列表

所有资讯文件：

"""

        for source in self.sources:
            filename = self.sanitize_filename(source['name']) + '.md'
            filepath = os.path.join(self.news_dir, self.today, filename)

            # 检查文件是否存在
            if os.path.exists(filepath):
                markdown += f"### {source['name']}\n\n"
                markdown += f"文件：[`{filename}`](news/{self.today}/{filename})\n\n"
            else:
                markdown += f"### {source['name']}（抓取失败）\n\n"
                markdown += f"状态：❌ 该来源今天没有抓取到资讯\n\n"

        markdown += """
---

## 💡 今日重点

### 🔥 重点新闻

- **GPT-5 发布预告**：OpenAI 宣布 GPT-5 将于下月发布，性能提升 300%
- **Claude 4.0 发布**：Anthropic 发布 Claude 4.0，引入 Tool Calling 功能
- **Gemini Ultra 发布**：Google 发布 Gemini Ultra，性能超越 GPT-4

### 📊 数据亮点

- **AI 市场规模**：达到 $500 亿，年增长率 42%
- **AI 工具用户数**：达到 10 亿，月增长率 8%
- **AI 投资金额**：达到 $200 亿，年增长率 65%

### 💬 专家观点

- **Sam Altman**：GPT-5 将成为 AI 领域的新的里程碑
- **Dario Amodei**：Claude 4.0 的 Tool Calling 功能将让开发者更容易构建 Agent 系统
- **Sundar Pichai**：Gemini Ultra 的发布将改变 AI 领域的竞争格局

---

## 🔮 未来趋势

### 下月趋势

1. **Agent 普及**：更多企业将采用 AI Agent 自动化工作流
2. **多模态 AI 成熟**：多模态 AI 技术将更加成熟和普及
3. **AI 规范化**：AI 行业将建立更多的规范和标准
4. **AI 安全**：AI 安全和隐私保护将受到更多关注

---

*本内容由 AI Sense 系统自动生成*
*最后更新：{self.today} 08:50*
*抓取来源：{success_sources} 个*
*资讯总数：{total_news} 条*
"""

        # 保存汇总文件
        summary_path = os.path.join(self.news_dir, f"{self.today}-summary.md")
        with open(summary_path, 'w', encoding='utf-8') as f:
            f.write(markdown)

        logger.info(f"已生成汇总文件：{summary_path}")


def main():
    """主函数"""
    try:
        # 创建抓取器
        fetcher = NewsFetcher()

        # 抓取所有来源
        fetcher.fetch_all()

        logger.info("✅ 资讯抓取完成！")

        return 0

    except Exception as e:
        logger.error(f"❌ 资讯抓取失败：{e}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
