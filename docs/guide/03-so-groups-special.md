---
title: 3.3 SO 污染源路径：外部文件、源组与特殊源
sidebarDepth: 3
---

# 3.3 SO 污染源路径：外部文件、源组与特殊源

> 对应 EPA 2023版用户指南第3章 SO路径完整译文（英文原文印刷页码3-61至3-127）。路径标识、关键字、次级关键字、参数名、源类型、文件名和控制文件语法保留英文；法规应用应以EPA英文原文及当前模型版本为准。

<a id="so-3-3-14"></a>
## 3.3.14 从外部文件引入污染源数据

用户可以通过 SO 路径的 `INCLUDED` 将污染源输入放在外部文件中。

**语法：**

```text
SO INCLUDED Incfil
```

**类型：**可选，可重复。

`INCLUDED` 可以位于 `SO STARTING` 和 `SO FINISHED` 之间的任意位置。但外部文件本身不能包含：

```text
SO STARTING
SO FINISHED
```

外部文件中的记录会被当作主控制文件的一部分处理。`Incfil` 为外部文件名，原程序说明中该字段最长 40 个字符。文件内容必须是有效的 SO 路径控制命令。

若处理外部文件时发生错误，错误消息会报告该外部文件中的行号。指定多个外部文件时，用户需要结合输入内容判断错误来自哪个文件。

若主控制文件的起始列已从第 1 列整体偏移，则外部文件中的控制命令也必须使用相同偏移量。

---

<a id="so-3-3-15"></a>
## 3.3.15 使用污染源组

AERMOD 允许把特定污染源的贡献合并为源组。一次运行可设置多个源组，例如：

- 正在申请许可的污染源；
- 消耗 PSD 增量的一组污染源；
- 用于与 NAAQS 比较的全部污染源。

每次运行至少必须有一个源组，通常可以是全部污染源。因此，除使用 `PSDCREDIT` 并改用 `PSDGROUP` 的情况外，`SRCGROUP` 是必需关键字。

`SRCGROUP` 与 `PSDGROUP` 不能同时使用。

**语法：**

```text
SO SRCGROUP Grpid Srcid's and/or Srcrng's
```

**类型：**条件必需，可重复。  
**顺序：**必须是 `SO FINISHED` 之前的最后一个关键字。

参数含义：

- `Grpid`：源组名称，最长 8 个字母数字字符；
- `Srcid`：组内单个源 ID；
- `Srcrng`：组内源 ID 范围，例如 `STACK1-STACK10`。

同一条记录可同时输入单个源和源范围。若一个源组需要多条记录，应重复路径、关键字和相同 `Grpid`。

### 特殊源组 ALL

`Grpid = ALL` 时，模型自动建立名为 `ALL` 的源组，包含本次运行的全部污染源：

```text
SO SRCGROUP ALL
```

用户也可以使用其他 `Grpid`，并在记录中显式列出所有源。

`ALL` 在 `BLPGROUP`、`OLMGROUP` 和 `SRCGROUP` 中具有不同的分组含义，应依据相应关键字解释。

源组数量在运行时动态分配，主要受可用内存和其他动态数组规模限制。

### EVENT 与源贡献分析

对于短期平均，AERMOD 的 EVENT 功能可用于分析某个污染源对源组总结果的贡献。由 `CO EVENTFIL` 生成 EVENT 输入时，会沿用 AERMOD 中定义的源组，但 EVENT 处理保留特定事件中各独立源的结果。

### BUOYLINE 与 SRCGROUP

对浮力线源，`SRCGROUP` 把构成一个浮力线源的各条独立 `BUOYLINE` 当作独立污染源处理。一个源组可以包含全部独立线，也可以只包含其中一部分；应使用各条线在 `LOCATION` 中的源 ID 指定。

### Tier 2/Tier 3 NO₂ 转换与源组

使用 Tier 2 或 Tier 3 NO₂ 转换并定义源组时，转换机制基于每个受体处**所有污染源的总 NOx 浓度**，而不是分别基于每个源组的 NOx 浓度。

---

<a id="so-3-3-16"></a>
## 3.3.16 指定海上平台下洗信息

> 仅适用于 `POINT`、`POINTHOR` 和 `POINTCAP`。

EPA 对深水和近岸水上排放源的近场影响评估，优选使用 Offshore and Coastal Dispersion（OCD）模型。原始平台下洗算法由 Petersen（1984）提出，后由 Hanna 和 Dicristofaro（1988）调整并纳入 OCD。OCD 的平台下洗算法随后被集成到 AERMOD，但仅适用于三种点源类型。

AERMOD 将 `SRCPARAM` 中的烟囱高度与 `PLATFORM` 参数结合，模拟平台对点源扩散的影响。控制文件中为某源 ID 指定 `PLATFORM` 后，对该源应用平台下洗。

**语法：**

```text
SO PLATFORM Srcid Zelp Hb Wb
```

