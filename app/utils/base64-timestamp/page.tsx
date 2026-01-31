'use client'

import { useState } from 'react'
import { Clock, Calendar, Copy, Check, RefreshCw, Download, Upload } from 'lucide-react'

export default function Base64TimestampPage() {
  const [inputType, setInputType] = useState<'timestamp' | 'datetime'>('timestamp')
  const [timestamp, setTimestamp] = useState('')
  const [base64Timestamp, setBase64Timestamp] = useState('')
  const [convertedTimestamp, setConvertedTimestamp] = useState('')
  const [convertedBase64, setConvertedBase64] = useState('')
  const [copied, setCopied] = useState(false)

  // Unix 时间戳转 Base64
  const timestampToBase64 = (ts: string) => {
    try {
      const timestamp = parseInt(ts)
      if (isNaN(timestamp)) {
        throw new Error('无效的时间戳')
      }
      const buffer = Buffer.from(timestamp.toString())
      const base64 = buffer.toString('base64')
      return base64
    } catch (error) {
      return null
    }
  }

  // Base64 转回 Unix 时间戳
  const base64ToTimestamp = (b64: string) => {
    try {
      const buffer = Buffer.from(b64, 'base64')
      const timestamp = parseInt(buffer.toString())
      return timestamp.toString()
    } catch (error) {
      return null
    }
  }

  // Unix 时间戳转可读时间
  const timestampToDateTime = (ts: string) => {
    try {
      const timestamp = parseInt(ts)
      if (isNaN(timestamp)) {
        throw new Error('无效的时间戳')
      }
      const date = new Date(timestamp * 1000)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    } catch (error) {
      return null
    }
  }

  // 可读时间转 Unix 时间戳
  const dateTimeToTimestamp = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        throw new Error('无效的日期时间')
      }
      const timestamp = Math.floor(date.getTime() / 1000)
      return timestamp.toString()
    } catch (error) {
      return null
    }
  }

  // 处理 Base64 时间戳转换
  const handleBase64Timestamp = () => {
    if (!base64Timestamp) return

    const timestamp = base64ToTimestamp(base64Timestamp)
    if (timestamp) {
      setConvertedTimestamp(timestamp)
      const dateTime = timestampToDateTime(timestamp)
      if (dateTime) {
        setConvertedBase64(dateTime)
      } else {
        setConvertedBase64('转换失败')
      }
    } else {
      setConvertedTimestamp('无效的 Base64')
      setConvertedBase64('无法转换')
    }
  }

  // 处理 Unix 时间戳转换
  const handleUnixTimestamp = () => {
    if (!timestamp) return

    try {
      const timestampNum = parseInt(timestamp)
      if (isNaN(timestampNum)) {
        throw new Error('无效的时间戳')
      }

      // 转 Base64
      const buffer = Buffer.from(timestampNum.toString())
      const base64 = buffer.toString('base64')
      setConvertedBase64(base64)

      // 转可读时间
      const dateTime = new Date(timestampNum * 1000)
      const formattedDateTime = dateTime.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setConvertedTimestamp(formattedDateTime)
    } catch (error) {
      setConvertedBase64('转换失败')
      setConvertedTimestamp('无效的输入')
    }
  }

  // 当前时间戳
  const handleNow = () => {
    const now = new Date()
    const timestamp = Math.floor(now.getTime() / 1000)
    const buffer = Buffer.from(timestamp.toString())
    const base64 = buffer.toString('base64')
    
    setTimestamp(timestamp.toString())
    setBase64Timestamp(base64)
    setConvertedTimestamp(now.toLocaleString('zh-CN'))
    setConvertedBase64(base64)
  }

  // 复制到剪贴板
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // 清除输入
  const handleClear = () => {
    setTimestamp('')
    setBase64Timestamp('')
    setConvertedTimestamp('')
    setConvertedBase64('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🕰️ Base64 时间戳转换
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Unix 时间戳与 Base64 格式的相互转换
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                刷新
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              快速操作
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleNow}
                className="btn-primary flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                当前时间戳
              </button>
              <button
                onClick={handleClear}
                className="btn-secondary flex items-center gap-2"
              >
                清除
              </button>
            </div>
          </div>

          {/* Unix Timestamp to Base64 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">⏱️</div>
              <h2 className="text-xl font-semibold text-gray-900">
                Unix 时间戳 → Base64
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unix 时间戳
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="例如：1672531200"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUnixTimestamp}
                    className="btn-primary"
                  >
                    转换
                  </button>
                </div>
              </div>

              {convertedBase64 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Base64 时间戳：
                      </span>
                      <pre className="mt-2 text-sm text-gray-900">
                        {convertedBase64}
                      </pre>
                    </div>
                    <button
                      onClick={() => handleCopy(convertedBase64)}
                      className="btn-secondary flex items-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? '已复制' : '复制'}
                    </button>
                  </div>
                </div>
              )}

              {convertedTimestamp && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      可读时间：
                    </span>
                  </div>
                  <p className="text-base text-gray-900 mt-1">
                    {convertedTimestamp}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Base64 to Unix Timestamp */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">🔄</div>
              <h2 className="text-xl font-semibold text-gray-900">
                Base64 → Unix 时间戳
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base64 时间戳
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="例如：MTY3NTkxMTIwMA=="
                    value={base64Timestamp}
                    onChange={(e) => setBase64Timestamp(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleBase64Timestamp}
                    className="btn-primary"
                  >
                    转换
                  </button>
                </div>
              </div>

              {convertedTimestamp && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Unix 时间戳：
                      </span>
                      <pre className="mt-2 text-sm text-gray-900">
                        {convertedTimestamp}
                      </pre>
                    </div>
                    <button
                      onClick={() => handleCopy(convertedTimestamp)}
                      className="btn-secondary flex items-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? '已复制' : '复制'}
                    </button>
                  </div>
                </div>
              )}

              {convertedBase64 && typeof convertedBase64 === 'string' && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      可读时间：
                    </span>
                  </div>
                  <p className="text-base text-gray-900 mt-1">
                    {convertedBase64}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Usage Guide */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 使用说明
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unix 时间戳说明
                </h3>
                <p className="text-base text-gray-600">
                  Unix 时间戳是从 1970 年 1 月 1 日 00:00:00 UTC 到现在的总秒数。
                  <br />
                  当前时间戳：{Math.floor(Date.now() / 1000)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Base64 编码说明
                </h3>
                <p className="text-base text-gray-600">
                  Base64 是一种用 64 个字符表示任意二进制数据的方法。
                  <br />
                  通常用于在文本协议中传输二进制数据。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  应用场景
                </h3>
                <p className="text-base text-gray-600">
                  • API 请求时间戳<br />
                  • 数据库时间存储<br />
                  • 日志时间戳标记<br />
                  • 跨系统时间同步
                </p>
              </div>
            </div>
          </div>

          {/* Current Time Display */}
          <div className="card p-6 bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  当前时间
                </h2>
                <p className="text-sm text-blue-50 mb-2">
                  Unix 时间戳
                </p>
                <p className="text-4xl font-mono text-white mb-2">
                  {Math.floor(Date.now() / 1000)}
                </p>
                <p className="text-sm text-blue-50">
                  {new Date().toLocaleString('zh-CN')}
                </p>
              </div>
              <div className="text-6xl">🕰️</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
