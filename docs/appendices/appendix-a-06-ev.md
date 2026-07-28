---
title: A.6　EV 事件路径
sidebarDepth: 3
---

# A.6 EV 事件路径

<a id="table-a-9"></a>

## 表 A-9　事件路径关键字

| 关键字 | 类型 | 功能 |
|---|---:|---|
| `STARTING` | M–N | `EV` 路径开始 |
| `EVENTPER` | M–R | 事件日期、平均时间和污染源组 |
| `EVENTLOC` | M–R | 事件受体位置 |
| `INCLUDED` | O–R | 引入外部事件文件 |
| `FINISHED` | M–N | `EV` 路径结束 |

<a id="table-a-10"></a>

## 表 A-10　事件路径关键字和参数

```text
EV EVENTPER Evname Aveper Grpid Date Conc
```

- `Evname`：事件名称。
- `Aveper`：平均时间，h。
- `Grpid`：污染源组 ID。
- `Date`：结束日期和小时，`YYMMDDHH`。
- `Conc`：原始 AERMOD 结果中的事件浓度，仅供参考；EVENT 处理忽略该字段。

```text
EV EVENTLOC Evname XR= Xr YR= Yr (Zelev) (Zflag)
EV EVENTLOC Evname RNG= Rng DIR= Dir (Zelev) (Zflag)
```

- 笛卡尔形式使用 `XR=`、`YR=`。
- 极坐标形式使用 `RNG=`、`DIR=`，原点为 `(0,0)`。
- `Zelev`：受体高程。
- `Zflag`：受体离地高度。

```text
EV INCLUDED Incfil
```

外部文件不得包含 `EV STARTING` 或 `EV FINISHED`。

[返回附录 A 导读](./appendix-a.md)
