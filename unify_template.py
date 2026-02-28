#!/usr/bin/env python3
import os
import re

# 统一的HTML模板
TEMPLATE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | AI Sense</title>
    {meta}
    <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="container">
                <a href="/" class="logo">
                    <h1>AI Sense</h1>
                </a>
                <ul class="nav-menu">
                    <li><a href="/">🏠 首页</a></li>
                    <li><a href="/ai-news/">😴 睡醒就有早报看</a></li>
                    <li><a href="/github-trending/">⭐ 今天又Star了啥</a></li>
                    <li><a href="/robot/">🤖 机器人时代来了</a></li>
                    <li><a href="/one-person-company/">💪 一个人也能当老板</a></li>
                    <li><a href="/openclaw/">🦞 我的AI管家</a></li>
                    <li><a href="/about/">🙋 关于我</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <main class="container">
        <article class="post">
            <header class="post-header">
                <h1 class="post-title">{page_title}</h1>
                <div class="post-meta">
                    {date}
                    {author}
                </div>
            </header>
            
            <div class="post-content">
{content}
            </div>
            
            <footer class="post-footer">
                <div class="post-navigation">
                    <a href="/" class="btn">← 返回首页</a>
                </div>
            </footer>
        </article>
    </main>
    
    <footer>
        <div class="container">
            <p style="font-size: 1.1rem; font-weight: 500; color: #666; margin-bottom: 1rem;">
                🌐 AI Sense - 让AI帮你赚钱，让技术更有趣
            </p>
            
            <div class="footer-links">
                <a href="/">🏠 首页</a>
                <a href="/ai-news/">😴 睡醒就有早报看</a>
                <a href="/github-trending/">⭐ 今天又Star了啥</a>
                <a href="/robot/">🤖 机器人时代来了</a>
                <a href="/one-person-company/">💪 一个人也能当老板</a>
                <a href="/openclaw/">🦞 我的AI管家</a>
                <a href="/about/">🙋 关于我</a>
            </div>
            
            <p class="copyright">
                &copy; 2026 AI Sense | Powered by Jekyll & GitHub Pages | 
                <a href="https://github.com/CainGao/aisense-top" target="_blank">GitHub</a> |
                Made with ❤️ by 功哥
            </p>
        </div>
    </footer>
</body>
</html>'''

def extract_content(filepath):
    """从HTML文件中提取内容"""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 提取标题
    title_match = re.search(r'<title>(.*?)\s*\|', html)
    title = title_match.group(1) if title_match else '未知标题'
    
    # 提取meta标签
    meta_tags = re.findall(r'<meta name="(description|keywords)"[^>]*>', html)
    meta = '\n    '.join(meta_tags) if meta_tags else ''
    
    # 提取内容（从post-content或main中）
    content_match = re.search(r'<div class="post-content">(.*?)</div>\s*</article>', html, re.DOTALL)
    if not content_match:
        content_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
    
    content = content_match.group(1) if content_match else '<p>内容加载中...</p>'
    
    # 清理内容中的多余空白
    content = content.strip()
    
    # 提取日期
    date_match = re.search(r'(\d{4}-\d{2}-\d{2})', filepath)
    date = f'<span class="post-date">{date_match.group(1)}</span>' if date_match else ''
    
    return {
        'title': title,
        'page_title': title,
        'meta': meta,
        'content': content,
        'date': date,
        'author': '<span class="post-author">作者：功哥</span>'
    }

def process_file(filepath):
    """处理单个文件"""
    print(f"Processing {filepath}...")
    
    # 提取内容
    data = extract_content(filepath)
    
    # 生成新HTML
    new_html = TEMPLATE.format(**data)
    
    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"✓ {filepath} done")

# 处理三个示例文件
files = [
    '/Users/caingao/.openclaw/workspace/aisense-top/posts/2026-02-27-one-person-company-guide.html',
    '/Users/caingao/.openclaw/workspace/aisense-top/posts/2026-02-28-openclaw-complete-guide.html',
    '/Users/caingao/.openclaw/workspace/aisense-top/posts/2026-02-28-robot-news.html'
]

for file in files:
    process_file(file)

print("\n✅ All files unified!")
