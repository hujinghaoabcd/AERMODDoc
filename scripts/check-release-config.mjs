import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const errors = []

function read(path) {
  const full = resolve(path)
  if (!existsSync(full)) {
    errors.push(`缺少发布文件：${path}`)
    return ''
  }
  return readFileSync(full, 'utf8')
}

const pkgText = read('package.json')
const citation = read('CITATION.cff')
const changelog = read('CHANGELOG.md')
const readme = read('README.md')
const workflow = read('.github/workflows/publish-release.yml')

let version = ''
try {
  const pkg = JSON.parse(pkgText)
  version = pkg.version || ''
  if (!/^\d+\.\d+\.\d+$/.test(version)) errors.push(`package.json版本格式无效：${version}`)
  if (pkg.private !== true) errors.push('package.json必须保持private: true，防止误发布到npm')
} catch (error) {
  errors.push(`package.json解析失败：${error.message}`)
}

if (version) {
  for (const [label, text, marker] of [
    ['CITATION.cff', citation, `version: ${version}`],
    ['CHANGELOG.md', changelog, `## [${version}]`],
    ['README.md', readme, `/releases/tag/v${version}`],
    ['发布工作流', workflow, 'VERSION=$(node -p'],
  ]) {
    if (!text.includes(marker)) errors.push(`${label}缺少版本标记：${marker}`)
  }
}

for (const marker of [
  'date-released: 2026-07-29',
  'license: MIT',
  'repository-code:',
]) {
  if (!citation.includes(marker)) errors.push(`CITATION.cff缺少标记：${marker}`)
}

for (const marker of [
  'permissions:',
  'contents: write',
  'gh release create',
  'git push origin "$TAG"',
  'CHANGELOG.md',
  'package.json',
  'release-notes.md',
]) {
  if (!workflow.includes(marker)) errors.push(`发布工作流缺少标记：${marker}`)
}

for (const marker of [
  'github/v/release/hujinghaoabcd/AERMODDoc',
  '正式版本',
  '文档版本用于标记中文在线文档',
]) {
  if (!readme.includes(marker)) errors.push(`README缺少发布信息：${marker}`)
}

if (errors.length) {
  console.error('\n发布配置检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`发布配置检查通过：v${version}、Changelog、CITATION和自动Release工作流一致。`)
