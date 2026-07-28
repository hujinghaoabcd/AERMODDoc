import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const errors = []
const docsRoot = resolve('docs')

function read(rel) {
  const path = resolve(docsRoot, rel)
  if (!existsSync(path)) {
    errors.push(`缺少页面：${rel}`)
    return ''
  }
  return readFileSync(path, 'utf8')
}

function requireMarkers(label, text, markers) {
  for (const marker of markers) {
    if (!text.includes(marker)) errors.push(`${label}缺少标记：${marker}`)
  }
}

const preface = read('guide/00-preface.md')
const chapter1 = read('guide/01-introduction.md')
const sidebar = read('.vuepress/guide-sidebar.js')
const home = read('README.md')
const guideHome = read('guide/README.md')
const about = read('about/README.md')
const report = read('about/phase2-coverage.md')

// 按完整中文源译稿实际长度设置安全下限，防止页面退化为摘要。
if (preface.length < 1400) errors.push(`前置部分内容量异常：${preface.length}字符，最低1400`)
if (chapter1.length < 4500) errors.push(`第1章内容量异常：${chapter1.length}字符，最低4500`)

requireMarkers('前置部分', preface, [
  'EPA-454/B-23-008',
  '2023 年 10 月',
  '## 声明',
  'Microsoft Windows 是 Microsoft Corporation 的注册商标',
  '## 前言',
  'Support Center for Regulatory Atmospheric Modeling',
  '## 目录概览',
  '## 图目录概览',
  '图 2-1',
  '图 2-8',
  '图 3-1',
  '图 3-4',
  '图 B-1',
  '## 表目录概览',
  '表 A-1—A-12',
])

const chapter1Headings = [
  '# 1.0 引言',
  '## 1.1 如何使用 AERMOD 手册',
  '### 1.1.1 初学者',
  '### 1.1.2 有经验的模拟人员',
  '### 1.1.3 管理人员和决策者',
  '## 1.2 AERMOD 模型概述',
  ...Array.from({ length: 9 }, (_, index) => `### 1.2.${index + 1}`),
]

for (const heading of chapter1Headings) {
  if (!chapter1.includes(heading)) errors.push(`第1章缺少标题：${heading}`)
}

requireMarkers('第1章', chapter1, [
  '40 CFR 第 51 部分附录 W',
  'AERMET',
  'AERMAP',
  'AERSCREEN',
  'Buoyant Line and Point Source',
  '防止空气质量显著恶化（PSD）',
  '美国国家环境空气质量标准（NAAQS）',
  '`EVENT` 处理器',
  '24 小时 PM₂.₅ 标准',
  '1 小时 NO₂ 标准',
  '1 小时 SO₂ 标准',
])

for (const marker of [
  '第 1 章　引言',
  '1.1.1　初学者',
  '1.1.2　有经验的模拟人员',
  '1.1.3　管理人员和决策者',
  ...Array.from({ length: 9 }, (_, index) => `1.2.${index + 1}　`),
]) {
  if (!sidebar.includes(marker)) errors.push(`第1章侧栏缺少目录项：${marker}`)
}

requireMarkers('首页', home, [
  '完整中文在线版',
  '/guide/02-getting-started.html',
  '/guide/03-keyword-index.html',
  '/appendices/',
  '自动质量审计',
])

requireMarkers('指南导读页', guideHome, [
  '| 前置部分 | 完整 |',
  '| 第 3 章 | 完整 |',
  '| 附录 A—E | 完整 |',
  '### 初次使用 AERMOD',
  '### 编写或核对控制文件',
  '### 排查模型错误',
])

requireMarkers('关于页', about, [
  '前置部分、第 1—4 章和附录 A—E 已全部进入网站',
  '持续维护阶段',
  '自动质量控制',
])

requireMarkers('完成报告', report, [
  '# 文档完成与质量报告',
  '| 第 2 章　入门教程 | 已完成 |',
  '| 第 3 章　关键字参考 | 已完成 |',
  '| 附录 E | 已完成 |',
  '## 自动检查体系',
  '## 当前维护重点',
])

for (const [label, text] of [
  ['指南导读页', guideHome],
  ['关于页', about],
  ['完成报告', report],
]) {
  for (const obsolete of [
    '完整逐页译文仍在分批导入',
    '已有系统化参考页，继续补充',
    '当前网站整体仍不等同于',
    '尚未完成',
  ]) {
    if (text.includes(obsolete)) errors.push(`${label}仍包含过期状态：${obsolete}`)
  }
}

if (errors.length) {
  console.error('\n前置部分、第1章与项目状态检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('前置部分、第1章和项目状态检查通过：正文完整、目录齐全、状态页已更新。')
