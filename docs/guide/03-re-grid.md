---
title: 3.4 RE 受体路径：网格受体网络
sidebarDepth: 3
---

# 3.4 RE 受体路径：网格受体网络

> 对应 EPA 2023版用户指南第3章 RE路径完整译文（英文原文印刷页码3-128至3-140）。路径标识、关键字、参数名、源 ID、网络 ID 和控制文件语法保留英文；法规应用应以EPA英文原文及当前模型版本为准。

<a id="re-3-4-1"></a>
## 3.4.1 定义网格受体网络

AERMOD 允许使用两类受体网络：

1. **笛卡尔网格网络**：通过 `GRIDCART` 关键字定义，由受体的 x 坐标（东西方向）和 y 坐标（南北方向）确定；
2. **极坐标网格网络**：通过 `GRIDPOLR` 关键字定义，由受体相对于用户指定原点的方向和距离确定。

这两个关键字均包含一系列二级关键字，用于定义网络范围、受体位置、地形高程、山丘高度尺度和旗杆受体高度。

`GRIDCART` 和 `GRIDPOLR` 可以视为 `RE` 路径内部的“子路径”，因为每个网络都需要使用 `STA` 和 `END` 分别标识该网络输入的开始和结束。

### 3.4.1.1 笛卡尔网格受体网络

笛卡尔网格受体网络使用 `GRIDCART` 关键字定义。其基本语法如下：

```text
RE GRIDCART Netid STA
             XYINC Xinit Xnum Xdelta Yinit Ynum Ydelta
             XPNTS Gridx1 Gridx2 Gridx3 ... Gridxn
          or YPNTS Gridy1 Gridy2 Gridy3 ... Gridyn
             ELEV Row Zelev1 Zelev2 Zelev3 ... Zelevn
             HILL Row Zhill1 Zhill2 Zhill3 ... Zhilln
             FLAG Row Zflag1 Zflag2 Zflag3 ... Zflagn
             END
```

**类型：**可选，可重复。

#### 参数说明

| 参数 | 说明 |
|---|---|
| `Netid` | 受体网络标识码，最多 8 个字母或数字字符 |
| `STA` | 表示某一 `GRIDCART` 网络输入的开始；每个新的 `Netid` 均需指定 |
| `XYINC` | 表示根据 x、y 方向起点、数量和间距生成等间距网格 |
| `Xinit` | x 轴网格起始位置，单位为 m |
| `Xnum` | x 轴方向受体数量 |
| `Xdelta` | x 轴方向受体间距，单位为 m |
| `Yinit` | y 轴网格起始位置，单位为 m |
| `Ynum` | y 轴方向受体数量 |
| `Ydelta` | y 轴方向受体间距，单位为 m |
| `XPNTS` | 表示通过一系列离散 x 坐标定义网格，需与 `YPNTS` 配合使用 |
| `Gridx1` | 笛卡尔网格第一个 x 坐标，单位为 m |
| `Gridxn` | 笛卡尔网格第 n 个 x 坐标，单位为 m |
| `YPNTS` | 表示通过一系列离散 y 坐标定义网格，需与 `XPNTS` 配合使用 |
| `Gridy1` | 笛卡尔网格第一个 y 坐标，单位为 m |
| `Gridyn` | 笛卡尔网格第 n 个 y 坐标，单位为 m |
| `ELEV` | 表示后续输入为受体地形高程，可选 |
| `Row` | 指定输入的网格行；`Row=1` 表示第一行，即最南侧的一行 |
| `Zelev` | 指定行中各受体的地形高程数组；默认单位为 m，也可通过 `RE ELEVUNIT` 改为 ft；每行数值数量应等于该网络的 x 坐标数量 |
| `HILL` | 表示后续输入为山丘高度尺度，可选 |
| `Zhill` | 指定行中各受体的山丘高度尺度数组；默认单位为 m，也可通过 `RE ELEVUNIT` 改为 ft；每行数值数量应等于该网络的 x 坐标数量 |
| `FLAG` | 表示后续输入为旗杆受体高度，可选 |
| `Zflag` | 指定行中各受体相对于当地地面的高度，单位为 m；每行数值数量应等于该网络的 x 坐标数量 |
| `END` | 表示某一 `GRIDCART` 网络输入结束；每个新的 `Netid` 均需指定 |

