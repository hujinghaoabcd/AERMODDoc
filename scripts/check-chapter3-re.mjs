import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root=resolve('docs/guide')
const rules={
  "03-re-pathway.md": {"minChars":900,"markers":["re-3-4-0","RE ELEVUNIT"]},
  "03-re-grid.md": {"minChars":6000,"markers":["re-3-4-1","RE GRIDCART","RE GRIDPOLR","XYINC","GDIR"]},
  "03-re-multiple.md": {"minChars":600,"markers":["re-3-4-2","多个受体网络"]},
  "03-re-discrete.md": {"minChars":2400,"markers":["re-3-4-3","RE DISCCART","RE DISCPOLR","RE EVALCART"]},
  "03-re-included.md": {"minChars":800,"markers":["re-3-4-4","RE INCLUDED","AERMAP"]}
}
const errors=[]
let total=0
let combined=''
for (const [name,rule] of Object.entries(rules)) {
  const path=join(root,name)
  if (!existsSync(path)) { errors.push(`缺少 RE 路径页面：${name}`); continue }
  const text=readFileSync(path,'utf8')
  total+=text.length
  combined+=`\n${text}`
  if (text.length<rule.minChars) errors.push(`RE 页面内容量异常：${name}（${text.length} 字符）`)
  for (const marker of rule.markers) if (!text.includes(marker)) errors.push(`RE 页面缺少标记：${name} -> ${marker}`)
}
for (let i=0;i<=4;i+=1) {
  const anchor=`id="re-3-4-${i}"`
  const count=combined.split(anchor).length-1
  if(count!==1) errors.push(`RE 锚点数量异常：${anchor}（${count}）`)
}
if(total<11000) errors.push(`RE 路径完整译文总量异常：${total} 字符`)
if(errors.length){
  console.error('\nRE 路径完整性检查失败：')
  for(const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log(`RE 路径完整性检查通过：5 个页面，${total.toLocaleString('zh-CN')} 字符，5 个三级目录锚点。`)
