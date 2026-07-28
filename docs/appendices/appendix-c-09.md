---
title: C.9　多年排序值的源组贡献（MAXDCONT）
sidebarDepth: 3
---

# C.9 排序多年平均逐日最大值的源组贡献（MAXDCONT）

`OU MAXDCONT` 用于生成以下标准相关的污染源贡献文件：

- 24 小时 PM₂.₅；
- 1 小时 NO₂；
- 1 小时 SO₂。

这些标准的设计值以多年排序值平均为基础。

排序浓度和污染源贡献以用户指定的目标污染源组为基准。用户可以：

- 指定需要处理的具体排序；
- 指定一个排序范围；
- 选择性地设置最小浓度阈值。

## C.9.1 文件结构与字段

文件头包括：

- 模型名称和版本号；
- 第一行标题；
- 模型选项；
- 最高排序；
- 平均时间；
- 目标污染源组；
- 阈值（如适用）；
- 受体总数；
- 污染源组总数；
- Fortran 数据格式。

每条数据记录包括：

| 字段 | 含义 |
|---|---|
| `X`, `Y` | 受体坐标 |
| `AVERAGE CONC` | 目标污染源组在该受体的多年平均排序浓度 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `AVE` | 平均时间 |
| `GRP` | 目标污染源组 ID |
| `RANK` | 排序 |
| `NET ID` | 受体网络 ID |
| `CONT source-group` | 各污染源组在时间和空间配对条件下的贡献 |

## C.9.2 排序组织与示例

数据记录按排序从高到低组织：

1. 首先输出最高排序在所有受体上的值；
2. 然后输出下一排序；
3. 依此类推。

原文示例针对第 1 至第 50 排序设置了 35 μg/m³ 的最小阈值，并展示多个污染源组的贡献。

代表性表头和记录：

```text
* MAXDCONT FILE OF 1ST-HIGHEST 24-HR VALUES AVERAGED OVER 5 YEARS
* FOR SOURCE GROUP: ALL ; ABOVE THRESH = 35.00000
* FOR A TOTAL OF 16 RECEPTORS AND 3 SOURCE GROUPS
* WITH CONTRIBUTIONS FROM OTHER SOURCE GROUPS PAIRED IN TIME & SPACE

* X         Y        AVERAGE CONC ZELEV ZHILL ZFLAG AVE   GRP RANK NET ID
* CONT STACK1 CONT STACK2 CONT ALL

   0.00000  -500.00000  51.65594 0.00 0.00 0.00 24-HR ALL 1ST POL1
   21.15838 30.49757 51.65594

   0.00000 -1000.00000  52.82753 0.00 0.00 0.00 24-HR ALL 1ST POL1
   13.99357 38.83396 52.82753
```

当某个受体上目标污染源组的结果低于阈值时，示例中的各污染源组贡献字段输出为 `0.00000`。

[返回附录 C 导读](./appendix-c.md)
