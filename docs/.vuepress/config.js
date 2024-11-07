import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  base: "/",
  bundler: viteBundler(),
  plugins: [
    nprogressPlugin(),
    copyCodePlugin({}),
    searchPlugin({
      // 配置项
    }),
  ],
  theme: defaultTheme({
    home:'/',
    logo: '/images/aermod2.svg',
    repo: 'hujinghaoabcd/AERMODDoc',
    lastUpdated: 'true',
    navbar: [
      { text: '首页', link: '/' },
      { text: '用户指南', link: '/guide/' }, // 指向 guide 文件夹
      { text: '技术手册', link: '/manual/' },
      { text: '其他资源', link: '/resources/' },
      
    ],
    sidebar: {
      '/guide/': [
        { text: '背景介绍', link: '/guide/背景介绍.md' },
        { text: '1 概述', link: '/guide/概述.md' },
      ],
    },
  }),

  lang: 'zh-CN',
  title: 'AERMOD 中文文档',
  description: 'AERMOD 中文文档',
})
