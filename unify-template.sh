#!/bin/bash

# 统一所有HTML文件的模板脚本

TEMPLATE_HEADER='<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | AI Sense</title>
    {{META}}
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
        <article class="post">'

TEMPLATE_FOOTER='        </article>
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
</html>'

# 处理posts目录下的所有HTML文件
cd /Users/caingao/.openclaw/workspace/aisense-top/posts

for file in *.html; do
    echo "Processing $file..."
    
    # 提取标题
    title=$(grep -o '<title>.*</title>' "$file" | sed 's/<title>\(.*\)<\/title>/\1/' | sed 's/ | AI Sense$//')
    
    # 提取meta标签
    meta=$(grep -E '<meta name="(description|keywords)"' "$file")
    
    # 提取内容（从post-content到</article>之前）
    content=$(sed -n '/<div class="post-content">/,/<\/article>/p' "$file" | sed '1d;$d' | sed '$d')
    
    # 如果没有post-content，尝试提取main内容
    if [ -z "$content" ]; then
        content=$(sed -n '/<main/,/<\/main>/p' "$file" | sed '1d;$d')
    fi
    
    # 创建新文件
    {
        echo "$TEMPLATE_HEADER" | sed "s/{{TITLE}}/$title/" | sed "s|{{META}}|$meta|"
        echo "$content"
        echo "$TEMPLATE_FOOTER"
    } > "${file}.new"
    
    # 替换原文件
    mv "${file}.new" "$file"
done

echo "All files unified!"
