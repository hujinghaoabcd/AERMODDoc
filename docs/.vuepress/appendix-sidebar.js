export const appendixSidebar = [
  { text: '附录导读', link: '/appendices/' },
  {
    text: '附录 A　功能性关键字/参数参考',
    link: '/appendices/appendix-a.html',
    collapsible: true,
    children: [
      { text: 'A.1　使用说明', link: '/appendices/appendix-a-01-usage.html' },
      {
        text: 'A.2　CO 控制路径',
        link: '/appendices/appendix-a-02-co.html',
        collapsible: true,
        children: [
          { text: '表 A-1　控制路径关键字', link: '/appendices/appendix-a-02-co.html#table-a-1' },
          { text: '表 A-2　关键字和参数', link: '/appendices/appendix-a-02-co.html#table-a-2' },
        ],
      },
      {
        text: 'A.3　SO 污染源路径',
        link: '/appendices/appendix-a-03-so.html',
        collapsible: true,
        children: [
          { text: '表 A-3　污染源路径关键字', link: '/appendices/appendix-a-03-so.html#table-a-3' },
          { text: '表 A-4　关键字和参数', link: '/appendices/appendix-a-03-so.html#table-a-4' },
        ],
      },
      {
        text: 'A.4　RE 受体路径',
        link: '/appendices/appendix-a-04-re.html',
        collapsible: true,
        children: [
          { text: '表 A-5　受体路径关键字', link: '/appendices/appendix-a-04-re.html#table-a-5' },
          { text: '表 A-6　关键字和参数', link: '/appendices/appendix-a-04-re.html#table-a-6' },
        ],
      },
      {
        text: 'A.5　ME 气象路径',
        link: '/appendices/appendix-a-05-me.html',
        collapsible: true,
        children: [
          { text: '表 A-7　气象路径关键字', link: '/appendices/appendix-a-05-me.html#table-a-7' },
          { text: '表 A-8　关键字和参数', link: '/appendices/appendix-a-05-me.html#table-a-8' },
        ],
      },
      {
        text: 'A.6　EV 事件路径',
        link: '/appendices/appendix-a-06-ev.html',
        collapsible: true,
        children: [
          { text: '表 A-9　事件路径关键字', link: '/appendices/appendix-a-06-ev.html#table-a-9' },
          { text: '表 A-10　关键字和参数', link: '/appendices/appendix-a-06-ev.html#table-a-10' },
        ],
      },
      {
        text: 'A.7　OU 输出路径',
        link: '/appendices/appendix-a-07-ou.html',
        collapsible: true,
        children: [
          { text: '表 A-11　输出路径关键字', link: '/appendices/appendix-a-07-ou.html#table-a-11' },
          { text: '表 A-12　关键字和参数', link: '/appendices/appendix-a-07-ou.html#table-a-12' },
        ],
      },
      { text: 'A.8　路径结束语句', link: '/appendices/appendix-a-08-finish.html' },
    ],
  },
  { text: '附录 B　错误消息代码', link: '/appendices/appendix-b.html' },
  {
    text: '附录 C　文件格式说明',
    link: '/appendices/appendix-c.html',
    collapsible: true,
    children: [
      {
        text: 'C.1　AERMET 气象数据',
        link: '/appendices/appendix-c-01.html',
        collapsible: true,
        children: [
          { text: 'C.1.1　SURFACE OUTPUT', link: '/appendices/appendix-c-01.html#c-1-1-surface-output' },
          { text: 'C.1.2　PROFILE OUTPUT', link: '/appendices/appendix-c-01.html#c-1-2-profile-output' },
        ],
      },
      {
        text: 'C.2　MAXIFILE',
        link: '/appendices/appendix-c-02.html',
        collapsible: true,
        children: [
          { text: 'C.2.1　文件结构与字段', link: '/appendices/appendix-c-02.html#c-2-1-文件结构与字段' },
          { text: 'C.2.2　示例', link: '/appendices/appendix-c-02.html#c-2-2-示例' },
        ],
      },
      {
        text: 'C.3　POSTFILE',
        link: '/appendices/appendix-c-03.html',
        collapsible: true,
        children: [
          { text: 'C.3.1　未格式化 POSTFILE', link: '/appendices/appendix-c-03.html#c-3-1-未格式化-postfile' },
          { text: 'C.3.2　格式化 POSTFILE', link: '/appendices/appendix-c-03.html#c-3-2-格式化-postfile' },
        ],
      },
      {
        text: 'C.4　PLOTFILE',
        link: '/appendices/appendix-c-04.html',
        collapsible: true,
        children: [
          { text: 'C.4.1　文件结构与字段', link: '/appendices/appendix-c-04.html#c-4-1-文件结构与字段' },
          { text: 'C.4.2　示例与最大值标记', link: '/appendices/appendix-c-04.html#c-4-2-示例与最大值标记' },
        ],
      },
      {
        text: 'C.5　TOXXFILE',
        link: '/appendices/appendix-c-05.html',
        collapsible: true,
        children: [
          { text: 'C.5.1　文件头记录', link: '/appendices/appendix-c-05.html#c-5-1-文件头记录' },
          { text: 'C.5.2　数据记录与标识变量', link: '/appendices/appendix-c-05.html#c-5-2-数据记录与标识变量' },
        ],
      },
      {
        text: 'C.6　RANKFILE',
        link: '/appendices/appendix-c-06.html',
        collapsible: true,
        children: [
          { text: 'C.6.1　文件结构与字段', link: '/appendices/appendix-c-06.html#c-6-1-文件结构与字段' },
          { text: 'C.6.2　示例', link: '/appendices/appendix-c-06.html#c-6-2-示例' },
        ],
      },
      {
        text: 'C.7　EVALFILE',
        link: '/appendices/appendix-c-07.html',
        collapsible: true,
        children: [
          { text: 'C.7.1　适用范围与输出变量', link: '/appendices/appendix-c-07.html#c-7-1-适用范围与输出变量' },
          { text: 'C.7.2　Fortran 输出格式', link: '/appendices/appendix-c-07.html#c-7-2-fortran-输出格式' },
        ],
      },
      {
        text: 'C.8　SEASONHR',
        link: '/appendices/appendix-c-08.html',
        collapsible: true,
        children: [
          { text: 'C.8.1　文件结构与字段', link: '/appendices/appendix-c-08.html#c-8-1-文件结构与字段' },
          { text: 'C.8.2　季节索引与示例', link: '/appendices/appendix-c-08.html#c-8-2-季节索引与示例' },
        ],
      },
      {
        text: 'C.9　MAXDCONT',
        link: '/appendices/appendix-c-09.html',
        collapsible: true,
        children: [
          { text: 'C.9.1　文件结构与字段', link: '/appendices/appendix-c-09.html#c-9-1-文件结构与字段' },
          { text: 'C.9.2　排序组织与示例', link: '/appendices/appendix-c-09.html#c-9-2-排序组织与示例' },
        ],
      },
      {
        text: 'C.10　MAXDAILY',
        link: '/appendices/appendix-c-10.html',
        collapsible: true,
        children: [
          { text: 'C.10.1　文件结构与字段', link: '/appendices/appendix-c-10.html#c-10-1-文件结构与字段' },
          { text: 'C.10.2　示例', link: '/appendices/appendix-c-10.html#c-10-2-示例' },
        ],
      },
      {
        text: 'C.11　MXDYBYYR',
        link: '/appendices/appendix-c-11.html',
        collapsible: true,
        children: [
          { text: 'C.11.1　文件结构与字段', link: '/appendices/appendix-c-11.html#c-11-1-文件结构与字段' },
          { text: 'C.11.2　排序组织与示例', link: '/appendices/appendix-c-11.html#c-11-2-排序组织与示例' },
        ],
      },
    ],
  },
  { text: '附录 D　23132 版本修订', link: '/appendices/appendix-d.html' },
  { text: '附录 E　术语表', link: '/appendices/appendix-e.html' },
]