**类型：**可选，可重复。  
**顺序：**必须位于相应源的 `LOCATION` 之后。

参数含义：

- `Srcid`：平台上 `POINT`、`POINTHOR` 或 `POINTCAP` 的源 ID；
- `Zelp`：平台底部高出海面的基底高度，单位 m；
- `Hb`：平台上最高实体或对下洗有影响的建筑物顶部高出海面的总高度，单位 m；
- `Wb`：比较平台侧视图与端视图时，从平台上能够影响下洗的最左侧、最右侧建筑物外缘之间得到的两个距离中的较小值，单位 m。

`Zelp` 与 OCD 输入一致，但在当前 AERMOD 平台下洗专用算法中并未实际使用。模型直接采用 `POINT`、`POINTHOR` 或 `POINTCAP` 所定义的完整源高度，不再按平台基底高度调整。

`Hb` 可理解为：

```text
平台底部高出海面高度 + 建筑物高出平台底部高度
```

平台下洗影响不随垂直于风向的平台尺寸进行调整，因此所有风向使用相同平台影响参数。

#### 图 3-4 平台参数定义示意

```text
                         建筑物顶部
                         ┌───────┐
                         │       │
海面 ~~~~~~~~~~~~~~~~~~~└───────┴────────
                         ↑       ↑
                         │       └─ Hb：海面到最高影响建筑物顶部
                         └───────── Zelp：海面到平台底部

俯视或侧视时，Wb 取能影响下洗的最外侧建筑物边缘间距中较小者。
```

平台上的点源必须输入全部参数。

平台点源**不使用 PRIME 建筑物下洗**。若同一源 ID 同时用于 `PLATFORM` 和普通建筑物下洗关键字，模型给出错误。

---

<a id="so-3-3-17"></a>
## 3.3.17 为 HBP 选项指定高浮力点源

> 仅适用于 `POINT`、`POINTHOR` 和 `POINTCAP`。

从 23132 版本开始，CO 路径 `MODELOPT` 增加 `HBP` `ALPHA` 选项，用于处理穿透对流混合层顶部的高浮力烟羽（Weil，2020；Warren 等，2022）。

在 `MODELOPT` 中指定 `HBP` 后，必须通过 SO 路径 `HBPSRCID` 标识采用该算法的污染源。

**语法：**

```text
SO HBPSRCID Srcid's and/or Srcrng's
```

或：

```text
SO HBPSRCID ALL
```

**类型：**条件必需，可重复。

可在同一记录中混合列出单个源 ID 和源范围。若一条记录不足，可重复 `SO HBPSRCID`。

`ALL` 表示对全部 `POINT`、`POINTHOR` 和 `POINTCAP` 应用 HBP。若 `HBPSRCID` 明确列出或通过 `ALL` 包含其他源类型，模型会忽略这些非点源，并生成信息消息说明被忽略的源类型。

---

<a id="so-3-3-18"></a>
## 3.3.18 指定飞机源

> 仅适用于 `AREA` 与 `VOLUME`，其中 `AREA` 范畴包括 `AREA`、`AREAPOLY`、`AREACIRC` 和 `LINE`。

从 23132 版本开始，`ARCFTOPT` `ALPHA` 选项可在飞机排放表示为 `VOLUME` 或面源时计算由动量和浮力造成的烟羽抬升。

由于飞机源需要附加参数，控制文件必须通过 SO 路径 `ARCFTSRC` 明确标识全部飞机源。

**语法：**

```text
SO ARCFTSRC Srcid's and/or Srcrng's
```

或：

```text
SO ARCFTSRC ALL
```

**类型：**条件必需，可重复。

单个源 ID、源范围可以位于同一记录。若一条记录不足，可重复路径和关键字。

`ALL` 表示对全部 `AREA` 和 `VOLUME` 类源应用 `ARCFTOPT`。模型运行中若包含其他源类型，且它们通过源 ID 或 `ALL` 被 `ARCFTSRC` 选中，则这些不适用的源会被忽略。

在 CO 路径指定 `ARCFTOPT` 时，`ARCFTSRC` 为必需关键字。未在 SO 路径标识任何飞机源会触发致命错误并终止处理。

飞机源每小时所需的 `MFUEL`、`THRUST`、`VAA`、`AFR`、`BYPR`、`RPWR` 和 `SRCANGLE` 参数，必须在 `HOUREMIS` 逐小时排放文件中输入，见第 3.3.12 节。

---

## SO 路径结束记录

完成污染源定义后，应以以下记录结束 SO 路径：

```text
SO FINISHED
```

普通运行中，`SRCGROUP` 必须位于其前；使用 `PSDCREDIT` 时，则由 `PSDGROUP` 取代 `SRCGROUP` 并位于其前。

---

### 本路径页面导航

- 上一页：[← 3.3 SO 污染源路径：城市与可变排放](./03-so-variable-emissions.md)
- 返回：[3.1 关键字总索引](./03-keyword-index.md)
