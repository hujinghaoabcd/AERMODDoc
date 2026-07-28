import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const pagePath = resolve('docs/appendices/appendix-b.md')
const sidebarPath = resolve('docs/.vuepress/appendix-sidebar.js')
const errors = []

if (!existsSync(pagePath)) {
  errors.push('缺少附录B页面：docs/appendices/appendix-b.md')
} else {
  const text = readFileSync(pagePath, 'utf8')
  if (text.length < 3600) errors.push(`附录B内容量异常：${text.length}字符`)

  for (const marker of [
    '## B.1 引言',
    '## B.2 输出消息汇总',
    '## B.3 消息布局说明',
    '## B.3.1 消息的统一结构',
    '## B.3.2 消息字段与列位置',
    '## B.3.3 INCLUDED 外部文件中的行号',
    'SETUP Finishes Successfully.',
    'CO E1008 EXPATH: Invalid Pathway Specified.',
    'PW Txxx LLLL mmmmmm: MESSAGE Hints',
    '| `PW` | 1–2 |',
    '| `T` | 4 |',
    '| `xxx` | 5–7 |',
    '| `LLLL` | 9–12 |',
    '| `mmmmmm` | 14–19 |',
    '| `MESSAGE` | 22–71 |',
    '| `Hints` | 73–80 |',
    '外部引入文件中的行号',
  ]) {
    if (!text.includes(marker)) errors.push(`附录B缺少关键内容：${marker}`)
  }

  for (const type of ['`E` | 错误', '`W` | 警告', '`I` | 信息']) {
    if (!text.includes(type)) errors.push(`附录B缺少消息类型：${type}`)
  }

  const codeBlocks = (text.match(/^```/gm) || []).length
  if (codeBlocks < 14 || codeBlocks % 2 !== 0) {
    errors.push(`附录B代码块围栏异常：${codeBlocks}`)
  }
}

if (!existsSync(sidebarPath)) {
  errors.push('缺少附录侧栏配置')
} else {
  const sidebar = readFileSync(sidebarPath, 'utf8')
  for (const link of [
    '#b-1-引言',
    '#b-2-输出消息汇总',
    '#b-3-消息布局说明',
    '#b-3-1-消息的统一结构',
    '#b-3-2-消息字段与列位置',
    '#b-3-3-included-外部文件中的行号',
  ]) {
    if (!sidebar.includes(link)) errors.push(`附录B侧栏缺少链接：${link}`)
  }
}

if (errors.length) {
  console.error('\n附录B完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('附录B完整性检查通过：B.1—B.3.3内容、消息字段及三级侧栏完整。')
