---
title: 3.2 CO 控制路径：NO₂ 转换输入
sidebarDepth: 3
---

# 3.2 CO 控制路径：NO₂ 转换输入

> 对应 EPA 2023版用户指南第3章 CO路径完整译文。控制文件关键字、次级关键字、参数名、文件名和模型语法保留英文；法规应用应以EPA英文原文及当前模型版本为准。

<a id="co-3-2-5"></a>
## 3.2.5 NO₂ 转换选项的输入参数

本节说明 AERMOD 与以下 NO 向 NO₂ 转换方法有关的输入：

- 法规选项：`PVMRM`、`OLM`、`ARM2`；
- `ALPHA` 选项：`TTRM`、`TTRM2`；
- 第 3 层级 `BETA` 选项：`GRSM`。

`TTRM` 和 `GRSM` 均从 21112 版本起作为 `ALPHA` 功能加入。自 22112 版本起：

- `GRSM` 更新为 `BETA` 功能；
- 新增 `TTRM2`，允许 `TTRM` 与 `ARM2`、`PVMRM` 或 `OLM` 同时使用。

作为独立选项时，`TTRM` 主要只对近场受体有效。将 `TTRM2` 与 `ARM2`、`PVMRM` 或 `OLM` 配对时：

- 近场受体采用 `TTRM`；
- 其他受体采用所配对的方法。

尽管 `TTRM` 已通过 `TTRM2` 与其他方法集成，模型仍保留独立的 `TTRM` 关键字，供测试和诊断使用。

`TTRM2` 不能与 `GRSM` 配对。

还需注意，自 16216r 版本起，`ARM2` 已取代原来的第 2 层级环境比值法 `ARM`。`ARM` 不再是 AERMOD 可用选项。

AERMOD 中 PVMRM 算法的技术说明见《AERMOD 模型理论与算法说明》（EPA，2023a）。NO₂ 法规模拟选项的更多信息见《NO₂ 相关 AERMOD 修改技术支持文件》（EPA，2015）。PVMRM 的早期开发背景见 Hanrahan（1999a、1999b）。

`ARM2` 基于美国石油学会 API 资助的研究（API，2013）。该研究建立了环境 NOx 浓度与环境 NO₂ 浓度之间的经验关系，并据此调整模拟得到的 NOx 浓度。

与 `PVMRM` 和 `OLM` 相比，`ARM2` 的一个重要区别是：它不要求用户输入背景臭氧 O₃ 浓度或烟囱内 NO₂/NOx 比值，而这两类数据是 `PVMRM` 与 `OLM` 所要求的。

但是，当所模拟污染源的烟囱内 NO₂/NOx 比值已知较高时，`ARM2` 所使用的默认最低比值可能并不适合。

`ARM2` 会将一次模型运行中所有污染源的 NOx 影响相加，以确定应用于每个 `SRCGROUP` 污染源组的 NO₂/NOx 比值。

控制文件必须包含 `SRCGROUP`，并至少定义一个污染源组。不过，如果省略 `ALL` 污染源组，AERMOD 会在内部自动假定存在 `ALL` 组，并对这一隐含组应用 `ARM2`。此时模型会给出警告，说明缺少 `ALL`，但并不把它视为必需输入错误。

因此，`ARM2` 的 NO₂/NOx 比值并不是分别根据每个污染源组自身的 NOx 影响计算，而是依据所有污染源的总 NOx 影响计算。

例如，若采用 `ARM2` 模拟 5 个烟囱的 NOx 排放，但只针对其中一个烟囱定义一个污染源组，模型将：

1. 计算全部 5 个烟囱的总 NOx 影响；
2. 使用 API（2013）所述的五阶多项式，根据总 NOx 影响计算经验 NO₂/NOx 比值；
3. 将该比值乘以单烟囱污染源组自身的离散 NOx 影响，得到该组最终 NO₂ 浓度。

`ARM2` 被实现为法规第 2 层级选项；`PVMRM` 与 `OLM` 被实现为法规第 3 层级筛选选项。因此，三种方法均可与 `DFAULT` 同时使用。

`TTRM/TTRM2` 与 `GRSM` 分别属于非法规 `ALPHA` 和 `BETA` 功能，不能与 `DFAULT` 同时使用。`TTRM/TTRM2` 作为 `ALPHA` 功能，必须同时指定 `ALPHA`；`GRSM` 必须同时指定 `BETA`。

