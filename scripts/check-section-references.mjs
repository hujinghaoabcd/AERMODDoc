import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const docsRoot = resolve('docs')
const errors = []

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = resolve(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function stripCode(text) {
  return text
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '')
}

if (!existsSync(docsRoot)) {
  console.error('缺少 docs 目录。')
  process.exit(1)
}

const files = walk(docsRoot).filter((path) => path.endsWith('.md'))
const sections = new Map()
const references = []

for (const file of files) {
  const raw = readFileSync(file, 'utf8')
  const text = stripCode(raw)
  const rel = relative(docsRoot, file).replaceAll('\\', '/')

  for (const match of text.matchAll(/^#{1,6}\s+([1-4](?:\.\d+){1,3})(?=[\s　]|$)/gm)) {
    const number = match[1]
    if (!sections.has(number)) sections.set(number, [])
    sections.get(number).push(rel)
  }

  const lines = text.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    for (const match of lines[index].matchAll(/第\s*([1-4](?:\.\d+){1,3})\s*节/g)) {
      references.push({ number: match[1], file: rel, line: index + 1 })
    }
  }
}

for (const ref of references) {
  if (!sections.has(ref.number)) {
    errors.push(`无对应标题的章节引用：${ref.file}:${ref.line} -> 第 ${ref.number} 节`)
  }
}

const chapter3Expected = [
  ...Array.from({ length: 19 }, (_, index) => `3.2.${index + 1}`),
  ...Array.from({ length: 18 }, (_, index) => `3.3.${index + 1}`),
  '3.4.0', '3.4.1', '3.4.2', '3.4.3', '3.4.4',
  ...Array.from({ length: 9 }, (_, index) => `3.5.${index + 1}`),
  '3.6.0', '3.6.1', '3.6.2', '3.6.3',
  '3.7.1', '3.7.2',
  ...Array.from({ length: 10 }, (_, index) => `3.7.2.${index + 1}`),
  '3.7.3', '3.7.4',
]

for (const number of chapter3Expected) {
  if (!sections.has(number)) errors.push(`第3章缺少编号标题：${number}`)
}

if (errors.length) {
  console.error('\n章节交叉引用检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`章节交叉引用检查通过：${sections.size}个编号标题、${references.length}处“第…节”引用。`)
