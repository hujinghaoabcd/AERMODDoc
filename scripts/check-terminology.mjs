import { readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const docsRoot = resolve('docs')
const errors = []

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = resolve(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function proseOnly(text) {
  return text
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '')
}

const forbidden = new Map([
  ['控制输入文件', '输入控制文件'],
  ['接收点', '受体'],
  ['气象剖面文件', '气象廓线文件'],
  ['气象轮廓', '气象廓线'],
  ['建筑物下沉', '建筑物下洗'],
  ['运行流输入文件', '输入控制文件'],
])

const requiredTerms = new Map([
  ['输入控制文件', 20],
  ['污染源组', 20],
  ['受体', 100],
  ['气象廓线', 3],
  ['建筑物下洗', 10],
])

const combined = []
for (const file of walk(docsRoot).filter((path) => path.endsWith('.md'))) {
  const rel = relative(docsRoot, file).replaceAll('\\', '/')
  const lines = proseOnly(readFileSync(file, 'utf8')).split('\n')
  combined.push(lines.join('\n'))

  for (let index = 0; index < lines.length; index += 1) {
    for (const [bad, preferred] of forbidden) {
      if (lines[index].includes(bad)) {
        errors.push(`术语不统一：${rel}:${index + 1} -> “${bad}”，建议使用“${preferred}”`)
      }
    }
  }
}

const allText = combined.join('\n')
for (const [term, minimum] of requiredTerms) {
  const count = allText.split(term).length - 1
  if (count < minimum) errors.push(`核心术语覆盖异常：“${term}”仅${count}处，最低${minimum}处`)
}

if (errors.length) {
  console.error('\n中文术语一致性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('中文术语一致性检查通过：输入控制文件、污染源组、受体、气象廓线和建筑物下洗。')
