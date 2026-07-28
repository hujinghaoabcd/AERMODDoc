import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const glossaryPath = resolve('docs/appendices/appendix-e.md')
const sidebarPath = resolve('docs/.vuepress/appendix-sidebar.js')
const errors = []

const expectedLetters = ['A', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W']

function slugifyHeading(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s/]+/g, '-')
    .replace(/[^a-z0-9_\-\u2014\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

if (!existsSync(glossaryPath)) {
  errors.push('缺少附录E术语表')
} else {
  const text = readFileSync(glossaryPath, 'utf8')
  if (text.length < 6500) errors.push(`附录E内容量异常：${text.length}字符`)

  const letters = [...text.matchAll(/^## ([A-Z])\s*$/gm)].map((match) => match[1])
  if (letters.join(',') !== expectedLetters.join(',')) {
    errors.push(`附录E字母分组异常：${letters.join(',')}`)
  }

  const terms = [...text.matchAll(/^### (.+)$/gm)].map((match) => match[1].trim())
  if (terms.length !== 73) errors.push(`附录E术语数量异常：${terms.length}，应为73`)
  if (!terms[0]?.startsWith('AERMAP —')) errors.push(`附录E首项异常：${terms[0] ?? '缺失'}`)
  if (!terms.at(-1)?.startsWith('Warning Message —')) errors.push(`附录E末项异常：${terms.at(-1) ?? '缺失'}`)
  if (new Set(terms).size !== terms.length) errors.push('附录E存在重复术语标题')

  let currentLetter = ''
  for (const line of text.split(/\r?\n/)) {
    const letter = line.match(/^## ([A-Z])\s*$/)
    if (letter) {
      currentLetter = letter[1]
      continue
    }
    const term = line.match(/^### (.+)$/)
    if (!term) continue
    const english = term[1].split(' — ')[0]
    const firstLetter = english.match(/[A-Za-z]/)?.[0]?.toUpperCase()
    if (!firstLetter || firstLetter !== currentLetter) {
      errors.push(`附录E术语分组错误：${term[1]} 位于 ${currentLetter || '未定义'} 组`)
    }
  }

  for (const marker of [
    '### AERMOD — AMS/EPA 法规模式',
    '### Input Control File — 输入控制文件',
    '### Regulatory Model — 法规模型',
    '### Surface Roughness Length — 地表粗糙度长度',
  ]) {
    if (!text.includes(marker)) errors.push(`附录E缺少关键术语：${marker}`)
  }

  if (!existsSync(sidebarPath)) {
    errors.push('缺少附录侧栏配置')
  } else {
    const sidebar = readFileSync(sidebarPath, 'utf8')
    for (const letter of expectedLetters) {
      const link = `/appendices/appendix-e.html#${letter.toLowerCase()}`
      if (!sidebar.includes(link)) errors.push(`附录E侧栏缺少字母链接：${letter}`)
    }

    for (const term of terms) {
      const anchor = slugifyHeading(term)
      const link = `/appendices/appendix-e.html#${anchor}`
      if (!sidebar.includes(link)) errors.push(`附录E侧栏缺少术语链接：${term}`)
    }

    const links = [...sidebar.matchAll(/\/appendices\/appendix-e\.html#([^']+)/g)].map((match) => match[1])
    if (links.length !== 93) errors.push(`附录E侧栏锚点数量异常：${links.length}，应为93`)
    if (new Set(links).size !== links.length) errors.push('附录E侧栏存在重复锚点')
  }
}

if (errors.length) {
  console.error('\n附录E完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('附录E完整性检查通过：20个字母分组、73个术语、93个侧栏锚点。')