除 `GRSM` 外，`OLM`、`PVMRM`、`ARM2` 和 `TTRM/TTRM2` 不会应用于通过 SO 路径 `BACKGRND` 输入的背景 NO₂ 浓度。若提供背景 NO₂，模型先完成 NO—NO₂ 转换，再将背景 NO₂ 加到模拟 NO₂ 浓度上。

`GRSM` 的 NO₂ 模拟浓度则根据以下过程造成的 NO₂ 净生成量计算：

- 烟囱内初始 NO₂ 比例；
- 臭氧卷入以及 NOx 向 NO₂ 的转换；
- NO₂ 光解为 NO；
- NOx 烟羽从污染源迁移到受体所需的时间。

并非所有 NO₂ 转换方法都已针对 AERMOD 的全部污染源类型实现。表 3-2 汇总各源类型可用和不可用的方法。

**表 3-2 不同 AERMOD 污染源类型已实现的 NO₂ 转换选项**

| AERMOD 源类型 | 已实现的 NO₂ 选项 | 未实现并会发出警告的选项 |
|---|---|---|
| `POINT`，包括 `POINTCAP`、`POINTHOR` | 全部选项 | 无 |
| `AREA`，包括 `AREAPOLY`、`AREACIRC`、`LINE` | 全部选项 | 无 |
| `VOLUME` | 全部选项 | 无 |
| `OPENPIT` | `ARM2`、`PVMRM`、`OLM`、`TTRM`、`GRSM` | `TTRM2`，无论单独使用还是与 `ARM2`、`OLM`、`PVMRM` 配对；单独使用 `TTRM2` 会产生零值 |
| `RLINE`、`RLINEXT` | `ARM2` | `PVMRM`、`OLM`、`TTRM`、`TTRM2`、`GRSM` |
| `BUOYLINE` | `ARM2` | `PVMRM`、`OLM`、`TTRM`、`TTRM2`、`GRSM` |
| `SWPOINT` | 无 | `ARM2`、`PVMRM`、`OLM`、`TTRM`、`TTRM2`、`GRSM` |

第 3.3.7 节介绍了用于测试和评价的 `ALPHA` 模型选项 `PSDCREDIT`。该功能使用 PVMRM 计算考虑 PSD 抵扣量的允许增量占用。其特殊污染源分组要求也见第 3.3.7 节。

### 3.2.5.1 为 `PVMRM`、`OLM`、`TTRM/TTRM2` 和 `GRSM` 指定臭氧浓度

这些 NO₂ 转换方法所需的背景臭氧浓度可以通过三种方式输入：

1. `OZONEVAL`：在 CO 路径输入单一值；
2. `O3VALUES`：在 CO 路径输入随时间变化的值；
3. `OZONEFIL`：在 CO 路径指定独立的逐小时臭氧数据文件。

采用 `PVMRM`、`OLM`、`TTRM/TTRM2` 或 `GRSM` 时，必须通过 `OZONEVAL`、`O3VALUES` 或 `OZONEFIL` 中至少一种方式指定背景臭氧。

`OZONEVAL` 或 `O3VALUES` 可以与 `OZONEFIL` 同时使用。此时，`OZONEVAL` 或 `O3VALUES` 中输入的值用于替代逐小时臭氧文件中的缺失小时。

强烈建议用户在使用 `OZONEFIL` 时同时使用 `OZONEVAL` 或 `O3VALUES`，为逐小时文件中的缺失臭氧浓度提供替代值。

自 13350 版本起，背景臭氧浓度可以按风向扇区变化。采用分扇区背景臭氧时，通过 `O3SECTOR` 定义扇区。

#### `O3SECTOR`

**语法：**

```text
CO O3SECTOR StartSect1 StartSect2 ... StartSectN
```

其中 $N\leq 6$。

**类型：**可选，不可重复。

分扇区背景浓度的最小扇区宽度为 30°。扇区宽度小于 60°时，模型会发出警告。

模型依据气流矢量选择背景扇区，即依据地表气象文件中的风向确定下风方向。

#### `OZONEVAL`

**无分扇区时：**

```text
CO OZONEVAL O3Value (O3Units)
```

**采用分扇区时：**

```text
CO OZONEVAL SECTx O3Value (O3Units)
```

其中 $x\leq 6$。

**类型：**可选，不可重复。

