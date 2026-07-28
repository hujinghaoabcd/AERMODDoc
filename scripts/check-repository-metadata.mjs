import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const errors = []

function read(path) {
  const full = resolve(path)
  if (!existsSync(full)) {
    errors.push(`缺少仓库文件：${path}`)
    return ''
  }
  return readFileSync(full, 'utf8')
}

function requireMarkers(label, text, markers) {
  for (const marker of markers) {
    if (!text.includes(marker)) errors.push(`${label}缺少标记：${marker}`)
  }
}

const requiredFiles = [
  'README.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'CITATION.cff',
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/ISSUE_TEMPLATE/translation.yml',
  '.github/ISSUE_TEMPLATE/site.yml',
  '.github/ISSUE_TEMPLATE/config.yml',
  'docs/.vuepress/public/images/aermod2.svg',
]
for (const path of requiredFiles) {
  if (!existsSync(resolve(path))) errors.push(`缺少发布必需文件：${path}`)
}

const readme = read('README.md')
requireMarkers('README', readme, [
  'docs/.vuepress/public/images/aermod2.svg',
  'https://hujinghaoabcd.github.io/AERMODDoc/',
  'npm run docs:check',
  'npm run docs:check-links',
  'CONTRIBUTING.md',
  'CITATION.cff',
  'CHANGELOG.md',
])
if (readme.includes('docs/images/aermod2.svg')) errors.push('README仍引用旧logo路径：docs/images/aermod2.svg')

const packageJsonText = read('package.json')
const packageLockText = read('package-lock.json')
try {
  const pkg = JSON.parse(packageJsonText)
  if (pkg.name !== 'aermoddoc') errors.push(`package.json名称异常：${pkg.name}`)
  if (pkg.version !== '1.0.0') errors.push(`package.json版本异常：${pkg.version}`)
  if (pkg.private !== true) errors.push('package.json应设置private: true')
  if (pkg.license !== 'MIT') errors.push(`package.json许可证异常：${pkg.license}`)
  if (pkg.author !== 'Jinghao Hu') errors.push(`package.json作者异常：${pkg.author}`)
  if (pkg.homepage !== 'https://hujinghaoabcd.github.io/AERMODDoc/') errors.push('package.json homepage异常')
  if (pkg.repository?.url !== 'git+https://github.com/hujinghaoabcd/AERMODDoc.git') errors.push('package.json repository异常')
  if (pkg.bugs?.url !== 'https://github.com/hujinghaoabcd/AERMODDoc/issues') errors.push('package.json bugs异常')
  if (!pkg.scripts?.['docs:check']?.includes('check-repository-metadata.mjs')) errors.push('docs:check未接入仓库元数据检查')
} catch (error) {
  errors.push(`package.json无法解析：${error.message}`)
}

try {
  const lock = JSON.parse(packageLockText)
  const root = lock.packages?.['']
  if (root?.license !== 'MIT') errors.push(`package-lock.json根包许可证异常：${root?.license}`)
  if (root?.name !== 'aermoddoc') errors.push(`package-lock.json根包名称异常：${root?.name}`)
  if (root?.version !== '1.0.0') errors.push(`package-lock.json根包版本异常：${root?.version}`)
} catch (error) {
  errors.push(`package-lock.json无法解析：${error.message}`)
}

const license = read('LICENSE')
if (!license.startsWith('MIT License')) errors.push('LICENSE不是MIT License')

requireMarkers('CONTRIBUTING', read('CONTRIBUTING.md'), [
  'npm run docs:check',
  'npm run docs:build',
  'npm run docs:check-links',
  '输入控制文件',
  '章—节—小节',
])

requireMarkers('CHANGELOG', read('CHANGELOG.md'), [
  '## [1.0.0] - 2026-07-28',
  '完整导入前置部分、第 1—4 章及附录 A—E',
  '自动化质量检查',
])

requireMarkers('CITATION.cff', read('CITATION.cff'), [
  'cff-version: 1.2.0',
  'title: "AERMOD 中文文档"',
  'version: 1.0.0',
  'date-released: 2026-07-28',
  'license: MIT',
  'family-names: Hu',
  'given-names: Jinghao',
])

requireMarkers('翻译Issue模板', read('.github/ISSUE_TEMPLATE/translation.yml'), [
  'name: 翻译或技术表述问题',
  '原文位置或依据',
  'required: true',
])
requireMarkers('网站Issue模板', read('.github/ISSUE_TEMPLATE/site.yml'), [
  'name: 网站显示或链接问题',
  '移动端显示问题',
  '浏览器和设备',
])
requireMarkers('PR模板', read('.github/PULL_REQUEST_TEMPLATE.md'), [
  'npm run docs:check',
  'npm run docs:build',
  'npm run docs:check-links',
])

if (errors.length) {
  console.error('\n仓库发布元数据检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('仓库发布元数据检查通过：README、许可证、引用、贡献和Issue/PR模板一致。')
