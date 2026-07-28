---
title: 第 3 章关键字索引
sidebarDepth: 2
---

# 第 3 章关键字索引

本页按功能路径汇总 AERMOD 控制文件关键字和主要次级选项。点击“详细说明”可进入相应完整译文页面，再使用浏览器页内查找定位具体关键字。

> 关键字是否必需、是否可重复以及参数语法，以详细页面和附录 A 为准。

## CO 控制路径

| 关键字/选项 | 类型 | 功能 | 详细说明 |
|---|---|---|---|
| `STARTING` | M–N | 标识 `CO` 路径开始 | [查看](./03-co-pathway.md) |
| `TITLEONE` | M–N | 输出标题第一行 | [查看](./03-co-dispersion.md) |
| `TITLETWO` | O–N | 输出标题第二行 | [查看](./03-co-dispersion.md) |
| `MODELOPT` | M–N | 任务控制和扩散选项 | [查看](./03-co-dispersion.md) |
| `AVERTIME` | M–N | 指定平均时间 | [查看](./03-co-averaging-urban.md) |
| `URBANOPT` | O–R | 指定城市扩散参数 | [查看](./03-co-averaging-urban.md) |
| `POLLUTID` | M–N | 指定模拟污染物 | [查看](./03-co-averaging-urban.md) |
| `HALFLIFE` | O–N | 指定指数衰减半衰期 | [查看](./03-co-averaging-urban.md) |
| `DCAYCOEF` | O–N | 指定指数衰减系数 | [查看](./03-co-averaging-urban.md) |
| `GASDEPDF` | O–N | 覆盖气体干沉降默认参数 | [查看](./03-co-averaging-urban.md) |
| `GASDEPVD` | O–N | 直接指定气体干沉降速度 | [查看](./03-co-averaging-urban.md) |
| `GDLANUSE` | O–N | 按方向扇区指定气体干沉降土地利用类型 | [查看](./03-co-averaging-urban.md) |
| `GDSEASON` | O–N | 定义气体干沉降季节 | [查看](./03-co-averaging-urban.md) |
| `LOW_WIND` | O–N | 低风速 ALPHA 选项参数 | [查看](./03-co-lowwind-downwash.md) |
| `AWMADWNW` | O–N | AWMA 建筑物下洗选项 | [查看](./03-co-lowwind-downwash.md) |
| `ORD_DWNW` | O–N | ORD 建筑物下洗选项 | [查看](./03-co-lowwind-downwash.md) |
| `NO2EQUIL` | O–N | 覆盖 PVMRM、OLM、TTRM/TTRM2 的默认环境平衡 NO₂/NOx 比 | [查看](./03-co-no2.md) |
| `NO2STACK` | O–N | 指定默认烟囱内 NO₂/NOx 比 | [查看](./03-co-no2.md) |
| `NOX_FILE` | O–N | GRSM 使用的逐小时背景 NOx 文件 | [查看](./03-co-no2.md) |
| `NOX_UNIT` | O–N | `NOX_VALS` 的浓度单位 | [查看](./03-co-no2.md) |
| `NOXVALUE` | O–N | GRSM 的固定背景 NOx 值 | [查看](./03-co-no2.md) |
| `NOXSECTR` | O–N | 按风向扇区变化背景 NOx | [查看](./03-co-no2.md) |
| `NOX_VALS` | O–R | 按时间变化的背景 NOx 值 | [查看](./03-co-no2.md) |
| `ARMRATIO` | O–N | 覆盖 ARM2 默认最小、最大比值 | [查看](./03-co-no2.md) |
| `O3SECTOR` | O–N | 按风向扇区变化背景 O₃ | [查看](./03-co-no2.md) |
| `OZONEFIL` | O–N | OLM、PVMRM、TTRM/TTRM2、GRSM 的逐小时 O₃ 文件 | [查看](./03-co-no2.md) |
| `OZONEVAL` | O–R | 固定背景 O₃ 值 | [查看](./03-co-no2.md) |
| `O3VALUES` | O–R | 按时间变化的背景 O₃ 值 | [查看](./03-co-no2.md) |
| `OZONUNIT` | O–N | `O3VALUES` 的浓度单位 | [查看](./03-co-no2.md) |
| `FLAGPOLE` | O–N | 接受受体离地高度并可指定默认旗杆高度 | [查看](./03-co-averaging-urban.md) |
| `ARCFTOPT` | O–N | 对 `SO ARCFTSRC` 指定的飞机 AREA/VOLUME 源考虑烟羽抬升 | [查看](./03-co-averaging-urban.md) |
| `RUNORNOT` | M–N | 运行模型或仅检查输入 | [查看](./03-co-run-debug.md) |
| `EVENTFIL` | O–N | 生成 EVENT 处理输入文件 | [查看](./03-co-run-debug.md) |
| `SAVEFILE` | O–N | 保存中间结果以便重启 | [查看](./03-co-run-debug.md) |
| `INITFILE` | O–N | 从已保存中间结果初始化 | [查看](./03-co-run-debug.md) |
| `MULTYEAR` | O–N | 分年度处理多年气象并累计高值 | [查看](./03-co-run-debug.md) |
| `DEBUGOPT` | O–N | 生成调试文件 | [查看](./03-co-run-debug.md) |
| `ERRORFIL` | O–N | 生成详细错误清单 | [查看](./03-co-run-debug.md) |
| `FINISHED` | M–N | 标识 `CO` 路径结束 | [查看](./03-co-run-debug.md) |
| `DFAULT` | 次级选项 | 使用法规默认选项 | [查看](./03-co-dispersion.md) |
| `ALPHA` | 次级选项 | 启用研究/试验性非法规选项，不能与 `DFAULT` 同用 | [查看](./03-co-dispersion.md) |
| `BETA` | 次级选项 | 启用已通过科学审查、但尚未正式法规化的选项 | [查看](./03-co-dispersion.md) |
| `CONC` | 次级选项 | 计算浓度 | [查看](./03-co-dispersion.md) |
| `DEPOS` | 次级选项 | 计算总沉降通量 | [查看](./03-co-dispersion.md) |
| `DDEP` | 次级选项 | 计算干沉降通量 | [查看](./03-co-dispersion.md) |
| `WDEP` | 次级选项 | 计算湿沉降通量 | [查看](./03-co-dispersion.md) |
| `AREADPLT` | 次级选项 | 面源干去除的非法规优化算法 | [查看](./03-co-dispersion.md) |
| `FLAT` | 次级选项 | 使用平坦地形；RLINE/RLINEXT 要求该选项 | [查看](./03-co-dispersion.md) |
| `ELEV` | 次级选项 | 使用高地形算法 | [查看](./03-co-dispersion.md) |
| `NOSTD` | 次级选项 | 不考虑烟囱顶部下洗 | [查看](./03-co-dispersion.md) |
| `NOCHKD` | 次级选项 | 不检查非连续气象文件日期 | [查看](./03-co-dispersion.md) |
| `WARNCHKD` | 次级选项 | 日期不连续时给出警告而非致命错误 | [查看](./03-co-dispersion.md) |
| `NOWARN` | 次级选项 | 主输出文件不打印详细警告，错误文件仍保留 | [查看](./03-co-dispersion.md) |
| `SCREEN` | 次级选项 | AERSCREEN 筛选模式 | [查看](./03-co-dispersion.md) |
| `SCIM` | 次级选项 | 按规定间隔抽样气象数据，仅用于 `ANNUAL` | [查看](./03-co-dispersion.md) |
| `PVMRM` | 次级选项 | 烟羽体积摩尔比法 NO₂ 转换 | [查看](./03-co-no2.md) |
| `OLM` | 次级选项 | 臭氧限制法 NO₂ 转换 | [查看](./03-co-no2.md) |
| `ARM2` | 次级选项 | 环境比值法第 2 版 | [查看](./03-co-no2.md) |
| `TTRM` | 次级选项 | 行程时间反应法，需 `ALPHA` | [查看](./03-co-no2.md) |
| `TTRM2` | 次级选项 | 将 TTRM 与 PVMRM、OLM 或 ARM2 配合 | [查看](./03-co-no2.md) |
| `GRSM` | 次级选项 | 通用反应集法，需 `BETA` | [查看](./03-co-no2.md) |
| `PSDCREDIT` | 次级选项 | 采用 PVMRM 计算 PSD 增量抵扣 | [查看](./03-co-dispersion.md) |
| `FASTALL` | 次级选项 | 多源类型运行时间优化 | [查看](./03-co-dispersion.md) |
| `FASTAREA` | 次级选项 | AREA、AREAPOLY、AREACIRC、OPENPIT 混合优化 | [查看](./03-co-dispersion.md) |
| `NOMINO3` | 次级选项 | 不使用 PVMRM/OLM 的最小背景臭氧限制 | [查看](./03-co-dispersion.md) |
| `RLINEFDH` | 次级选项 | RLINE/RLINEXT 使用固定排放高度处理 | [查看](./03-co-dispersion.md) |
| `NOURBTRAN` | 次级选项 | 忽略夜间城市边界层向白天对流边界层的过渡 | [查看](./03-co-dispersion.md) |
| `VECTORWS` | 次级选项 | 使用风矢量平均风速 | [查看](./03-co-dispersion.md) |
| `DRYDPLT` | 次级选项 | 在 PLOTFILE 中输出干/湿沉降 | [查看](./03-co-dispersion.md) |
| `WETDPLT` | 次级选项 | 在 PLOTFILE 中输出干/湿沉降 | [查看](./03-co-dispersion.md) |
| `NODRYDPLT` | 次级选项 | 不在相关输出中写入干/湿沉降 | [查看](./03-co-dispersion.md) |
| `NOWETDPLT` | 次级选项 | 不在相关输出中写入干/湿沉降 | [查看](./03-co-dispersion.md) |
| `AREAMNDR` | 次级选项 | 对 AREA 类源采用替代水平摆动处理 | [查看](./03-co-dispersion.md) |
| `HBP` | 次级选项 | 高浮力烟羽选项，源由 `SO HBPSRCID` 指定 | [查看](./03-co-dispersion.md) |

