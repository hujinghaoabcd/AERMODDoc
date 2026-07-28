---
title: 2.4.1—2.4.3　建立控制文件：应用、控制路径与污染源
sidebarDepth: 3
---

## 2.4 建立一个简单控制文件

本节逐步说明如何为一个简单应用建立控制文件，并展示 AERMOD 中较常用选项的设置方法。

示例以一个简单工业污染源为基础。该示例的 AERMOD 输入文件见图 2-1。以下各节将解释输入文件的不同组成部分，并说明组织 AERMOD 输入文件时可采用的灵活格式。

### 图 2-1 示例问题的 AERMOD 输入文件

> 下列控制文件关键字、参数和数值保持原文不变。

```text
CO STARTING
CO TITLEONE A Simple Example Problem for the AERMOD-PRIME Model
CO MODELOPT CONC FLAT
CO AVERTIME 3 24 PERIOD
CO POLLUTID SO2
CO RUNORNOT RUN
CO FINISHED

SO STARTING
SO LOCATION   STACK1 POINT 0.0 0.0 0.0
SO SRCPARAM   STACK1 500.0 65.00 425. 15.0 5.
SO BUILDHGT   STACK1 36*50.
SO BUILDWID   STACK1 62.26   72.64   80.80   86.51     89.59    89.95
SO BUILDWID   STACK1 87.58   82.54   75.00   82.54     87.58    89.95
SO BUILDWID   STACK1 89.59   86.51   80.80   72.64     62.26    50.00
SO BUILDWID   STACK1 62.26   72.64   80.80   86.51     89.59    89.95
SO BUILDWID   STACK1 87.58   82.54   75.00   82.54     87.58    89.95
SO BUILDWID   STACK1 89.59   86.51   80.80   72.64     62.26    50.00
SO BUILDLEN   STACK1 82.54   87.58   89.95   89.59     86.51    80.80
SO BUILDLEN   STACK1 72.64   62.26   50.00   62.26     72.64    80.80
SO BUILDLEN   STACK1 86.51   89.59   89.95   87.58     82.54    75.00
SO BUILDLEN   STACK1 82.54   87.58   89.95   89.59     86.51    80.80
SO BUILDLEN   STACK1 72.64   62.26   50.00   62.26     72.64    80.80
SO BUILDLEN   STACK1 86.51   89.59   89.95   87.58     82.54    75.00
SO XBADJ      STACK1 -47.35 -55.76 -62.48 -67.29      -70.07   -70.71
SO XBADJ      STACK1 -69.21 -65.60 -60.00 -65.60      -69.21   -70.71
SO XBADJ      STACK1 -70.07 -67.29 -62.48 -55.76      -47.35   -37.50
SO XBADJ      STACK1 -35.19 -31.82 -27.48 -22.30      -16.44   -10.09
SO XBADJ      STACK1 -3.43    3.34   10.00     3.34    -3.43   -10.09
SO XBADJ      STACK1 -16.44 -22.30 -27.48 -31.82      -35.19   -37.50
SO YBADJ      STACK1 34.47   32.89   30.31    26.81    22.50    17.50
SO YBADJ      STACK1 11.97    6.08     0.00   -6.08   -11.97   -17.50
SO YBADJ      STACK1 -22.50 -26.81 -30.31 -32.89      -34.47   -35.00
SO YBADJ      STACK1 -34.47 -32.89 -30.31 -26.81      -22.50   -17.50
SO YBADJ      STACK1 -11.97  -6.08     0.00    6.08    11.97    17.50
SO YBADJ      STACK1 22.50   26.81   30.31    32.89    34.47    35.00
SO SRCGROUP   ALL
SO FINISHED

RE STARTING
RE GRIDPOLR   POL1 STA
RE GRIDPOLR   POL1 ORIG STACK1
RE GRIDPOLR   POL1 DIST 175. 350. 500. 1000.
RE GRIDPOLR   POL1 GDIR 36 10 10
RE GRIDPOLR   POL1 END
RE FINISHED

ME STARTING
ME SURFFILE AERMET2.SFC
ME PROFFILE AERMET2.PFL
ME SURFDATA 14735 1988 ALBANY,NY
ME UAIRDATA 14735 1988 ALBANY,NY
ME SITEDATA
ME PROFBASE 0.0 METERS
ME FINISHED

OU STARTING
OU RECTABLE ALIVE FIRST-SECOND
OU MAXTABLE ALIVE 50
OU FINISHED
```
### 2.4.1 简单工业污染源应用

本教程选择一个受建筑物下洗影响的单一 SO₂ 点源。该污染源由一座 50 m 高的烟囱构成，烟囱邻近建筑物，并排放具有浮力的烟羽。

假定：

- 烟囱位于农村地区；
- 地形平坦；
- 以烟囱位置为中心建立极坐标受体网络，用于识别最大影响区域。
### 2.4.2 选择模拟选项——CO 路径

