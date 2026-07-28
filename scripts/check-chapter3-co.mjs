import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/guide')
const rules = {
  '03-co-pathway.md': {
    minChars: 700,
    markers: ['co-3-2-1', 'CO TITLEONE', 'CO TITLETWO'],
  },
  '03-co-dispersion.md': {
    minChars: 17000,
    markers: ['co-3-2-2', 'CO MODELOPT', 'CO GDSEASON', 'CO GDLANUSE', 'CO GASDEPDF'],
  },
  '03-co-lowwind-downwash.md': {
    minChars: 6000,
    markers: ['co-3-2-3', 'co-3-2-4', 'CO LOW_WIND', 'CO ORD_DWNW', 'CO AWMADWNW'],
  },
  '03-co-no2.md': {
    minChars: 11000,
    markers: ['co-3-2-5', 'CO OZONEFIL', 'CO NOX_FILE', 'CO NO2EQUIL', 'CO NO2STACK'],
  },
  '03-co-averaging-urban.md': {
    minChars: 5800,
    markers: ['co-3-2-6', 'co-3-2-12', 'CO AVERTIME', 'CO MULTYEAR', 'CO ARCFTOPT'],
  },
  '03-co-run-debug.md': {
    minChars: 7000,
    markers: ['co-3-2-13', 'co-3-2-19', 'CO RUNORNOT', 'CO SAVEFILE', 'CO DEBUGOPT', 'CO ERRORFIL'],
  },
}

const errors = []
let total = 0
let combined = ''

for (const [name, rule] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少 CO 路径页面：${name}`)
    continue
  }
  const text = readFileSync(path, 'utf8')
  total += text.length
  combined += `\n${text}`
  if (text.length < rule.minChars) errors.push(`CO 页面内容量异常：${name}（${text.length} 字符）`)
  for (const marker of rule.markers) {
    if (!text.includes(marker)) errors.push(`CO 页面缺少标记：${name} -> ${marker}`)
  }
}

for (let i = 1; i <= 19; i += 1) {
  const anchor = `id="co-3-2-${i}"`
  const count = combined.split(anchor).length - 1
  if (count !== 1) errors.push(`CO 三级目录锚点数量异常：${anchor}（${count}）`)
}

if (total < 46000) errors.push(`CO 路径完整译文总量异常：${total} 字符`)

if (errors.length) {
  console.error('\nCO 路径完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`CO 路径完整性检查通过：6 个页面，${total.toLocaleString('zh-CN')} 字符，19 个三级目录锚点。`)
