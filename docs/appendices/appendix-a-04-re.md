---
title: A.4　RE 受体路径
sidebarDepth: 3
---

# A.4 RE 受体路径

<a id="table-a-5"></a>

## 表 A-5　受体路径关键字

| 关键字 | 类型 | 功能 |
|---|---:|---|
| `STARTING` | M–N | `RE` 路径开始 |
| `ELEVUNIT` | O–N | 受体高程单位；若使用，必须紧跟 `RE STARTING` |
| `GRIDCART` | O–R | 笛卡尔网格受体 |
| `GRIDPOLR` | O–R | 极坐标网格受体 |
| `DISCCART` | O–R | 离散笛卡尔受体 |
| `DISCPOLR` | O–R | 离散极坐标受体 |
| `EVALCART` | O–R | 用于 EVALFILE 的离散笛卡尔受体 |
| `INCLUDED` | O–R | 引入外部受体文件 |
| `FINISHED` | M–N | `RE` 路径结束 |

至少应有一种受体定义，或使用 `INCLUDED` 引入外部受体。

<a id="table-a-6"></a>

## 表 A-6　受体路径关键字和参数

```text
RE ELEVUNIT METERS | FEET
```

### GRIDCART

```text
RE GRIDCART Netid STA
             XYINC Xinit Xnum Xdelta Yinit Ynum Ydelta
          or XPNTS Gridx1 ... GridxN
             YPNTS Gridy1 ... GridyN
             ELEV Row Zelev1 ... ZelevN
             HILL Row Zhill1 ... ZhillN
             FLAG Row Zflag1 ... ZflagN
             END
```

- `Netid`：网络 ID。
- `XYINC`：按起点、数量、间距建立等间距网格。
- `XPNTS`、`YPNTS`：离散坐标序列。
- `ELEV`：地形高程。
- `HILL`：山丘高度尺度。
- `FLAG`：受体离地高度。
- `Row`：网格行编号或相应 y 坐标。

### GRIDPOLR

```text
RE GRIDPOLR Netid STA
             ORIG Xinit Yinit
          or ORIG Srcid
             DIST Ring1 ... RingN
             DDIR Dir1 ... DirN
          or GDIR Dirnum Dirini Dirinc
             ELEV Dir Zelev1 ... ZelevN
             HILL Dir Zhill1 ... ZhillN
             FLAG Dir Zflag1 ... ZflagN
             END
```

- `ORIG`：极坐标原点，可用坐标或源 ID。
- `DIST`：距离环。
- `DDIR`：离散方向。
- `GDIR`：按方向数量、起始角和间隔生成方向。
- `Dir`：径向编号或实际方向角。

### 离散受体

```text
RE DISCCART Xcoord Ycoord (Zelev Zhill) (Zflag)
RE DISCPOLR Srcid Dist Direct (Zelev Zhill) (Zflag)
RE EVALCART Xcoord Ycoord Zelev Zhill Zflag Arcid (Name)
```

- `Zelev` 与 `Zhill` 用于高地形，应同时输入。
- `Zflag` 为旗杆受体高度。
- `Arcid` 用于 EVALFILE 的受体分组。
- `Name` 为可选受体名称，模型计算中忽略。

### 外部文件

```text
RE INCLUDED Incfil
```

AERMAP 输出可直接通过该关键字引入；`RE ELEVUNIT METERS` 应只在路径开头出现一次。

[返回附录 A 导读](./appendix-a.md)
