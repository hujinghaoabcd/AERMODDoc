---
title: 3.7 OU 输出路径：PLOTFILE 与 TOXXFILE
sidebarDepth: 3
---

# 3.7 OU 输出路径：PLOTFILE 与 TOXXFILE

> 对应 EPA 2023 版 AERMOD 用户指南第 3.7 节完整中文译文。路径标识、关键字、参数名、文件名、单位、格式说明和模型原始输出保留英文；法规应用应以 EPA 英文原文及当前模型版本为准。

<a id="ou-3-7-2-3"></a>

### 3.7.2.3 PLOTFILE

`PLOTFILE` 关键字的语法和类型如下：

```text
OU PLOTFILE Aveper Grpid Hivalu Filnam (Funit)
```

或者：

```text
OU PLOTFILE PERIOD Grpid Filnam (Funit)
OU PLOTFILE ANNUAL Grpid Filnam (Funit)
```

**类型：** 可选，可重复。

其中：

- `Aveper`：平均时间，例如 3、8、24 小时、`MONTH`、`PERIOD` 或 `ANNUAL`；
- `Grpid`：选择 `PLOTFILE` 选项的污染源组 ID；
- `Hivalu`：指定需要输出的短期高值：
  - `FIRST`：每个受体的第一高值；
  - `SECOND`：每个受体的第二高值；
  - 依此类推；
- `Filnam`：写入 `PLOTFILE` 结果的文件名；
- `Funit`：可选的 Fortran 逻辑文件单元号。

对于 `PERIOD` 或 `ANNUAL` 平均，不指定 `Hivalu`，因为每个受体只有一个模拟时段平均值或年平均值。

用户指定的文件单元号必须位于 30—100 范围内，包括端点。

如果在多条 `PLOTFILE` 语句中使用相同文件名和文件单元号，可以将不同污染源组和/或平均时间的结果合并到同一文件中。

如果省略 `Funit`，模型将动态分配唯一文件单元号。

> **注意：** 生成 `PLOTFILE` 所使用的平均时间和高值，也必须包含在 `RECTABLE` 关键字中，见第 3.7.1 节。`RECTABLE` 必须在 `OU` 路径中位于 `PLOTFILE` 之前。但针对 `ANNUAL` 或 `PERIOD` 平均生成 `PLOTFILE` 时，不要求输入 `RECTABLE`。

`PLOTFILE` 可以针对每一种平均时间、污染源组和高值组合重复输入。通常应为每个文件使用不同的文件名。

生成的格式化文件包括：

1. 若干条文件头记录，用于标识结果的平均时间、污染源组和高值序号；
2. 每个受体一条记录，其中包含：
   - 受体位置的 x 坐标；
   - 受体位置的 y 坐标；
   - 该位置相应的高值；
   - 平均时间；
   - 污染源组；
   - 高值序号。

数据按照以下顺序写入：

```text
x-coordinate, y-coordinate, concentration
```

因此可以方便地导入用于生成等值线图的绘图软件。许多此类软件能够直接读取 `PLOTFILE`，忽略文件头记录并生成所需图形，无需修改文件。

以下示例说明 `PLOTFILE` 的用法：

```text
OU PLOTFILE 24     ALL   FIRST  PLT24ALL.FST

OU PLOTFILE 24     ALL   SECOND PLT24ALL.SEC

OU PLOTFILE 24     PSD   2ND    PLTPSD.OUT 75

OU PLOTFILE 3      PSD   2ND    PLTPSD.OUT 75

OU PLOTFILE 3      PLANT 1ST    C:\PLOTS\PLT3HR.FIL

OU PLOTFILE MONTH  ALL   THIRD  PLTMONTH.OUT

OU PLOTFILE PERIOD ALL          PSTANN.PLT
```

其中：

- 3 小时示例说明在 PC 上使用 DOS 路径名；
- `MONTH` 示例说明月平均；
- 最后一例说明 `PERIOD` 平均。

如第二和第三类写法所示，高值参数也可以使用标准缩写作为二级关键字输入：

```text
1ST, 2ND, 3RD, ... 10TH
```

`Filnam` 参数最长可以为 40 个字符。

为每一种平均时间、污染源组和高值组合使用单独文件，使用户能够只选择具体运行中需要绘图的结果。

<a id="ou-3-7-2-4"></a>

### 3.7.2.4 TOXXFILE

`TOXXFILE` 关键字的语法和类型如下：

```text
OU TOXXFILE Aveper Cutoff Filnam (Funit)
```

**类型：** 可选，可重复。

其中：

- `Aveper`：选择 `TOXXFILE` 的短期平均时间，例如 1、3、8、24 小时或 `MONTH`；
- `Cutoff`：用户指定的截断阈值，单位为 `g/m3`；
- `Filnam`：写入 `TOXXFILE` 结果的文件名；
- `Funit`：可选的 Fortran 逻辑文件单元号。

需要特别注意：无论在 `SO EMISUNIT` 语句中选择了什么输入和输出单位，`Cutoff` 的单位始终为 `g/m3`。

用户指定的文件单元号必须位于 30—100 范围内，包括端点。

如果省略 `Funit`，模型将动态分配唯一的文件单元号。

虽然 `TOXXFILE` 可以用于 `CO AVERTIME` 中定义的任意短期平均时间，但如果指定的不是 1 小时平均，模型会生成非致命警告，因为 TOXST 模型当前只支持 1 小时平均。

`TOXXFILE` 可以针对每一种平均时间重复输入。但由于生成文件的结构不能清楚区分不同平均时间的结果，因此每个平均时间应使用不同文件名。

AERMOD 生成的 `TOXXFILE` 为未格式化文件，其内容包括：

1. 若干条文件头记录，用于标识标题、平均时间、受体信息和该文件的阈值；
2. 每一次任意污染源组在该平均时间下等于或超过阈值的记录。

当某一污染源组超过阈值时，模型会输出该平均时间和受体位置下所有污染源组的结果。

通过 `TOXXFILE` 输出的每个浓度值都与一个整数 ID 变量配对。该 ID 用于标识：

- 平均时间，即一年中的小时序号；
- 污染源组编号；
- 对应的受体编号。

浓度值和相应 ID 变量存储在缓冲数组中，数组填满后写入未格式化输出文件。

数组大小由 `MODULE MAIN1` 中定义的 `NPAIR PARAMETER` 控制，初始值为 100。

模型运行结束时，缓冲数组中的剩余数值会写入文件，并在右侧用零填充。

`TOXXFILE` 输出文件结构见第 2.1.2 节和附录 C。

使用 `TOXXFILE` 时，用户通常会把每个污染源分别置于一个独立污染源组中。有关 AERMOD `TOXXFILE` 选项的应用方法，用户应进一步查阅 TOXST 用户指南。

以下示例说明 `TOXXFILE` 的用法：

```text
OU TOXXFILE 1  1.0E-5 TOXX1HR.BIN

OU TOXXFILE 24 2.5E-3 TOXX24HR.BIN 50
```

`Filnam` 参数最长可以为 40 个字符。

每一种平均时间只能使用一条 `TOXXFILE` 语句。

> **注意：** 当运行包含大量受体，且相当比例的结果超过阈值时，`TOXXFILE` 可能生成非常大的文件。
