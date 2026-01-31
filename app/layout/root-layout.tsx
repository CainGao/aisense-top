import Link from 'next/link'
import { GitHubLogoIcon, TwitterLogoIcon, RssIcon } from 'lucide-react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <span className="text-xl font-bold text-gray-900">
                  AISENSE
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link href="/news" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  AI资讯
                </Link>
                <Link href="/tools" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  AI工具
                </Link>
                <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  技术博客
                </Link>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="search"
                  placeholder="搜索资讯、工具、博客..."
                  className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/aisense-top"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <GitHubLogoIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/aisense"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <TwitterLogoIcon className="w-5 h-5" />
                </a>
                <a
                  href="/rss"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <RssIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">关于我们</h3>
              <p className="text-sm text-gray-600 mb-2">
                AISENSE是AI开发者社区，提供最新的AI资讯、工具推荐和技术博客。
              </p>
              <Link href="/about" className="text-sm text-blue-600 hover:text-blue-700">
                了解更多 →
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">快速链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/news" className="text-sm text-gray-600 hover:text-gray-900">
                    AI资讯列表
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-sm text-gray-600 hover:text-gray-900">
                    AI工具库
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-sm text-gray-600 hover:text-gray-900">
                    开发教程
                  </Link>
                </li>
                <li>
                  <Link href="/rss" className="text-sm text-gray-600 hover:text-gray-900">
                    RSS订阅
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">社区</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/aisense/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  GitHub Discussions
                </a>
                <a
                  href="https://discord.gg/aisense"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Discord
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">联系方式</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">
                  <span className="font-medium">邮箱：</span>
                  <Link href="mailto:contact@aisense.top" className="text-blue-600 hover:text-blue-700">
                    contact@aisense.top
                  </Link>
                </li>
                <li className="text-sm text-gray-600">
                  <span className="font-medium">反馈：</span>
                  <Link href="/feedback" className="text-blue-600 hover:text-blue-700">
                    提交反馈
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} AISENSE. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  隐私政策
                </Link>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  使用条款
                </Link>
                <Link href="/sitemap" className="text-sm text-gray-600 hover:text-gray-900">
                  网站地图
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
