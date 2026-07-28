import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/guide')
const rules = {
  '03-me-pathway.md': {
    minChars: 1500,
    markers: ['me-3-5-1', 'ME SURFFILE', 'ME PROFFILE', 'Monin-Obukhov'],
  },
  '03-me-stations-profile.md': {
    minChars: 1100,
    markers: ['me-3-5-2', 'me-3-5-3', 'ME SURFDATA', 'ME UAIRDATA', 'ME PROFBASE'],
  },
  '03-me-period.md': {
    minChars: 1500,
    markers: ['me-3-5-4', 'ME STARTEND', 'ME DAYRANGE', 'Strthr', 'Endhr'],
  },
  '03-me-wind-scim.md': {
    minChars: 1800,
    markers: ['me-3-5-5', 'me-3-5-6', 'me-3-5-7', 'ME WDROTATE', 'ME WINDCATS', 'ME SCIMBYHR'],
  },
  '03-me-years-turbulence.md': {
    minChars: 1400,
    markers: ['me-3-5-8', 'me-3-5-9', 'ME NUMYEARS', 'NOTURB', 'NOSWCO', 'ERRORFIL'],
  },
}

const errors = []
let total = 0
let combined = ''

for (const [name, rule] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少 ME 路径页面：${name}`)
    continue
  }
  const text = readFileSync(path, 'utf8')
  total += text.length
  combined += `\n${text}`
  if (text.length < rule.minChars) {
    errors.push(`ME 页面内容量异常：${name}（${text.length} 字符）`)
  }
  for (const marker of rule.markers) {
    if (!text.includes(marker)) errors.push(`ME 页面缺少标记：${name} -> ${marker}`)
  }
}

for (let i = 1; i <= 9; i += 1) {
  const anchor = `id="me-3-5-${i}"`
  const count = combined.split(anchor).length - 1
  if (count !== 1) errors.push(`ME 三级目录锚点数量异常：${anchor}（${count}）`)
}

if (total < 8000) errors.push(`ME 路径完整译文总量异常：${total} 字符`)

if (errors.length) {
  console.error('\nME 路径完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`ME 路径完整性检查通过：5 个页面，${total.toLocaleString('zh-CN')} 字符，9 个三级目录锚点。`)
