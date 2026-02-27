---
layout: default
title: "📰 AI机器人早报"
permalink: /ai-news/
---

<div class="category-list">
    <h1>📰 AI机器人早报</h1>
    
    {% assign posts = site.categories['AI机器人早报'] | sort: date | reverse %}
    {% if posts.size > 0 %}
        {% for post in posts %}
        <article class="post-item">
            <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <p class="meta">{{ post.date | date: "%Y年%m月%d日" }}</p>
            {% if post.description %}
            <p>{{ post.description }}</p>
            {% endif %}
        </article>
        {% endfor %}
    {% else %}
        <p class="empty-message">暂无文章，敬请期待！</p>
    {% endif %}
</div>
