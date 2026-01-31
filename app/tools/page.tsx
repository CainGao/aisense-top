import Link from 'next/link'

export default function ToolsPage() {
  const tools = [
    {
      id: 'autogpt',
      name: 'AutoGPT',
      description: '强大的 AI 助手，可以执行复杂任务和自动化工作流',
      category: 'AI助手',
      tags: ['开源', '免费', 'GPT-4o'],
      githubStars: '25.3k+',
      githubUrl: 'https://github.com/Auto-GPT/Auto-GPT',
      icon: '🤖',
      badge: '热门',
    },
    {
      id: 'langchain',
      name: 'LangChain',
      description: '构建具有上下文感知能力的 LLM 应用的框架',
      category: 'Agent框架',
      tags: ['框架', 'Python', '免费'],
      githubStars: '85.2k+',
      githubUrl: 'https://github.com/langchain-ai/langchain',
      icon: '🔗',
      badge: '流行',
    },
    {
      id: 'claude-code',
      name: 'Claude Code',
      description: 'Anthropic 发布的 AI 编码助手，提供强大的代码审查和生成功能',
      category: 'AI工具',
      tags: ['免费', '开源', 'TypeScript'],
      githubStars: '12.5k+',
      githubUrl: 'https://github.com/anthropics/claude-code',
      icon: '💻',
      badge: '推荐',
    },
    {
      id: 'crewai',
      name: 'CrewAI',
      description: '企业级 Agent 平台，提供可视化界面和强大的编排功能',
      category: 'Agent框架',
      tags: ['企业级', '可视化', '付费'],
      githubStars: '7.3k+',
      githubUrl: 'https://github.com/joaomdmoura/crewai',
      icon: '🏢',
      badge: '专业',
    },
    {
      id: 'supabase-ai',
      name: 'Supabase AI',
      description: 'Supabase 发布的 AI Functions，支持直接在边缘计算环境运行 AI 推理',
      category: 'AI工具',
      tags: ['免费', '边缘计算', 'TypeScript'],
      githubStars: '9.2k+',
      githubUrl: 'https://github.com/supabase/ai',
      icon: '🔮',
      badge: '新品',
    },
    {
      id: 'vercel-ai-sdk',
      name: 'Vercel AI SDK',
      description: 'Vercel 发布的 AI SDK，简化了 AI 应用的部署流程',
      category: 'AI工具',
      tags: ['免费', '部署', 'TypeScript'],
      githubStars: '5.8k+',
      githubUrl: 'https://github.com/vercel/ai',
      icon: '⚡',
      badge: '实用',
    },
    {
      id: 'agent-gpt',
      name: 'AgentGPT',
      description: '轻量级的 Agent 框架，支持自定义 Agent 和多步骤任务执行',
      category: 'Agent框架',
      tags: ['轻量级', 'Python', '免费'],
      githubStars: '3.2k+',
      githubUrl: 'https://github.com/e2b-dev/AgentGPT',
      icon: '🤖',
      badge: '灵活',
    },
  ]

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'ai-assistant', name: 'AI助手' },
    { id: 'agent-framework', name: 'Agent框架' },
    { id: 'ai-tools', name: 'AI工具' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI 工具库
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                发现最新的 AI 助手、Agent 框架和开发工具
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                共 {tools.length} 个工具
              </div>
              <div className="badge badge-primary">
                每周更新
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-full bg-white border-2 border-transparent hover:border-blue-600 hover:bg-gray-50 text-gray-700 font-medium transition-all"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <input
            type="search"
            placeholder="搜索工具、框架、AI助手..."
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
          />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="card hover:shadow-xl transition-all">
                {/* Tool Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-2xl">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {tool.name}
                        </h3>
                        {tool.badge && (
                          <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mt-1">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="badge badge-secondary mb-3">
                    {tool.category}
                  </div>

                  {/* Description */}
                  <p className="text-base text-gray-600 mb-4">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="badge badge-primary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        ⭐ {tool.githubStars}
                      </span>
                      <span className="flex items-center gap-1">
                        📥 Forks: {(Math.random() * 5000).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link
                      href={tool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      GitHub →
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      最后更新：{new Date().toLocaleDateString()}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            没有找到你需要的工具？
          </h2>
          <p className="text-lg text-blue-50 mb-8">
            访问我们的 GitHub 仓库，提交你发现的优秀工具，加入社区贡献。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/aisense/aisense-top"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 flex items-center gap-2"
            >
              提交工具
            </Link>
            <Link
              href="https://github.com/aisense/aisense-top/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-4 flex items-center gap-2"
            >
              反馈建议
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
