import { Clock, Hash, TextCase, Link2, Database, Calendar, Code2, FileCode, Terminal, Palette, Lock, Unlock, Search, Copy, Check, RefreshCw, Download, Upload, Globe, Zap, Image as LucideIcons } from 'lucide-react'

export default function UtilsPage() {
  const utils = [
    // Base64 Timestamp Tools (重点）
    {
      id: 'base64-timestamp',
      category: '编码解码',
      name: 'Base64 时间戳转换',
      description: 'Unix 时间戳与 Base64 格式的相互转换工具，支持实时转换和批量处理。',
      icon: '🕰',
      badge: '热门',
      features: ['Unix时间戳转换', 'Base64编码解码', '日期格式化', '批量处理'],
    },
    {
      id: 'base64-encode-decode',
      category: '编码解码',
      name: 'Base64 编码/解码',
      description: 'Base64 编码解码工具，支持文本、文件、URL 和图片的编码解码。',
      icon: '🔢',
      badge: '常用',
      features: ['文本编码', '文件编码', 'URL安全编码', '批量处理'],
    },
    {
      id: 'hex-encode-decode',
      category: '编码解码',
      name: 'Hex 编码/解码',
      description: '十六进制编码解码工具，支持多种字符集和格式。',
      icon: '🔡',
      badge: '开发者',
      features: ['Hex编码', 'Hex解码', '字符集选择', '大小写转换'],
    },

    // Encoding/Decoding Tools
    {
      id: 'url-encode-decode',
      category: '编码解码',
      name: 'URL 编码/解码',
      description: 'URL 编码解码工具，支持查询字符串解析、构建和安全编码。',
      icon: '🔗',
      badge: '实用',
      features: ['URL编码', '查询字符串解析', 'URL构建', '安全编码'],
    },
    {
      id: 'html-encode-decode',
      category: '编码解码',
      name: 'HTML 实体编码/解码',
      description: 'HTML 实体编码解码工具，支持完整 HTML 字符和命名实体。',
      icon: '📄',
      badge: '常用',
      features: ['实体编码', '命名实体解码', 'HTML工具集', '批量转换'],
    },

    // Formatting Tools
    {
      id: 'json-formatter',
      category: '格式化工具',
      name: 'JSON 格式化/美化',
      description: 'JSON 格式化工具，支持压缩、排序、高亮显示、语法检查和格式化输出。',
      icon: '📊',
      badge: '热门',
      features: ['格式化', '压缩', '排序', '高亮显示', '语法检查'],
    },
    {
      id: 'json-minifier',
      category: '格式化工具',
      name: 'JSON 压缩',
      description: 'JSON 压缩工具，去除空格、换行和注释，最小化 JSON 文件大小。',
      icon: '📦',
      badge: '实用',
      features: ['删除空格', '删除换行', '删除注释', '安全压缩'],
    },
    {
      id: 'json-path-extractor',
      category: '格式化工具',
      name: 'JSON 路径提取器',
      description: 'JSON 路径提取工具，支持嵌套对象、数组和复杂路径查询。',
      icon: '🔍',
      badge: '开发者',
      features: ['嵌套对象', '数组访问', '路径查询', '批量提取'],
    },
    {
      id: 'json-diff',
      category: '格式化工具',
      name: 'JSON 对比工具',
      description: 'JSON 对比工具，高亮显示差异，支持批量对比和导出结果。',
      icon: '🔄',
      badge: '推荐',
      features: ['差异对比', '高亮显示', '批量对比', '导出结果'],
    },
    {
      id: 'yaml-formatter',
      category: '格式化工具',
      name: 'YAML 格式化/验证',
      description: 'YAML 格式化工具，支持缩进、排序、高亮显示和语法检查。',
      icon: '📄',
      badge: '开发者',
      features: ['格式化', '排序', '缩进', '语法检查', '验证YAML'],
    },
    {
      id: 'xml-formatter',
      category: '格式化工具',
      name: 'XML 格式化/美化',
      description: 'XML 格式化工具，支持缩进、格式化、高亮显示和语法检查。',
      icon: '📄',
      badge: '开发者',
      features: ['格式化', '缩进', '高亮显示', '语法检查'],
    },

    // Hash & Crypto Tools
    {
      id: 'md5-hash',
      category: '加密哈希',
      name: 'MD5 哈希生成',
      description: 'MD5 哈希生成工具，支持文本和文件哈希计算，支持批量哈希和哈希对比。',
      icon: '🔐',
      badge: '常用',
      features: ['文本哈希', '文件哈希', '批量处理', '哈希对比'],
    },
    {
      id: 'sha1-hash',
      category: '加密哈希',
      name: 'SHA1 哈希生成',
      description: 'SHA1 哈希生成工具，支持文本和文件哈希计算，支持批量哈希。',
      icon: '🔐',
      badge: '推荐',
      features: ['文本哈希', '文件哈希', '批量处理', '校验验证'],
    },
    {
      id: 'sha256-hash',
      category: '加密哈希',
      name: 'SHA256 哈希生成',
      description: 'SHA256 哈希生成工具，支持文本和文件哈希计算，支持批量哈希和验证。',
      icon: '🔐',
      badge: '推荐',
      features: ['文本哈希', '文件哈希', '批量处理', '哈希验证'],
    },
    {
      id: 'sha512-hash',
      category: '加密哈希',
      name: 'SHA512 哈希生成',
      description: 'SHA512 哈希生成工具，支持文本和文件哈希计算，批量处理和校验验证。',
      icon: '🔐',
      badge: '推荐',
      features: ['文本哈希', '文件哈希', '批量处理', '校验验证'],
    },
    {
      id: 'uuid-generator',
      category: '加密哈希',
      name: 'UUID 生成器',
      description: 'UUID 生成器工具，支持 UUID v4、UUID v7、批量生成和格式选择。',
      icon: '🎲',
      badge: '实用',
      features: ['UUID v4', 'UUID v7', '批量生成', '格式选择'],
    },
    {
      id: 'password-generator',
      category: '加密哈希',
      name: '密码生成器',
      description: '密码生成器工具，支持自定义长度、字符类型、强度检测和批量生成。',
      icon: '🔑',
      badge: '实用',
      features: ['长度自定义', '字符类型', '强度检测', '批量生成'],
    },
    {
      id: 'bcrypt-hash',
      category: '加密哈希',
      name: 'Bcrypt 哈希生成',
      description: 'Bcrypt 哈希生成工具，支持自定义轮数和盐值，用于密码哈希。',
      icon: '🔐',
      badge: '开发者',
      features: ['Bcrypt哈希', '自定义轮数', '盐值支持', '验证哈希'],
    },
    {
      id: 'hash-comparator',
      category: '加密哈希',
      name: '哈希对比工具',
      description: '哈希对比工具，支持 MD5、SHA1、SHA256、SHA512 等多种哈希算法对比。',
      icon: '⚖️',
      badge: '开发者',
      features: ['多算法支持', '哈希对比', '批量处理', '结果导出'],
    },

    // Date & Time Tools
    {
      id: 'unix-timestamp',
      category: '日期时间',
      name: 'Unix 时间戳转换',
      description: 'Unix 时间戳转换工具，支持时间戳与日期时间的相互转换和多种日期格式。',
      icon: '📅',
      badge: '热门',
      features: ['时间戳转换', '日期格式化', '时区转换', '批量转换'],
    },
    {
      id: 'date-calculator',
      category: '日期时间',
      name: '日期计算器',
      description: '日期计算器工具，支持日期加减、时间差计算、工作日计算和节假日查询。',
      icon: '📅',
      badge: '常用',
      features: ['日期加减', '时间差计算', '工作日计算', '节假日查询'],
    },
    {
      id: 'timezone-converter',
      category: '日期时间',
      name: '时区转换',
      description: '时区转换工具，支持全球主要时区转换和对比，包含夏令时支持。',
      icon: '🌍',
      badge: '实用',
      features: ['全球时区', '时间对比', '夏令时支持', '批量转换'],
    },
    {
      id: 'cron-expression-generator',
      category: '日期时间',
      name: 'Cron 表达式生成器',
      description: 'Cron 表达式生成器工具，支持分钟、小时、日、月、周配置和表达式预览。',
      icon: '⏰',
      badge: '推荐',
      features: ['Cron配置', '表达式生成', '预览执行时间', '语法检查'],
    },
    {
      id: 'countdown-timer',
      category: '日期时间',
      name: '倒计时/正计时器',
      description: '倒计时正计时器工具，支持自定义目标时间、实时更新和提醒通知。',
      icon: '⏱️',
      badge: '实用',
      features: ['倒计时', '正计时', '实时更新', '提醒通知'],
    },
    {
      id: 'workday-calculator',
      category: '日期时间',
      name: '工作日计算',
      description: '工作日计算工具，支持工作日计算、周末排除、节假日配置和工作日统计。',
      icon: '📅',
      badge: '开发者',
      features: ['工作日计算', '周末排除', '节假日配置', '工作日统计'],
    },

    // Text Processing Tools
    {
      id: 'text-transform',
      category: '文本处理',
      name: '文本转换',
      description: '文本转换工具，支持大小写转换、文本反转、删除空行和字符统计。',
      icon: '🔤',
      badge: '常用',
      features: ['大小写转换', '文本反转', '删除空行', '字符统计'],
    },
    {
      id: 'word-counter',
      category: '文本处理',
      name: '字数/词数/行数统计',
      description: '字数词数行数统计工具，支持字符统计、词数统计、行数统计和字节统计。',
      icon: '📊',
      badge: '常用',
      features: ['字符统计', '词数统计', '行数统计', '字节统计'],
    },
    {
      id: 'line-remover',
      category: '文本处理',
      name: '空行删除器',
      description: '空行删除器工具，支持删除空行、删除连续空行和保留指定行。',
      icon: '🧹',
      badge: '实用',
      features: ['删除空行', '删除连续空行', '保留指定行', '批量处理'],
    },
    {
      id: 'text-deduplicator',
      category: '文本处理',
      name: '文本去重',
      description: '文本去重工具，支持去重、批量去重、大小写不敏感和保留顺序。',
      icon: '🔄',
      badge: '实用',
      features: ['文本去重', '批量去重', '大小写不敏感', '保留顺序'],
    },
    {
      id: 'text-compare',
      category: '文本处理',
      name: '文本对比',
      description: '文本对比工具，支持逐行对比、字符差异、高亮显示和导出结果。',
      icon: '📝',
      badge: '推荐',
      features: ['逐行对比', '字符差异', '高亮显示', '导出结果'],
    },

    // Developer Tools
    {
      id: 'regex-tester',
      category: '开发者工具',
      name: '正则表达式测试',
      description: '正则表达式测试工具，支持实时匹配测试、高亮显示、分组提取和常用模式。',
      icon: '🔍',
      badge: '推荐',
      features: ['实时测试', '高亮匹配', '分组提取', '常用模式'],
    },
    {
      id: 'regex-generator',
      category: '开发者工具',
      name: '正则表达式生成',
      description: '正则表达式生成器，支持常用模式生成、可视化界面和表达式解释。',
      icon: '✨',
      badge: '推荐',
      features: ['模式生成', '可视化界面', '表达式解释', '常用模式'],
    },
    {
      id: 'regex-explainer',
      category: '开发者工具',
      name: '正则表达式解释',
      description: '正则表达式解释器，支持分步解释、可视化匹配和常见模式说明。',
      icon: '💡',
      badge: '开发者',
      features: ['分步解释', '可视化匹配', '常见模式说明', '语法高亮'],
    },
    {
      id: 'http-status-codes',
      category: '开发者工具',
      name: 'HTTP 状态码查询',
      description: 'HTTP 状态码查询工具，包含所有状态码的说明、示例和最佳实践。',
      icon: '📡',
      badge: '常用',
      features: ['状态码查询', '状态码说明', '常见错误', '最佳实践'],
    },
    {
      id: 'http-request-tester',
      category: '开发者工具',
      name: 'HTTP 请求测试',
      description: 'HTTP 请求测试工具，支持 GET、POST、PUT、DELETE 等方法和自定义请求头。',
      icon: '🌐',
      badge: '推荐',
      features: ['多方法支持', '自定义请求头', '请求构建', '响应查看'],
    },
    {
      id: 'ip-lookup',
      category: '开发者工具',
      name: 'IP 地址查询',
      description: 'IP 地址查询工具，支持地理位置、ISP、ASN 信息和批量查询。',
      icon: '🌐',
      badge: '实用',
      features: ['地理位置', 'ISP信息', 'ASN查询', '批量查询'],
    },
    {
      id: 'dns-lookup',
      category: '开发者工具',
      name: 'DNS 解析',
      description: 'DNS 解析查询工具，支持 A、AAAA、MX、TXT 等记录类型和批量查询。',
      icon: '🔍',
      badge: '推荐',
      features: ['多记录类型', '批量查询', 'DNS缓存', '解析结果'],
    },
    {
      id: 'whois-lookup',
      category: '开发者工具',
      name: 'Whois 查询',
      description: 'Whois 域名查询工具，支持域名注册信息查询、到期日期查询和批量查询。',
      icon: '📋',
      badge: '开发者',
      features: ['注册信息', '到期日期', 'DNS服务器', '批量查询'],
    },
    {
      id: 'ssl-cert-checker',
      category: '开发者工具',
      name: 'SSL 证书查询',
      description: 'SSL 证书查询工具，支持证书有效期查询、颁发者信息和证书链验证。',
      icon: '🔐',
      badge: '推荐',
      features: ['有效期查询', '颁发者信息', '证书链验证', '批量查询'],
    },
    {
      id: 'user-agent-parser',
      category: '开发者工具',
      name: 'User-Agent 解析',
      description: 'User-Agent 解析工具，支持浏览器、操作系统、设备和爬虫识别。',
      icon: '🔍',
      badge: '常用',
      features: ['浏览器识别', '操作系统识别', '设备识别', '爬虫识别'],
    },
    {
      id: 'jwt-decoder',
      category: '开发者工具',
      name: 'JWT 解码',
      description: 'JWT 解码工具，支持 Header 解码、Payload 解码、签名验证和批量解码。',
      icon: '🔑',
      badge: '推荐',
      features: ['Header解码', 'Payload解码', '签名验证', '批量解码'],
    },

    // Web Development Tools
    {
      id: 'html-entities-encode',
      category: 'Web开发',
      name: 'HTML 实体编码',
      description: 'HTML 实体编码工具，支持完整 HTML 字符、命名实体和批量转换。',
      icon: '📄',
      badge: '常用',
      features: ['实体编码', '命名实体', '批量转换', 'HTML工具集'],
    },
    {
      id: 'html-entities-decode',
      category: 'Web开发',
      name: 'HTML 实体解码',
      description: 'HTML 实体解码工具，支持完整 HTML 字符、命名实体和批量转换。',
      icon: '📄',
      badge: '常用',
      features: ['实体解码', '命名实体', '批量转换', 'HTML工具集'],
    },
    {
      id: 'url-encoder',
      category: 'Web开发',
      name: 'URL 编码',
      description: 'URL 编码工具，支持查询参数编码、路径编码和完整 URL 编码。',
      icon: '🔗',
      badge: '常用',
      features: ['参数编码', '路径编码', '完整URL编码', '安全编码'],
    },
    {
      id: 'url-decoder',
      category: 'Web开发',
      name: 'URL 解码',
      description: 'URL 解码工具，支持查询参数解析、路径解码和完整 URL 解码。',
      icon: '🔗',
      badge: '常用',
      features: ['参数解析', '路径解码', '完整URL解码', '安全解码'],
    },
    {
      id: 'color-converter',
      category: 'Web开发',
      name: '颜色转换器',
      description: '颜色转换工具，支持 HEX、RGB、RGBA、HSL、HSV 等颜色格式转换和可视化。',
      icon: '🎨',
      badge: '实用',
      features: ['HEX转换', 'RGB转换', 'RGBA转换', 'HSL转换', '可视化'],
    },
    {
      id: 'image-converter',
      category: 'Web开发',
      name: '图片格式转换',
      description: '图片格式转换工具，支持 PNG、JPG、WEBP 等格式转换和压缩。',
      icon: '🖼️',
      badge: '实用',
      features: ['格式转换', '图片压缩', '批量转换', '质量设置'],
    },

    // CSS & JavaScript Tools
    {
      id: 'css-minifier',
      category: 'Web开发',
      name: 'CSS 压缩',
      description: 'CSS 压缩工具，支持去除空格、注释和压缩选择器，优化 CSS 文件大小。',
      icon: '🎨',
      badge: '开发者',
      features: ['去除空格', '删除注释', '压缩选择器', '源映射'],
    },
    {
      id: 'css-formatter',
      category: 'Web开发',
      name: 'CSS 格式化',
      description: 'CSS 格式化工具，支持缩进、排序、高亮显示和语法检查。',
      icon: '🎨',
      badge: '开发者',
      features: ['格式化', '排序', '高亮显示', '语法检查'],
    },
    {
      id: 'css-optimizer',
      category: 'Web开发',
      name: 'CSS 优化器',
      description: 'CSS 优化工具，支持未使用的 CSS 检测、选择器优化和性能建议。',
      icon: '🚀',
      badge: '推荐',
      features: ['未使用CSS', '选择器优化', '性能建议', '批量优化'],
    },
    {
      id: 'js-minifier',
      category: 'Web开发',
      name: 'JavaScript 压缩',
      description: 'JavaScript 压缩工具，支持去除空格、注释和代码压缩，优化 JS 文件大小。',
      icon: '⚡',
      badge: '开发者',
      features: ['去除空格', '删除注释', '代码压缩', '源映射'],
    },
    {
      id: 'js-formatter',
      category: 'Web开发',
      name: 'JavaScript 格式化',
      description: 'JavaScript 格式化工具，支持缩进、排序、高亮显示和语法检查。',
      icon: '⚡',
      badge: '开发者',
      features: ['格式化', '排序', '高亮显示', '语法检查'],
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
    { id: 'web', name: 'Web开发' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                开发者工具集
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                50+ 个开发者常用工具，一站式解决方案
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>实时在线</span>
              </div>
              <div className="badge badge-primary">
                共 {utils.length} 个工具
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
            placeholder="搜索工具：Base64、时间戳、JSON格式化、正则表达式..."
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
          />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utils.map((util) => (
              <div key={util.id} className="card hover:shadow-xl transition-all">
                <div className="p-6">
                  {/* Tool Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-4xl">
                      {util.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {util.name}
                      </h3>
                      {util.badge && (
                        <span className={`inline-block px-2 py-1 rounded-full ${util.badge === '热门' ? 'badge-primary' : util.badge === '推荐' ? 'badge-primary' : 'badge-secondary'} text-xs font-medium mt-1`}>
                          {util.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="badge badge-secondary mb-3">
                    {util.category}
                  </div>

                  {/* Description */}
                  <p className="text-base text-gray-600 mb-4">
                    {util.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {util.features.map((feature) => (
                      <span key={feature} className="badge badge-primary text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      持续更新
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            没有找到你需要的工具？
          </h2>
          <p className="text-lg text-blue-50 mb-8">
            告诉我们你需要的工具，我们会尽快开发并上线！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/aisense/aisense-top/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 flex items-center gap-2"
            >
              提交工具建议
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