参数说明：

- `O3Value`：背景臭氧浓度；
- `O3Units`：可选单位，可为 `PPM`、`PPB` 或 `UG/M3`；
- `SECTx`：`O3SECTOR` 中定义的用户扇区，例如 `SECT1`、`SECT2`，直至 `SECTx`；$x$ 为整数，对应第 $x$ 个扇区。

若省略 `O3Units`，模型默认臭氧单位为 `UG/M3`。

若采用 `PPM` 或 `PPB`，模型按参考温度 25 ℃和参考气压 1013.25 mb 转换为 `UG/M3`。

如果已定义 `O3SECTOR`，一条 `OZONEVAL` 记录只能用于一个扇区。需要输入多个扇区时，应使用可重复的 `O3VALUES`。

#### `O3VALUES`

`O3VALUES` 的形式与 SO 路径中用于输入时变排放率的 `EMISFACT` 类似。

**无分扇区时：**

```text
CO O3VALUES O3Flag O3values(i), i=1,n
```

**采用分扇区时：**

```text
CO O3VALUES SECTx O3Flag O3values(i), i=1,n
```

其中 $x\leq 6$。

**类型：**可选，可重复。

`SECTx` 指定由 `O3SECTOR` 定义的适用扇区。`O3Flag` 必须为下列次级关键字之一。括号中为所需数值个数：

| `O3Flag` | 变化方式 | 数值个数 |
|---|---|---:|
| `ANNUAL` | 年值；以 PPB 表示时等价于 `OZONEVAL` | 1 |
| `SEASON` | 随季节变化 | 4 |
| `MONTH` | 随月份变化 | 12 |
| `HROFDY` | 随一天中的小时变化 | 24 |
| `WSPEED` | 随风速类别变化 | 6 |
| `SEASHR` | 随季节和一天中的小时变化 | 96 |
| `HRDOW` | 随小时和星期类型变化：工作日、周六、周日 | 72 |
| `HRDOW7` | 随小时和星期一至星期日分别变化 | 168 |
| `SHRDOW` | 随季节、小时和星期类型变化：工作日、周六、周日 | 288 |
| `SHRDOW7` | 随季节、小时和星期一至星期日分别变化 | 672 |
| `MHRDOW` | 随月份、小时和星期类型变化：工作日、周六、周日 | 864 |
| `MHRDOW7` | 随月份、小时和星期一至星期日分别变化 | 2016 |

`O3values` 数组包含臭氧浓度值，具体个数由 `O3Flag` 决定。

季节顺序固定为：

1. 冬季：12 月、1 月、2 月；
2. 春季：3 月、4 月、5 月；
3. 夏季：6 月、7 月、8 月；
4. 秋季：9 月、10 月、11 月。

`WSPEED` 使用的风速类别可以通过 ME 路径 `WINDCATS` 定义。如果未使用 `WINDCATS`，前五个默认风速类别的上限依次为：

```text
1.54, 3.09, 5.14, 8.23, 10.8 m/s
```

第六类无上限。

`O3VALUES` 可以重复任意次数，以输入全部臭氧值；数值参数也可以使用重复值写法。

对于包含小时和星期的选项，例如 `HRDOW`、`SHRDOW`、`SHRDOW7`，输入值的嵌套顺序为：

1. 一天中的小时；
2. 季节或月份，如适用；
3. 星期类别或具体星期。

对于 `HRDOW`、`SHRDOW` 和 `MHRDOW`，星期类别顺序为：

1. 工作日，星期一至星期五；
2. 星期六；
3. 星期日。

对于 `HRDOW7`、`SHRDOW7` 和 `MHRDOW7`，顺序为星期一、星期二，依次至星期日。

第 3.3.11 节使用 `EMISFACT` 给出了相同输入顺序的示例。

若未指定 `OZONUNIT`，`O3VALUES` 中的臭氧浓度默认单位为 `PPB`。

#### `OZONUNIT`

**语法：**

```text
CO OZONUNIT OzoneUnits
```

**类型：**可选，不可重复。

`OzoneUnits` 可为：

- `PPB`；
- `PPM`；
- `UG/M3`。

该单位只应用于通过 `O3VALUES` 输入的臭氧浓度。若未指定 `OZONUNIT`，默认使用 `PPB`。

以 `PPB` 或 `PPM` 输入的臭氧浓度按 25 ℃、1013.25 mb 转换为 `UG/M3`。

