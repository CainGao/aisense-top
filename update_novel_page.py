#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
更新小说列表页面
"""
import os

# 读取章节标题映射
chapters = []
with open('/Users/caingao/.openclaw/workspace/aisense-top/posts/novel-chapter-001.html', 'r', encoding='utf-8') as f:
    # 从HTML文件中提取标题
    pass

# 手动定义章节标题（从转换输出中获取）
chapter_titles = {
    1: "穿越重生，系统觉醒",
    2: "外门考核，一鸣惊人",
    3: "晋升内门，初遇圣女",
    4: "剑法传授，厚积薄发",
    5: "秘境试炼，首战告捷",
    6: "闭关突破，神秘功法",
    7: "三方对峙，传承之争",
    8: "返回内门，修炼提升",
    9: "领取奖励，系统升级",
    10: "闭关苦修，炼丹精进",
    11: "宗门大比，初战告捷",
    12: "决赛之战，逆袭夺冠",
    13: "真传弟子，资源到手",
    14: "猎杀妖兽，危机四伏",
    15: "化敌为友，携手探索",
    16: "秘境激战，生死对决",
    17: "青云传承，实力暴涨",
    18: "秘境深处，上古遗迹",
    19: "返回宗门，整理收获",
    20: "炼制丹药，闭关突破",
    21: "宗门大比，初露锋芒",
    22: "闭关修炼，实力精进",
    23: "深入秘境，遭遇强敌",
    24: "疗伤恢复，境界突破",
    25: "修炼龙血，战力暴涨",
    26: "血魔来袭，金丹之战",
    27: "突破筑基后期，血魔再临",
    28: "核心弟子，宗门禁地",
    29: "青云仙府，灵气十倍",
    30: "血魔宗主，元婴来袭",
    31: "战后整备，规划结丹",
    32: "炼丹开启，火候之难",
    33: "结丹准备，玄机叮嘱",
    34: "结丹开始，凝聚金丹",
    35: "金丹天劫，三道雷劫",
    36: "宗门大比，实力碾压",
    37: "闭关修炼，冲击金丹中期",
    38: "历练任务，遭遇强敌",
    39: "宗门大比，天才齐聚",
    40: "宗门大比，复赛开启",
    41: "宗门大比，剑道对决",
    42: "天道秘境，传承开启",
    43: "天道秘境，实力考验",
    44: "天道秘境，化神妖兽",
    45: "天道秘境，仙府现世",
    46: "闭关修炼，整理收获",
    47: "突破金丹后期，实力再进",
    48: "准备前往中州域，天才云集",
    49: "抵达中州域，气势如虹",
    50: "宗门大比，积分赛开启",
    51: "宗门大比，三大天才",
    52: "宗门大比，前十决战",
    53: "返回青云宗，宗门庆功",
    54: "青云仙府，祖师传承",
    55: "前往中州域，天机宗考核",
    56: "天机宗考核，悟性考验",
    57: "正式入门，天机弟子",
    58: "初入天机，核心弟子",
    59: "名声大振，各方关注",
    60: "挑战者来，天机显威",
    61: "秘境前夕，准备出发",
    62: "天机秘境，正式开启",
    63: "秘境深处，危机暗伏",
    64: "残卷线索，天机殿现",
    65: "迷雾森林，残卷踪迹",
    66: "迷雾之外，强敌来袭",
    67: "三关考验，传承现世",
    68: "传承整理，闭关前夕",
    69: "大比规则，天才云集",
    70: "天机城下，天才汇聚"
}

# 生成HTML内容
novel_page = '''---
layout: default
title: "📖 玄幻小说"
permalink: /novel/
---

<div class="category-list">
    <h1>📖 《修仙：开局签到天道系统》</h1>
    <p>修仙世界，签到系统，逆天改命</p>
    
    <div class="novel-info">
        <p><strong>作者：</strong>功哥 & AI</p>
        <p><strong>类型：</strong>玄幻修仙</p>
        <p><strong>状态：</strong>连载中</p>
        <p><strong>更新：</strong>共70章（已完结）</p>
    </div>
    
    <h2>📚 章节列表（共70章）</h2>
    
    <div class="chapter-list">
'''

# 添加所有章节（倒序，最新的在前面）
for i in range(70, 0, -1):
    title = chapter_titles.get(i, "未知标题")
    novel_page += f'''        <article class="post-item">
            <h3><a href="/posts/novel-chapter-{i:03d}.html">第{i:03d}章 {title}</a></h3>
            <p class="meta">2026年02月28日</p>
        </article>
        
'''

novel_page += '''    </div>
</div>

<style>
.novel-info {
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
}

.novel-info p {
    margin: 0.5rem 0;
}

.chapter-list {
    margin-top: 2rem;
}

.chapter-list .post-item {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.chapter-list .post-item h3 {
    margin: 0;
    font-size: 1.1rem;
}

.chapter-list .post-item h3 a {
    color: #007bff;
    text-decoration: none;
}

.chapter-list .post-item h3 a:hover {
    text-decoration: underline;
}

.chapter-list .meta {
    color: #666;
    font-size: 0.9rem;
    margin: 0.5rem 0 0 0;
}
</style>
'''

# 保存文件
with open('/Users/caingao/.openclaw/workspace/aisense-top/_pages/novel.md', 'w', encoding='utf-8') as f:
    f.write(novel_page)

print("✓ 已更新 _pages/novel.md，包含所有70章链接")
