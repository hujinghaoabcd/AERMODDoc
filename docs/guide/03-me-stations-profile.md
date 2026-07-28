---
title: 3.5 ME 气象路径：气象站与基准高程
sidebarDepth: 3
---

# 3.5 ME 气象路径：气象站与基准高程

> 对应 EPA 2023 版 AERMOD 用户指南第 3.5 节完整中文译文。路径标识、关键字、参数名、文件名、单位和控制文件示例保留英文；法规应用应以 EPA 英文原文及当前模型版本为准。

<a id="me-3-5-2"></a>
## 3.5.2 指定气象站信息

使用三个关键字指定气象站信息：

- `SURFDATA`：地表气象站；
- `UAIRDATA`：高空气象站；
- `SITEDATA`：可选的现场气象数据站。

语法如下：

```text
ME SURFDATA Stanum Year (Name) (Xcoord) (Ycoord)
ME UAIRDATA Stanum Year (Name) (Xcoord) (Ycoord)
ME SITEDATA Stanum Year (Name) (Xcoord) (Ycoord)
```

**类型：**

- `SURFDATA`：必需，不可重复；
- `UAIRDATA`：必需，不可重复；
- `SITEDATA`：可选，不可重复。

参数说明如下：

| 参数 | 说明 |
|---|---|
| `Stanum` | 气象站编号，例如 NWS 气象站的 5 位 WBAN 编号 |
| `Year` | 所处理数据的年份，可输入 2 位或 4 位年份 |
| `Name` | 可选的气象站名称，最多 40 个字符，不能包含空格 |
| `Xcoord` | 可选的气象站 x 坐标 |
| `Ycoord` | 可选的气象站 y 坐标 |

`Year` 应表示气象数据中包含的**第一个年份**，无论用户是否通过 `STARTEND` 关键字只模拟完整时间段中的一部分。

气象站位置目前不参与模型计算。因此，`Xcoord` 和 `Ycoord` 没有规定单位，但为与污染源和受体坐标保持一致，建议使用米。

AERMOD 会将这些关键字输入的气象站编号与地表气象数据文件文件头中的编号进行比较。如果两者不一致，模型会发出非致命警告。

---

<a id="me-3-5-3"></a>
## 3.5.3 指定位温廓线的基准高程

AERMOD 会生成网格化的位温垂直廓线，用于烟羽抬升计算。由于位温取决于相对于平均海平面（MSL）的高程，因此用户必须使用 `PROFBASE` 关键字定义该廓线的基准高程。

语法如下：

```text
ME PROFBASE BaseElev (Units)
```

**类型：** 必需，不可重复。

参数说明如下：

| 参数 | 说明 |
|---|---|
| `BaseElev` | 位温廓线基准点相对于 MSL 的高程 |
| `Units` | 可选的高程单位，可取 `METERS` 或 `FEET` |

如果省略 `Units`，则 `BaseElev` 的默认单位为米。

基准高程应与主要气象塔的基底高程相对应。
