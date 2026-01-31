export default function NewsListPage() {
  const newsItems = [
    {
      id: 'gpt-5-preview',
      category: '大模型',
      badge: '重大更新',
      title: 'GPT-5 预览版发布',
      summary: 'OpenAI 发布了 GPT-5 预览版，支持更长上下文和更快推理速度。预览版主要面向开发者和企业用户。',
      source: 'OpenAI Blog',
      link: 'https://openai.com/blog/gpt-5-preview',
      publishTime: '2026-01-31 08:00',
      readingTime: '5 分钟',
    },
    {
      id: 'langchain-0.1.3',
      category: 'Agent框架',
      badge: '新版本',
      title: 'LangChain v0.1.3 发布',
      summary: 'LangChain 发布了 v0.1.3 版本，新增了多 Agent 协作功能和 Memory 优化。新版本支持更复杂的 Agent 编排和更高效的上下文管理。',
      source: 'LangChain Blog',
      link: 'https://blog.langchain.dev/langchain-0-1-3',
      publishTime: '2026-01-30 18:00',
      readingTime: '8 分钟',
    },
    {
      id: 'claude-code-2.2',
      category: 'AI工具',
      badge: '更新',
      title: 'Claude Code 2.2 发布',
      summary: 'Anthropic 发布了 Claude Code 2.2 版本，新增了 MCP 协议支持和更多 Agent 开发工具。新版本允许开发者直接在编辑器中调用外部工具。',
      source: 'Anthropic Docs',
      link: 'https://docs.anthropic.com/claude-code-2-2',
      publishTime: '2026-01-30 14:00',
      readingTime: '10 分钟',
    },
    {
      id: 'google-gemini-flash',
      category: '大模型',
      badge: '性能提升',
      title: 'Google Gemini 2.0 Flash 发布',
      summary: 'Google 发布了 Gemini 2.0 Flash，专注于更低延迟和更快推理速度。模型在移动设备上的性能有显著提升，响应时间减少了 40%。',
      source: 'Google DeepMind',
      link: 'https://deepmind.google/gemini-2-0-flash',
      publishTime: '2026-01-29 10:00',
      readingTime: '12 分钟',
    },
    {
      id: 'autogpt-0.2.0',
      category: 'Agent工具',
      badge: '更新',
      title: 'AutoGPT v0.2.0 版本',
      summary: 'AutoGPT 发布了 v0.2.0 版本，添加了 GPT-4o 集成和自主任务执行能力。新版本支持更复杂的 Agent 工作流和更好的错误恢复。',
      source: 'AutoGPT Blog',
      link: 'https://github.com/Auto-GPT/Auto-GPT/releases/tag/v0.2.0',
      publishTime: '2026-01-28 16:00',
      readingTime: '15 分钟',
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AI 资讯列表
        </h1>
        <p className="text-lg text-gray-600">
          最新的 AI 技术动态、工具更新和框架发布
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
          全部
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          大模型
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          Agent框架
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          AI工具
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="搜索资讯、工具、框架..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* News List */}
      <div className="space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="card overflow-hidden">
            <div className="p-6">
              {/* Badge and Category */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`badge ${news.badge === '重大更新' || news.badge === '性能提升' ? 'badge-primary' : 'badge-secondary'}`}>
                    {news.badge}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {news.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {news.publishTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                <Link href={news.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  {news.title}
                </Link>
              </h2>

              {/* Summary */}
              <p className="text-base text-gray-600 mb-4">
                {news.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 flex items-center gap-1">
                    <span>📖</span>
                    <span>{news.source}</span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{news.readingTime}</span>
                  </span>
                </div>
                <Link
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  阅读更多 →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
            上一页
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}
