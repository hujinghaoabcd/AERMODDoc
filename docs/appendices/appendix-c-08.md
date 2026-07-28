---
title: C.8　按季节和小时输出结果（SEASONHR）
sidebarDepth: 3
---

# C.8 按季节和一天中的小时输出结果（SEASONHR 选项）

`SEASONHR` 用于输出按季节和一天中的小时计算的平均结果。

## C.8.1 文件结构与字段

格式化输出文件头包括：

- 模型名称和版本号；
- 第一行标题；
- 模型选项；
- 污染源组；
- 受体数量；
- 数据格式；
- 变量列标题。

每条数据记录包括：

| 字段 | 含义 |
|---|---|
| `X`, `Y` | 受体坐标 |
| `AVERAGE CONC` | 季节-小时平均浓度 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `GRP` | 污染源组 ID |
| `NHRS` | 计算该季节-小时平均值时采用的非静风、非缺失小时数 |
| `SEAS` | 季节索引 |
| `HOUR` | 一天中的小时 |
| `NET ID` | 受体网络 ID |

## C.8.2 季节索引与示例

| `SEAS` | 季节 |
|---:|---|
| `1` | 冬季 |
| `2` | 春季 |
| `3` | 夏季 |
| `4` | 秋季 |

```text
* FILE OF SEASON/HOUR VALUES FOR SOURCE GROUP: ALL
* FOR A TOTAL OF 144 RECEPTORS.
* FORMAT: (2(1X,F13.5),1(1X,F13.8),3(1X,F7.2),2X,A8,2X,3(I4,2X),A8)

* X           Y          AVERAGE CONC ZELEV ZHILL ZFLAG GRP NHRS SEAS HOUR NET ID
  30.38843    172.34136   34.14568783  0.00  0.00  0.00 ALL   65   1    1  POL1
  60.77686    344.68271   39.19676801  0.00  0.00  0.00 ALL   65   1    1  POL1
  86.82409    492.40388   34.59785413  0.00  0.00  0.00 ALL   65   1    1  POL1
```

[返回附录 C 导读](./appendix-c.md)
