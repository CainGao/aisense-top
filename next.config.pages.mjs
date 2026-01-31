/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 如果使用自定义域名，需要配置 basePath
  // basePath: '/aisense-top',
  // GitHub Pages 默认从 gh-pages 分支构建
  // 所以我们需要修改 package.json 的 scripts
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
