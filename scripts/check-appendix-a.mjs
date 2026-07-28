import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/appendices')
const sidebarPath = resolve('docs/.vuepress/appendix-sidebar.js')
const errors = []

const rules = {
  'appendix-a.md': {
    minChars: 1200,
    markers: [
      '12张参考表',
      '../guide/03-keyword-index.md',
      '../guide/03-co-pathway.md',
      '../guide/03-so-pathway.md',
      '../guide/03-re-pathway.md',
      '../guide/03-me-pathway.md',
      '../guide/03-ev-pathway.md',
      '../guide/03-ou-pathway.md',
    ],
  },
  'appendix-a-01-usage.md': {
    minChars: 400,
    markers: ['`CO`', '`SO`', '`RE`', '`ME`', '`EV`', '`OU`', '`M`', '`O`', '`N`', '`R`'],
  },
  'appendix-a-02-co.md': {
    minChars: 6200,
    minTokens: 85,
    markers: ['id="table-a-1"', 'id="table-a-2"', 'CO MODELOPT', 'CO DEBUGOPT'],
  },
  'appendix-a-03-so.md': {
    minChars: 4700,
    minTokens: 65,
    markers: ['id="table-a-3"', 'id="table-a-4"', 'SO SRCPARAM', 'SO PLATFORM'],
  },
  'appendix-a-04-re.md': {
    minChars: 1700,
    minTokens: 18,
    markers: ['id="table-a-5"', 'id="table-a-6"', 'RE GRIDCART', 'RE EVALCART'],
  },
  'appendix-a-05-me.md': {
    minChars: 1800,
    minTokens: 22,
    markers: ['id="table-a-7"', 'id="table-a-8"', 'ME SURFFILE', 'ME WINDCATS'],
  },
  'appendix-a-06-ev.md': {
    minChars: 700,
    minTokens: 7,
    markers: ['id="table-a-9"', 'id="table-a-10"', 'EV EVENTPER', 'EV INCLUDED'],
  },
  'appendix-a-07-ou.md': {
    minChars: 2400,
    minTokens: 28,
    markers: ['id="table-a-11"', 'id="table-a-12"', 'OU MAXDCONT', 'OU EVENTOUT'],
  },
  'appendix-a-08-finish.md': {
    minChars: 220,
    markers: ['CO STARTING', 'OU FINISHED'],
  },
}

let combined = ''
const allTokens = new Set()

for (const [name, rule] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少附录A页面：${name}`)
    continue
  }

  const text = readFileSync(path, 'utf8')
  combined += `\n${text}`
  if (text.length < rule.minChars) errors.push(`附录A页面内容量异常：${name}（${text.length}字符）`)

  for (const marker of rule.markers) {
    if (!text.includes(marker)) errors.push(`附录A页面缺少标记：${name} -> ${marker}`)
  }

  const tokens = new Set([...text.matchAll(/`([A-Z][A-Z0-9_]{1,})`/g)].map((match) => match[1]))
  for (const token of tokens) allTokens.add(token)
  if (rule.minTokens && tokens.size < rule.minTokens) {
    errors.push(`附录A关键字/选项覆盖不足：${name}（${tokens.size}，最低${rule.minTokens}）`)
  }
}

for (let i = 1; i <= 12; i += 1) {
  const anchor = `id="table-a-${i}"`
  const count = combined.split(anchor).length - 1
  if (count !== 1) errors.push(`附录A表格锚点数量异常：table-a-${i}（${count}）`)
}

if (allTokens.size < 200) errors.push(`附录A保留英文的关键字/选项覆盖不足：${allTokens.size}，最低200`)

if (!existsSync(sidebarPath)) {
  errors.push('缺少附录侧栏配置')
} else {
  const sidebar = readFileSync(sidebarPath, 'utf8')
  for (let i = 1; i <= 12; i += 1) {
    if (!sidebar.includes(`#table-a-${i}`)) errors.push(`附录A侧栏缺少表格链接：table-a-${i}`)
  }
  for (const page of [
    'appendix-a-01-usage.html', 'appendix-a-02-co.html', 'appendix-a-03-so.html',
    'appendix-a-04-re.html', 'appendix-a-05-me.html', 'appendix-a-06-ev.html',
    'appendix-a-07-ou.html', 'appendix-a-08-finish.html',
  ]) {
    if (!sidebar.includes(page)) errors.push(`附录A侧栏缺少页面链接：${page}`)
  }
}

if (errors.length) {
  console.error('\n附录A完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`附录A完整性检查通过：9个页面、12张表、${allTokens.size}个关键字/选项标记。`)