模拟选项通过控制路径（CO）输入。CO 路径中的必需关键字如下。全部关键字清单见第 3.2 节和附录 A。

| 关键字 | 作用 |
|---|---|
| `STARTING` | 表示该路径输入开始；每条路径均必须使用。 |
| `TITLEONE` | 用户指定的标题行，最长 68 个字符，显示在打印输出文件的每一页。还可使用 `TITLETWO` 指定可选的第二标题行。 |
| `MODELOPT` | 通过一系列次级关键字控制某次运行所选择的模拟选项。 |
| `AVERTIME` | 指定某次运行需要计算的平均时间。 |
| `POLLUTID` | 指定所模拟的污染物类型。原文指出，在本版示例语境下，该选项本身不影响计算结果。 |
| `RUNORNOT` | 指示模型是否执行完整计算。如果选择不运行，模型仍会处理控制文件并报告输入错误，但不会进行扩散计算。 |
| `FINISHED` | 表示该路径输入结束；其他各路径同样必须使用。 |

前两个关键字含义较直观。如第 2.3 节所述，CO 路径中的 `MODELOPT` 是控制某次运行所用模拟选项的核心关键字。

本示例拟采用相应选项并要求模型输出浓度值。输入前三条记录后，控制文件可写为：

```text
CO STARTING
CO TITLEONE A Simple Example Problem for the AERMOD-PRIME Model
CO MODELOPT CONC FLAT
```

标题参数不需要加引号，即使整段标题只表示一个参数。模型从 `TITLEONE` 记录第 13 列开始读取最多 200 个字符作为标题，并且不会把其中的小写字母转换为大写。

因此，如果用户希望标题在字段中居中，标题前的空格具有实际意义。需要注意，输出文件只打印 `TITLEONE` 的前 68 个字符。

`MODELOPT` 记录中各次级关键字的空格和排列顺序不影响结果。例如：

```text
CO MODELOPT CONC    FLAT
```

与前面的 `MODELOPT` 写法作用完全相同。建议用户采用一致且易读的格式。`MODELOPT` 可指定的全部模拟选项见第 3 章。

本示例计算：

- 3 小时平均值；
- 24 小时平均值；
- 整个模拟时段的平均值。

加入 `AVERTIME` 和 `POLLUTID` 后，控制文件可写为：

```text
CO STARTING
CO TITLEONE A Simple Example Problem for the AERMOD-PRIME Model
CO MODELOPT CONC FLAT
CO AVERTIME 3 24 PERIOD
CO POLLUTID SO2
```

`AVERTIME` 中参数的排列顺序并不影响计算，但短期平均时间在 `AVERTIME` 中的顺序，会决定其结果在输出文件中的显示顺序。

多数情况下，同一路径中关键字的排列顺序并非强制要求。不过，如果始终采用一致、合乎逻辑的顺序，控制文件的意图更容易理解。除非采用其他顺序有明确优势，建议按第 3 章、附录 A 和快速参考中的顺序排列关键字。

CO 路径剩余的两个必需关键字为 `RUNORNOT` 和 `FINISHED`。本示例将 `RUNORNOT` 设为 `RUN`。

如果用户对某些选项的运行方式不确定，或第一次建立较复杂的控制文件，可以先令模型**不执行计算**，只读取并分析输入文件，报告错误和警告。利用这些具有描述性的消息完成调试后，再把 `RUNORNOT` 改为 `RUN`，可以避免消耗大量计算资源生成错误结果。

即使设置为不运行，模型仍会在输出文件中汇总全部输入。

本示例完整的 CO 路径可写为：

```text
CO STARTING
CO TITLEONE A Simple Example Problem for the AERMOD-PRIME Model
CO MODELOPT CONC FLAT
CO AVERTIME 3 24 PERIOD
CO POLLUTID SO2
CO RUNORNOT RUN
CO FINISHED
```

也可以采用结构更清晰的写法：

```text
CO STARTING
   TITLEONE A Simple Example Problem for the AERMOD-PRIME Model
   MODELOPT CONC FLAT
   AVERTIME 3 24 PERIOD
   POLLUTID SO2
   RUNORNOT RUN
CO FINISHED
```

由于路径 ID 必须从第 1 列开始，若某一行的路径字段为空，模型会假定继续使用前一条记录的路径。第 2.4.8 节进一步讨论这一限制。

关键字字段留空时，模型也会沿用前一条记录的关键字。下一节 SO 路径示例将展示这种写法。

除上述 CO 路径必需关键字外，用户还可以选择其他关键字，用于：

- 允许输入旗杆受体相对于地面的高度；
- 为指数衰减指定衰减系数或半衰期；
- 生成包含事件的输入文件，供 `EVENT` 处理；
- 周期性保存模型结果，以便断电或其他中断后重新启动。

