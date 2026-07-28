import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/guide')
const rules = {
  '03-ou-pathway.md': {
    minChars: 3000,
    markers: ['ou-3-7-1', 'OU RECTABLE', 'OU MAXTABLE', 'OU DAYTABLE', 'ALLAVE'],
  },
  '03-ou-max-post.md': {
    minChars: 3200,
    markers: ['ou-3-7-2', 'ou-3-7-2-1', 'ou-3-7-2-2', 'OU MAXIFILE', 'OU POSTFILE', 'YYMMDDHH'],
  },
  '03-ou-plot-toxx.md': {
    minChars: 2600,
    markers: ['ou-3-7-2-3', 'ou-3-7-2-4', 'OU PLOTFILE', 'OU TOXXFILE', 'NPAIR'],
  },
  '03-ou-rank-eval-season.md': {
    minChars: 1800,
    markers: ['ou-3-7-2-5', 'ou-3-7-2-6', 'ou-3-7-2-7', 'OU RANKFILE', 'OU EVALFILE', 'OU SEASONHR', 'RE EVALCART'],
  },
  '03-ou-naaqs.md': {
    minChars: 2500,
    markers: ['ou-3-7-2-8', 'ou-3-7-2-9', 'ou-3-7-2-10', 'OU MAXDCONT', 'OU MAXDAILY', 'OU MXDYBYYR', 'THRESH'],
  },
  '03-ou-event-misc.md': {
    minChars: 1700,
    markers: ['ou-3-7-3', 'ou-3-7-4', 'OU EVENTOUT', 'OU SUMMFILE', 'OU FILEFORM', 'OU NOHEADER'],
  },
}

const errors = []
let total = 0
let combined = ''
for (const [name, rule] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少 OU 路径页面：${name}`)
    continue
  }
  const text = readFileSync(path, 'utf8')
  total += text.length
  combined += `\n${text}`
  if (text.length < rule.minChars) errors.push(`OU 页面内容量异常：${name}（${text.length} 字符）`)
  for (const marker of rule.markers) {
    if (!text.includes(marker)) errors.push(`OU 页面缺少标记：${name} -> ${marker}`)
  }
}

const anchors = [
  'ou-3-7-1', 'ou-3-7-2',
  ...Array.from({ length: 10 }, (_, i) => `ou-3-7-2-${i + 1}`),
  'ou-3-7-3', 'ou-3-7-4',
]
for (const name of anchors) {
  const anchor = `id="${name}"`
  const count = combined.split(anchor).length - 1
  if (count !== 1) errors.push(`OU 目录锚点数量异常：${anchor}（${count}）`)
}

if (total < 15500) errors.push(`OU 路径完整译文总量异常：${total} 字符`)

if (errors.length) {
  console.error('\nOU 路径完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`OU 路径完整性检查通过：6 个页面，${total.toLocaleString('zh-CN')} 字符，14 个目录锚点。`)
