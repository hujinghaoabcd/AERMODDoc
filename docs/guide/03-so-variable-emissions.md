---
title: 3.3 SO 污染源路径：城市与可变排放
sidebarDepth: 3
---

# 3.3 SO 污染源路径：城市与可变排放

> 对应 EPA 2023版用户指南第3章 SO路径完整译文（英文原文印刷页码3-61至3-127）。路径标识、关键字、次级关键字、参数名、源类型、文件名和控制文件语法保留英文；法规应用应以EPA英文原文及当前模型版本为准。

<a id="so-3-3-10"></a>
## 3.3.10 指定城市源

AERMOD 可考虑城市区域增强地表加热对稳定条件下污染物扩散的影响。一个或多个城市区域的总体参数通过 CO 路径 `URBANOPT` 定义；SO 路径 `URBANSRC` 用于指定哪些污染源采用城市效应，以及多城市情形下各源对应哪一个城市区域。

未列入 `URBANSRC` 的污染源按非城市源处理。

### 多个城市区域

```text
SO URBANSRC UrbanID SrcID's and/or SrcRng's
```

### 单个城市区域

```text
SO URBANSRC SrcID's and/or SrcRng's
```

或将全部源设为城市源：

```text
SO URBANSRC ALL
```

**类型：**可选，可重复。  
**顺序：**普通记录必须位于相应源的 `LOCATION` 之后。

参数含义：

- `UrbanID`：在 `CO URBANOPT` 中定义的城市区域 ID，最长 8 个字符；仅多城市区域时使用；
- `SrcID`、`SrcRng`：采用该城市区域效应的单个源 ID 和/或源范围。

单城市区域的语法与旧版 AERMOD 相同，因此现有控制文件无需修改。从 12060 版本开始，单城市区域应用可使用 `URBANSRC ALL` 将全部污染源设为城市源。由于 `ALL` 在预设置阶段识别，它在 SO 路径中的位置不受普通顺序限制。

---

<a id="so-3-3-11"></a>
## 3.3.11 指定可变排放系数：EMISFACT

AERMOD 可为单个污染源或源范围指定随时间或风速变化的排放倍率。

**语法：**

```text
SO EMISFACT SrcID (or SrcRange) Qflag Qfact(i), i=1,n
```

**类型：**可选，可重复。  
**顺序：**必须位于相应源的 `LOCATION` 之后。

`SrcRange` 的源范围解释规则见第 3.3.9 节。

`Qflag` 必须使用下列次级关键字之一，`Qfact(i)` 是按规定顺序输入的排放倍率数组。

| `Qflag` | 排放变化方式 | n |
|---|---|---:|
| `SEASON` | 按季节 | 4 |
| `MONTH` | 按月份 | 12 |
| `HROFDY` | 按一天中的小时 | 24 |
| `WSPEED` | 按风速类别 | 6 |
| `SEASHR` | 按季节和小时 | 96 |
| `HRDOW` | 按小时和三类星期日型：周一至周五、星期六、星期日 | 72 |
| `HRDOW7` | 按小时和星期一至星期日七天分别变化 | 168 |
| `SHRDOW` | 按季节、小时和三类星期日型 | 288 |
| `SHRDOW7` | 按季节、小时和星期七天分别变化 | 672 |
| `MHRDOW` | 按月份、小时和三类星期日型 | 864 |
| `MHRDOW7` | 按月份、小时和星期七天分别变化 | 2016 |

季节输入顺序为：冬季、春季、夏季、秋季。这里的季节基于北半球：

- 冬季：12 月、1 月、2 月；
- 春季：3 月、4 月、5 月；
- 夏季：6 月、7 月、8 月；
- 秋季：9 月、10 月、11 月。

南半球应用应将南半球冬季倍率填入 AERMOD 的夏季位置，南半球春季倍率填入秋季位置，其他季节相应转换。

`WSPEED` 的风速类别可通过 ME 路径 `WINDCATS` 定义。未定义时，前五类默认上限为：

```text
1.54, 3.09, 5.14, 8.23, 10.8 m/s
```

第六类无上限。

`EMISFACT` 可重复任意次数，并支持 `n*value` 的重复值写法。

### HRDOW 示例

每一种日型依次输入 24 个小时倍率，顺序为工作日、星期六、星期日：

```text
** 工作日：小时 1-5，6，7-17，18，19-24
SO EMISFACT STK1 HRDOW 5*0.3 0.5 11*1.0 0.5 6*0.3

** 星期六
SO EMISFACT STK1 HRDOW 5*0.3 0.5 11*1.0 0.5 6*0.3

** 星期日
SO EMISFACT STK1 HRDOW 5*0.3 0.5 11*1.0 0.5 6*0.3
```

### HRDOW7 示例

按星期一、星期二、……、星期六、星期日顺序，分别输入 24 个小时倍率：

