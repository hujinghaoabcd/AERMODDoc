---
title: 3.2.3—3.2.4　低风速与建筑物下洗
sidebarDepth: 3
---

### 3.2.3 低风速参数

AERMOD 自 18081 版本起加入 `ALPHA` 选项 `LOW_WIND`，并在 21112 和 22112 版本中更新，用于研究模型在低风速条件下可能存在的性能问题。

设置 `LOW_WIND` 的目的，是促进对 AERMOD 低风速表现的进一步测试和评价，以便：

- 更好地理解若干关键变量之间的关系；
- 评估是否可以进一步开发法规低风速选项；
- 改善 AERMOD 在低风速条件下的模拟性能。

CO 路径中的 `LOW_WIND` 允许用户以自定义值覆盖七个可能影响低风速模拟表现的默认参数：

1. 最小横风向风速标准差 `SVmin`，范围 `0.01—1.0 m/s`；
2. 最小风速 `WSmin`，范围 `0.01—1.0 m/s`；
3. 最大烟羽摆动因子 `FRANmax`，范围 `0.0—1.0`；
4. 最小垂向风速标准差 `SWmin`，范围 `0.0—3.0 m/s`；
5. 计算时间尺度 `TRAN` 所使用的时段 `BigT`，范围 `0.5—48.0 h`；
6. 最小烟羽摆动因子 `FRANmin`，范围 `0.0—1.0`，且必须不大于 `FRANmax`；
7. 采用替代的动量平衡方法 `PBAL` 确定烟羽摆动，以代替默认能量平衡方法。

若用户未通过 `LOW_WIND` 指定参数，模型采用以下默认值：

- `SVmin = 0.2 m/s`；
- `WSmin = 0.2828 m/s`，与早期版本根据 $\sqrt{2\,SVmin^2}$ 得到的默认值一致；
- `FRANmax = 1.0`；
- `SWmin = 0.02 m/s`；
- `BigT = 24.0 h`；
- `FRANmin = 0.0`；
- 不采用 `PBAL`，即使用默认能量平衡方法。

**语法：**

```text
CO LOW_WIND SVmin [WSmin]
CO LOW_WIND SVmin WSmin [FRANmax]
CO LOW_WIND SVmin WSmin FRANmax [SWmin]
CO LOW_WIND SVmin WSmin FRANmax SWmin [BigT]
CO LOW_WIND SVmin WSmin FRANmax SWmin BigT [FRANmin]
CO LOW_WIND SVmin WSmin FRANmax SWmin BigT FRANmin [PBAL]
```

**类型：**可选，不可重复。

参数说明：

- `SVmin`：最小 $\sigma_v$，范围 `0.01—1.0 m/s`；
- `WSmin`：最小风速，范围 `0.01—1.0 m/s`；
- `FRANmax`：最大烟羽摆动因子，范围 `0.0—1.0`；
- `SWmin`：最小 $\sigma_w$，范围 `0.0—3.0 m/s`；
- `BigT`：计算 `TRAN` 的时间尺度，范围 `0.5—48 h`；
- `FRANmin`：最小烟羽摆动因子，范围 `0.0—1.0`，且不大于 `FRANmax`；
- `PBAL`：次级关键字，指定以动量平衡方法代替默认能量平衡方法确定烟羽摆动。

上述六种语法形式允许用户依次覆盖一个或多个参数。每一行方括号中的参数为可选参数，但其之前的参数均必须提供。

例如，如果只想覆盖 `SWmin`，仍必须按照规定顺序同时输入 `SVmin`、`WSmin` 和 `FRANmax`。

> **说明：** `LOW_WIND` 早期曾作为 `BETA` 功能，用于补充 `LOWWIND1`、`LOWWIND2` 和 `LOWWIND3`。这些旧选项后来从 AERMOD 中删除，`LOW_WIND` 被保留并改为 `ALPHA` 功能。

除 AERMOD 的 `LOW_WIND` 外，AERMET 气象预处理程序也包含用于低风速条件的 `ADJ_U*` 选项。该选项从 12345 版本起最初作为 `BETA` 功能，并在 16216 版本成为法规选项。

`ADJ_U*` 根据 Qian 和 Venkatram（2011），对低风速稳定条件下的地表摩擦速度 $U_*$ 进行调整。

在以下情形中，`ADJ_U*` 可以作为 AERMET 法规选项使用：

- 使用美国国家气象局 NWS 数据；
- 使用不包含湍流参数，即不包含 $\sigma_w$ 和/或 $\sigma_\theta$ 的场址专用数据。

当在没有湍流数据的条件下使用 `ADJ_U*` 时，AERMOD 可以在启用法规 `DFAULT` 的情况下接受这些数据。