#### `OZONEFIL`

逐小时臭氧浓度可通过可选关键字 `OZONEFIL` 输入。

**无分扇区时：**

```text
CO OZONEFIL O3FileName (O3Units) (O3Format)
```

**采用分扇区时：**

```text
CO OZONEFIL SECTx O3FileName (O3Units) (O3Format)
```

其中 $x\leq 6$。

**类型：**可选，不可重复。

参数说明：

- `O3FileName`：逐小时臭氧浓度文件名；
- `O3Units`：可选单位，`PPM`、`PPB` 或 `UG/M3`，默认 `UG/M3`；
- `O3Format`：可选的 Fortran 读取格式；
- `SECTx`：由 `O3SECTOR` 定义的适用扇区，例如 `SECT1` 表示第一个下风向扇区。

按照 AERMOD 默认参数，文件名最长 200 个字符。若文件名包含空格，可在文件名前后使用双引号作为字段界定符。

除非通过 `O3Format` 另行指定，逐小时臭氧文件必须按以下顺序包含：

```text
年  月  日  小时  臭氧浓度
```

年份可为 2 位或 4 位。

如果通过 `O3Format` 指定 Fortran 格式：

- 年、月、日、小时必须使用整数格式 `I` 读取；
- 臭氧浓度必须使用实数格式 `F`、`E` 或 `D` 读取。

例如：

```text
(4I2,F8.3)
```

没有小数点的臭氧值可以使用 `Fx.0` 读取，其中 `x` 为字段长度。但是，如果原始数值没有小数点，而指定的格式包含小数位，可能产生错误解释。例如，用 `F4.1` 读取 `1234` 时，模型会解释为 `123.4`。

`O3Format` 必须包含左右圆括号。如果格式字符串中含空格，可以用双引号界定整个字段。

如果格式不符合要求，模型会发出警告。若使用整数格式读取实数，或使用实数格式读取整数，AERMOD 还可能在读取文件时产生致命错误。

若省略 `O3Format`，模型采用 Fortran 自由格式读取，即假定各字段以逗号或空格分隔，并按上述默认顺序排列。

臭氧文件的日期序列必须与逐小时气象文件的日期序列一致。

如同 `OZONEVAL`，采用 `PPM` 或 `PPB` 时，模型按 25 ℃、1013.25 mb 转换为 `UG/M3`。

臭氧文件中小于 0 或大于等于 `900.0` 的浓度被视为缺失值。

若同时通过 `OZONEVAL` 和/或 `O3VALUES` 提供背景臭氧，模型会用相应值替代文件中的缺失小时。若两者均未使用，则在臭氧缺失小时，模型假定 NO 完全转换为 NO₂。

在稳定小时，AERMOD 会对 NO 转换采用最低臭氧值。该最低值取以下两者中的较大值：

- 40 ppb；
- 前 24 小时臭氧数据中的最大小时值。

可以通过 `NOMINO3` 关闭这一最低臭氧限制。与所有 NO₂ 选项一样，是否采用该功能应与相应审查主管机构协商确定。

> **关于 OLM 的说明：** Cole 和 Summerhays（1979）提出的 OLM 先将总 NOx 分为烟囱直接排放的热力学 NO₂ 部分，以及其余假定为 NO、可与 O₃ 反应的部分。如果环境 O₃ 大于被假定为 NO 的 NOx 部分，则全部 NO 转换为 NO₂；否则，NO 向 NO₂ 的转换量受可用 O₃ 限制。
>
> AERMOD 在 OLM 处理中，仅在“臭氧受限”小时把用户定义的背景臭氧纳入浓度计算，即大气臭氧不足以完成 NOx 化学反应的小时。是否属于臭氧受限小时，取决于背景臭氧浓度与 NO₂ 排放量乘以用户定义的烟囱内 NO₂/NOx 比值之间的相对大小。
>
> 因此，某些输入组合可能完全不产生臭氧受限小时。若用户定义的烟囱内 NO₂/NOx 比值和/或排放率较低，修改背景臭氧浓度可能在输出浓度中看不出影响。该行为不适用于 PVMRM。

### 3.2.5.2 为 `GRSM` 指定 NOx 背景浓度

`GRSM` 所需的背景 NOx 浓度输入方式与背景臭氧类似，可以通过：