这些选项详见第 3 章。
### 2.4.3 指定污染源输入——SO 路径

除所有路径共有的 `STARTING` 和 `FINISHED` 外，污染源路径（SO）还包含以下必需关键字：

| 关键字 | 作用 |
|---|---|
| `LOCATION` | 指定污染源 ID、污染源类型和位置。 |
| `SRCPARAM` | 为此前由 `LOCATION` 定义的污染源 ID 指定污染源参数。 |
| `SRCGROUP` | 指定计算时如何对污染源分组。即使只有一个污染源，也至少存在一个污染源组；该组可以是包含全部污染源的 `ALL` 组。 |

由于本示例中的假想污染源受附近建筑物影响，还需要加入建筑物下洗相关的可选关键字，包括建筑物高度、宽度、长度及相对位置参数。

本示例的一种 SO 路径写法如下：

```text
SO STARTING
SO LOCATION   STACK1 POINT 0.0 0.0 0.0
SO SRCPARAM   STACK1 500.0 65.00 425. 15.0 5.
SO BUILDHGT   STACK1 50.00 50.00 50.00 50.00 50.00 50.00
SO BUILDHGT   STACK1 50.00 50.00 50.00 50.00 50.00 50.00
SO BUILDHGT   STACK1 50.00 50.00 50.00 50.00 50.00 50.00
SO BUILDHGT   STACK1 50.00 50.00 50.00 50.00 50.00 50.00
SO BUILDHGT   STACK1 50.00 50.00 50.00 50.00 50.00 50.00
SO BUILDHGT   STACK1 50.00 50.00 50.00 50.00 50.00 50.00
SO BUILDWID   STACK1 62.26 72.64 80.80 86.51 89.59 89.95
SO BUILDWID   STACK1 87.58 82.54 75.00 82.54 87.58 89.95
SO BUILDWID   STACK1 89.59 86.51 80.80 72.64 62.26 50.00
SO BUILDWID   STACK1 62.26 72.64 80.80 86.51 89.59 89.95
SO BUILDWID   STACK1 87.58 82.54 75.00 82.54 87.58 89.95
SO BUILDWID   STACK1 89.59 86.51 80.80 72.64 62.26 50.00
SO BUILDLEN   STACK1 82.54 87.58 89.95 89.59 86.51 80.80
SO BUILDLEN   STACK1 72.64 62.26 50.00 62.26 72.64 80.80
SO BUILDLEN   STACK1 86.51 89.59 89.95 87.58 82.54 75.00
SO BUILDLEN   STACK1 82.54 87.58 89.95 89.59 86.51 80.80
SO BUILDLEN   STACK1 72.64 62.26 50.00 62.26 72.64 80.80
SO BUILDLEN   STACK1 86.51 89.59 89.95 87.58 82.54 75.00
SO XBADJ      STACK1 -47.35 -55.76 -62.48 -67.29 -70.07 -70.71
SO XBADJ      STACK1 -69.21 -65.60 -60.00 -65.60 -69.21 -70.71
SO XBADJ      STACK1 -70.07 -67.29 -62.48 -55.76 -47.35 -37.50
SO XBADJ      STACK1 -35.19 -31.82 -27.48 -22.30 -16.44 -10.09
SO XBADJ      STACK1 -3.43 3.34 10.00 3.34 -3.43 -10.09
SO XBADJ      STACK1 -16.44 -22.30 -27.48 -31.82 -35.19 -37.50
SO YBADJ      STACK1 34.47 32.89 30.31 26.81 22.50 17.50
SO YBADJ      STACK1 11.97 6.08 0.00 -6.08 -11.97 -17.50
SO YBADJ      STACK1 -22.50 -26.81 -30.31 -32.89 -34.47 -35.00
SO YBADJ      STACK1 -34.47 -32.89 -30.31 -26.81 -22.50 -17.50
SO YBADJ      STACK1 -11.97 -6.08 0.00 6.08 11.97 17.50
SO YBADJ      STACK1 22.50 26.81 30.31 32.89 34.47 35.00
SO SRCGROUP   ALL
SO FINISHED
```

这些输入有几个需要注意的方面。

#### 1. 污染源 ID 与定义顺序

本例中的污染源 ID 为 `STACK1`。污染源 ID 是最多 12 个字符的字母数字参数，用于把不同关键字的输入与同一污染源关联起来。

在任何其他关键字引用某一污染源之前，必须先用 `LOCATION` 记录定义它。这一步确定污染源类型，本例为 `POINT`，进而决定模型允许输入哪些参数。有效污染源类型的完整清单及说明见第 3.3.1 节。

如果本分析考虑高地形影响，还必须在 `LOCATION` 记录中指定污染源基底相对于平均海平面（MSL）的高程。本例污染源基底高程为 `0.0 m MSL`。

