import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { searchPlugin } from '@vuepress/plugin-search'
import { guideSidebar } from './guide-sidebar.js'
import { appendixSidebar } from './appendix-sidebar.js'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'AERMOD 中文文档',
  description: 'EPA AERMOD 用户指南（EPA-454/B-23-008）中文翻译与使用参考',
  base: '/AERMODDoc/',
  bundler: viteBundler(),
  head: [
    ['meta', { name: 'theme-color', content: '#1769aa' }],
    ['meta', { name: 'keywords', content: 'AERMOD,AERMET,AERMAP,大气扩散模型,中文文档' }],
    ['link', { rel: 'icon', href: '/AERMODDoc/images/aermod2.svg' }],
  ],
  plugins: [
    nprogressPlugin(),
    copyCodePlugin(),
    searchPlugin({
      locales: {
        '/': { placeholder: '搜索文档' },
      },
    }),
  ],
  theme: defaultTheme({
    logo: '/images/aermod2.svg',
    repo: 'hujinghaoabcd/AERMODDoc',
    docsDir: 'docs',
    lastUpdated: true,
    contributors: false,
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '最后更新',
    navbar: [
      { text: '首页', link: '/' },
      { text: '用户指南', link: '/guide/' },
      { text: '附录', link: '/appendices/' },
      { text: '官方资源', link: '/resources/' },
      { text: '关于项目', link: '/about/' },
    ],
    sidebar: {
      '/guide/': guideSidebar,
      '/appendices/': appendixSidebar,
      '/resources/': [{ text: '官方资源', link: '/resources/' }],
      '/about/': [
        { text: '关于项目', link: '/about/' },
        { text: '文档完成与质量报告', link: '/about/phase2-coverage.html' },
      ],
    },
  }),
})
