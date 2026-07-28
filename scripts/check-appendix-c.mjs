import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve('docs/appendices')
const rules = {
  'appendix-c.md': [800, ['appendix-c-01.md', 'appendix-c-11.md', 'C-1 至 C-20']],
  'appendix-c-01.md': [2800, ['### C.1.1 SURFACE OUTPUT', '### C.1.2 PROFILE OUTPUT', 'AERMET flags', 'WSADJ']],
  'appendix-c-02.md': [1200, ['## C.2.1 文件结构与字段', '## C.2.2 示例', 'OU MAXIFILE']],
  'appendix-c-03.md': [1400, ['## C.3.1 未格式化 POSTFILE', '## C.3.2 格式化 POSTFILE', 'NUM HRS']],
  'appendix-c-04.md': [1300, ['## C.4.1 文件结构与字段', '## C.4.2 示例与最大值标记', 'DATE(CONC)']],
  'appendix-c-05.md': [1050, ['## C.5.1 文件头记录', '## C.5.2 数据记录与标识变量', 'IDCONC']],
  'appendix-c-06.md': [1050, ['## C.6.1 文件结构与字段', '## C.6.2 示例', 'RANKFILE']],
  'appendix-c-07.md': [1400, ['## C.7.1 适用范围与输出变量', '## C.7.2 Fortran 输出格式', 'WRITE(IELUNT']],
  'appendix-c-08.md': [950, ['## C.8.1 文件结构与字段', '## C.8.2 季节索引与示例', 'SEASONHR']],
  'appendix-c-09.md': [1300, ['## C.9.1 文件结构与字段', '## C.9.2 排序组织与示例', 'MAXDCONT']],
  'appendix-c-10.md': [1000, ['## C.10.1 文件结构与字段', '## C.10.2 示例', 'MAXDAILY']],
  'appendix-c-11.md': [1400, ['## C.11.1 文件结构与字段', '## C.11.2 排序组织与示例', 'MXDYBYYR']],
}

const errors = []
for (const [name, [minChars, markers]] of Object.entries(rules)) {
  const path = join(root, name)
  if (!existsSync(path)) {
    errors.push(`缺少附录 C 页面：${name}`)
    continue
  }
  const text = readFileSync(path, 'utf8')
  if (text.length < minChars) errors.push(`附录 C 页面内容量异常：${name}（${text.length} 字符）`)
  for (const marker of markers) {
    if (!text.includes(marker)) errors.push(`附录 C 页面缺少标记：${name} -> ${marker}`)
  }
}

if (errors.length) {
  console.error('\n附录 C 完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('附录 C 的 11 个文件格式页面检查通过。')
