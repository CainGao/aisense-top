---
layout: default
title: "📊 GitHub热榜分析"
permalink: /github-trending/
---

<div class="category-list">
    <h1>📊 GitHub热榜分析</h1>
    
    {% assign posts = site.categories['GitHub热榜'] | sort: date | reverse %}
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