#### 地形高程、山丘高度尺度和旗杆高度

`ELEV`、`HILL` 和 `FLAG` 均为可选输入，仅在使用高地形或旗杆受体时需要。

- 使用高地形算法时，每个受体必须同时提供 `ELEV` 和 `HILL`；
- 输入了高程数据但采用平坦地形选项时，这些数据会被忽略，并生成非致命警告；
- 选择高地形选项但没有输入地形高程时，高程默认取 `0.0 m`，并生成警告；
- 旗杆受体高度采用类似的处理方式。

#### 子路径内关键字顺序

在 `GRIDCART` 子路径内部，各语句的顺序并不重要，但必须满足：

1. 同一网络的全部输入连续排列；
2. 以 `STA` 开始；
3. 以 `END` 结束。

除 `STA` 语句外，每条控制文件语句不一定都要重复网络 ID。若未输入网络 ID，模型沿用前一条语句的 ID。

#### 示例 1：完整路径、关键字和网络 ID

下例生成一个 8 × 4 的笛卡尔网格：

```text
RE GRIDCART CAR1 STA
RE GRIDCART CAR1 XPNTS -500. -400. -200. -100. 100. 200. 400. 500.
RE GRIDCART CAR1 YPNTS -500. -250. 250. 500.
RE GRIDCART CAR1 ELEV 1 10. 10. 10. 10. 10. 10. 10. 10.
RE GRIDCART CAR1 ELEV 2 20. 20. 20. 20. 20. 20. 20. 20.
RE GRIDCART CAR1 ELEV 3 30. 30. 30. 30. 30. 30. 30. 30.
RE GRIDCART CAR1 ELEV 4 40. 40. 40. 40. 40. 40. 40. 40.
RE GRIDCART CAR1 HILL 1 50. 50. 50. 50. 50. 50. 50. 50.
RE GRIDCART CAR1 HILL 2 60. 60. 60. 60. 60. 60. 60. 60.
RE GRIDCART CAR1 HILL 3 70. 70. 70. 70. 70. 70. 70. 70.
RE GRIDCART CAR1 HILL 4 80. 80. 80. 80. 80. 80. 80. 80.
RE GRIDCART CAR1 FLAG 1 10. 10. 10. 10. 10. 10. 10. 10.
RE GRIDCART CAR1 FLAG 2 20. 20. 20. 20. 20. 20. 20. 20.
RE GRIDCART CAR1 FLAG 3 30. 30. 30. 30. 30. 30. 30. 30.
RE GRIDCART CAR1 FLAG 4 40. 40. 40. 40. 40. 40. 40. 40.
RE GRIDCART CAR1 END
```

#### 示例 2：续行和重复输入缩写

```text
RE GRIDCART CAR1 STA
             XPNTS -500. -400. -200. -100. 100. 200. 400. 500.
             YPNTS -500. -250. 250. 500.
             ELEV 1 8*10.
             HILL 1 8*50.
             FLAG 1 8*10.
             ELEV 2 8*20.
             HILL 2 8*60.
             FLAG 2 8*20.
             ELEV 3 8*30.
             HILL 3 8*70.
             FLAG 3 8*30.
             ELEV 4 8*40.
             HILL 4 8*80.
             FLAG 4 8*40.
RE GRIDCART CAR1 END
```

`ELEV`、`HILL` 和 `FLAG` 中的 `Row` 可以输入行号，也可以输入该行实际 y 坐标。模型使用 `Row` 作为索引排序；同一网络内应一致使用其中一种方式。

#### 示例 3：使用实际 y 坐标作为行索引

```text
RE GRIDCART CAR1 STA
             XPNTS -500. -400. -200. -100. 100. 200. 400. 500.
             YPNTS -500. -250. 250. 500.
             ELEV -500. 8*10.
             FLAG -500. 8*10.
             ELEV -250. 8*20.
             FLAG -250. 8*20.
             ELEV 250. 8*30.
             FLAG 250. 8*30.
             ELEV 500. 8*40.
             FLAG 500. 8*40.
RE GRIDCART CAR1 END
```

