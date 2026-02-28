#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量转换小说章节为HTML文件
"""
import os
import re
from pathlib import Path

# 源目录和目标目录
SOURCE_DIR = "/Users/caingao/ROOT/jobs/me/novel/xuanhuan/chapters"
TARGET_DIR = "/Users/caingao/.openclaw/workspace/aisense-top/posts"

def parse_chapter_file(filepath):
    """解析章节文件，提取标题和内容"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取标题（第一行 # 第XXX章 XXX）
    lines = content.strip().split('\n')
    title_line = lines[0]
    
    # 提取章节号和标题
    match = re.match(r'# 第(\d+)章\s+(.+)', title_line)
    if match:
        chapter_num = int(match.group(1))
        chapter_title = match.group(2).replace('_', '，')
    else:
        # 从文件名提取
        filename = os.path.basename(filepath)
        match = re.match(r'第(\d+)章', filename)
        chapter_num = int(match.group(1)) if match else 0
        chapter_title = "未知标题"
    
    # 提取正文内容（去掉标题行）
    body = '\n'.join(lines[1:]).strip()
    
    return chapter_num, chapter_title, body

def convert_to_html_paragraphs(text):
    """将文本转换为HTML段落"""
    paragraphs = text.split('\n\n')
    html_parts = []
    
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        
        # 处理对话（以引号开头的内容）
        if para.startswith('"') or para.startswith('"'):
            # 对话段落
            html_parts.append(f'        <p class="dialogue">{para}</p>')
        else:
            # 普通段落
            html_parts.append(f'        <p>{para}</p>')
    
    return '\n'.join(html_parts)

def create_chapter_html(chapter_num, chapter_title, body_content):
    """创建完整的HTML文件"""
    # 上一个和下一个章节链接
    prev_chapter = chapter_num - 1 if chapter_num > 1 else None
    next_chapter = chapter_num + 1 if chapter_num < 70 else None
    
    prev_link = f'/posts/novel-chapter-{prev_chapter:03d}.html' if prev_chapter else '#'
    next_link = f'/posts/novel-chapter-{next_chapter:03d}.html' if next_chapter else '#'
    
    prev_text = f'← 上一章' if prev_chapter else ''
    next_text = f'下一章 →' if next_chapter else ''
    
    # 转换正文为HTML
    html_content = convert_to_html_paragraphs(body_content)
    
    html_template = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>第{chapter_num:03d}章 {chapter_title} | 修仙：开局签到天道系统</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <style>
        .novel-chapter {{
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }}
        .chapter-content {{
            line-height: 1.8;
            font-size: 1.1rem;
            margin: 2rem 0;
        }}
        .chapter-content p {{
            margin: 1rem 0;
            text-indent: 2em;
        }}
        .chapter-content .dialogue {{
            color: #2c5282;
            font-weight: 500;
        }}
        .chapter-nav {{
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
        }}
        .chapter-nav a {{
            text-decoration: none;
            color: #4299e1;
        }}
        .chapter-nav a:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="/">首页</a>
            <a href="/novel/">📖 小说</a>
        </nav>
    </header>
    
    <main class="novel-chapter">
        <h1>第{chapter_num:03d}章 {chapter_title}</h1>
        
        <div class="chapter-content">
{html_content}
        </div>
        
        <div class="chapter-nav">
            <a href="{prev_link}">{prev_text}</a>
            <a href="/novel/">📖 目录</a>
            <a href="{next_link}">{next_text}</a>
        </div>
    </main>
    
    <footer>
        <p>&copy; 2026 AI Sense. All rights reserved.</p>
    </footer>
</body>
</html>'''
    
    return html_template

def main():
    """主函数"""
    # 确保目标目录存在
    os.makedirs(TARGET_DIR, exist_ok=True)
    
    # 获取所有章节文件
    chapter_files = sorted(Path(SOURCE_DIR).glob('第*.md'))
    
    print(f"找到 {len(chapter_files)} 个章节文件")
    
    # 转换每个章节
    created_count = 0
    for filepath in chapter_files:
        try:
            chapter_num, chapter_title, body = parse_chapter_file(filepath)
            html_content = create_chapter_html(chapter_num, chapter_title, body)
            
            # 保存HTML文件
            output_filename = f'novel-chapter-{chapter_num:03d}.html'
            output_path = os.path.join(TARGET_DIR, output_filename)
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            created_count += 1
            print(f"✓ 创建第{chapter_num:03d}章: {chapter_title}")
            
        except Exception as e:
            print(f"✗ 处理文件 {filepath} 时出错: {e}")
    
    print(f"\n完成！共创建 {created_count} 个HTML文件")
    return created_count

if __name__ == '__main__':
    main()
