---
title: C.3　后处理文件（POSTFILE）
sidebarDepth: 3
---

# C.3 后处理文件（POSTFILE 选项）

`OU POSTFILE` 用于生成适合后处理的同期浓度结果文件。AERMOD 提供两种文件类型：

1. 未格式化文件；
2. 格式化的 `X, Y, CONC` 文件，可直接导入绘图程序。

## C.3.1 未格式化 POSTFILE

对于每个平均时间和污染源组组合，未格式化 `POSTFILE` 分别写入一条同期结果记录。

每条记录首先包括三个头变量：

1. 平均时段结束日期，整数，格式 `YYMMDDHH`；
2. 平均时间，整数，例如 3 小时平均取 `3`；
3. 污染源组 ID，8 个字符。

随后依次写入所有受体位置的浓度值。受体顺序与 `RE` 路径中的定义顺序一致。

结果在模型完成相应计算时立即写入文件。

概念结构：

```text
Record =
DATE, AVEPER, GROUP_ID,
CONC(RECEPTOR_1), CONC(RECEPTOR_2), ... CONC(RECEPTOR_N)
```

## C.3.2 格式化 POSTFILE

格式化绘图文件包含若干以 `*` 开头的文件头记录，内容包括：

- 模型名称和版本号；
- 第一行运行标题；
- 模型选项关键字；
- 平均时间；
- 污染源组；
- 受体总数；
- 数据记录格式；
- 变量列标题。

每条数据记录包括：

| 字段 | 含义 |
|---|---|
| `X`, `Y` | 受体坐标 |
| `AVERAGE CONC` | 该受体的同期浓度 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `AVE` | 平均时间 |
| `GRP` | 污染源组 ID |
| `DATE` | 短期平均的结束日期，`YYMMDDHH` |
| `NUM HRS` | 对 `PERIOD` 平均，为该时段中使用的小时数 |
| `NET ID` | 受体网络 ID |

`PERIOD` 平均示例：

```text
* POST/PLOT FILE OF PERIOD VALUES FOR SOURCE GROUP: ALL
* FOR A TOTAL OF   144 RECEPTORS.
* FORMAT: (3(1X,F13.5),3(1X,F8.2),2X,A6,2X,A8,2X,I8.8,2X,A8)

*       X              Y        AVERAGE CONC ZELEV ZHILL ZFLAG   AVE     GRP     NUM HRS  NET ID
* ____________  ____________    ____________ ______ ______ ______ ______ ________ ________ ________

    30.38843      172.34136       0.21576     0.00   0.00   0.00 PERIOD ALL      00000096 POL1
    60.77686      344.68271       0.53162     0.00   0.00   0.00 PERIOD ALL      00000096 POL1
    86.82409      492.40388       0.85993     0.00   0.00   0.00 PERIOD ALL      00000096 POL1
```

[返回附录 C 导读](./appendix-c.md)