## SO 污染源路径

| 关键字/选项 | 类型 | 功能 | 详细说明 |
|---|---|---|---|
| `STARTING` | M–N | `SO` 路径开始 | [查看](./03-so-pathway.md) |
| `ELEVUNIT` | O–N | 污染源高程单位；若使用，必须紧跟 `SO STARTING` | [查看](./03-so-location.md) |
| `LOCATION` | M–R | 污染源类型、坐标和基底高程 | [查看](./03-so-location.md) |
| `RLEMCONV` | O–N | 将 RLINE/RLINEXT 输入排放单位改为 g/h/link | [查看](./03-so-location.md) |
| `SRCPARAM` | M–R | 污染源释放参数 | [查看](./03-so-emissions.md) |
| `BUILDHGT` | O–R | 各风向扇区建筑物高度 | [查看](./03-so-background-downwash.md) |
| `BUILDLEN` | O–R | 各风向扇区建筑物投影长度 | [查看](./03-so-background-downwash.md) |
| `BUILDWID` | O–R | 各风向扇区建筑物投影宽度 | [查看](./03-so-background-downwash.md) |
| `XBADJ` | O–R | 沿流向烟囱至建筑物迎风面中心距离 | [查看](./03-so-background-downwash.md) |
| `YBADJ` | O–R | 横流向烟囱至建筑物迎风面中心距离 | [查看](./03-so-background-downwash.md) |
| `AREAVERT` | M–R | AREAPOLY 顶点 | [查看](./03-so-emissions.md) |
| `RBARRIER` | O–R | RLINEXT 障碍物设置，需 `ALPHA` | [查看](./03-so-emissions.md) |
| `RDEPRESS` | O–R | RLINEXT 下沉道路设置，需 `ALPHA` | [查看](./03-so-emissions.md) |
| `BLPINPUT` | M–R | 浮力线源组参数 | [查看](./03-so-emissions.md) |
| `URBANSRC` | O–R | 指定采用城市扩散的源 | [查看](./03-so-background-downwash.md) |
| `EMISFACT` | O–R | 可变排放系数 | [查看](./03-so-variable-emissions.md) |
| `EMISUNIT` | O–N | 排放和浓度输出单位转换 | [查看](./03-so-variable-emissions.md) |
| `CONCUNIT` | O–N | 浓度单位转换 | [查看](./03-so-deposition-no2.md) |
| `DEPOUNIT` | O–N | 沉降单位转换 | [查看](./03-so-deposition-no2.md) |
| `PARTDIAM` | O–R | 粒径类别 | [查看](./03-so-deposition-no2.md) |
| `MASSFRAX` | O–R | 粒径类别质量分数 | [查看](./03-so-deposition-no2.md) |
| `PARTDENS` | O–R | 粒径类别密度 | [查看](./03-so-deposition-no2.md) |
| `METHOD_2` | O–R | 颗粒物沉降 Method 2 参数，需 `ALPHA` | [查看](./03-so-deposition-no2.md) |
| `GASDEPOS` | O–R | 气体沉降源参数，需 `ALPHA` | [查看](./03-so-deposition-no2.md) |
| `NO2RATIO` | O–R | 分源烟囱内 NO₂/NOx 比 | [查看](./03-so-deposition-no2.md) |
| `HOUREMIS` | O–R | 外部逐小时排放文件 | [查看](./03-so-variable-emissions.md) |
| `BGSECTOR` | O–N | 背景浓度风向扇区 | [查看](./03-so-background-downwash.md) |
| `BACKGRND` | O–R | 随时间变化的背景浓度 | [查看](./03-so-background-downwash.md) |
| `BACKUNIT` | O–N | 背景浓度单位 | [查看](./03-so-background-downwash.md) |
| `INCLUDED` | O–R | 引入外部污染源文件 | [查看](./03-so-variable-emissions.md) |
| `OLMGROUP` | O–R | OLM 合并烟羽分组 | [查看](./03-so-deposition-no2.md) |
| `BLPGROUP` | M–R | 将浮力线源与 BLP 组关联 | [查看](./03-so-emissions.md) |
| `PSDGROUP` | O–R | PSDCREDIT 污染源组 | [查看](./03-so-deposition-no2.md) |
| `HBPSRCID` | M–R | HBP 源标识；使用 HBP 时必需 | [查看](./03-so-groups-special.md) |
| `ARCFTSRC` | M–R | 飞机源标识；使用 ARCFTOPT 时必需 | [查看](./03-so-groups-special.md) |
| `SRCGROUP` | M–R | 一般污染源组 | [查看](./03-so-groups-special.md) |
| `PLATFORM` | O–R | 海上平台 POINT/POINTHOR/POINTCAP 源参数 | [查看](./03-so-groups-special.md) |
| `FINISHED` | M–N | `SO` 路径结束 | [查看](./03-so-groups-special.md) |

