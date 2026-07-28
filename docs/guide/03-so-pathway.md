---
title: 3.3 SO 污染源路径：概述与源位置
sidebarDepth: 3
---

# 3.3 SO 污染源路径：概述与源位置

> 对应 EPA 2023版用户指南第3章 SO路径完整译文（英文原文印刷页码3-61至3-127）。路径标识、关键字、次级关键字、参数名、源类型、文件名和控制文件语法保留英文；法规应用应以EPA英文原文及当前模型版本为准。

SO（Source）路径包含用于定义某次模型运行中污染源信息的关键字。AERMOD 当前可处理的主要源类型包括：

- 点源，包括 `POINT`、水平排放点源 `POINTHOR` 和带帽点源 `POINTCAP`；
- 体积源 `VOLUME`；
- 面源，包括 `AREA`、`AREAPOLY`、`AREACIRC`、`LINE` 和 `OPENPIT`；
- 道路线源 `RLINE` 与扩展道路线源 `RLINEXT`；
- 浮力线源 `BUOYLINE`；
- 用于研究建筑物侧洗效应的点源 `SWPOINT`。

不同源类型所需的输入参数不同。对于点源，用户还可以输入邻近建筑物的尺寸，以模拟建筑物空气动力学下洗对排放的影响。用户也可以将多个污染源划分为污染源组，由模型合并计算每组污染源的影响。

用于标识源类型和位置的 `LOCATION` 关键字，必须是每个污染源输入的第一条关键字记录。一般而言，SO 路径中其他关键字的顺序并不重要，但存在以下例外：

- 除非在 CO 路径的 `MODELOPT` 记录中指定了 `PSDCREDIT`，否则 `SRCGROUP` 必须是 `SO FINISHED` 之前的最后一个关键字；
- 指定 `PSDCREDIT` 时，以 `PSDGROUP` 取代 `SRCGROUP`；
- 其他顺序限制将在相应关键字的小节中说明。

用户既可以先集中输入全部 `LOCATION` 记录，再集中输入各种源参数记录；也可以将同一污染源的全部输入记录放在一起。每个污染源都必须由用户指定一个源 ID，用于将后续参数与正确的污染源关联。源 ID 可以是最长 12 个字符的字母数字字符串。

AERMOD 在运行时动态分配污染源数组，因此污染源数量与其他动态数组一样，主要受计算机可用内存和输入规模限制。

---

<a id="so-3-3-1"></a>
## 3.3.1 标识源类型和位置

`LOCATION` 关键字用于标识每个污染源的类型和位置。由于源类型决定后续需要或允许输入哪些参数，因此 `LOCATION` 必须是每个污染源的第一条输入记录。

**语法：**

当 `Srctyp = POINT`、`POINTHOR`、`POINTCAP`、`VOLUME`、`AREA`、`AREAPOLY`、`AREACIRC`、`OPENPIT` 或 `SWPOINT` 时：

```text
SO LOCATION Srcid Srctyp Xs Ys (Zs)
```

当 `Srctyp = LINE`、`RLINE` 或 `BUOYLINE` 时：

```text
SO LOCATION Srcid Srctyp Xs1 Ys1 Xs2 Ys2 (Zs)
```

当 `Srctyp = RLINEXT` 时：

```text
SO LOCATION Srcid Srctyp Xs1 Ys1 Zs1 Xs2 Ys2 Zs2 (Zs)
```

**类型：**必需，可重复。  
**顺序：**必须是每个污染源的第一条输入记录。

参数含义如下：

- `Srcid`：用户定义的字母数字源 ID，最长 12 个字符；
- `Srctyp`：源类型，必须使用以下次级关键字之一：`POINT`、`POINTHOR`、`POINTCAP`、`VOLUME`、`AREA`、`AREAPOLY`、`AREACIRC`、`OPENPIT`、`LINE`、`RLINE`、`RLINEXT`、`BUOYLINE` 或 `SWPOINT`；
- `Xs`、`Ys`：对于 `POINT`、`POINTHOR`、`POINTCAP`、`VOLUME`、`AREA`、`AREAPOLY`、`AREACIRC`、`OPENPIT` 和 `SWPOINT`，为源位置的 x、y 坐标，单位为米；
- `Xs1`、`Ys1`：对于 `LINE` 和 `RLINE`，为线源一端中点的 x、y 坐标；
- `Xs2`、`Ys2`：对于 `LINE` 和 `RLINE`，为线源另一端中点的 x、y 坐标；
- `Zs1`、`Zs2`：对于 `RLINEXT`，为源线两个端点的排放高度；
- `Zs`：可选的源基底海拔高程。对于 `OPENPIT`，`Zs` 表示矿坑顶部高程，模型根据矿坑横向尺寸和体积计算有效深度。

