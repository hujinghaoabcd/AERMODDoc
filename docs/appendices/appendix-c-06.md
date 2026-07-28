---
title: C.6　按排序输出的最大值（RANKFILE）
sidebarDepth: 3
---

# C.6 按排序输出的最大值（RANKFILE 选项）

`OU RANKFILE` 生成按排序排列的最大浓度文件，可用于 Q-Q 图或分位数图。

`RANKFILE` 数据以 `MAXTABLE` 数组为基础，但每个数据时段只保留一次事件，即会去除重复时段。

## C.6.1 文件结构与字段

文件头包括：

- 模型名称和版本号；
- 第一行标题；
- 模型选项；
- 平均时间；
- 输出的排序值数量；
- 数据记录格式；
- 列标题。

每条数据记录包括：

| 字段 | 含义 |
|---|---|
| `RANK` | 排序 |
| `AVERAGE CONC` | 平均浓度 |
| `DATE` | 日期，`YYMMDDHH` |
| `X`, `Y` | 受体坐标 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `GRP` | 污染源组 ID |

每个 `RANKFILE` 包含某一平均时间下全部污染源组的结果。

由于每个数据时段只保留一次，输出文件中的排序值数量可能少于请求数量，尤其是在持续时间较短的评估数据库中。

## C.6.2 示例

```text
* RANK-FILE OF UP TO 40 TOP 3-HR VALUES FOR 1 SOURCE GROUPS
* INCLUDES OVERALL MAXIMUM VALUES WITH DUPLICATE DATA PERIODS REMOVED
* FORMAT: (1X,I6,1X,F13.5,1X,I8.8,2(1X,F13.5),3(1X,F7.2),2X,A8)

* RANK AVERAGE CONC DATE        X          Y       ZELEV ZHILL ZFLAG GRP
* ____ ____________ ________ __________ __________ ______ _____ _____ ________

     1    329.96009 88030112  433.01270 -250.00000  0.00  0.00  0.00 ALL
     2    278.47891 88030115  469.84631 -171.01007  0.00  0.00  0.00 ALL
     3    124.30430 88030118  433.01270 -250.00000  0.00  0.00  0.00 ALL
```

[返回附录 C 导读](./appendix-c.md)