## RE 受体路径

| 关键字/选项 | 类型 | 功能 | 详细说明 |
|---|---|---|---|
| `STARTING` | M–N | `RE` 路径开始 | [查看](./03-re-pathway.md) |
| `ELEVUNIT` | O–N | 受体高程单位；若使用，必须紧跟 `RE STARTING` | [查看](./03-re-pathway.md) |
| `GRIDCART` | O–R | 笛卡尔网格受体 | [查看](./03-re-pathway.md) |
| `GRIDPOLR` | O–R | 极坐标网格受体 | [查看](./03-re-pathway.md) |
| `DISCCART` | O–R | 离散笛卡尔受体 | [查看](./03-re-pathway.md) |
| `DISCPOLR` | O–R | 离散极坐标受体 | [查看](./03-re-pathway.md) |
| `EVALCART` | O–R | 用于 EVALFILE 的离散笛卡尔受体 | [查看](./03-re-pathway.md) |
| `INCLUDED` | O–R | 引入外部受体文件 | [查看](./03-re-pathway.md) |
| `FINISHED` | M–N | `RE` 路径结束 | [查看](./03-re-pathway.md) |

## ME 气象路径

| 关键字/选项 | 类型 | 功能 | 详细说明 |
|---|---|---|---|
| `STARTING` | M–N | `ME` 路径开始 | [查看](./03-me-pathway.md) |
| `SURFFILE` | M–N | 地表气象文件 | [查看](./03-me-pathway.md) |
| `PROFFILE` | M–N | 廓线气象文件 | [查看](./03-me-pathway.md) |
| `SURFDATA` | M–N | 地表气象站 | [查看](./03-me-pathway.md) |
| `UAIRDATA` | M–N | 高空气象站 | [查看](./03-me-pathway.md) |
| `SITEDATA` | O–N | 现场气象站 | [查看](./03-me-pathway.md) |
| `PROFBASE` | M–N | 位温廓线基准高程 | [查看](./03-me-pathway.md) |
| `STARTEND` | O–N | 读取气象文件的开始、结束日期 | [查看](./03-me-pathway.md) |
| `DAYRANGE` | O–R | 选择处理日期或日期范围 | [查看](./03-me-pathway.md) |
| `NOSA` | O–N | 全部小时将 σθ 设为缺失 | [查看](./03-me-pathway.md) |
| `NOSACO` | O–N | 仅对流小时将 σθ 设为缺失 | [查看](./03-me-pathway.md) |
| `NOSAST` | O–N | 仅稳定小时将 σθ 设为缺失 | [查看](./03-me-pathway.md) |
| `NOSW` | O–N | 全部小时将 σw 设为缺失 | [查看](./03-me-pathway.md) |
| `NOSWCO` | O–N | 仅对流小时将 σw 设为缺失 | [查看](./03-me-pathway.md) |
| `NOSWST` | O–N | 仅稳定小时将 σw 设为缺失 | [查看](./03-me-pathway.md) |
| `NOTURB` | O–N | 全部小时将 σθ、σw 设为缺失 | [查看](./03-me-pathway.md) |
| `NOTURBCO` | O–N | 仅对流小时将 σθ、σw 设为缺失 | [查看](./03-me-pathway.md) |
| `NOTURBST` | O–N | 仅稳定小时将 σθ、σw 设为缺失 | [查看](./03-me-pathway.md) |
| `SCIMBYHR` | O–N | SCIM 抽样参数 | [查看](./03-me-pathway.md) |
| `WDROTATE` | O–N | 风向旋转修正 | [查看](./03-me-pathway.md) |
| `WINDCATS` | O–N | 风速类别上限 | [查看](./03-me-pathway.md) |
| `NUMYEARS` | O–N | 处理年份数量，用于数组分配 | [查看](./03-me-pathway.md) |
| `FINISHED` | M–N | `ME` 路径结束 | [查看](./03-me-pathway.md) |

