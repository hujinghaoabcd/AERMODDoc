import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { searchPlugin } from '@vuepress/plugin-search'

const guideSidebar = [
  { text: '阅读说明', link: '/guide/' },
  { text: '前置部分', link: '/guide/00-preface.html' },
  { text: '第 1 章　引言', link: '/guide/01-introduction.html' },
  {
    text: '第 2 章　入门——简明教程',
    collapsible: true,
    children: [
      { text: '本章导读', link: '/guide/02-getting-started.html' },
      { text: '2.1　输入与输出文件控制', link: '/guide/02-1-files.html' },
      {
        text: '2.2　关键字/参数方式说明',
        link: '/guide/02-2-keywords-defaults.html#_2-2-关键字-参数方式说明',
      },
      {
        text: '2.3　法规默认模拟选项',
        link: '/guide/02-2-keywords-defaults.html#_2-3-法规默认模拟选项',
      },
      {
        text: '2.4　建立一个简单控制文件',
        collapsible: true,
        children: [
          {
            text: '2.4.1　简单工业污染源应用',
            link: '/guide/02-4-control-source.html#_2-4-1-简单工业污染源应用',
          },
          {
            text: '2.4.2　选择模拟选项——CO 路径',
            link: '/guide/02-4-control-source.html#_2-4-2-选择模拟选项-co-路径',
          },
          {
            text: '2.4.3　指定污染源输入——SO 路径',
            link: '/guide/02-4-control-source.html#_2-4-3-指定污染源输入-so-路径',
          },
          {
            text: '2.4.4　指定受体网络——RE 路径',
            link: '/guide/02-4-receptor-met-output.html#_2-4-4-指定受体网络-re-路径',
          },
          {
            text: '2.4.5　指定气象输入——ME 路径',
            link: '/guide/02-4-receptor-met-output.html#_2-4-5-指定气象输入-me-路径',
          },
          {
            text: '2.4.6　选择输出选项——OU 路径',
            link: '/guide/02-4-receptor-met-output.html#_2-4-6-选择输出选项-ou-路径',
          },
          {
            text: '2.4.7　错误消息与调试',
            link: '/guide/02-4-debug.html',
          },
          {
            text: '2.4.8　运行模型并检查结果',
            link: '/guide/02-4-results.html',
          },
        ],
      },
      { text: '2.5　修改已有控制文件', link: '/guide/02-5-modify.html' },
    ],
  },
  {
    text: '第 3 章　详细关键字参考',
    collapsible: true,
    children: [
      { text: '关键字索引', link: '/guide/03-keyword-index.html' },
      {
        text: 'CO 控制路径',
        collapsible: true,
        children: [
          '/guide/03-co-pathway.html',
          '/guide/03-co-dispersion.html',
          '/guide/03-co-lowwind-downwash.html',
          '/guide/03-co-no2.html',
          '/guide/03-co-averaging-urban.html',
          '/guide/03-co-run-debug.html',
        ],
      },
      {
        text: 'SO 污染源路径',
        collapsible: true,
        children: [
          '/guide/03-so-pathway.html',
          '/guide/03-so-location.html',
          '/guide/03-so-emissions.html',
          '/guide/03-so-deposition-no2.html',
          '/guide/03-so-background-downwash.html',
          '/guide/03-so-variable-emissions.html',
          '/guide/03-so-groups-special.html',
        ],
      },
      '/guide/03-re-pathway.html',
      '/guide/03-me-pathway.html',
      '/guide/03-ev-pathway.html',
      '/guide/03-ou-pathway.html',
    ],
  },
  { text: '第 4 章　参考文献', link: '/guide/04-references.html' },
]

const appendixSidebar = [
  { text: '附录导读', link: '/appendices/' },
  { text: '附录 A　关键字/参数参考', link: '/appendices/appendix-a.html' },
  { text: '附录 B　错误消息代码', link: '/appendices/appendix-b.html' },
  { text: '附录 C　文件格式', link: '/appendices/appendix-c.html' },
  { text: '附录 D　23132 版本修订', link: '/appendices/appendix-d.html' },
  { text: '附录 E　术语表', link: '/appendices/appendix-e.html' },
]

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
    logo: '/AERMODDoc/images/aermod2.svg',
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
        { text: '第二阶段覆盖报告', link: '/about/phase2-coverage.html' },
      ],
    },
  }),
})
