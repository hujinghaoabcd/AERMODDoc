export const guideSidebar = [
  { text: '阅读说明', link: '/guide/' },
  { text: '前置部分', link: '/guide/00-preface.html' },
  {
    text: '第 1 章　引言',
    link: '/guide/01-introduction.html',
    collapsible: true,
    children: [
      {
        text: '1.1　如何使用 AERMOD 手册',
        link: '/guide/01-introduction.html#_1-1-如何使用-aermod-手册',
        collapsible: true,
        children: [
          { text: '1.1.1　初学者', link: '/guide/01-introduction.html#_1-1-1-初学者' },
          { text: '1.1.2　有经验的模拟人员', link: '/guide/01-introduction.html#_1-1-2-有经验的模拟人员' },
          { text: '1.1.3　管理人员和决策者', link: '/guide/01-introduction.html#_1-1-3-管理人员和决策者' },
        ],
      },
      {
        text: '1.2　AERMOD 模型概述',
        link: '/guide/01-introduction.html#_1-2-aermod-模型概述',
        collapsible: true,
        children: [
          { text: '1.2.1　法规适用性', link: '/guide/01-introduction.html#_1-2-1-法规适用性' },
          { text: '1.2.2　基本输入数据要求', link: '/guide/01-introduction.html#_1-2-2-基本输入数据要求' },
          { text: '1.2.3　计算机硬件要求', link: '/guide/01-introduction.html#_1-2-3-计算机硬件要求' },
          { text: '1.2.4　扩散选项', link: '/guide/01-introduction.html#_1-2-4-扩散选项' },
          { text: '1.2.5　污染源选项', link: '/guide/01-introduction.html#_1-2-5-污染源选项' },
          { text: '1.2.6　受体选项', link: '/guide/01-introduction.html#_1-2-6-受体选项' },
          { text: '1.2.7　气象选项', link: '/guide/01-introduction.html#_1-2-7-气象选项' },
          { text: '1.2.8　输出选项', link: '/guide/01-introduction.html#_1-2-8-输出选项' },
          { text: '1.2.9　源贡献分析', link: '/guide/01-introduction.html#_1-2-9-源贡献分析' },
        ],
      },
    ],
  },
  {
    text: '第 2 章　入门——简明教程',
    link: '/guide/02-getting-started.html',
    collapsible: true,
    children: [
      {
        text: '2.1　输入与输出文件控制',
        link: '/guide/02-1-files.html',
        collapsible: true,
        children: [
          { text: '2.1.1　AERMOD 输入文件说明', link: '/guide/02-1-files.html#_2-1-1-aermod-输入文件说明' },
          { text: '2.1.2　AERMOD 输出文件说明', link: '/guide/02-1-files.html#_2-1-2-aermod-输出文件说明' },
        ],
      },
      {
        text: '2.2　关键字/参数方式说明',
        link: '/guide/02-2-keywords-defaults.html#_2-2-关键字-参数方式说明',
        collapsible: true,
        children: [
          { text: '2.2.1　构建输入控制文件的基本规则', link: '/guide/02-2-keywords-defaults.html#_2-2-1-构建输入控制文件的基本规则' },
          { text: '2.2.2　关键字方式的优点', link: '/guide/02-2-keywords-defaults.html#_2-2-2-关键字方式的优点' },
        ],
      },
      { text: '2.3　法规默认模拟选项', link: '/guide/02-2-keywords-defaults.html#_2-3-法规默认模拟选项' },
      {
        text: '2.4　建立一个简单控制文件',
        link: '/guide/02-4-control-source.html#_2-4-建立一个简单控制文件',
        collapsible: true,
        children: [
          { text: '2.4.1　简单工业污染源应用', link: '/guide/02-4-control-source.html#_2-4-1-简单工业污染源应用' },
          { text: '2.4.2　选择模拟选项——CO 路径', link: '/guide/02-4-control-source.html#_2-4-2-选择模拟选项——co-路径' },
          { text: '2.4.3　指定污染源输入——SO 路径', link: '/guide/02-4-control-source.html#_2-4-3-指定污染源输入——so-路径' },
          { text: '2.4.4　指定受体网络——RE 路径', link: '/guide/02-4-receptor-met-output.html#_2-4-4-指定受体网络——re-路径' },
          { text: '2.4.5　指定气象输入——ME 路径', link: '/guide/02-4-receptor-met-output.html#_2-4-5-指定气象输入——me-路径' },
          { text: '2.4.6　选择输出选项——OU 路径', link: '/guide/02-4-receptor-met-output.html#_2-4-6-选择输出选项——ou-路径' },
          { text: '2.4.7　错误消息与调试', link: '/guide/02-4-debug.html' },
          { text: '2.4.8　运行模型并检查结果', link: '/guide/02-4-results.html' },
        ],
      },
      {
        text: '2.5　修改已有控制文件',
        link: '/guide/02-5-modify.html',
        collapsible: true,
        children: [
          { text: '2.5.1　修改模拟选项', link: '/guide/02-5-modify.html#_2-5-1-修改模拟选项' },
          { text: '2.5.2　添加或修改污染源及污染源组', link: '/guide/02-5-modify.html#_2-5-2-添加或修改污染源及污染源组' },
          { text: '2.5.3　添加或修改受体网络', link: '/guide/02-5-modify.html#_2-5-3-添加或修改受体网络' },
          { text: '2.5.4　修改输出选项', link: '/guide/02-5-modify.html#_2-5-4-修改输出选项' },
        ],
      },
    ],
  },
  {
    text: '第 3 章　详细关键字参考',
    link: '/guide/03-keyword-index.html',
    collapsible: true,
    children: [
      { text: '3.1　关键字总索引', link: '/guide/03-keyword-index.html' },
      {
        text: '3.2　CO 控制路径',
        link: '/guide/03-co-pathway.html',
        collapsible: true,
        children: [
          { text: '3.2.1　路径结构与通用控制', link: '/guide/03-co-pathway.html' },
          { text: '3.2.2　扩散与沉降选项', link: '/guide/03-co-dispersion.html' },
          { text: '3.2.3　低风速与建筑物下洗', link: '/guide/03-co-lowwind-downwash.html' },
          { text: '3.2.4　NO₂ 转换选项', link: '/guide/03-co-no2.html' },
          { text: '3.2.5　平均时间、城市源与污染物', link: '/guide/03-co-averaging-urban.html' },
          { text: '3.2.6　运行控制与调试', link: '/guide/03-co-run-debug.html' },
        ],
      },
      {
        text: '3.3　SO 污染源路径',
        link: '/guide/03-so-pathway.html',
        collapsible: true,
        children: [
          { text: '3.3.1　路径结构与源类型', link: '/guide/03-so-pathway.html' },
          { text: '3.3.2　污染源位置', link: '/guide/03-so-location.html' },
          { text: '3.3.3　排放与源参数', link: '/guide/03-so-emissions.html' },
          { text: '3.3.4　沉降与 NO₂ 参数', link: '/guide/03-so-deposition-no2.html' },
          { text: '3.3.5　背景浓度与建筑物下洗', link: '/guide/03-so-background-downwash.html' },
          { text: '3.3.6　可变排放', link: '/guide/03-so-variable-emissions.html' },
          { text: '3.3.7　源组与特殊源', link: '/guide/03-so-groups-special.html' },
        ],
      },
      {
        text: '3.4　RE 受体路径',
        link: '/guide/03-re-pathway.html',
        collapsible: true,
        children: [
          { text: '3.4.1　受体网络与离散受体', link: '/guide/03-re-pathway.html' },
        ],
      },
      {
        text: '3.5　ME 气象路径',
        link: '/guide/03-me-pathway.html',
        collapsible: true,
        children: [
          { text: '3.5.1　气象文件与处理时段', link: '/guide/03-me-pathway.html' },
        ],
      },
      {
        text: '3.6　EV 事件路径',
        link: '/guide/03-ev-pathway.html',
        collapsible: true,
        children: [
          { text: '3.6.1　事件处理设置', link: '/guide/03-ev-pathway.html' },
        ],
      },
      {
        text: '3.7　OU 输出路径',
        link: '/guide/03-ou-pathway.html',
        collapsible: true,
        children: [
          { text: '3.7.1　表格与专用文件输出', link: '/guide/03-ou-pathway.html' },
        ],
      },
    ],
  },
  {
    text: '第 4 章　参考文献',
    link: '/guide/04-references.html',
    collapsible: true,
    children: [
      {
        text: '4.1　EPA 法规与用户指南',
        link: '/guide/04-references.html#_4-1-epa-法规与用户指南',
        collapsible: true,
        children: [
          { text: '4.1.1　法规与实施文件', link: '/guide/04-references.html#_4-1-1-法规与实施文件' },
          { text: '4.1.2　模型与预处理器手册', link: '/guide/04-references.html#_4-1-2-模型与预处理器手册' },
        ],
      },
      {
        text: '4.2　技术与学术文献',
        link: '/guide/04-references.html#_4-2-技术与学术文献',
        collapsible: true,
        children: [
          { text: '4.2.1　模型理论与性能', link: '/guide/04-references.html#_4-2-1-模型理论与性能' },
          { text: '4.2.2　专题研究与扩展方法', link: '/guide/04-references.html#_4-2-2-专题研究与扩展方法' },
        ],
      },
    ],
  },
]
