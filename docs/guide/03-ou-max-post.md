---
title: 3.7 OU 输出路径：MAXIFILE 与 POSTFILE
sidebarDepth: 3
---

# 3.7 OU 输出路径：MAXIFILE 与 POSTFILE

> 对应 EPA 2023 版 AERMOD 用户指南第 3.7 节完整中文译文。路径标识、关键字、参数名、文件名、单位、格式说明和模型原始输出保留英文；法规应用应以 EPA 英文原文及当前模型版本为准。

<a id="ou-3-7-2"></a>

## 3.7.2 选择专用输出文件选项

AERMOD 模型提供用于专门用途的输出文件选项。原文称其为七类，但随后列出了以下十个关键字：

- `MAXIFILE`：记录超过用户指定阈值的事件；
- `POSTFILE`：输出每个受体的同期原始结果，适用于后处理；
- `PLOTFILE`：输出可导入绘图软件、用于绘制等值线的设计值；
- `TOXXFILE`：输出超过阈值的未格式化原始结果文件，采用供 TOXST 中 TOXX 模型组件使用的专用结构；
- `RANKFILE`：按排序输出数值，用于 Q-Q 图，即分位数图；
- `EVALFILE`：输出适用于模型评估研究的数值，包括弧线最大归一化浓度；
- `SEASONHR`：按季节和一天中的小时输出数值；
- `MAXDCONT`：输出单个污染源组的排序值，用于确定其对 24 小时 PM₂.₅、1 小时 NO₂ 和 1 小时 SO₂ 标准结果的贡献；
- `MAXDAILY`：针对指定污染源组，输出所处理数据时段中每一天的逐日最大 1 小时浓度，适用于分析 1 小时 NO₂ 和 SO₂ NAAQS；
- `MXDYBYYR`：针对 `RECTABLE` 关键字中指定的各个排序，按年份汇总逐日最大 1 小时浓度。

以下按照上述顺序详细说明这些关键字。

<a id="ou-3-7-2-1"></a>

### 3.7.2.1 MAXIFILE

`MAXIFILE` 关键字的语法和类型如下：

```text
OU MAXIFILE Aveper Grpid Thresh Filnam (Funit)
```

**类型：** 可选，可重复。

其中：

- `Aveper`：短期平均时间，例如 3、8、24 分别表示 3、8、24 小时平均，`MONTH` 表示月平均；
- `Grpid`：选择 `MAXIFILE` 选项的污染源组 ID；
- `Thresh`：用户指定的阈值；
- `Filnam`：写入 `MAXIFILE` 结果的文件名；
- `Funit`：可选的 Fortran 逻辑文件单元号。

用户指定的文件单元号必须位于 30—100 范围内，包括端点。

如果在多条 `MAXIFILE` 语句中指定相同的文件名和文件单元号，可以将不同污染源组和/或不同平均时间的结果合并到同一个文件中。

如果省略 `Funit`，模型将为该文件动态分配唯一的文件单元号。

`MAXIFILE` 可以针对每一种平均时间和污染源组组合重复输入。通常应为每个文件使用不同的文件名。

生成的最大值文件包括：

1. 若干条文件头记录，用于标识平均时间、污染源组和该文件的阈值；
2. 每一次结果等于或超过相应平均时间/污染源组阈值的记录。

每条阈值超标记录包含：

- 平均时间；
- 污染源组 ID；
- 阈值超标日期，即该平均时段的结束小时；
- 超标受体位置的 x、y、z 坐标；
- 旗杆受体高度；
- 浓度值。

除月平均外，每一个阈值超标事件都可以通过选择 `CO EVENTFIL` 选项，作为 `EVENT` 处理中的事件进行模拟，以获得污染源贡献信息，见第 3.2.14 节和第 2.1 节。

每一个阈值超标事件都会作为事件写入 `EV` 路径，并按照以下形式命名：

```text
THxxyyyy
```

其中：

- `xx`：平均时间；
- `yyyy`：该平均时间下的超标事件序号。

例如：

```text
TH240019
```

表示第 19 个 24 小时平均阈值超标事件。

月平均阈值超标会写入 `MAXIFILE` 语句指定的文件，但不会写入 `EVENT` 处理输入文件，因为 AERMOD 当前只处理最长 24 小时的平均时间。

以下示例说明 `MAXIFILE` 的用法：