1. `NOXVALUE`：输入单一值；
2. `NOX_VALS`：输入随时间变化的值；
3. `NOX_FILE`：指定独立逐小时 NOx 文件。

采用 `GRSM` 时，用户可以通过其中一种方式提供背景 NOx。

`NOXVALUE` 或 `NOX_VALS` 可以与 `NOX_FILE` 同时使用。此时，前两者用于替代逐小时文件中的缺失背景 NOx。强烈建议在使用 `NOX_FILE` 时，同时提供 `NOXVALUE` 或 `NOX_VALS` 作为缺失值替代。

如果完全没有提供 NOx 输入，`GRSM` 将假定 NOx 处于平衡状态。

与背景臭氧相同，背景 NOx 可以按风向扇区变化。扇区通过 `NOXSECTR` 定义。

#### `NOXSECTR`

**语法：**

```text
CO NOXSECTR StartSect1 StartSect2 ... StartSectN
```

其中 $N\leq 6$。

**类型：**可选，不可重复。

分扇区背景 NOx 的最小扇区宽度为 30°；宽度小于 60°时模型会发出警告。模型依据地表气象文件中的风向和下风向气流矢量选择适用扇区。

#### `NOXVALUE`

**无分扇区时：**

```text
CO NOXVALUE NOXValue (NOXUnits)
```

**采用分扇区时：**

```text
CO NOXVALUE SECTx NOXValue (NOXUnits)
```

其中 $x\leq 6$。

**类型：**可选，不可重复。

- `NOXValue`：背景 NOx 浓度；
- `NOXUnits`：可选单位，可为 `PPM`、`PPB` 或 `UG/M3`；
- `SECTx`：`NOXSECTR` 定义的第 $x$ 个扇区。

若省略单位，默认使用 `UG/M3`。采用 `PPM` 或 `PPB` 时，模型按 25 ℃、1013.25 mb 转换为 `UG/M3`。

#### `NOX_VALS`

`NOX_VALS` 与前述 `O3VALUES` 类似。

**无分扇区时：**

```text
CO NOX_VALS NOXFlag NOXvalues(i), i=1,n
```

**采用分扇区时：**

```text
CO NOX_VALS SECTx NOXFlag NOXvalues(i), i=1,n
```

其中 $x\leq 6$。

**类型：**可选，可重复。

`NOXFlag` 可选项及数值个数如下：

| `NOXFlag` | 变化方式 | 数值个数 |
|---|---|---:|
| `ANNUAL` | 年值；以 PPB 表示时等价于 `NOXVALUE` | 1 |
| `SEASON` | 随季节变化 | 4 |
| `MONTH` | 随月份变化 | 12 |
| `HROFDY` | 随一天中的小时变化 | 24 |
| `WSPEED` | 随风速类别变化 | 6 |
| `SEASHR` | 随季节和小时变化 | 96 |
| `HRDOW` | 随小时和星期类型变化：工作日、周六、周日 | 72 |
| `HRDOW7` | 随小时和星期一至星期日分别变化 | 168 |
| `SHRDOW` | 随季节、小时和星期类型变化 | 288 |
| `SHRDOW7` | 随季节、小时和星期一至星期日分别变化 | 672 |
| `MHRDOW` | 随月份、小时和星期类型变化 | 864 |
| `MHRDOW7` | 随月份、小时和星期一至星期日分别变化 | 2016 |

季节顺序、风速类别及小时/星期数据的嵌套顺序与 `O3VALUES` 完全相同。

若未使用 ME 路径 `WINDCATS`，前五个风速类别上限仍为：

```text
1.54, 3.09, 5.14, 8.23, 10.8 m/s
```

第六类无上限。

`NOX_VALS` 可以重复任意次数，并支持重复值写法。

若未指定 `NOX_UNIT`，`NOX_VALS` 中的 NOx 默认单位为 `PPB`。

#### `NOX_UNIT`

**语法：**

```text
CO NOX_UNIT NOXUnits
```

**类型：**可选，不可重复。

`NOXUnits` 可为 `PPB`、`PPM` 或 `UG/M3`。该关键字的单位设置只应用于 `NOX_VALS`。若未指定，默认单位为 `PPB`。

以 `PPB` 或 `PPM` 输入的 NOx 按 25 ℃、1013.25 mb 转换为 `UG/M3`。

#### `NOX_FILE`

**无分扇区时：**