#### 示例 4：使用 `XYINC` 生成等间距网格

下例生成以 `(0,0)` 为中心、间距 1000 m 的 11 × 11 网格：

```text
RE GRIDCART CG1 STA
             XYINC -5000. 11 1000. -5000. 11 1000.
RE GRIDCART CG1 END
```

### 3.4.1.2 极坐标网格受体网络

极坐标受体网络使用 `GRIDPOLR` 定义：

```text
RE GRIDPOLR Netid STA
             ORIG Xinit Yinit
          or ORIG Srcid
             DIST Ring1 Ring2 Ring3 ... Ringn
             DDIR Dir1 Dir2 Dir3 ... Dirn
          or GDIR Dirnum Dirini Dirinc
             ELEV Dir Zelev1 Zelev2 Zelev3 ... Zelevn
             HILL Dir Zhill1 Zhill2 Zhill3 ... Zhilln
             FLAG Dir Zflag1 Zflag2 Zflag3 ... Zflagn
             END
```

**类型：**可选，可重复。

| 参数 | 说明 |
|---|---|
| `Netid` | 网络标识码，最多 8 个字符 |
| `STA` | 网络输入开始 |
| `ORIG` | 指定极坐标网络原点，可选 |
| `Xinit`, `Yinit` | 原点坐标 |
| `Srcid` | 将某污染源位置作为原点 |
| `DIST` | 指定距离环 |
| `Ring1...Ringn` | 各距离环半径 |
| `DDIR` | 指定离散方向 |
| `Dir1...Dirn` | 方向角，1—360° |
| `GDIR` | 按数量、起始方向和增量生成方向 |
| `Dirnum`, `Dirini`, `Dirinc` | 方向数量、起始角和增量 |
| `ELEV`, `HILL`, `FLAG` | 地形高程、山丘高度尺度和旗杆高度 |
| `END` | 网络输入结束 |

`ORIG` 可省略，省略时默认原点为 `(0,0)`。高地形、旗杆高度和子路径顺序规则与 `GRIDCART` 相同。

#### 示例 1：默认原点

```text
RE GRIDPOLR POL1 STA
             DIST 100. 300. 500. 1000. 2000.
             GDIR 36 10. 10.
RE GRIDPOLR POL1 END
```

该网络包含 5 个距离环和 36 条径向，共 180 个受体。

#### 示例 2：非零原点、离散方向、高地形和旗杆受体

```text
RE GRIDPOLR POL1 STA
             ORIG 500. 500.
             DIST 100. 300. 500. 1000. 2000.
             DDIR 90. 180. 270. 360.
             ELEV 90.  5. 10. 15. 20. 25.
             ELEV 180. 5. 10. 15. 20. 25.
             ELEV 270. 5. 10. 15. 20. 25.
             ELEV 360. 5. 10. 15. 20. 25.
             HILL 90.  50. 60. 75. 80. 95.
             HILL 180. 50. 60. 75. 80. 95.
             HILL 270. 50. 60. 75. 80. 95.
             HILL 360. 50. 60. 75. 80. 95.
             FLAG 90.  5. 10. 15. 20. 25.
             FLAG 180. 5. 10. 15. 20. 25.
             FLAG 270. 5. 10. 15. 20. 25.
             FLAG 360. 5. 10. 15. 20. 25.
RE GRIDPOLR POL1 END
```

对于 `ELEV`、`HILL` 和 `FLAG`，可以用径向编号或实际方向角标识径向。在模型内部，所有受体最终均以 x、y、z 坐标及旗杆高度存储；主输出仍按用户输入的方向和距离标识极坐标受体。

---

### 本路径页面导航

- 上一页：[← 3.4.0 概述与高程单位](./03-re-pathway.md)
- 下一页：[3.4.2 多个受体网络 →](./03-re-multiple.md)
- 返回：[3.1 关键字总索引](./03-keyword-index.md)