自 AERMET 16216 版本起，对于采用 Bulk Richardson Number 方法 `BULKRN` 的应用，依据 Luhar 和 Raynor（2009）以及 AECOM（2010），也可以在场址专用数据不包含湍流参数时，将 $U_*$ 调整作为法规选项。

如果场址专用数据包含湍流参数，`ADJ_U*` 当前仍被视为非法规选项，因此受 40 CFR 第 51 部分附录 W 第 3.2 节替代模型条款约束。

AERMET 在处理时会在地表气象数据文件 `.SFC` 的文件头中写入标志，告知 AERMOD 数据是否采用 `ADJ_U*` 处理。如果 AERMOD 随后在 AERMET 生成的廓线文件 `.PFL` 中发现湍流数据，同时设置了 `DFAULT`，模型将记录错误并终止处理。

有关 AERMET 中 `ADJ_U*` 的更多说明，见《AERMET 用户指南》。
### 3.2.4 建筑物下洗选项

自 19191 版本起，AERMOD 包含两组相互独立的 `ALPHA` 建筑物下洗功能，分别通过以下关键字启用：

- `ORD_DWNW`；
- `AWMADWNW`。

这些功能属于研究级选项，旨在某些情形下细化和改善 AERMOD 的 PRIME 下洗算法。它们向用户开放用于测试和评价，使用时必须在 `MODELOPT` 中同时指定 `ALPHA`。

`ORD_DWNW` 相关选项由 EPA 研究与发展办公室（Office of Research and Development，ORD）开发。

`AWMADWNW` 相关选项由空气与废物管理协会（Air & Waste Management Association，AWMA）为改进 AERMOD 建筑物下洗处理而成立的研究小组开发。

除这些 `ALPHA` 下洗选项外，ORD 和 AWMA 的研究还采用了一种不同于建筑物预处理程序 BPIPPRM 的矩形建筑等效尺寸确定方法，用于处理建筑物与风向斜交的情况。

对于给定风向：

- 替代方法采用沿风向建筑长度和实际建筑宽度作为等效长度与宽度；
- BPIPPRM 采用最大投影长度和最大投影宽度。

替代方法通常会减小建筑物的等效占地尺度，并反映在输入 AERMOD 的建筑参数中。

ORD 已在 BPIPPRM 草案版本 `19191_DRFT` 中实现这一矩形建筑等效尺寸替代方法。该版本可从 EPA SCRAM 网站获取。

需要特别注意：

- `19191_DRFT` 是研究级版本，仅供模拟界测试、评价和反馈；
- 不得用于法规应用；
- 其修改只影响矩形建筑或矩形建筑层级生成的建筑参数；
- 该 BPIPPRM 草案与 ORD 和 AWMA 在 AERMOD 中实现的 `ALPHA` 下洗选项彼此独立。

因此，各种 `ALPHA` 下洗选项既可以配合该 BPIPPRM 草案测试，也可以不使用该草案而独立测试。

以下分别说明 `ORD_DWNW` 与 `AWMADWNW` 的使用方法、相关次级关键字以及各选项之间的冲突与依赖关系。多数下洗选项彼此独立，可以采用多种组合；存在限制时将在相应位置说明。

#### 3.2.4.1 ORD 建筑物下洗选项

ORD 通过风洞试验和嵌套大涡模拟（Large Eddy Simulation，LES）开展研究，以更好地理解：

- 细长建筑物与风向呈夹角时的建筑参数化；
- 建筑物空腔区和远尾流区烟羽的参数化。

ORD 研究主要关注单个矩形建筑物，具体包括：

- 建筑物和污染源下风向若干离散距离处的烟羽参数变化；
- 烟羽纵向和横向剖面；
- 旋转建筑物背风侧的烟羽横向偏移；
- BPIPPRM 中的建筑物表征方式（Heist et al.，2016）。

这些研究已提出对 BPIPPRM 建筑预处理程序以及 AERMOD 建筑物下洗算法的修改建议。

与 `ORD_DWNW` 相关的 ORD 功能属于研究级 `ALPHA` 选项，因此必须在 `MODELOPT` 中包含 `ALPHA`。

共有三个 ORD 选项，可以单独启用，也可以组合启用。详细研究背景见 Heist 等（2016）、Monbureau 等（2018）和 Perry 等（2018）。

**语法：**

```text
CO ORD_DWNW ORDUEFF
CO ORD_DWNW ORDTURB
CO ORD_DWNW ORDCAV
```

也可以在同一 `ORD_DWNW` 记录中组合一个或多个次级关键字。

**类型：**可选，不可重复。

##### `ORDUEFF`

重新定义主烟羽浓度计算中从风速廓线提取风速的高度。

PRIME 当前使用烟囱高度处的风速；`ORDUEFF` 则使用受体高度与烟羽中心线高度之间廓线风速的平均值，使烟羽所采用的风速能够随周围环境变化而改变。

