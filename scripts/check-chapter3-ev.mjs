import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/guide')
const rules = {
  '03-ev-pathway.md': {
    minChars: 1900,
    markers: ['ev-3-6-0', 'EV EVENTPER', 'EV EVENTLOC', 'YYMMDDHH', 'RNG='],
  },
  '03-ev-generated.md': {
    minChars: 1500,
    markers: ['ev-3-6-1', 'CO EVENTFIL', 'OU RECTABLE', 'OU MAXIFILE', 'H1H01001', 'TH240019'],
  },
  '03-ev-discrete-included.md': {
    minChars: 1600,
    markers: ['ev-3-6-2', 'ev-3-6-3', 'CO AVERTIME', 'SO SRCGROUP', 'EV INCLUDED', '起始列'],
  },
}

const errors = []
let total = 0
let combined = ''

for (const [name, rule] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少 EV 路径页面：${name}`)
    continue
  }
  const text = readFileSync(path, 'utf8')
  total += text.length
  combined += `\n${text}`
  if (text.length < rule.minChars) errors.push(`EV 页面内容量异常：${name}（${text.length} 字符）`)
  for (const marker of rule.markers) {
    if (!text.includes(marker)) errors.push(`EV 页面缺少标记：${name} -> ${marker}`)
  }
}

for (let i = 0; i <= 3; i += 1) {
  const anchor = `id="ev-3-6-${i}"`
  const count = combined.split(anchor).length - 1
  if (count !== 1) errors.push(`EV 三级目录锚点数量异常：${anchor}（${count}）`)
}

if (total < 6000) errors.push(`EV 路径完整译文总量异常：${total} 字符`)

if (errors.length) {
  console.error('\nEV 路径完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`EV 路径完整性检查通过：3 个页面，${total.toLocaleString('zh-CN')} 字符，4 个三级目录锚点。`)