```text
CO NOX_FILE NOXFileName (NOXUnits) (NOXFormat)
```

**采用分扇区时：**

```text
CO NOX_FILE SECTx NOXFileName (NOXUnits) (NOXFormat)
```

其中 $x\leq 6$。

**类型：**可选，不可重复。

- `NOXFileName`：逐小时 NOx 浓度文件名；
- `NOXUnits`：可选单位，`PPM`、`PPB` 或 `UG/M3`，默认 `UG/M3`；
- `NOXFormat`：可选 Fortran 读取格式；
- `SECTx`：适用下风向扇区。

文件名最长 200 个字符，包含空格时可使用双引号界定。

除非通过 `NOXFormat` 改变格式，逐小时文件字段顺序为：

```text
年  月  日  小时  NOx浓度
```

年份可为 2 位或 4 位。指定 Fortran 格式时，日期和小时字段必须用整数 `I` 格式读取，NOx 浓度必须用 `F`、`E` 或 `D` 实数格式读取，例如：

```text
(4I2,F8.3)
```

关于无小数点数值、格式中的小数位、圆括号和双引号的要求，与 `OZONEFIL` 相同。格式不符合要求时会产生警告；整数与实数格式错误匹配时可能产生致命错误。

若省略 `NOXFormat`，模型采用自由格式读取，假定字段由空格或逗号分隔。NOx 文件日期序列必须与逐小时气象文件一致。

文件中小于 0 的 NOx 浓度视为缺失。若提供了 `NOXVALUE` 和/或 `NOX_VALS`，模型使用相应值替代缺失小时；若均未提供，模型在 NOx 缺失小时假定 NOx 与 NO₂ 达到平衡。

### 3.2.5.3 指定环境平衡 NO₂/NOx 比值

适用于 `PVMRM`、`OLM` 和 `TTRM/TTRM2`。

`PVMRM` 默认采用环境平衡 NO₂/NOx 比值 0.90。自 11059 版本起，`OLM` 也采用 0.90；自 21112 版本起，`TTRM` 同样采用该默认值。

用户可通过 `NO2EQUIL` 指定不同于 0.90 的比值。

**语法：**

```text
CO NO2EQUIL NO2Equil
```

**类型：**可选，不可重复。

`NO2Equil` 为环境平衡 NO₂/NOx 比值，必须位于 `0.10—1.0`，包括端点。

### 3.2.5.4 指定默认烟囱内 NO₂/NOx 比值

适用于 `PVMRM`、`OLM`、`TTRM/TTRM2` 和 `GRSM`。

这些方法均要求指定烟囱内 NO₂/NOx 比值。

依据 EPA 2010 年 6 月 28 日关于 1 小时 NO₂ NAAQS 的指导文件（EPA，2010b），AERMOD 已修改为要求用户对 `OLM` 和 `PVMRM` 下的每个污染源明确指定烟囱内 NO₂/NOx 比值。模型不再自动假定 0.10 的默认烟囱内比值。

这一要求也延续到后来增加的 `TTRM/TTRM2` 和 `GRSM`。

用户可以：

- 通过 CO 路径 `NO2STACK` 为全部污染源指定默认比值；
- 通过 SO 路径 `NO2RATIO` 按污染源分别指定；
- 同时使用两者，并由 `NO2RATIO` 覆盖特定污染源的默认值。

**语法：**

```text
CO NO2STACK NO2Ratio
```

**类型：**可选，不可重复。

`NO2Ratio` 为默认烟囱内 NO₂/NOx 比值，必须位于 `0.0—1.0`，包括端点。除非某个污染源通过 SO 路径 `NO2RATIO` 另行覆盖，否则模型均采用该值。

尽管 `CO NO2STACK` 本身是可选关键字，但采用 `OLM`、`PVMRM`、`TTRM/TTRM2` 或 `GRSM` 时，每个污染源都必须通过以下一种或两种方式得到烟囱内比值：

- `CO NO2STACK`；
- `SO NO2RATIO`，见第 3.3.6.1 节。

---

### 本路径页面导航

- 上一页：[← 3.2 CO 控制路径：低风速与建筑物下洗](./03-co-lowwind-downwash.md)
- 下一页：[3.2 CO 控制路径：平均时间、城市与污染物 →](./03-co-averaging-urban.md)
- 返回：[3.1 关键字总索引](./03-keyword-index.md)
