import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize, resolve } from 'node:path'

const root = resolve('docs')
const required = [
  'guide/03-keyword-index.md', 'guide/03-co-pathway.md', 'guide/03-co-dispersion.md',
  'guide/03-co-lowwind-downwash.md', 'guide/03-co-no2.md',
  'guide/03-co-averaging-urban.md', 'guide/03-co-run-debug.md',
  'guide/03-so-pathway.md', 'guide/03-so-location.md',
  'guide/03-so-emissions.md', 'guide/03-so-deposition-no2.md',
  'guide/03-so-background-downwash.md', 'guide/03-so-variable-emissions.md',
  'guide/03-so-groups-special.md', 'guide/03-re-pathway.md',
  'guide/03-me-pathway.md', 'guide/03-ev-pathway.md',
  'guide/03-ou-pathway.md', 'appendices/appendix-a.md',
  'appendices/appendix-b.md', 'appendices/appendix-c.md',
  'appendices/appendix-d.md', 'appendices/appendix-e.md',
]

// minChars 使用 JavaScript 字符串长度，而不是 UTF-8 文件字节数。
const completedImports = {
  'appendices/appendix-b.md': {
    minChars: 3600,
    markers: ['## B.1 引言', '## B.2 输出消息汇总', '## B.3 消息布局说明', 'INCLUDED 外部文件中的行号'],
  },
  'appendices/appendix-e.md': {
    minChars: 6500,
    markers: ['### AERMAP', '### Input Control File', '### Regulatory Model', '### Warning Message'],
  },
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function resolveLocalLink(sourceFile, rawTarget) {
  const target = rawTarget.trim().split('#')[0].split('?')[0]
  if (!target || /^(?:https?:|mailto:|tel:|javascript:)/i.test(target)) return null

  let candidate = target.startsWith('/')
    ? join(root, target.slice(1))
    : resolve(dirname(sourceFile), target)

  if (extname(candidate) === '.html') candidate = candidate.slice(0, -5) + '.md'
  if (!extname(candidate)) {
    const asMarkdown = `${candidate}.md`
    const asIndex = join(candidate, 'README.md')
    candidate = existsSync(asMarkdown) ? asMarkdown : asIndex
  }
  return normalize(candidate)
}

const errors = []
const warnings = []

for (const rel of required) {
  if (!existsSync(join(root, rel))) errors.push(`缺少必需文档：${rel}`)
}

for (const [rel, rule] of Object.entries(completedImports)) {
  const file = join(root, rel)
  if (!existsSync(file)) continue
  const text = readFileSync(file, 'utf8')
  if (text.length < rule.minChars) {
    errors.push(`完整译文页面内容量异常：${rel}（${text.length} 字符）`)
  }
  for (const marker of rule.markers) {
    if (!text.includes(marker)) errors.push(`完整译文页面缺少标记：${rel} -> ${marker}`)
  }
}

const markdownFiles = walk(root).filter((path) => path.endsWith('.md'))
let chars = 0
let headings = 0
let chapter3Chars = 0
let appendixChars = 0

for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8')
  chars += text.length
  headings += (text.match(/^#{1,6}\s+/gm) || []).length
  if (file.includes('/guide/03-')) chapter3Chars += text.length
  if (file.includes('/appendices/appendix-')) appendixChars += text.length

  const fences = (text.match(/^\s*```/gm) || []).length
  if (fences % 2 !== 0) warnings.push(`代码围栏数量为奇数：${file}`)

  if (/\b(?:TODO|TBD)\b|待翻译|待补充/.test(text)) {
    warnings.push(`发现可能的未完成标记：${file}`)
  }

  const links = [...text.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)]
  for (const [, target] of links) {
    const resolved = resolveLocalLink(file, target)
    if (resolved && !existsSync(resolved)) {
      warnings.push(`疑似无效本地链接：${file} -> ${target}`)
    }
  }
}

// 当前线上系统化参考版的防退化监测值；完整逐页译文导入后再升级为强制阈值。
if (chapter3Chars < 85000) warnings.push(`第 3 章内容量低于参考值：${chapter3Chars} 字符`)
if (appendixChars < 45000) warnings.push(`附录内容量低于参考值：${appendixChars} 字符`)

console.log(`Markdown 文件：${markdownFiles.length}`)
console.log(`总字符数：${chars.toLocaleString('zh-CN')}`)
console.log(`标题数：${headings.toLocaleString('zh-CN')}`)
console.log(`第 3 章字符数：${chapter3Chars.toLocaleString('zh-CN')}`)
console.log(`附录字符数：${appendixChars.toLocaleString('zh-CN')}`)

if (warnings.length) {
  console.warn('\n文档检查警告：')
  for (const warning of warnings) console.warn(`- ${warning}`)
}

if (errors.length) {
  console.error('\n文档检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('\n文档核心页面检查通过。')
