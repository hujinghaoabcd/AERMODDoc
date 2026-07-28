---
title: 3.3.1　源类型和位置
sidebarDepth: 3
---

## 3.3.1 标识源类型和位置

`LOCATION` 是 SO 路径的必需、可重复关键字，用于定义源 ID、源类型、坐标和基底高程。

```text
SO LOCATION SrcID SrcType Xs Ys Zs
```

源 ID 最长 12 个字符。后续 `SRCPARAM`、建筑物下洗、可变排放和污染源组记录均通过源 ID 引用已定义污染源。

AERMOD 支持的主要源类型包括：

| 源类型 | 说明 |
|---|---|
| `POINT` | 常规垂直点源 |
| `POINTHOR` | 水平排放点源 |
| `POINTCAP` | 带帽点源 |
| `VOLUME` | 体积源 |
| `AREA` | 矩形面源 |
| `AREAPOLY` | 多边形面源 |
| `AREACIRC` | 圆形面源 |
| `OPENPIT` | 露天矿源 |
| `LINE` | 面源算法表示的线源 |
| `RLINE`、`RLINEXT` | 道路研究线源及扩展形式 |
| `BUOYLINE` | 浮力线源 |
| `SWPOINT` | 侧洗研究点源 |

坐标和高程单位通常为米。使用 `FLAT` 代替源高程时，相关受体地形值可能被忽略，应检查模型警告。道路、露天矿和浮力线源还需要与源类型匹配的端点、顶点或分组参数。
