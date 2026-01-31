import type { Config } from 'next'

const config: Config = {
  contentDir: './content',
  output: 'export',
  siteUrl: 'https://aisense.top',
  title: 'AISENSE AI资讯平台',
  description: 'AI资讯、工具分享、开发者社区',
  defaultLocale: 'zh-CN',
  images: {
    remotePatterns: [
      'https://images.unsplash.com',
      'https://*.githubusercontent.com',
    ],
    domains: ['aisense.top'],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: { width: 1280, initialScale: 1 },
      title: {
        default: 'AISENSE AI资讯平台',
        template: '%s | AISENSE'
      },
      metadata: [
        { name: 'keywords', content: 'AI资讯,AI工具,开发者工具,Agent开发,Next.js,shadcn/ui,LangChain,Claude,GPT' },
        { name: 'description', content: 'AISENSE是AI开发者社区，提供最新的AI资讯、工具推荐和技术博客。' },
        { name: 'author', content: 'Velen' },
        { name: 'robots', content: 'index,follow' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AISENSE AI资讯平台' },
        { name: 'twitter:description', content: 'AI资讯、工具分享、开发者社区' },
        { property: 'og:title', content: 'AISENSE AI资讯平台' },
        { property: 'og:description', content: 'AISENSE是AI开发者社区，提供最新的AI资讯、工具推荐和技术博客。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:site_name', content: 'AISENSE' },
      ],
      links: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },
}

export default config
