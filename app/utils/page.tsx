import { Clock, Hash, TextCase, Link2, Database, Calendar, Code2 } from 'lucide-react'

export default function UtilsPage() {
  const utils = [
    {
      id: 'base64-timestamp',
      category: '编码解码',
      name: 'Base64 时间戳转换',
      description: 'Unix 时间戳转换工具，支持秒/毫秒转换，支持多种日期格式。',
      icon: '🕰',
      badge: '热门',
      features: ['Unix时间戳转换', '日期格式化', '时区转换', '批量转换'],
    },
    {
      id: 'base64-encode-decode',
      category: '编码解码',
      name: 'Base64 编码/解码',
      description: 'Base64 编码解码工具，支持文本、文件、URL 安全编码。',
      icon: '🔢',
      badge: '常用',
      features: ['文本编码', '文件编码', 'URL 安全编码', '批量处理'],
    },
    {
      id: 'url-encode-decode',
      category: '编码解码',
      name: 'URL 编码/解码',
      description: 'URL 编码解码工具，支持查询字符串解析和构建。',
      icon: '🔗',
      badge: '实用',
      features: ['URL 编码', '查询字符串解析', 'URL 构建', '安全编码'],
    },
    {
      id: 'json-formatter',
      category: '格式化工具',
      name: 'JSON 格式化',
      description: 'JSON 格式化工具，支持压缩、排序、高亮显示。',
      icon: '📊',
      badge: '开发者',
      features: ['格式化', '压缩', '排序', '高亮显示', '语法检查'],
    },
    {
      id: 'md5-hash',
      category: '加密哈希',
      name: 'MD5 哈希生成',
      description: 'MD5 哈希生成工具，支持文本和文件哈希计算。',
      icon: '🔐',
      badge: '常用',
      features: ['文本哈希', '文件哈希', '批量处理', '哈希比较'],
    },
    {
      id: 'sha256-hash',
      category: '加密哈希',
      name: 'SHA256 哈希生成',
      description: 'SHA256 哈希生成工具，支持文本和文件哈希计算。',
      icon: '🔐',
      badge: '推荐',
      features: ['文本哈希', '文件哈希', '批量处理', '哈希验证'],
    },
    {
      id: 'uuid-generator',
      category: '加密哈希',
      name: 'UUID 生成器',
      description: 'UUID 生成器工具，支持多种 UUID 格式和批量生成。',
      icon: '🎲',
      badge: '实用',
      features: ['UUID v4', 'UUID v7', '批量生成', '格式选择'],
    },
    {
      id: 'date-calculator',
      category: '日期时间',
      name: '日期计算器',
      description: '日期计算器工具，支持日期加减、时间差计算、工作日计算。',
      icon: '📅',
      badge: '常用',
      features: ['日期加减', '时间差计算', '工作日计算', '节假日查询'],
    },
    {
      id: 'timezone-converter',
      category: '日期时间',
      name: '时区转换',
      description: '时区转换工具，支持全球主要时区转换和对比。',
      icon: '🌍',
      badge: '实用',
      features: ['全球时区', '时间对比', '夏令时支持', '批量转换'],
    },
    {
      id: 'text-transform',
      category: '文本处理',
      name: '文本转换',
      description: '文本转换工具，支持大小写转换、反转、删除空行等。',
      icon: '🔤',
      badge: '常用',
      features: ['大小写转换', '文本反转', '删除空行', '字符统计'],
    },
    {
      id: 'regex-tester',
      category: '开发者工具',
      name: '正则表达式测试',
      description: '正则表达式测试工具，支持实时匹配测试、高亮显示、分组提取。',
      icon: '🔍',
      badge: '推荐',
      features: ['实时测试', '高亮匹配', '分组提取', '常用模式'],
    },
    {
      id: 'http-status',
      category: '开发者工具',
      name: 'HTTP 状态码查询',
      description: 'HTTP 状态码查询工具，包含所有状态码的说明和示例。',
      icon: '📡',
      badge: '常用',
      features: ['状态码查询', '状态码说明', '常见错误', '最佳实践'],
    },
    {
      id: 'ip-lookup',
      category: '开发者工具',
      name: 'IP 地址查询',
      description: 'IP 地址查询工具，支持地理位置、ISP、ASN 信息查询。',
      icon: '🌐',
      badge: '实用',
      features: ['地理位置', 'ISP 信息', 'ASN 查询', '批量查询'],
    },
    {
      id: 'yaml-formatter',
      category: '格式化工具',
      name: 'YAML 格式化',
      description: 'YAML 格式化工具，支持排序、缩进、高亮显示。',
      icon: '📊',
      badge: '开发者',
      features: ['格式化', '排序', '缩进', '语法检查'],
    },
    {
      id: 'password-generator',
      category: '加密哈希',
      name: '密码生成器',
      description: '密码生成器工具，支持自定义长度、字符类型、强度检测。',
      icon: '🔑',
      badge: '实用',
      features: ['长度自定义', '字符类型', '强度检测', '批量生成'],
    },
  ]

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'encode', name: '编码解码' },
    { id: 'format', name: '格式化工具' },
    { id: 'crypto', name: '加密哈希' },
    { id: 'datetime', name: '日期时间' },
    { id: 'text', name: '文本处理' },
    { id: 'developer', name: '开发者工具' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                常用工具集
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Base64 时间戳转换、编码解码、格式化工具等在线实用工具
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>实时在线</span>
              </div>
              <div className="badge badge-primary">
                实用工具集
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <input
              type="search"
              placeholder="搜索工具：Base64、时间戳、JSON格式化..."
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
          />
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            🔥 热门工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tool 1 */}
            <Link href="/utils/base64-timestamp" className="block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">🕰</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Base64 时间戳
                    </h3>
                    <p className="text-sm text-blue-50">
                      Unix 时间戳转换
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tool 2 */}
            <Link href="/utils/base64-encode-decode" className="block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">🔢</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Base64 编解码
                    </h3>
                    <p className="text-sm text-blue-50">
                      文本和文件编解码
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tool 3 */}
            <Link href="/utils/json-formatter" className="block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      JSON 格式化
                    </h3>
                    <p className="text-sm text-blue-50">
                      压缩和美化 JSON
                    </p>
                  </div>
                </div>
              </div>
            </Link>
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

      {/* All Tools Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              全部工具
            </h2>
            <div className="text-sm text-gray-500">
              共 {utils.length} 个工具
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utils.map((util) => (
              <div key={util.id} className="card overflow-hidden">
                <div className="p-6">
                  {/* Icon and Category */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-4xl">
                      {util.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {util.name}
                        </h3>
                        {util.badge && (
                          <span className={`badge ${util.badge === '热门' ? 'badge-primary' : util.badge === '推荐' ? 'badge-primary' : 'badge-secondary'}`}>
                            {util.badge}
                          </span>
                        )}
                      </div>
                      <div className="badge badge-secondary text-xs">
                        {util.category}
                      </div>
                    </div>
                      <p className="text-base text-gray-600 mb-4">
                        {util.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {util.features.map((feature) => (
                          <span key={feature} className="badge badge-primary text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      在线可用
                    </span>
                    <Link
                      href={`/utils/${util.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      立即使用 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🔧 没有找到你需要的工具？
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            告诉我们你需要的工具，我们会尽快开发并上线！
          </p>
          <Link
            href="https://github.com/aisense/aisense-top/issues/new?labels=enhancement,tool"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-4 flex items-center gap-2"
          >
            提交工具建议
          </Link>
        </div>
      </section>
    </div>
  )
}