```text
OU MAXIFILE 24    ALL    364.0 MAX24ALL.OUT

OU MAXIFILE 24    PSD     91.0 MAXPSD.OUT 50

OU MAXIFILE 3     PSD    365.0 MAXPSD.OUT 50

OU MAXIFILE 3     PLANT   25.0 C:\OUTPUT\MAXI3HR.FIL

OU MAXIFILE MONTH ALL     10.0 MAXMONTH.OUT
```

其中：

- 3 小时示例说明在 PC 上使用 DOS 路径名；
- 最后一例说明月平均的使用方法。

`Filnam` 参数最长可以为 40 个字符。

对于同一个平均时间/污染源组组合，只能使用一条 `MAXIFILE` 语句。

> **注意：** 当运行包含大量受体，且相当比例的结果超过阈值时，`MAXIFILE` 可能生成非常大的文件。

<a id="ou-3-7-2-2"></a>

### 3.7.2.2 POSTFILE

`POSTFILE` 关键字的语法和类型如下：

```text
OU POSTFILE Aveper Grpid Format Filnam (Funit)
```

**类型：** 可选，可重复。

其中：

- `Aveper`：平均时间，例如：
  - `3`、`8`、`24`：3、8、24 小时平均；
  - `MONTH`：月平均；
  - `PERIOD`：整个模拟时段平均；
  - `ANNUAL`：年平均；
- `Grpid`：选择 `POSTFILE` 选项的污染源组 ID；
- `Format`：指定 `POSTFILE` 输出格式；
- `Filnam`：写入 `POSTFILE` 结果的文件名；
- `Funit`：可选的 Fortran 逻辑文件单元号。

`Format` 可以采用：

- `UNFORM`：生成未格式化浓度文件；
- `PLOT`：生成包含受体位置 x、y 坐标和同期浓度的格式化文件，适合绘制同期值等值线。

用户指定的文件单元号必须位于 30—100 范围内，包括端点。

在多条 `POSTFILE` 语句中指定相同的文件名和文件单元号，可以将不同污染源组和/或不同平均时间的结果合并到同一个文件中。

如果省略 `Funit`，模型将为该文件动态分配唯一的文件单元号。

`POSTFILE` 可以针对每一种平均时间和污染源组组合重复输入。通常应为每个文件使用不同的文件名。

如果 `Format` 指定为 `UNFORM`，生成的未格式化文件会针对模型运行中计算的每一个所选平均时段写入一条固定长度记录。

每条记录的变量依次为：

1. 一个 4 字节整数，表示该记录中平均值的结束日期，格式为 `YYMMDDHH`；
2. 一个 4 字节整数，表示平均时间所包含的小时数；
3. 一个长度为 8 的字符变量，表示污染源组 ID；
4. 所有受体的平均浓度计算值，其排列顺序与受体在输入控制文件中的定义顺序一致。

以下示例说明 `POSTFILE` 的用法：

```text
OU POSTFILE 24     ALL   UNFORM PST24ALL.BIN

OU POSTFILE 24     PSD   UNFORM PST24PSD.BIN

OU POSTFILE 3      PLANT UNFORM C:\BINOUT\PST3HR.FIL

OU POSTFILE MONTH  ALL   PLOT   PSTMONTH.PLT

OU POSTFILE PERIOD ALL   PLOT   PSTANN.PLT
```

其中：

- 3 小时示例说明在 PC 上使用 DOS 路径名；
- 包含 `MONTH` 的示例说明月平均；
- 最后一例说明 `PERIOD` 平均。

`Filnam` 参数最长可以为 200 个字符。

针对每一种平均时间/污染源组组合使用单独文件，可以：

- 只选择具体运行中确实需要进行后处理的结果；
- 使生成的未格式化文件保持在可管理范围内。

> **注意：** `POSTFILE` 可能生成非常大的文件，应谨慎使用。

对于包含全年 8760 条逐小时记录和 400 个受体的文件，所需磁盘空间约为 14 MB。

文件大小可以按下式估算：

\[
\text{File Size (bytes)}
=
\frac{\#\text{ Hrs/Yr}}{\#\text{ Hrs/Ave}}
\times
(\#\text{ Rec}+4)
\times 4
\]

其中：

- `# Hrs/Yr`：一年或所处理时段的总小时数；
- `# Hrs/Ave`：每个平均时段包含的小时数；
- `# Rec`：受体数量。

将计算结果除以 1000，可以估算 KB；除以 \(1.0\times10^6\)，可以估算 MB。