### RLINE 与 RLINEXT 道路线源

从 19191 版本开始，SO 路径增加了用于道路排放的 `RLINE` 和 `RLINEXT` 源类型。

- `RLINE` 必须在 CO 路径的 `MODELOPT` 中同时指定 `BETA`；
- `RLINEXT` 属于 `ALPHA` 研究选项，必须在 `MODELOPT` 中同时指定 `ALPHA`。

最初的实现以近地面排放的 R-LINE 1.2 版本数值积分方法和算法为基础（Snyder 等，2013）。此后，为使 `RLINE`、`RLINEXT` 与 AERMOD 中的 `POINT`、`AREA`、`VOLUME` 等源类型更协调，EPA 对其进行了重新构造，详见相应技术支持文件（EPA，2023d）。

R-LINE 原模型以平坦地形为基础，因此 AERMOD 的早期实现要求将地形指定为 `FLAT`。从 AERMOD 23132 版本开始，`RLINE` 和 `RLINEXT` 可以考虑高地形。在用于交通项目层面的达标一致性和热点分析时，应参照美国 EPA 交通与空气质量办公室发布的最新道路源模拟指南。

`RLINEXT` 要求用户为每条道路链路输入：

- 距道路中心线的偏移距离；
- 车道数；
- 单车道宽度；
- 初始垂向扩散参数。

这些参数在第 3.3.2 节进一步说明。关于原始 `RLINE` 算法及 23132 版本以后重新构造的算法，另见《R-LINE Model Version 1.2 User's Guide》（Snyder and Heist，2013）和 EPA 2023 年技术支持文件（EPA，2023d）。

### BUOYLINE 浮力线源

从 15181 版本开始，SO 路径加入 `BUOYLINE` 源类型。当前实现基本沿用 BLP（Buoyant Line and Point Source）扩散模型中的浮力线源算法（Schulman and Scire，1980），修改较少，因此也具有相近的适用限制。

一个浮力线源可以由一条或多条线组成。多条线应当相互平行，但各线的长度、高度和基底高程可以不同。AERMOD 会检查同一浮力线源中的各条线相对于第一条线是否平行，允许的方向偏差为 5°。某条线超过该容差时，模型会给出警告，但仍继续运行。

`BUOYLINE` 还要求输入构成该浮力线源的各条线的平均长度、平均宽度、平均高度和平均间距，详见第 3.3.2.11 节。浮力线源算法的理论说明见 BLP 用户指南。

输入浮力线源时，应为构成该源的每一条线重复使用 `LOCATION` 关键字，并满足以下要求：

1. `Srctyp` 均指定为 `BUOYLINE`；
2. 每条线使用唯一的 `Srcid`；
3. 各条线在控制文件中的输入顺序具有实际意义；
4. AERMOD 假定所有浮力线相互平行，并对 5° 容差进行检查。

对于不是严格南北向，而是沿东南—西北或西南—东北方向排列的多条线，应按其空间位置由南向北输入：最南侧线首先定义，随后依次定义其北侧相邻线，最后定义最北侧线。对于每一条线，应先输入最西侧端点，再输入最东侧端点，即：

- `Xs1`、`Ys1`：最西侧端点坐标；
- `Xs2`、`Ys2`：最东侧端点坐标。

若浮力线平行于 y 轴，则各线输入顺序取决于每条线先输入南端点还是北端点：

- 若先输入南端点，各条线应由东向西排列；
- 若先输入北端点，各条线应由西向东排列。

第一条线采用的端点和排列约定，必须对后续所有线保持一致。

### SWPOINT 侧洗研究源

从 22112 版本开始，SO 路径加入 `SWPOINT`。该源类型用于研究建筑物背风侧再循环空腔的侧洗效应：当风向斜交建筑物迎风面时，再循环空腔会发生横向偏移。`SWPOINT` 仍属于持续研发的研究工具，必须在 CO 路径的 `MODELOPT` 中指定 `ALPHA`。