```text
** 星期一
SO EMISFACT STK1 HRDOW7 5*0.3 0.5 11*1.0 0.5 6*0.3
** 星期二
SO EMISFACT STK1 HRDOW7 5*0.3 0.5 11*1.0 0.5 6*0.3
...
** 星期六
SO EMISFACT STK1 HRDOW7 5*0.3 0.5 11*1.0 0.5 6*0.3
** 星期日
SO EMISFACT STK1 HRDOW7 5*0.3 0.5 11*1.0 0.5 6*0.3
```

### MHRDOW 示例

对工作日、星期六、星期日分别输入 12 个月，每个月 24 个小时倍率：

```text
** 工作日：JAN FEB MAR APR MAY JUN ... NOV DEC
SO EMISFACT STK1 MHRDOW 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
** 星期六
SO EMISFACT STK1 MHRDOW 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
** 星期日
SO EMISFACT STK1 MHRDOW 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
```

### MHRDOW7 示例

按星期一至星期日分别输入 12 个月、每月 24 个倍率：

```text
** 星期一：JAN FEB MAR APR MAY JUN ... NOV DEC
SO EMISFACT STK1 MHRDOW7 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
** 星期二
SO EMISFACT STK1 MHRDOW7 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
...
** 星期六
SO EMISFACT STK1 MHRDOW7 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
** 星期日
SO EMISFACT STK1 MHRDOW7 24*1.0 24*0.8 24*0.6 24*0.8 24*1.0 24*0.8 ... 24*0.6 24*0.8
```

---

<a id="so-3-3-12"></a>
## 3.3.12 指定逐小时排放速率文件：HOUREMIS

SO 路径通过 `HOUREMIS` 输入逐小时排放速率。一次 AERMOD 运行目前只能使用一个逐小时排放文件。

**语法：**

```text
SO HOUREMIS Emifil Srcid's (and/or Srcrng's)
```

**类型：**可选，可重复。  
**顺序：**必须位于相应源的 `LOCATION` 之后。

参数含义：

- `Emifil`：逐小时排放文件名，默认程序设置下最长 200 个字符；含空格时可用双引号括起；
- `Srcid`、`Srcrng`：该文件包含逐小时排放数据的污染源或源范围。

控制文件可以使用多条 `HOUREMIS` 来列出更多污染源，但所有记录必须引用同一个文件名。

### 基本记录格式

逐小时排放文件中的每条记录一般包括：

```text
SO HOUREMIS Year Month Day Hour SrcID EmissionRate ...
```

后续参数因源类型而异。

#### POINT、POINTHOR、POINTCAP

除逐小时排放速率外，还必须输入：

```text
StackExitTemperature(K) StackExitVelocity(m/s)
```

模型继续使用 `SO SRCPARAM` 中定义的烟囱排放高度和烟囱内径，但使用逐小时文件中的排放速率、出口温度和出口速度。

#### VOLUME、AREA、AREAPOLY、AREACIRC、LINE

从 09292 版本开始，可在逐小时文件中改变排放高度和初始扩散尺度。

- `VOLUME` 可逐小时改变排放速率、排放高度、`Syinit`、`Szinit`；
- `AREA` 类和 `LINE` 可逐小时改变排放速率、排放高度和 `Szinit`。

#### 飞机源扩展参数

从 23132 版本开始，`ARCFTOPT` `ALPHA` 选项可对表示为 `AREA`、`AREAPOLY`、`AREACIRC`、`LINE` 或 `VOLUME` 的飞机排放考虑动量和浮力造成的烟羽抬升。

由 `ARCFTSRC` 标识为飞机源的每个 `AREA` 或 `VOLUME` 源，在每个小时的排放记录末尾必须按下列顺序附加：

| 参数 | 含义 |
|---|---|
| `MFUEL` | 燃油消耗速率，g/s |
| `THRUST` | 飞机推力，N |
| `VAA` | 飞机速度，m/s |
| `AFR` | 空燃比 |
| `BYPR` | 涡扇发动机旁通比，应大于 0；轴功率发动机填 `-999` |
| `RPWR` | 额定功率，kW；涡扇发动机填 `-99999`，轴功率发动机应大于 0 |
| `SRCANGLE` | 空中源着陆或起飞轨迹与地面的夹角，度 |

这些参数必须出现在每个飞机源的每个小时记录中；非飞机 `AREA` 或 `VOLUME` 源不得包含这些字段。字段过多或过少都会触发致命错误。

#### RLINE 与 RLINEXT

从 19191 版本开始，可逐小时改变排放高度和初始扩散。是否使用增强格式，由模型根据每个源的第一条 `HOUREMIS` 记录判断。一旦第一条记录包含附加参数，后续所有记录都必须包含，除非该小时数据缺失。

#### BUOYLINE

若对浮力线源输入逐小时排放：

- 构成浮力线源的每一条独立 `BUOYLINE`，每个小时都必须出现在文件中；
- 每条线的逐小时排放速率后必须输入该线的浮力参数，单位 m⁴/s³；
- 单条线浮力可在同一小时不同线之间变化，也可随小时变化；
- AERMOD 根据组内各独立线的逐小时浮力，计算该浮力线源当小时的平均浮力。