`ORDUEFF` 不能与 `AWMADWNW` 中的 `AWMAUEFF` 同时使用。

##### `ORDTURB`

重新定义尾流区无量纲垂向湍流强度的最大值。PRIME 当前采用 0.07；依据 Weil（1996），`ORDTURB` 将其降低为 0.06。

##### `ORDCAV`

重新定义烟羽横向和垂向扩散系数开始随下风距离增长的位置：从建筑物背风边缘调整到空腔区末端。

PRIME 通过一个空腔烟羽和一个再排放烟羽来模拟两个不同区域，并在两类烟羽之间按权重分配质量。两类烟羽在建筑物背风侧起始处具有相同的横向和垂向扩散尺度。

随着下风距离增加：

- 再排放烟羽的扩散尺度继续增长；
- 空腔烟羽在整个空腔区内保持不变。

这会使两类烟羽在近尾流边界处出现不连续，并造成地面浓度下降。`ORDCAV` 使两类烟羽在空腔边缘的扩散系数相等，从而消除这一不连续。

三个 `ORD_DWNW` 次级关键字均为可选，但如果控制文件中出现 `ORD_DWNW`，至少必须指定其中一个。

#### 3.2.4.2 AWMA 建筑物下洗选项

AWMA 的研究包括重新分析既有风洞数据，并开展新的风洞试验，主要考察：

- 建筑物顶部以上尾流的衰减；
- 计算来流湍流和风速时适当的参考高度；
- 流线型结构尾流效应的减弱；
- 来流地表粗糙度对尾流的影响。

AERMOD 已实现 AWMA 开发的五项 `ALPHA` 建筑物下洗功能。使用时必须在 `MODELOPT` 中包含 `ALPHA`。详细研究与功能开发背景见 Petersen 等（2017、2018）。

**语法：**

```text
CO AWMADWNW AWMAUEFF
CO AWMADWNW AWMAENTRAIN
CO AWMADWNW AWMAUTURB [STREAMLINE]
CO AWMADWNW AWMAUTURBHX [STREAMLINE]
```

其中 `AWMAUTURB` 与 `AWMAUTURBHX` 二选一；`STREAMLINE` 只能与这两项之一配合使用。多个兼容选项可以组合输入。

**类型：**可选，不可重复。

##### `AWMAUEFF`

重新定义主烟羽浓度计算中从风速廓线提取风速的高度。

PRIME 当前使用烟囱高度处风速；`AWMAUEFF` 使用烟羽中心线高度处风速。

`AWMAUEFF` 不能与 `ORD_DWNW` 中的 `ORDUEFF` 同时使用。

##### `AWMAENTRAIN`

将 PRIME 下洗算法中的卷入系数 $\beta$ 从默认值 0.60 调整为 0.35。

##### `AWMAUTURB`

启用增强的湍流和风速计算。所有计算均采用以下两者中的较小值作为代表性高度：

- 最终动量烟羽抬升高度；
- 具有代表性的 PRIME 烟羽抬升高度。

该选项还采用最终动量烟羽抬升高度计算：

- 有效风速 `UEFF`；
- 有效 $\sigma_w$：`SWEFF`；
- 有效 $\sigma_v$：`SVEFF`；
- 有效位温梯度：`TGEFF`；
- 初始湍流强度 `ambiy` 和 `ambiz`。

同时还计算 30 m 高度处的：

- 平均风速 `U30`；
- $\sigma_w$：`SW30`；
- $\sigma_v$：`SV30`。

##### `AWMAUTURBHX`

启用增强的湍流和风速计算，并在所有计算中使用下风距离 $X$ 处的 PRIME 烟羽抬升高度。

模型首先使用最终动量烟羽抬升高度计算：

- `UEFF`；
- `SWEFF`；
- `SVEFF`；
- `TGEFF`；
- `ambiy` 和 `ambiz`。

随后在每个下风距离处，改用 PRIME 计算的当地烟羽抬升高度。该选项也计算 `U30`、`SW30` 和 `SV30`。

如果同时指定 `AWMAUTURB` 和 `AWMAUTURBHX`，AERMOD 将发出警告，并继续采用 `AWMAUTURBHX`。

##### `STREAMLINE`

减小储罐、冷却塔等流线型结构尾流中的扩散。该选项对与 `AWMAUTURB` 或 `AWMAUTURBHX` 相关的湍流增强和速度亏损公式采用适用于流线型结构的替代形式。

一旦指定 `STREAMLINE`，控制文件中定义的所有建筑物都将被视为流线型结构。

`STREAMLINE` 只能与 `AWMAUTURB` 或 `AWMAUTURBHX` 配合使用。

各 `AWMADWNW` 次级关键字均为可选，但如果使用 `AWMADWNW`，至少必须包含其中一个。

与 `ALPHA` 建筑物下洗功能相关的调试输出选项见第 3.2.18 节。
