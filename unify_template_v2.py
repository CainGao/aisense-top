#!/usr/bin/env python3
import os
import re

# 统一的头部模板
HEADER_TEMPLATE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
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
            
            <div class="post-content">'''

# 统一的页脚模板
FOOTER_TEMPLATE = '''            </div>
            
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

def process_file(filepath):
    """处理单个文件，只替换头部和页脚"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 提取标题
    title_match = re.search(r'<title>(.*?)</title>', html)
    title = title_match.group(1) if title_match else '未知标题'
    
    # 提取页面标题（去掉 " | AI Sense"）
    page_title = title.replace(' | AI Sense', '').strip()
    
    # 提取meta标签
    meta_tags = re.findall(r'<meta name="(description|keywords)"[^>]*content="[^"]*"[^>]*>', html)
    meta = '\n    '.join(meta_tags) if meta_tags else ''
    
    # 提取日期（从文件名）
    date_match = re.search(r'(\d{4}-\d{2}-\d{2})', filepath)
    date = f'<span class="post-date">{date_match.group(1)}</span>' if date_match else ''
    
    # 提取内容（从<div class="post-content">到</article>或</main>之前）
    content_match = re.search(r'<div class="post-content">(.*?)(?:</article>|</main>)', html, re.DOTALL)
    if content_match:
        content = content_match.group(1).strip()
        # 移除末尾的额外标签
        content = re.sub(r'\s*</div>\s*$', '', content)
    else:
        # 如果没有post-content，提取main内容
        content_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
        content = content_match.group(1).strip() if content_match else '<p>内容加载中...</p>'
    
    # 生成新HTML
    new_html = HEADER_TEMPLATE.format(
        title=title,
        meta=meta,
        page_title=page_title,
        date=date,
        author='<span class="post-author">作者：功哥</span>'
    )
    
    new_html += '\n' + content + '\n'
    new_html += FOOTER_TEMPLATE
    
    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"✓ {os.path.basename(filepath)} done")

# 处理三个示例文件
files = [
    '/Users/caingao/.openclaw/workspace/aisense-top/posts/2026-02-27-one-person-company-guide.html',
    '/Users/caingao/.openclaw/workspace/aisense-top/posts/2026-02-28-openclaw-complete-guide.html',
    '/Users/caingao/.openclaw/workspace/aisense-top/posts/2026-02-28-robot-news.html'
]

for file in files:
    process_file(file)

print("\n✅ All files unified!")
