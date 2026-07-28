---
title: C.11　按年份汇总逐日最大值（MXDYBYYR）
sidebarDepth: 3
---

# C.11 按年份汇总逐日最大 1 小时浓度（MAXDYBYYR）

> 原文正文称 `MAXDYBYYR`，实际输出文件和控制关键字使用 `MXDYBYYR`。

`OU MAXDYBYYR`/`OU MXDYBYYR` 针对指定污染源组，为 `RECTABLE` 中指定的每个排序，按年份输出逐日最大 1 小时浓度汇总。

该文件适用于：

- 1 小时 NO₂ NAAQS；
- 1 小时 SO₂ NAAQS。

`MXDYBYYR` 文件中包含的排序，也是 `MAXDCONT` 后处理所使用的排序。

## C.11.1 文件结构与字段

文件头包括：

- 模型名称和版本号；
- 第一行标题；
- 模型选项；
- 污染源组；
- 受体总数；
- Fortran 数据格式。

每条记录包括：

| 字段 | 含义 |
|---|---|
| `X`, `Y` | 受体坐标 |
| `AVERAGE CONC` | 目标污染源组在该受体、该年份和该排序下的逐日最大 1 小时浓度 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `RANK` | 排序 |
| `GRP` | 污染源组 ID |
| `JDAY` | 年内日序号 |
| `HR` | 浓度出现的小时 |
| `DATE` | 日期和小时，`YYMMDDHH` |
| `NET ID` | 受体网络 ID |

## C.11.2 排序组织与示例

数据记录按排序升序分组：

1. 首先输出最高排序对应的所有受体；
2. 然后输出下一排序对应的所有受体；
3. 依此类推。

原文示例使用第 4、第 8、第 12 和第 50 排序。

代表性记录：

```text
* MXDYBYYR FILE OF RANKED DAILY MAXIMUM 1-HR VALUES BY YEAR
* FOR SOURCE GROUP: ALL
* FOR A TOTAL OF 16 RECEPTORS.
* FORMAT: (3(1X,F13.5),3(1X,F8.2),2X,A6,2X,A8,2X,I4,2X,I3,2X,I8.8,2X,A8)

* X           Y          AVERAGE CONC ZELEV ZHILL ZFLAG RANK GRP JDAY HR DATE     NET ID
 100.00000      0.00000    76.74205    35.00 35.00 0.00 4TH  ALL 236 14 99082414 POL1
 300.00000      0.00000   174.62886    35.00 35.00 0.00 4TH  ALL 136 14 99051614 POL1
1000.00000      0.00000   146.90191    35.00 35.00 0.00 4TH  ALL 147 14 99052714 POL1

 100.00000      0.00000    65.46639    35.00 35.00 0.00 8TH  ALL 250 17 99090717 POL1
 300.00000      0.00000   164.95260    35.00 35.00 0.00 8TH  ALL 147 14 99052714 POL1
```

[返回附录 C 导读](./appendix-c.md)