## EV 事件路径

| 关键字/选项 | 类型 | 功能 | 详细说明 |
|---|---|---|---|
| `STARTING` | M–N | `EV` 路径开始 | [查看](./03-ev-pathway.md) |
| `EVENTPER` | M–R | 事件日期、平均时间和污染源组 | [查看](./03-ev-pathway.md) |
| `EVENTLOC` | M–R | 事件受体位置 | [查看](./03-ev-pathway.md) |
| `INCLUDED` | O–R | 引入外部事件文件 | [查看](./03-ev-pathway.md) |
| `FINISHED` | M–N | `EV` 路径结束 | [查看](./03-ev-pathway.md) |

## OU 输出路径

| 关键字/选项 | 类型 | 功能 | 详细说明 |
|---|---|---|---|
| `STARTING` | M–N | `OU` 路径开始 | [查看](./03-ou-pathway.md) |
| `RECTABLE` | O–R | 按受体输出指定排序高值 | [查看](./03-ou-pathway.md) |
| `MAXTABLE` | O–R | 汇总总体最大值 | [查看](./03-ou-pathway.md) |
| `DAYTABLE` | O–N | 按日、平均时间和受体打印同期结果 | [查看](./03-ou-pathway.md) |
| `MAXIFILE` | O–R | 输出达到或超过阈值的事件 | [查看](./03-ou-pathway.md) |
| `POSTFILE` | O–R | 输出用于后处理的同期结果 | [查看](./03-ou-pathway.md) |
| `PLOTFILE` | O–R | 输出适合绘图的设计值 | [查看](./03-ou-pathway.md) |
| `TOXXFILE` | O–R | 输出供 TOXX/RISK 使用的结果 | [查看](./03-ou-pathway.md) |
| `RANKFILE` | O–R | 输出用于 Q-Q 图的排序值 | [查看](./03-ou-pathway.md) |
| `EVALFILE` | O–R | 输出 EVALCART 弧线最大归一化结果 | [查看](./03-ou-pathway.md) |
| `SEASONHR` | O–R | 按季节和一天中的小时输出 | [查看](./03-ou-pathway.md) |
| `MAXDAILY` | O–R | 输出逐日最大 1 小时值 | [查看](./03-ou-pathway.md) |
| `MXDYBYYR` | O–R | 按年份输出逐日最大 1 小时排序值 | [查看](./03-ou-pathway.md) |
| `MAXDCONT` | O–R | 输出各源组对多年平均排序值的贡献 | [查看](./03-ou-pathway.md) |
| `SUMMFILE` | O–N | 单独输出高排序值汇总 | [查看](./03-ou-pathway.md) |
| `FILEFORM` | O–N | 结果文件采用定点或指数格式 | [查看](./03-ou-pathway.md) |
| `NOHEADER` | O–N | 取消指定输出文件的文件头 | [查看](./03-ou-pathway.md) |
| `EVENTOUT` | M–N | EVENT 输出详细程度 | [查看](./03-ou-pathway.md) |
| `FINISHED` | M–N | `OU` 路径结束 | [查看](./03-ou-pathway.md) |

## 快速入口

- [附录 A：功能性关键字/参数参考](../appendices/appendix-a.md)
- [第 3 章：CO 控制路径](./03-co-pathway.md)
- [第 3 章：SO 污染源路径](./03-so-pathway.md)
- [第 3 章：RE 受体路径](./03-re-pathway.md)
- [第 3 章：ME 气象路径](./03-me-pathway.md)
- [第 3 章：EV 事件路径](./03-ev-pathway.md)
- [第 3 章：OU 输出路径](./03-ou-pathway.md)
