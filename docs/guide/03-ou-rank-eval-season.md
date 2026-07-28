---
title: 3.7 OU 输出路径：RANKFILE、EVALFILE 与 SEASONHR
sidebarDepth: 3
---

# 3.7 OU 输出路径：RANKFILE、EVALFILE 与 SEASONHR

> 对应 EPA 2023 版 AERMOD 用户指南第 3.7 节完整中文译文。路径标识、关键字、参数名、文件名、单位、格式说明和模型原始输出保留英文；法规应用应以 EPA 英文原文及当前模型版本为准。

<a id="ou-3-7-2-5"></a>

### 3.7.2.5 RANKFILE

`RANKFILE` 关键字按照排序输出数值，用于生成 Q-Q 图，即分位数图。要对某一平均时间使用 `RANKFILE`，必须先指定对应的 `MAXTABLE` 选项。`RANKFILE` 与 `MAXTABLE` 不同，它会删除重复的日期/小时事件。

```text
OU RANKFILE Aveper Hinum Filnam (Funit)
```

**类型：** 可选，可重复。

- `Aveper`：平均时间，例如 3、8、24 小时或 `MONTH`；
- `Hinum`：需要按排序输出的高值数量；
- `Filnam`：输出文件名；
- `Funit`：可选 Fortran 文件单元号。

`RANKFILE` 不能用于 `PERIOD`。必须先为相同 `Aveper` 指定 `MAXTABLE`，且 `Hinum` 不得大于 `MAXTABLE` 的 `Maxnum`。由于删除重复日期，最终高值数量可能少于请求数量。

`NMAX` 参数初始为 400，`Filnam` 最长 40 个字符。用户指定的文件单元号必须为 30—100。相同文件名和单元号可合并不同平均时间的结果。省略 `Funit` 时：

\[
IRKUNT = 100 + IAVE
\]

其中 `IAVE` 为该平均时间在 `CO AVERTIME` 中的排列编号。

<a id="ou-3-7-2-6"></a>

### 3.7.2.6 EVALFILE

`EVALFILE` 专门生成模型评估研究所需结果，包括每个气象小时、每个指定污染源对应的弧线最大归一化浓度。受体弧线分组必须由 `RE EVALCART` 定义。

```text
OU EVALFILE Srcid Filnam (Funit)
```

**类型：** 可选，可重复。

- `Srcid`：污染源 ID；
- `Filnam`：输出文件名，最长 40 个字符；
- `Funit`：可选 Fortran 文件单元号，范围 30—100。

相同文件名和单元号可合并不同污染源的结果。省略 `Funit` 时：

\[
IELUNT = 400 + ISRC \times 5
\]

其中 `ISRC` 为污染源在 `SO` 路径中的定义顺序。

每个气象小时和每个受体分组输出五条记录，内容包括污染源 ID、日期、弧线 ID、弧线最大归一化浓度 \(P/Q\)、排放速率、相关烟羽扩散变量和气象变量。若未定义受体组，模型产生致命错误。

<a id="ou-3-7-2-7"></a>

### 3.7.2.7 SEASONHR

`SEASONHR` 输出按季节和一天中小时平均的结果文件。

```text
OU SEASONHR GroupID Filenam (FUnit)
```

**类型：** 可选，可重复。

- `GroupID`：污染源组；
- `FileName`：输出文件名；
- `FileUnit`：可选文件单元号，范围 30—100。

省略 `FileUnit` 时：

\[
FileUnit = 302 + IGRP \times 10
\]

其中 `IGRP` 为污染源组索引。

原手册给出的 `SEASONHR` 输出结构如下，数值仅作为格式示例：

```text
* FILE OF SEASON/HOUR VALUES FOR SOURCE GROUP: ALL
* FORMAT: (4(1X,F13.5),1X,F8.2,2X,A8,2X,I4,2X,I4,2X,I4,2X,A8)
* X   Y   AVERAGE CONC   ZELEV   GRP   NHRS   SEAS   HOUR   NET ID
8.68241  49.24039  0.00000  0.00  ALL  87  1  1  POL1
86.82409 492.40387 0.18098  0.00  ALL  87  1  1  POL1
173.64818 984.80774 2.52520 0.00  ALL  87  1  1  POL1
```

`NHRS` 是用于该季节—小时平均的非静风且非缺失小时数。`SEAS` 的取值为：1 冬季、2 春季、3 夏季、4 秋季。记录首先按一天中的小时循环，再按季节循环。