### 面源及线源算法之间的关系

`AREA`、`AREACIRC` 和 `AREAPOLY` 三种面源类型以及 `LINE` 源类型，均使用同一套面源数值积分算法估算浓度影响，区别主要在于源几何形状的输入方式：

- `AREA`：任意方向的矩形面源；
- `AREAPOLY`：最多 20 条边的不规则多边形面源；
- `AREACIRC`：圆形面源，模型内部将其表示为等面积的 20 边形；
- `LINE`：通过起点、终点和线宽定义的狭长面源，是矩形 `AREA` 的简化输入方式。

对于等价的几何与排放输入，`LINE` 与 `AREA` 使用相同程序，结果应完全一致。`LINE` 的 `SRCPARAM` 记录还允许输入可选的初始 `sigma-z`，用于表示排放初始稀释。

默认情况下，`AREA`、`AREAPOLY`、`AREACIRC`、`LINE` 和 `OPENPIT` 不包括 AERMOD 的水平摆动分量。23132 版本增加了 CO 路径的 `AREAMNDR` `ALPHA` 选项；指定后，可对 `AREA`、`AREAPOLY`、`AREACIRC` 和 `LINE` 加入摆动处理。但若同时使用 `FASTAREA`，`AREAMNDR` 不会为这些源类型增加摆动。

`RLINE` 和 `RLINEXT` 使用 Snyder 等（2013）所述的数值积分算法，主要用于道路源。其宽度与初始 `sigma-z` 通过 SO 路径的 `SRCPARAM` 输入；`RLINEXT` 还需要一个距中心线的附加距离参数，用于声屏障和下沉道路算法。两种道路源均包括适用于道路排放的水平摆动分量。

### OPENPIT 露天矿源

`OPENPIT` 算法可用于模拟露天矿坑中的颗粒物或气态污染物排放，例如露天煤矿和采石场。模型首先根据气象条件确定一个有效排放面积，再使用面源数值积分算法计算该有效面积源的影响。完整技术说明见《ISC3 Model User's Guide - Volume II》（EPA，1995b）。

### 源高程与坐标说明

`Zs` 是可选参数。若采用默认的高地形处理而省略源高程，模型会给出警告，并将源高程设为 `0.0`。采用非法规 `FLAT` 地形选项时，模型不使用源高程。

`Zs` 默认单位为米。用户也可在 `SO STARTING` 之后立即加入以下记录，以英尺输入源高程：

```text
SO ELEVUNIT FEET
```

不同源类型中 x、y 坐标所表示的位置如下：

- `POINT`、`POINTHOR`、`POINTCAP`、`VOLUME`、`AREACIRC`、`SWPOINT`：源中心；
- `AREA`、`AREAPOLY`、`OPENPIT`：源的一个顶点；
- `LINE`、`RLINE`、`RLINEXT`、`BUOYLINE`：源线端点。

源坐标可以采用通用横轴墨卡托（UTM）坐标，也可以相对于用户自定义原点输入。

某些非浮力线源可以用一系列体积源、狭长面源或道路源表示：

- 具有一定初始烟羽深度的线源，如输送带和铁路，更适合采用一系列 `VOLUME` 源；
- 近地面线源，如高架结构附近的线性排放，可采用狭长矩形 `AREA` 或 `LINE`；
- 对等价输入，`AREA` 与 `LINE` 应产生相同结果。

`LOCATION` 中的源 ID 将在后续 SO 路径输入中持续标识该污染源。由于源 ID 最长可达 12 个字母数字字符，可使用具有描述性的名称，例如 `STACK1`、`STACK2`、`BOILER3`、`SLAGPILE`。若同一物理线源被拆分为多个体积源或面源，也可使用 `LINE1A`、`LINE1B`、`LINE1C` 等名称表示其关联关系。

并非所有 NO₂ 转换方法都已针对所有 AERMOD 源类型实现。各源类型支持哪些 NO₂ 转换选项，见表 3-2。

---

---

### 本路径页面导航

- 下一页：[3.3 SO 污染源路径：各类源参数 →](./03-so-location.md)
- 返回：[3.1 关键字总索引](./03-keyword-index.md)
