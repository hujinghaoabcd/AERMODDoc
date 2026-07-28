const leaf = (text, link) => ({ text, link })
const group = (text, link, children) => ({ text, link, collapsible: true, children })

export const appendixSidebar = [
  leaf('附录导读', '/appendices/'),
  group('附录 A　功能性关键字/参数参考', '/appendices/appendix-a.html', [
    leaf('A.1　使用说明', '/appendices/appendix-a-01-usage.html'),
    group('A.2　CO 控制路径', '/appendices/appendix-a-02-co.html', [
      leaf('表 A-1　控制路径关键字', '/appendices/appendix-a-02-co.html#table-a-1'),
      leaf('表 A-2　关键字和参数', '/appendices/appendix-a-02-co.html#table-a-2'),
    ]),
    group('A.3　SO 污染源路径', '/appendices/appendix-a-03-so.html', [
      leaf('表 A-3　污染源路径关键字', '/appendices/appendix-a-03-so.html#table-a-3'),
      leaf('表 A-4　关键字和参数', '/appendices/appendix-a-03-so.html#table-a-4'),
    ]),
    group('A.4　RE 受体路径', '/appendices/appendix-a-04-re.html', [
      leaf('表 A-5　受体路径关键字', '/appendices/appendix-a-04-re.html#table-a-5'),
      leaf('表 A-6　关键字和参数', '/appendices/appendix-a-04-re.html#table-a-6'),
    ]),
    group('A.5　ME 气象路径', '/appendices/appendix-a-05-me.html', [
      leaf('表 A-7　气象路径关键字', '/appendices/appendix-a-05-me.html#table-a-7'),
      leaf('表 A-8　关键字和参数', '/appendices/appendix-a-05-me.html#table-a-8'),
    ]),
    group('A.6　EV 事件路径', '/appendices/appendix-a-06-ev.html', [
      leaf('表 A-9　事件路径关键字', '/appendices/appendix-a-06-ev.html#table-a-9'),
      leaf('表 A-10　关键字和参数', '/appendices/appendix-a-06-ev.html#table-a-10'),
    ]),
    group('A.7　OU 输出路径', '/appendices/appendix-a-07-ou.html', [
      leaf('表 A-11　输出路径关键字', '/appendices/appendix-a-07-ou.html#table-a-11'),
      leaf('表 A-12　关键字和参数', '/appendices/appendix-a-07-ou.html#table-a-12'),
    ]),
    leaf('A.8　路径结束语句', '/appendices/appendix-a-08-finish.html'),
  ]),
  group('附录 B　错误消息代码', '/appendices/appendix-b.html', [
    leaf('B.1　引言', '/appendices/appendix-b.html#b-1-引言'),
    leaf('B.2　输出消息汇总', '/appendices/appendix-b.html#b-2-输出消息汇总'),
    group('B.3　消息布局说明', '/appendices/appendix-b.html#b-3-消息布局说明', [
      leaf('B.3.1　消息的统一结构', '/appendices/appendix-b.html#b-3-1-消息的统一结构'),
      leaf('B.3.2　消息字段与列位置', '/appendices/appendix-b.html#b-3-2-消息字段与列位置'),
      leaf('B.3.3　INCLUDED 外部文件中的行号', '/appendices/appendix-b.html#b-3-3-included-外部文件中的行号'),
    ]),
  ]),
  group('附录 C　文件格式说明', '/appendices/appendix-c.html', [
    group('C.1　AERMET 气象数据', '/appendices/appendix-c-01.html', [
      leaf('C.1.1　SURFACE OUTPUT', '/appendices/appendix-c-01.html#c-1-1-surface-output'),
      leaf('C.1.2　PROFILE OUTPUT', '/appendices/appendix-c-01.html#c-1-2-profile-output'),
    ]),
    group('C.2　MAXIFILE', '/appendices/appendix-c-02.html', [
      leaf('C.2.1　文件结构与字段', '/appendices/appendix-c-02.html#c-2-1-文件结构与字段'),
      leaf('C.2.2　示例', '/appendices/appendix-c-02.html#c-2-2-示例'),
    ]),
    group('C.3　POSTFILE', '/appendices/appendix-c-03.html', [
      leaf('C.3.1　未格式化 POSTFILE', '/appendices/appendix-c-03.html#c-3-1-未格式化-postfile'),
      leaf('C.3.2　格式化 POSTFILE', '/appendices/appendix-c-03.html#c-3-2-格式化-postfile'),
    ]),
    group('C.4　PLOTFILE', '/appendices/appendix-c-04.html', [
      leaf('C.4.1　文件结构与字段', '/appendices/appendix-c-04.html#c-4-1-文件结构与字段'),
      leaf('C.4.2　示例与最大值标记', '/appendices/appendix-c-04.html#c-4-2-示例与最大值标记'),
    ]),
    group('C.5　TOXXFILE', '/appendices/appendix-c-05.html', [
      leaf('C.5.1　文件头记录', '/appendices/appendix-c-05.html#c-5-1-文件头记录'),
      leaf('C.5.2　数据记录与标识变量', '/appendices/appendix-c-05.html#c-5-2-数据记录与标识变量'),
    ]),
    group('C.6　RANKFILE', '/appendices/appendix-c-06.html', [
      leaf('C.6.1　文件结构与字段', '/appendices/appendix-c-06.html#c-6-1-文件结构与字段'),
      leaf('C.6.2　示例', '/appendices/appendix-c-06.html#c-6-2-示例'),
    ]),
    group('C.7　EVALFILE', '/appendices/appendix-c-07.html', [
      leaf('C.7.1　适用范围与输出变量', '/appendices/appendix-c-07.html#c-7-1-适用范围与输出变量'),
      leaf('C.7.2　Fortran 输出格式', '/appendices/appendix-c-07.html#c-7-2-fortran-输出格式'),
    ]),
    group('C.8　SEASONHR', '/appendices/appendix-c-08.html', [
      leaf('C.8.1　文件结构与字段', '/appendices/appendix-c-08.html#c-8-1-文件结构与字段'),
      leaf('C.8.2　季节索引与示例', '/appendices/appendix-c-08.html#c-8-2-季节索引与示例'),
    ]),
    group('C.9　MAXDCONT', '/appendices/appendix-c-09.html', [
      leaf('C.9.1　文件结构与字段', '/appendices/appendix-c-09.html#c-9-1-文件结构与字段'),
      leaf('C.9.2　排序组织与示例', '/appendices/appendix-c-09.html#c-9-2-排序组织与示例'),
    ]),
    group('C.10　MAXDAILY', '/appendices/appendix-c-10.html', [
      leaf('C.10.1　文件结构与字段', '/appendices/appendix-c-10.html#c-10-1-文件结构与字段'),
      leaf('C.10.2　示例', '/appendices/appendix-c-10.html#c-10-2-示例'),
    ]),
    group('C.11　MXDYBYYR', '/appendices/appendix-c-11.html', [
      leaf('C.11.1　文件结构与字段', '/appendices/appendix-c-11.html#c-11-1-文件结构与字段'),
      leaf('C.11.2　排序组织与示例', '/appendices/appendix-c-11.html#c-11-2-排序组织与示例'),
    ]),
  ]),
  leaf('附录 D　23132 版本修订', '/appendices/appendix-d.html'),
  leaf('附录 E　术语表', '/appendices/appendix-e.html'),
]
