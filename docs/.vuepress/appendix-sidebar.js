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
  group('附录 D　23132 版本修订', '/appendices/appendix-d.html', [
    group('D.1　缺陷修复', '/appendices/appendix-d.html#d-1-缺陷修复-bug-fixes', [
      leaf('1　两位年份解释', '/appendices/appendix-d.html#_1-两位年份的解释逻辑'),
      leaf('2　NO2STACK 初始化值', '/appendices/appendix-d.html#_2-no2stack-初始化值'),
      leaf('3　BUOYLINE EVENT 处理', '/appendices/appendix-d.html#_3-buoyline-的-event-处理'),
      leaf('4　递归子程序运行时错误', '/appendices/appendix-d.html#_4-递归子程序导致的运行时错误'),
      leaf('5　NOURBTRAN 城市源循环', '/appendices/appendix-d.html#_5-nourbtran-条件下的城市源循环'),
      leaf('6　BUOYLINE 调试文件头', '/appendices/appendix-d.html#_6-buoyline-调试文件文件头'),
      leaf('7　DHP3PLAT 初始化', '/appendices/appendix-d.html#_7-dhp3plat-初始化'),
      leaf('8　DAYRANGE 虚假警告', '/appendices/appendix-d.html#_8-dayrange-的虚假警告'),
      leaf('9　RLINEXT 与 ALPHA', '/appendices/appendix-d.html#_9-rlinext-与-alpha-标志'),
      leaf('10　NOMINO3 与 ARM2', '/appendices/appendix-d.html#_10-nomino3-与-arm2-的冲突消息'),
      leaf('11　INCLUDED 中的 AREACIRC', '/appendices/appendix-d.html#_11-included-文件中的-areacirc-源'),
      leaf('12　ARMRATIO 有效范围', '/appendices/appendix-d.html#_12-armratio-有效范围'),
      leaf('13　I_ALPHA 初始化', '/appendices/appendix-d.html#_13-i-alpha-初始化'),
      leaf('14　未实现 NO₂ 转换的源类型', '/appendices/appendix-d.html#_14-未实现-no2-转换的源类型'),
      leaf('15　SCREEN 与特定源类型', '/appendices/appendix-d.html#_15-screen-与特定源类型'),
      leaf('16　FLAT 源高程与受体高程', '/appendices/appendix-d.html#_16-flat-源高程下忽略受体高程'),
      leaf('17　FLAT 地形结果一致性', '/appendices/appendix-d.html#_17-flat-地形指定方式导致的不一致结果'),
      leaf('18　SWPOINT 数组分配', '/appendices/appendix-d.html#_18-swpoint-源数组分配'),
    ]),
    group('D.2　功能增强', '/appendices/appendix-d.html#d-2-功能增强-enhancements', [
      leaf('1　RLINE/RLINEXT 高地形', '/appendices/appendix-d.html#_1-rline-和-rlinext-支持高地形'),
      leaf('2　城市源调试文件', '/appendices/appendix-d.html#_2-城市源调试文件'),
    ]),
    leaf('D.3　法规选项更新', '/appendices/appendix-d.html#d-3-理论与算法更新——法规选项'),
    group('D.4　BETA 选项更新', '/appendices/appendix-d.html#d-4-理论与算法更新——beta-选项', [
      leaf('1　RLINE 重新表述', '/appendices/appendix-d.html#_1-rline-源类型重新表述'),
      leaf('2　GRSM 更新', '/appendices/appendix-d.html#_2-grsm-no2-转换方法更新'),
      leaf('3　COARE 海洋气象算法', '/appendices/appendix-d.html#_3-coare-海洋气象算法'),
    ]),
    group('D.5　ALPHA 选项更新', '/appendices/appendix-d.html#d-5-理论与算法更新——alpha-选项', [
      leaf('1　AREA 类源烟羽摆动', '/appendices/appendix-d.html#_1-area-类源的烟羽摆动'),
      leaf('2　飞机源参数', '/appendices/appendix-d.html#_2-飞机源参数'),
      leaf('3　高浮力烟羽', '/appendices/appendix-d.html#_3-高浮力烟羽选项'),
    ]),
    group('D.6　仅文档更新', '/appendices/appendix-d.html#d-6-仅文档更新-documentation-updates-only', [
      leaf('1　ARM2 与 SRCGROUP ALL', '/appendices/appendix-d.html#_1-arm2-与-srcgroup-all'),
      leaf('2　方程引用', '/appendices/appendix-d.html#_2-模型理论与算法文件中的方程引用'),
      leaf('3　OPENPIT 的 Zs 与深度', '/appendices/appendix-d.html#_3-openpit-的-zs-和有效深度'),
      leaf('4　浮力通量公式', '/appendices/appendix-d.html#_4-浮力通量计算公式'),
      leaf('5　MFD 方程 77', '/appendices/appendix-d.html#_5-mfd-方程-77-中-x-的定义'),
    ]),
  ]),
  group('附录 E　术语表', '/appendices/appendix-e.html', [
    group('A', '/appendices/appendix-e.html#a', [
      leaf('AERMAP　AERMOD 地形预处理程序', '/appendices/appendix-e.html#aermap-—-aermod-地形预处理程序'),
      leaf('AERMET　AERMOD 气象预处理程序', '/appendices/appendix-e.html#aermet-—-aermod-气象预处理程序'),
      leaf('AERMOD　AMS/EPA 法规模式', '/appendices/appendix-e.html#aermod-—-ams-epa-法规模式'),
      leaf('ASCII　美国信息交换标准代码', '/appendices/appendix-e.html#ascii-—-美国信息交换标准代码'),
    ]),
    group('C', '/appendices/appendix-e.html#c', [
      leaf('Card　卡片/输入记录', '/appendices/appendix-e.html#card-—-卡片-输入记录'),
      leaf('CO　控制路径标识', '/appendices/appendix-e.html#co-—-控制路径标识'),
      leaf('CO Pathway　CO 控制路径', '/appendices/appendix-e.html#co-pathway-—-co-控制路径'),
      leaf('Control File　控制文件', '/appendices/appendix-e.html#control-file-—-控制文件'),
    ]),
    group('D', '/appendices/appendix-e.html#d', [
      leaf('Directory　目录', '/appendices/appendix-e.html#directory-—-目录'),
      leaf('Dispersion Model　扩散模型', '/appendices/appendix-e.html#dispersion-model-—-扩散模型'),
      leaf('DOS　磁盘操作系统', '/appendices/appendix-e.html#dos-—-磁盘操作系统'),
    ]),
    group('E', '/appendices/appendix-e.html#e', [
      leaf('Echo of Inputs　输入回显', '/appendices/appendix-e.html#echo-of-inputs-—-输入回显'),
      leaf('EOF　文件结束', '/appendices/appendix-e.html#eof-—-文件结束'),
      leaf('EPA　美国环境保护署', '/appendices/appendix-e.html#epa-—-美国环境保护署'),
      leaf('Error Message　错误消息', '/appendices/appendix-e.html#error-message-—-错误消息'),
      leaf('Error/Message File　错误/消息文件', '/appendices/appendix-e.html#error-message-file-—-错误-消息文件'),
      leaf('EV　事件路径标识', '/appendices/appendix-e.html#ev-—-事件路径标识'),
      leaf('EV Pathway　EV 事件路径', '/appendices/appendix-e.html#ev-pathway-—-ev-事件路径'),
      leaf('EVENT Processing　EVENT 事件处理', '/appendices/appendix-e.html#event-processing-—-event-事件处理'),
      leaf('Extended Memory　扩展内存', '/appendices/appendix-e.html#extended-memory-—-扩展内存'),
    ]),
    group('F', '/appendices/appendix-e.html#f', [
      leaf('Fatal Error　致命错误', '/appendices/appendix-e.html#fatal-error-—-致命错误'),
      leaf('Flow Vector　流动矢量', '/appendices/appendix-e.html#flow-vector-—-流动矢量'),
    ]),
    group('G', '/appendices/appendix-e.html#g', [
      leaf('GMT　格林尼治标准时间', '/appendices/appendix-e.html#gmt-—-格林尼治标准时间'),
    ]),
    group('I', '/appendices/appendix-e.html#i', [
      leaf('Informational Message　信息消息', '/appendices/appendix-e.html#informational-message-—-信息消息'),
      leaf('Input Image　输入记录映像', '/appendices/appendix-e.html#input-image-—-输入记录映像'),
      leaf('Input Control File　输入控制文件', '/appendices/appendix-e.html#input-control-file-—-输入控制文件'),
    ]),
    group('J', '/appendices/appendix-e.html#j', [
      leaf('Julian Day　儒略日/年内日序', '/appendices/appendix-e.html#julian-day-—-儒略日-年内日序'),
    ]),
    group('K', '/appendices/appendix-e.html#k', [
      leaf('KB　千字节', '/appendices/appendix-e.html#kb-—-千字节'),
      leaf('Keyword　关键字', '/appendices/appendix-e.html#keyword-—-关键字'),
    ]),
    group('L', '/appendices/appendix-e.html#l', [
      leaf('LST　地方标准时间', '/appendices/appendix-e.html#lst-—-地方标准时间'),
    ]),
    group('M', '/appendices/appendix-e.html#m', [
      leaf('Math Co-processor　数学协处理器', '/appendices/appendix-e.html#math-co-processor-—-数学协处理器'),
      leaf('MB　兆字节', '/appendices/appendix-e.html#mb-—-兆字节'),
      leaf('ME　气象路径标识', '/appendices/appendix-e.html#me-—-气象路径标识'),
      leaf('ME Pathway　ME 气象路径', '/appendices/appendix-e.html#me-pathway-—-me-气象路径'),
      leaf('Meteorological Data File　气象数据文件', '/appendices/appendix-e.html#meteorological-data-file-—-气象数据文件'),
      leaf('Missing Value　缺失值', '/appendices/appendix-e.html#missing-value-—-缺失值'),
      leaf('Mixing Height　混合层高度', '/appendices/appendix-e.html#mixing-height-—-混合层高度'),
    ]),
    group('N', '/appendices/appendix-e.html#n', [
      leaf('NCDC　美国国家气候数据中心', '/appendices/appendix-e.html#ncdc-—-美国国家气候数据中心'),
      leaf('NO ECHO　不回显输入', '/appendices/appendix-e.html#no-echo-—-不回显输入'),
      leaf('NWS　美国国家气象局', '/appendices/appendix-e.html#nws-—-美国国家气象局'),
    ]),
    group('O', '/appendices/appendix-e.html#o', [
      leaf('On-site Data　现场数据', '/appendices/appendix-e.html#on-site-data-—-现场数据'),
      leaf('OU　输出路径标识', '/appendices/appendix-e.html#ou-—-输出路径标识'),
      leaf('OU Pathway　OU 输出路径', '/appendices/appendix-e.html#ou-pathway-—-ou-输出路径'),
      leaf('Overlay　覆盖程序段', '/appendices/appendix-e.html#overlay-—-覆盖程序段'),
    ]),
    group('P', '/appendices/appendix-e.html#p', [
      leaf('Pasquill Stability Categories　Pasquill 稳定度类别', '/appendices/appendix-e.html#pasquill-stability-categories-—-pasquill-稳定度类别'),
      leaf('Pathway　功能路径', '/appendices/appendix-e.html#pathway-—-功能路径'),
      leaf('PC　个人计算机', '/appendices/appendix-e.html#pc-—-个人计算机'),
    ]),
    group('Q', '/appendices/appendix-e.html#q', [
      leaf('Quality Assessment　质量评价', '/appendices/appendix-e.html#quality-assessment-—-质量评价'),
      leaf('Quality Assessment Check　质量评价检查', '/appendices/appendix-e.html#quality-assessment-check-—-质量评价检查'),
      leaf('Quality Assessment Message　质量评价消息', '/appendices/appendix-e.html#quality-assessment-message-—-质量评价消息'),
      leaf('Quality Assessment Violation　质量评价违规', '/appendices/appendix-e.html#quality-assessment-violation-—-质量评价违规'),
    ]),
    group('R', '/appendices/appendix-e.html#r', [
      leaf('RAM　随机存取存储器', '/appendices/appendix-e.html#ram-—-随机存取存储器'),
      leaf('RAMMET　RAMMET 气象处理程序', '/appendices/appendix-e.html#rammet-—-rammet-气象处理程序'),
      leaf('Range Check　范围检查', '/appendices/appendix-e.html#range-check-—-范围检查'),
      leaf('Range Check Violation　范围检查违规', '/appendices/appendix-e.html#range-check-violation-—-范围检查违规'),
      leaf('RE　受体路径标识', '/appendices/appendix-e.html#re-—-受体路径标识'),
      leaf('RE Pathway　RE 受体路径', '/appendices/appendix-e.html#re-pathway-—-re-受体路径'),
      leaf('Regulatory Applications　法规应用', '/appendices/appendix-e.html#regulatory-applications-—-法规应用'),
      leaf('Regulatory Model　法规模型', '/appendices/appendix-e.html#regulatory-model-—-法规模型'),
      leaf('R-LINE　研究型线源扩散模型', '/appendices/appendix-e.html#r-line-—-研究型线源扩散模型'),
    ]),
    group('S', '/appendices/appendix-e.html#s', [
      leaf('SCRAM　法规空气模型支持中心', '/appendices/appendix-e.html#scram-—-法规空气模型支持中心'),
      leaf('Secondary Keyword　二级关键字', '/appendices/appendix-e.html#secondary-keyword-—-二级关键字'),
      leaf('SO　污染源路径标识', '/appendices/appendix-e.html#so-—-污染源路径标识'),
      leaf('SO Pathway　SO 污染源路径', '/appendices/appendix-e.html#so-pathway-—-so-污染源路径'),
      leaf('Station Identification　气象站标识', '/appendices/appendix-e.html#station-identification-—-气象站标识'),
      leaf('Subdirectory　子目录', '/appendices/appendix-e.html#subdirectory-—-子目录'),
      leaf('Surface Weather Observations　地表气象观测', '/appendices/appendix-e.html#surface-weather-observations-—-地表气象观测'),
      leaf('Surface Roughness Length　地表粗糙度长度', '/appendices/appendix-e.html#surface-roughness-length-—-地表粗糙度长度'),
      leaf('Syntax　语法', '/appendices/appendix-e.html#syntax-—-语法'),
    ]),
    group('U', '/appendices/appendix-e.html#u', [
      leaf('Unformatted File　未格式化文件', '/appendices/appendix-e.html#unformatted-file-—-未格式化文件'),
      leaf('Upper Air Data (or Soundings)　高空气象数据/探空资料', '/appendices/appendix-e.html#upper-air-data-or-soundings-—-高空气象数据-探空资料'),
    ]),
    group('V', '/appendices/appendix-e.html#v', [
      leaf('Vertical Potential Temperature Gradient　垂直位温梯度', '/appendices/appendix-e.html#vertical-potential-temperature-gradient-—-垂直位温梯度'),
    ]),
    group('W', '/appendices/appendix-e.html#w', [
      leaf('Warning Message　警告消息', '/appendices/appendix-e.html#warning-message-—-警告消息'),
    ]),
  ]),
]
