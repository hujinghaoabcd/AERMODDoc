import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const pagePath = resolve('docs/appendices/appendix-d.md')
const sidebarPath = resolve('docs/.vuepress/appendix-sidebar.js')
const errors = []

const sectionAnchors = [
  'd-1-缺陷修复-bug-fixes',
  'd-2-功能增强-enhancements',
  'd-3-理论与算法更新——法规选项',
  'd-4-理论与算法更新——beta-选项',
  'd-5-理论与算法更新——alpha-选项',
  'd-6-仅文档更新-documentation-updates-only',
]

const itemAnchors = [
  '_1-两位年份的解释逻辑', '_2-no2stack-初始化值', '_3-buoyline-的-event-处理',
  '_4-递归子程序导致的运行时错误', '_5-nourbtran-条件下的城市源循环',
  '_6-buoyline-调试文件文件头', '_7-dhp3plat-初始化', '_8-dayrange-的虚假警告',
  '_9-rlinext-与-alpha-标志', '_10-nomino3-与-arm2-的冲突消息',
  '_11-included-文件中的-areacirc-源', '_12-armratio-有效范围', '_13-i-alpha-初始化',
  '_14-未实现-no2-转换的源类型', '_15-screen-与特定源类型',
  '_16-flat-源高程下忽略受体高程', '_17-flat-地形指定方式导致的不一致结果',
  '_18-swpoint-源数组分配',
  '_1-rline-和-rlinext-支持高地形', '_2-城市源调试文件',
  '_1-rline-源类型重新表述', '_2-grsm-no2-转换方法更新', '_3-coare-海洋气象算法',
  '_1-area-类源的烟羽摆动', '_2-飞机源参数', '_3-高浮力烟羽选项',
  '_1-arm2-与-srcgroup-all', '_2-模型理论与算法文件中的方程引用',
  '_3-openpit-的-zs-和有效深度', '_4-浮力通量计算公式', '_5-mfd-方程-77-中-x-的定义',
]

if (!existsSync(pagePath)) {
  errors.push('缺少附录D页面：docs/appendices/appendix-d.md')
} else {
  const text = readFileSync(pagePath, 'utf8')
  if (text.length < 6000) errors.push(`附录D内容量异常：${text.length}字符`)

  for (const heading of [
    '## D.1 缺陷修复（Bug Fixes）',
    '### 18. SWPOINT 源数组分配',
    '## D.2 功能增强（Enhancements）',
    '## D.3 理论与算法更新——法规选项',
    '## D.4 理论与算法更新——BETA 选项',
    '## D.5 理论与算法更新——ALPHA 选项',
    '## D.6 仅文档更新（Documentation Updates Only）',
  ]) {
    if (!text.includes(heading)) errors.push(`附录D缺少标题：${heading}`)
  }

  const itemCount = (text.match(/^### \d+\./gm) || []).length
  if (itemCount !== 31) errors.push(`附录D逐项变更数量异常：${itemCount}，应为31`)

  for (const marker of [
    '`NO2STACK`', '`BUOYLINE`', '`RLINEXT`', '`ARMRATIO`', '`SWPOINT`',
    '`GRSM`', '`COARE`', '`ARCFTOPT`', '`ARCFTSRC`', '`HBP`',
    '方程 109 推导得到方程 110', '方程 77',
  ]) {
    if (!text.includes(marker)) errors.push(`附录D缺少关键标记：${marker}`)
  }
}

if (!existsSync(sidebarPath)) {
  errors.push('缺少附录侧栏配置')
} else {
  const sidebar = readFileSync(sidebarPath, 'utf8')
  for (const anchor of [...sectionAnchors, ...itemAnchors]) {
    if (!sidebar.includes(`#${anchor}`)) errors.push(`附录D侧栏缺少链接：${anchor}`)
  }
}

if (errors.length) {
  console.error('\n附录D完整性检查失败：')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('附录D完整性检查通过：6类更新、31个逐项条目及37个侧栏锚点完整。')
