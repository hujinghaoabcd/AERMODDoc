import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/guide')
const rules = {
  "03-so-pathway.md": {
    "minChars": 4838,
    "markers": [
      "so-3-3-1",
      "SO LOCATION"
    ]
  },
  "03-so-location.md": {
    "minChars": 12525,
    "markers": [
      "so-3-3-2",
      "SO SRCPARAM",
      "AREAVERT",
      "RLINE",
      "RLINEXT",
      "SWPOINT"
    ]
  },
  "03-so-emissions.md": {
    "minChars": 4212,
    "markers": [
      "so-3-3-3",
      "so-3-3-5",
      "SO GASDEPOS",
      "SO PARTDIAM",
      "SO METHOD_2",
      "SO CONCUNIT",
      "SO DEPOUNIT"
    ]
  },
  "03-so-deposition-no2.md": {
    "minChars": 4728,
    "markers": [
      "so-3-3-6",
      "so-3-3-7",
      "SO NO2RATIO",
      "SO OLMGROUP",
      "SO PSDGROUP"
    ]
  },
  "03-so-background-downwash.md": {
    "minChars": 6970,
    "markers": [
      "so-3-3-8",
      "so-3-3-9",
      "SO BACKGRND",
      "SO BUILDHGT",
      "SO XBADJ"
    ]
  },
  "03-so-variable-emissions.md": {
    "minChars": 6456,
    "markers": [
      "so-3-3-10",
      "so-3-3-13",
      "SO URBANSRC",
      "SO EMISFACT",
      "SO HOUREMIS",
      "SO EMISUNIT",
      "SO RLEMCONV"
    ]
  },
  "03-so-groups-special.md": {
    "minChars": 4010,
    "markers": [
      "so-3-3-14",
      "so-3-3-18",
      "SO INCLUDED",
      "SO SRCGROUP",
      "SO PLATFORM",
      "SO HBPSRCID",
      "SO ARCFTSRC"
    ]
  }
}
const errors = []
let total = 0
let combined = ''
for (const [name, rule] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) { errors.push(`缺少 SO 路径页面：${name}`); continue }
  const text = readFileSync(path, 'utf8')
  total += text.length
  combined += `\n${text}`
  if (text.length < rule.minChars) errors.push(`SO 页面内容量异常：${name}（${text.length} 字符）`)
  for (const marker of rule.markers) if (!text.includes(marker)) errors.push(`SO 页面缺少标记：${name} -> ${marker}`)
}
for (let i=1; i<=18; i+=1) {
  const anchor=`id="so-3-3-${i}"`
  const count=combined.split(anchor).length-1
  if (count !== 1) errors.push(`SO 三级目录锚点数量异常：${anchor}（${count}）`)
}
if (total < 44000) errors.push(`SO 路径完整译文总量异常：${total} 字符`)
if (errors.length) {
  console.error('\nSO 路径完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log(`SO 路径完整性检查通过：7 个页面，${total.toLocaleString('zh-CN')} 字符，18 个三级目录锚点。`)
