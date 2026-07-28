import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const refPath = resolve('docs/guide/04-references.md')
const sidebarPath = resolve('docs/.vuepress/guide-sidebar.js')
const errors = []

if (!existsSync(refPath)) {
  errors.push('缺少第4章参考文献页面：docs/guide/04-references.md')
} else {
  const text = readFileSync(refPath, 'utf8')
  if (text.length < 7500) errors.push(`第4章参考文献内容量异常：${text.length} 字符`)

  const numbers = [...text.matchAll(/^(\d+)\.\s+\*\*/gm)].map((match) => Number(match[1]))
  if (numbers.length !== 48) {
    errors.push(`第4章参考文献条目数量异常：${numbers.length}，应为 48`)
  } else {
    for (let i = 0; i < 48; i += 1) {
      if (numbers[i] !== i + 1) {
        errors.push(`第4章参考文献编号异常：第 ${i + 1} 个条目编号为 ${numbers[i]}`)
        break
      }
    }
  }

  const anchors = [
    'ref-4-1', 'ref-4-1-1', 'ref-4-1-2', 'ref-4-1-3',
    'ref-4-2', 'ref-4-2-1', 'ref-4-2-2',
    'ref-4-3', 'ref-4-3-1', 'ref-4-3-2', 'ref-4-3-3',
  ]
  for (const anchor of anchors) {
    const marker = `id="${anchor}"`
    const count = text.split(marker).length - 1
    if (count !== 1) errors.push(`第4章目录锚点数量异常：${anchor}（${count}）`)
  }

  for (const marker of [
    'EPA, 2023d.',
    'Pandey, G., Venkatram, A. and Arunachalam, S., 2023.',
    'Warren, C. J., Paine, R. J.',
    'Yang, B., Gu, J. and Zhang, K. M., 2020.',
    '10.1080/10962247.2022.2094031',
  ]) {
    if (!text.includes(marker)) errors.push(`第4章参考文献缺少关键标记：${marker}`)
  }
}

if (!existsSync(sidebarPath)) {
  errors.push('缺少用户指南侧栏配置')
} else {
  const sidebar = readFileSync(sidebarPath, 'utf8')
  for (const anchor of [
    '#ref-4-1', '#ref-4-1-1', '#ref-4-1-2', '#ref-4-1-3',
    '#ref-4-2', '#ref-4-2-1', '#ref-4-2-2',
    '#ref-4-3', '#ref-4-3-1', '#ref-4-3-2', '#ref-4-3-3',
  ]) {
    if (!sidebar.includes(anchor)) errors.push(`第4章侧栏缺少链接：${anchor}`)
  }
}

if (errors.length) {
  console.error('\n第4章参考文献完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('第4章参考文献完整性检查通过：48 条文献，11 个稳定目录锚点。')