#### 2. 按风向扇区输入建筑物尺寸

对于所有涉及下洗的污染源，模型使用随方向变化的建筑物尺寸。因此需要输入：

- 36 个建筑物高度；
- 36 个建筑物宽度；
- 以及其他相应方向参数。

每个值对应一个 10° 扇区，从 10° 流向矢量开始，顺时针排列。这里的流向矢量是风吹向的方向。

一条记录无法容纳全部 36 个值，因此路径、关键字和污染源 ID 可以重复多次。上例每行给出 6 个数值，共使用 6 行。只要在开始下一个关键字之前恰好输入 36 个值，使用更多或更少的行都可以。

本例中建筑物高度在所有扇区相同。模型允许使用“重复值”简写，例如：

```text
36*50.0
```

模型会把它解释为 36 个独立输入，每个值均为 `50.0`，并存入相应数组。

由于模型必须把它识别为一个参数字段，重复次数、星号和值之间不能有空格。

#### 3. `SRCGROUP` 的位置与 `ALL` 简写

SO 路径中，在 `SO FINISHED` 之前最后一个关键字必须是 `SRCGROUP`。

如果 `MODELOPT` 记录中指定了 `PSDCREDIT`，则 `SRCGROUP` 由 `PSDGROUP` 取代。

本例只有一个污染源，因此采用污染源组 ID `ALL`。污染源组 ID 最多可有 8 个字符。当控制文件中出现：

```text
SO SRCGROUP ALL
```

模型会建立名为 `ALL` 的污染源组，其中包含该次运行定义的全部污染源，无需逐一列出污染源 ID。

在包含多个污染源的运行中，可以重复使用 `SRCGROUP` 定义多个污染源组。详细说明见第 3 章。

利用前述格式功能，同样的 SO 路径也可组织为：

```text
SO STARTING
LOCATION    STACK1    POINT 0.0 0.0 0.0
** Point Source        QS    HS     TS    VS       DS
** Parameters:        ---- ---- ----     ----     ----
   SRCPARAM STACK1    500.0 65.0 425.0 15.0        5.0
   BUILDHTS STACK1    36*50.
   BUILDWTS STACK1    62.26     72.64   80.80      86.51     89.59      89.95
            STACK1    87.58     82.54   75.00      82.54     87.58      89.95
            STACK1    89.59     86.51   80.80      72.64     62.26      50.00
            STACK1    62.26     72.64   80.80      86.51     89.59      89.95
            STACK1    87.58     82.54   75.00      82.54     87.58      89.95
            STACK1    89.59     86.51   80.80      72.64     62.26      50.00
   XBADJ    STACK1   -47.35   -55.76   -62.48     -67.29    -70.07     -70.71
            STACK1   -69.21   -65.60   -60.00     -65.60    -69.21     -70.71
            STACK1   -70.07   -67.29   -62.48     -55.76    -47.35     -37.50
            STACK1   -35.19   -31.82   -27.48     -22.30    -16.44     -10.09
            STACK1    -3.43     3.34    10.00       3.34     -3.43     -10.09
            STACK1   -16.44   -22.30   -27.48     -31.82    -35.19     -37.50
   YBADJ    STACK1    34.47     32.89   30.31      26.81     22.50      17.50
            STACK1    11.97      6.08    0.00      -6.08    -11.97     -17.50
            STACK1   -22.50     26.81  -30.31     -32.89    -34.47     -35.00
            STACK1   -34.47   -32.89   -30.31     -26.81    -22.50     -17.50
            STACK1   -11.97     -6.08    0.00       6.08     11.97      17.50
            STACK1    22.50     26.81   30.31      32.89     34.47      35.00
   SRCGROUP ALL
SO FINISHED
```

> 上述代码按原文保留。原文这一示例使用了 `BUILDHTS` 和 `BUILDWTS` 写法，而本章其他示例和正式关键字说明中使用 `BUILDHGT`、`BUILDWID`。实际建模应以第 3 章和附录 A 的正式语法为准。

注释行给 `SRCPARAM` 的烟囱参数添加了列标题：

- `QS`：排放速率，单位 g/s；
- `HS`：烟囱高度，单位 m；
- `TS`：烟囱出口温度，单位 K；
- `VS`：出口速度，单位 m/s；
- `DS`：烟囱直径，单位 m。

污染源参数记录的完整说明及各污染源类型所需参数清单，见第 3.3 节和附录 A。

SO 路径还可输入其他可选数据，例如为排放随以下因素变化的污染源指定可变排放速率系数：

- 月份；
- 季节；
- 一天中的小时；
- 季节与小时的组合。

详见第 3.3.11 节。需要输入的系数数量取决于所选变化方式，系数既可用于单个污染源，也可用于一定范围内的污染源。
