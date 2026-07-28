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
  { text: '附录 C　文件格式', link: '/appendices/appendix-c.html' },
  { text: '附录 D　23132 版本修订', link: '/appendices/appendix-d.html' },
  { text: '附录 E　术语表', link: '/appendices/appendix-e.html' },
]
