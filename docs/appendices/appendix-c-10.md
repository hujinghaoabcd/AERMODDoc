---
title: C.10　逐日最大 1 小时值（MAXDAILY）
sidebarDepth: 3
---

# C.10 逐日最大 1 小时值（MAXDAILY）

`OU MAXDAILY` 生成指定污染源组在所处理数据时段内，每一天的最大 1 小时浓度文件。

该文件主要用于分析：

- 1 小时 NO₂ NAAQS；
- 1 小时 SO₂ NAAQS。

## C.10.1 文件结构与字段

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
| `AVERAGE CONC` | 当日最大 1 小时浓度 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `AVE` | `1-HR` |
| `GRP` | 污染源组 ID |
| `JDAY` | 年内日序号 |
| `HR` | 当日最大值出现的小时 |
| `DATE` | 日期和小时，`YYMMDDHH` |
| `NET ID` | 受体网络 ID |

## C.10.2 示例

```text
* MAXDAILY FILE OF DAILY MAXIMUM 1-HR VALUES BY DAY FOR SOURCE GROUP: ALL
* FOR A TOTAL OF 16 RECEPTORS.
* FORMAT: (3(1X,F13.5),3(1X,F8.2),2X,A6,2X,A8,2X,I4,2X,I3,2X,I8.8,2X,A8)

* X           Y          AVERAGE CONC ZELEV ZHILL ZFLAG AVE  GRP JDAY HR DATE     NET ID
 100.00000      0.00000    50.00000    35.00 35.00 0.00 1-HR ALL   1  13 99010113 POL1
 300.00000      0.00000    50.00159    35.00 35.00 0.00 1-HR ALL   1  13 99010113 POL1
   0.00000  -3000.00000    68.29389    35.00 35.00 0.00 1-HR ALL   1   7 99010107 POL1
```

[返回附录 C 导读](./appendix-c.md)
