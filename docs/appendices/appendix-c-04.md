---
title: C.4　用于绘图的高值结果（PLOTFILE）
sidebarDepth: 3
---

# C.4 用于绘图的高值结果（PLOTFILE 选项）

`OU PLOTFILE` 用于生成每个受体的高浓度值文件，适合导入图形软件绘制浓度等值线。

## C.4.1 文件结构与字段

格式化 `PLOTFILE` 的文件头包括：

- 模型名称和版本号；
- 第一行标题；
- 模型选项；
- 平均时间；
- 污染源组；
- 输出的高值排序，例如第二高值；
- 受体数量；
- 数据格式；
- 列标题。

每条记录包括：

| 字段 | 含义 |
|---|---|
| `X`, `Y` | 受体坐标 |
| `AVERAGE CONC` | 该受体对应排序的浓度 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `AVE` | 平均时间 |
| `GRP` | 污染源组 ID |
| `RANK` | 短期平均的高值排序 |
| `NET ID` | 受体网络 ID |
| `DATE(CONC)` | 短期平均对应浓度的结束日期，`YYMMDDHH` |
| `NUM HRS` | 对 `PERIOD` 平均，为时段中使用的小时数 |

`PERIOD` 平均的 `PLOTFILE` 与上一节中 `PERIOD` 格式化 `POSTFILE` 使用相同的数据记录格式。

## C.4.2 示例与最大值标记

24 小时第二高值示例：

```text
* PLOT FILE OF HIGH 2ND HIGH 24-HR VALUES FOR SOURCE GROUP: ALL
* FOR A TOTAL OF 144 RECEPTORS.
* FORMAT: (3(1X,F13.5),3(1X,F8.2),3X,A5,2X,A8,2X,A5,5X,A8,2X,I8)

*       X             Y       AVERAGE CONC ZELEV ZHILL ZFLAG  AVE    GRP   RANK NET ID DATE(CONC)
* ____________ ____________   ____________ ______ ______ ______ ______ _____ _____ ______ ________

    30.38843    172.34136       0.34726     0.00   0.00   0.00 24-HR ALL   2ND   POL1   88030324
    60.77686    344.68271       0.75187     0.00   0.00   0.00 24-HR ALL   2ND   POL1   88030124
    86.82409    492.40388       1.18649     0.00   0.00   0.00 24-HR ALL   2ND   POL1   88030124
```

`PLOTFILE` 还使用标志：

```text
**
```

标识全体受体中浓度最高的受体。

- 对短期平均，`**` 位于日期字段之前；
- 对 `PERIOD` 平均，`**` 位于时段小时数字段之前。

[返回附录 C 导读](./appendix-c.md)