### 文件解析与日期、源顺序要求

逐小时排放文件采用与控制文件相同的解析程序，因此：

- 各字段至少用一个空格分隔；
- 除此之外格式较灵活；
- 每行可以省略 `SO HOUREMIS`，但 `Year` 等参数不得早于第 13 列开始；
- 日期必须与气象输入文件完全一致；
- 源 ID 必须对应 `SO LOCATION` 中定义的源，并与 `aermod.inp` 中源定义顺序一致。

AERMOD 检查逐小时排放文件与气象数据的日期是否匹配。使用 `ME DAYRANGE` 或 `ME STARTEND` 时，不必在每次运行中处理整个排放文件；但文件中所有日期，包括本次处理和跳过的日期，都必须与气象文件一致。

### 点源逐小时文件示例

```text
SO HOUREMIS 88 8 16 1 STACK1 52.5 382.60 12.27
SO HOUREMIS 88 8 16 1 STACK2 44.3 432.33 22.17
SO HOUREMIS 88 8 16 2 STACK1 22.3 377.88  9.27
SO HOUREMIS 88 8 16 2 STACK2 42.2 437.68 19.67
SO HOUREMIS 88 8 16 3 STACK1 51.5 373.72 11.87
SO HOUREMIS 88 8 16 3 STACK2 41.3 437.28 18.77
SO HOUREMIS 88 8 16 4 STACK1 36.0 374.83  9.63
SO HOUREMIS 88 8 16 4 STACK2 43.7 437.68 18.23
```

### VOLUME 与 AREA 逐小时高度和扩散示例

```text
SO HOUREMIS 88 3 1 1 VOL1  500.0 2.0 2.0 2.0
SO HOUREMIS 88 3 1 1 AREA1  5.000 2.0 2.0
SO HOUREMIS 88 3 1 2 VOL1  500.0 2.0 2.0 3.0
SO HOUREMIS 88 3 1 2 AREA1  5.000 2.0 3.0
SO HOUREMIS 88 3 1 3 VOL1  500.0 2.0 2.0 4.0
SO HOUREMIS 88 3 1 3 AREA1  5.000 2.0 4.0
```

### 缺失排放数据

对于 `POINT`、`POINTHOR`、`POINTCAP`，若某小时排放速率、出口温度或出口速度中任何字段为空，模型将该小时视为排放数据缺失，并把相关参数设为零。由于排放速率为零，该源在该小时不进行浓度计算。

对于采用增强逐小时格式的其他源，缺失小时应在源 ID 之后将排放速率及其后的全部字段留空。


---

<a id="so-3-3-13"></a>
## 3.3.13 调整排放速率与输出单位

AERMOD 的默认排放速率单位为：

- `POINT`、`POINTHOR`、`POINTCAP`、`VOLUME`：g/s；
- `RLINEXT`：g/(s·m)；
- `AREA`、`LINE`、`OPENPIT`、`RLINE`：g/(s·m²)。

浓度计算默认将输入排放换算为 μg/m³，使用的默认浓度单位因子为：

```text
1.0E06
```

### EMISUNIT

`EMISUNIT` 可设置其他单位换算因子和输出标签。

**语法：**

```text
SO EMISUNIT Emifac Emilbl Conlbl
```

**类型：**可选，不可重复。  
**顺序：**必须位于污染源 `LOCATION` 之后。

参数含义：

- `Emifac`：排放速率单位换算因子；
- `Emilbl`：排放输入单位标签，最长 40 个字符；
- `Conlbl`：浓度输出单位标签，最长 40 个字符。

例如，输入单位为 g/s、希望输出 mg/m³ 时：

```text
SO EMISUNIT 1.0E3 GRAMS/SEC MILLIGRAMS/M**3
```

因为 1 g = 1000 mg。

`Emifac` 应用于该次运行的全部污染源。控制文件以一个或多个空格分隔字段，因此标签内部不能有空格。不要使用：

```text
GRAMS PER SECOND
```

应使用：

```text
GRAMS/SECOND
```

或：

```text
GRAMS-PER-SECOND
```

一次运行同时输出浓度和沉降时，应分别使用前述 `CONCUNIT` 和 `DEPOUNIT`。

### RLEMCONV

从 19191 版本开始，`RLINE` 和 `RLINEXT` 可以使用每条道路链路每小时克数作为排放输入单位。

**语法：**

```text
SO RLEMCONV
```

**类型：**可选，不可重复。  
**顺序：**可位于 SO 路径任意位置。

该关键字没有其他参数。出现后，模型假定所有 `RLINE` 和 `RLINEXT` 排放单位均为：

```text
g/(h·link)
```

模型在内部将其换算为原生单位，再按正常流程计算。

---

---

### 本路径页面导航

- 上一页：[← 3.3 SO 污染源路径：背景浓度与建筑物下洗](./03-so-background-downwash.md)
- 下一页：[3.3 SO 污染源路径：外部文件、源组与特殊源 →](./03-so-groups-special.md)
- 返回：[3.1 关键字总索引](./03-keyword-index.md)
