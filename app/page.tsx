import Link from 'next/link'
import { ArrowRight, Search, Zap, Star, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI 资讯与工具分享
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              AISENSE 是 AI 开发者社区，提供最新的 AI 资讯、工具推荐和技术博客。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="btn-primary px-8 py-3 flex items-center gap-2"
              >
                浏览 AI 资讯
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tools"
                className="btn-secondary px-8 py-3 flex items-center gap-2"
              >
                发现 AI 工具
                <Search className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            为什么选择 AISENSE？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  实时更新
                </h3>
              </div>
              <p className="text-gray-600">
                获取最新的 AI 大模型动态、Agent 开发工具和框架更新。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  精选工具
                </h3>
              </div>
              <p className="text-gray-600">
                发现最佳开源项目、效率工具和 Agent 模板。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  开发者社区
                </h3>
              </div>
              <p className="text-gray-600">
                加入 AI 开发者社区，分享经验和最佳实践。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              最新 AI 资讯
            </h2>
            <Link href="/news" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              查看全部
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News Card 1 */}
            <div className="card overflow-hidden">
              <div className="p-6">
                <div className="badge badge-primary mb-3">
                  大模型
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  GPT-5 预览版发布
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  OpenAI 发布了 GPT-5 预览版，支持更长上下文和更快推理速度。
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>2 小时前</span>
                  <span className="text-blue-600">阅读更多 →</span>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="card overflow-hidden">
              <div className="p-6">
                <div className="badge badge-secondary mb-3">
                  Agent 框架
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  LangChain v0.1 发布
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  LangChain 发布 v0.1 版本，新增了多 Agent 协作功能和 Memory 优化。
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>5 小时前</span>
                  <span className="text-blue-600">阅读更多 →</span>
                </div>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="card overflow-hidden">
              <div className="p-6">
                <div className="badge badge-primary mb-3">
                  商业化
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Claude Code 2.2 更新
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Anthropic 发布 Claude Code 2.2，新增了 MCP 协议支持和更多 Agent 工具。
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>8 小时前</span>
                  <span className="text-blue-600">阅读更多 →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              热门 AI 工具
            </h2>
            <Link href="/tools" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              浏览全部
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool Card 1 */}
            <div className="card p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AutoGPT
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    强大的 AI 助手，可以执行复杂任务和自动化工作流。
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge badge-primary text-xs">开源</span>
                    <span className="badge badge-secondary text-xs">免费</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Card 2 */}
            <div className="card p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    LangChain
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    构建具有上下文感知能力的 LLM 应用的框架。
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge badge-primary text-xs">框架</span>
                    <span className="badge badge-secondary text-xs">Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            准备开始了吗？
          </h2>
          <p className="text-lg text-blue-50 mb-8">
            浏览 AI 资讯、发现工具、分享经验，加入开发者社区。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/news"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              开始探索
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
