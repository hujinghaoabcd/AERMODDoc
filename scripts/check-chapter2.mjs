import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve('docs/guide')
const sidebarPath = resolve('docs/.vuepress/guide-sidebar.js')
const errors = []

const pages = {
  '02-getting-started.md': 1800,
  '02-1-files.md': 5000,
  '02-2-keywords-defaults.md': 3200,
  '02-4-control-source.md': 9800,
  '02-4-receptor-met-output.md': 5900,
  '02-4-debug.md': 5300,
  '02-4-results.md': 16000,
  '02-5-modify.md': 1000,
}

const texts = {}
let combined = ''

for (const [name, minChars] of Object.entries(pages)) {
  const path = resolve(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少第2章页面：${name}`)
    continue
  }

  const text = readFileSync(path, 'utf8')
  texts[name] = text
  combined += `\n${text}`

  if (text.length < minChars) {
    errors.push(`第2章页面内容量异常：${name}（${text.length}字符，最低${minChars}）`)
  }

  const fenceCount = (text.match(/```/g) || []).length
  if (fenceCount % 2 !== 0) errors.push(`第2章页面代码围栏不成对：${name}`)
}

if (combined.length < 47000) {
  errors.push(`第2章总内容量异常：${combined.length}字符，最低47000`)
}

for (let i = 1; i <= 8; i += 1) {
  const figurePattern = new RegExp(`^### 图 2-${i}\\s`, 'gm')
  const count = (combined.match(figurePattern) || []).length
  if (count !== 1) errors.push(`第2章图题数量异常：图2-${i}（${count}）`)
}

const requiredSections = [
  '## 2.1 输入与输出文件控制',
  '### 2.1.1 AERMOD 输入文件说明',
  '### 2.1.2 AERMOD 输出文件说明',
  '### 2.1.3 文件输入与输出控制',
  '## 2.2 关键字/参数方式说明',
  '### 2.2.1 构建输入控制文件的基本规则',
  '### 2.2.2 关键字方式的优点',
  '## 2.3 法规默认模拟选项',
  '## 2.4 建立一个简单控制文件',
  '### 2.4.1 简单工业污染源应用',
  '### 2.4.2 选择模拟选项——CO 路径',
  '### 2.4.3 指定污染源输入——SO 路径',
  '### 2.4.4 指定受体网络——RE 路径',
  '### 2.4.5 指定气象输入——ME 路径',
  '### 2.4.6 选择输出选项——OU 路径',
  '### 2.4.7 使用错误消息文件调试输入控制文件',
  '### 2.4.8 运行模型并检查结果',
  '## 2.5 修改已有控制文件',
  '### 2.5.1 修改模拟选项',
  '### 2.5.2 添加或修改污染源及污染源组',
  '### 2.5.3 添加或修改受体网络',
  '### 2.5.4 修改输出选项',
]

for (const marker of requiredSections) {
  if (!combined.includes(marker)) errors.push(`第2章缺少小节：${marker}`)
}

const results = texts['02-4-results.md'] || ''
for (const marker of [
  'Path-to-AERMOD.EXE\\AERMOD runstream_input_filename output_filename',
  '### 图 2-5 AERMOD 模型输出文件的组织结构',
  '### 图 2-6 AERMOD 输出文件中的模型选项汇总表示例',
  '### 图 2-7 按受体列出的高值输出表示例',
  '### 图 2-8 AERMOD 模型结果汇总表示例',
  'MODEL SETUP OPTIONS SUMMARY',
  'This Run Includes:         1 Source(s);           1 Source Group(s); and        144 Receptor(s)',
  'THE   1ST HIGHEST 3-HR AVERAGE CONCENTRATION',
  'THE SUMMARY OF MAXIMUM PERIOD',
  'NO ECHO',
  'RECTABLE',
  'MAXTABLE',
  './03-ou-pathway.md',
  '../appendices/appendix-c.md',
]) {
  if (!results.includes(marker)) errors.push(`2.4.8缺少关键内容：${marker}`)
}

const index = texts['02-getting-started.md'] || ''
for (const forbidden of ['2.2—2.3', '2.4.1—2.4.3', '2.4.4—2.4.6']) {
  if (index.includes(forbidden)) errors.push(`第2章导航仍使用区间式标题：${forbidden}`)
}
for (const section of ['2.1.3', '2.4.1', '2.4.2', '2.4.3', '2.4.4', '2.4.5', '2.4.6', '2.4.7', '2.4.8']) {
  if (!index.includes(section)) errors.push(`第2章导航缺少逐项链接：${section}`)
}

if (!existsSync(sidebarPath)) {
  errors.push('缺少用户指南侧栏配置')
} else {
  const sidebar = readFileSync(sidebarPath, 'utf8')
  for (const forbidden of ['2.2—2.3', '2.4.1—2.4.3', '2.4.4—2.4.6']) {
    if (sidebar.includes(forbidden)) errors.push(`第2章侧栏仍使用区间式标题：${forbidden}`)
  }
  for (const marker of [
    '2.1.3　文件输入与输出控制',
    '2.4.1　简单工业污染源应用',
    '2.4.2　选择模拟选项——CO 路径',
    '2.4.3　指定污染源输入——SO 路径',
    '2.4.4　指定受体网络——RE 路径',
    '2.4.5　指定气象输入——ME 路径',
    '2.4.6　选择输出选项——OU 路径',
    '2.4.7　错误消息与调试',
    '2.4.8　运行模型并检查结果',
  ]) {
    if (!sidebar.includes(marker)) errors.push(`第2章侧栏缺少目录项：${marker}`)
  }
}

if (errors.length) {
  console.error('\n第2章完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('第2章完整性检查通过：8个页面、22个编号小节、8个图题及完整模型输出示例。')
