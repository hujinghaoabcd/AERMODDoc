---
title: 3.4 RE 受体路径：离散受体位置
sidebarDepth: 3
---

# 3.4 RE 受体路径：离散受体位置

> 对应 EPA 2023版用户指南第3章 RE路径完整译文（英文原文印刷页码3-128至3-140）。路径标识、关键字、参数名、源 ID、网络 ID 和控制文件语法保留英文；法规应用应以EPA英文原文及当前模型版本为准。

<a id="re-3-4-3"></a>
## 3.4.3 指定离散受体位置

除 `GRIDCART` 和 `GRIDPOLR` 定义的受体网络外，用户还可以指定离散受体点，以模拟特定关注位置的影响。

离散受体可用于表示学校、住宅、附近的 Class I 区域、先前模拟中识别的高浓度位置和其他关键位置。

离散受体可以采用：

- 笛卡尔坐标，通过 `DISCCART` 定义；
- 极坐标，通过 `DISCPOLR` 定义。

两类离散受体可以在同一次运行中同时使用。对于离散极坐标受体，还必须指定以哪个污染源位置作为坐标原点。

### 3.4.3.1 离散笛卡尔受体

```text
RE DISCCART Xcoord Ycoord (Zelev Zhill) (Zflag)
```

**类型：**可选，可重复。

| 参数 | 说明 |
|---|---|
| `Xcoord` | 受体 x 坐标，单位 m |
| `Ycoord` | 受体 y 坐标，单位 m |
| `Zelev` | 可选地形高程 |
| `Zhill` | 山丘高度尺度 |
| `Zflag` | 可选受体离地高度 |

`Zelev` 和 `Zhill` 用于高地形模拟，必须同时指定，并与污染源高程采用同一基准。除这两个参数可通过 `RE ELEVUNIT` 改为英尺外，其余参数单位均为米。

若要使用 `Zflag`，必须在 CO 路径中指定 `FLAGPOLE`；使用 `Zelev`、`Zhill` 时，必须在 `CO MODELOPT` 中启用高地形选项。

可选参数的解释规则：

1. 仅使用高地形时，`Ycoord` 后的参数按 `Zelev`、`Zhill` 读取；
2. 仅使用旗杆受体时，第三个参数按 `Zflag` 读取；
3. 同时使用高地形和旗杆受体时，按 `Zelev`、`Zhill`、`Zflag` 顺序读取；
4. 省略时，`Zelev` 默认 `0.0`，`Zflag` 使用 `CO FLAGPOLE` 定义的默认值。

同时采用高地形与旗杆受体时，`Ycoord` 后的第三个参数始终解释为 `Zelev`，因此不能让 `Zelev` 使用默认值而只输入特定 `Zflag`。

### 3.4.3.2 离散极坐标受体

```text
RE DISCPOLR Srcid Dist Direct (Zelev Zhill) (Zflag)
```

**类型：**可选，可重复。

| 参数 | 说明 |
|---|---|
| `Srcid` | 作为极坐标原点的污染源 ID |
| `Dist` | 受体至原点距离，单位 m |
| `Direct` | 从正北顺时针量取的方向角，单位度 |
| `Zelev` | 可选地形高程 |
| `Zhill` | 山丘高度尺度 |
| `Zflag` | 可选受体离地高度，单位 m |

`Zelev`、`Zhill` 的基准和单位要求，以及可选参数解释规则，与 `DISCCART` 相同。同时使用高地形和旗杆受体时，`Direct` 后的第四个参数始终按 `Zelev` 解释。

### 3.4.3.3 用于 EVALFILE 的离散笛卡尔受体

`EVALCART` 与 `DISCCART` 类似，但允许用 `Arcid` 对受体分组，例如按弧线分组。它主要与 OU 路径的 `EVALFILE` 配合，输出每条弧线的最大值，用于模型评估。

```text
RE EVALCART Xcoord Ycoord Zelev Zhill Zflag Arcid (Name)
```

**类型：**可选，可重复。

| 参数 | 说明 |
|---|---|
| `Xcoord`, `Ycoord` | 受体坐标，单位 m |
| `Zelev` | 地形高程 |
| `Zhill` | 山丘高度尺度 |
| `Zflag` | 受体离地高度 |
| `Arcid` | 受体分组 ID，最多 8 个字符 |
| `Name` | 可选受体名称，仅用于标识，模型计算忽略 |

`Zelev` 和 `Zhill` 必须采用与污染源相同的高程基准。除 `Name` 外，其他参数均必须存在。若未启用相应地形或旗杆选项，输入的高度参数会被忽略。

---

### 本路径页面导航

- 上一页：[← 3.4.2 多个受体网络](./03-re-multiple.md)
- 下一页：[3.4.4 外部受体文件 →](./03-re-included.md)
- 返回：[3.1 关键字总索引](./03-keyword-index.md)
