---
title: 附录 A　功能性关键字/参数参考
sidebarDepth: 2
---

# 附录 A　功能性关键字/参数参考

本附录按功能路径汇总 AERMOD 控制文件的主要关键字。完整参数顺序和条件要求应与第 3 章相应页面配合使用。

## CO 控制路径

| 关键字 | 类型 | 作用 |
|---|---|---|
| `STARTING` / `FINISHED` | 必需 | 路径开始与结束 |
| `TITLEONE` / `TITLETWO` | 标题 | 运行标题 |
| `MODELOPT` | 必需 | 扩散、法规、沉降、NO₂ 等选项 |
| `LOW_WIND` | 可选 | 低风速参数 |
| `ORD_DWNW` / `AWMADWNW` | 可选 | 研究级建筑物下洗选项 |
| `AVERTIME` | 必需 | 平均时间 |
| `MULTYEAR` | 可选 | 多年处理 |
| `URBANOPT` | 条件必需 | 城市参数 |
| `POLLUTID` | 必需 | 污染物类型 |
| `FLAGPOLE` | 可选 | 旗杆受体 |
| `RUNORNOT` | 必需 | 运行或只检查输入 |
| `SAVEFILE` / `INITFILE` | 可选 | 保存与恢复 |
| `ERRORFIL` | 可选 | 详细消息文件 |

## SO 污染源路径

| 关键字 | 作用 |
|---|---|
| `LOCATION` | 源 ID、类型、坐标和高程 |
| `SRCPARAM` | 源类型对应的排放参数 |
| `AREAVERT` | 多边形/露天矿顶点 |
| `GASDEPOS`、`PARTDIAM` 等 | 沉降参数 |
| `NO2RATIO` 等 | 源级 NO₂ 参数 |
| `BACKGRND` / 背景文件 | 背景浓度 |
| `BUILDHGT`、`BUILDWID`、`BUILDLEN`、`XBADJ`、`YBADJ` | PRIME 下洗 |
| `URBANSRC` | 城市源标识 |
| `EMISFACT` | 时间变化排放系数 |
| `HOUREMIS` | 逐小时排放文件 |
| `INCLUDED` | 外部源文件 |
| `SRCGROUP` / `PSDGROUP` | 污染源组 |

## RE 受体路径

`GRIDCART`、`GRIDPOLR`、`DISCCART`、`DISCPOLR`、`EVALCART` 和 `INCLUDED`。

## ME 气象路径

`SURFFILE`、`PROFFILE`、`SURFDATA`、`UAIRDATA`、`SITEDATA`、`PROFBASE`、`STARTEND`、`DAYRANGE` 和 `WDROTATE`。

## EV 事件路径

用于定义事件 ID、源组、平均时间、日期和受体位置的事件记录。

## OU 输出路径

`RECTABLE`、`MAXTABLE`、`DAYTABLE`、`MAXIFILE`、`POSTFILE`、`PLOTFILE`、`TOXXFILE`、`RANKFILE`、`EVALFILE`、`SEASONHR`、`MAXDCONT`、`MAXDAILY` 和 `MAXDYBYYR`。

::: warning
同名关键字在不同模型版本中可能增加参数或改变法规状态。正式输入语法应以当前版本英文用户指南和模型消息为准。
:::
