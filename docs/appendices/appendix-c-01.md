---
title: C.1　AERMET 气象数据
sidebarDepth: 3
---

# C.1 AERMET 气象数据

AERMET 气象预处理程序会生成两个供 AERMOD 扩散模型使用的文件：

1. **地表输出文件（SURFACE OUTPUT）**  
   包含观测和计算得到的地表变量，每小时一条记录。

2. **廓线输出文件（PROFILE OUTPUT）**  
   包含现场气象塔各测量高度上的观测值；如果使用 NWS 数据，则包含单层观测值。每个小时、每个高度一条记录。

下面说明两个文件的内容与格式。

### C.1.1 SURFACE OUTPUT

#### 文件头记录

```fortran
READ( ) latitude, longitude, UA identifier, SF identifier,
        OS identifier, Version date, AERMET flags

FORMAT (2(2X,A8), 8X,' UA_ID: ',A8, ' SF_ID: ',A8,
        ' OS_ID: ',A8, T85, 'VERSION:', A6)
```

变量说明：

| 变量 | 含义 |
|---|---|
| `latitude` | AERMET Stage 1 中为主要地表气象站指定的纬度 |
| `longitude` | AERMET Stage 1 中为主要地表气象站指定的经度 |
| `UA identifier` | 高空气象数据站标识，通常为从归档数据中提取资料时使用的 WBAN 编号 |
| `SF identifier` | 逐小时地表观测站标识，通常为提取数据时使用的 WBAN 编号 |
| `OS identifier` | 现场或站点专用标识 |
| `Version date` | AERMET 版本日期；该日期也出现在各页汇总报告的页眉中 |
| `AERMET flags` | 根据数据来源或 AERMET 处理选项，版本日期后可能包含一个或多个标志 |

可能出现的 `AERMET flags` 包括：

- `CCVR_Sub`
- `TEMP_Sub`
- `THRESH_1MIN speed`
- `Adjust_u*`
- `MMIF version`
- `BULKRN`
- `COARE`

其中：

- `speed` 为阈值风速；
- `version` 为所使用的 MMIF 版本。

各标志的具体说明见《AERMET 用户指南》（EPA, 2023c）。

**注 1：** 上述 `FORMAT` 语句中的 `cc_ID:` 字段，`cc` 可以为：

- `UA`：高空数据；
- `SF`：地表数据；
- `OS`：现场或站点专用数据。

在两字符 ID 前有两个空格，冒号后有一个空格。

**注 2：** 上述 `FORMAT` 语句只能读取至版本日期。版本日期之后可能继续存在用于标识数据来源或 AERMET 预处理选项的标志。若需要读取这些标志，必须在 `FORMAT` 语句中增加相应格式项。

#### 数据记录

```fortran
READ( ) year, month, day, j_day, hour, H, u*, w*, VPTG,
        Zic, Zim, L, z0, B0, r, Ws, Wd, zref, temp, ztemp,
        ipcode, pamt, rh, pres, ccvr, WSADJ

FORMAT (3(I2,1X), I3,1X, I2,1X, F6.1,1X,
        3(F6.3,1X), 2(F5.0,1X), F8.1,1X, F7.4,1X,
        2(F6.2,1X), F7.2,1X, F5.0,
        3(1X,F6.1), 1X,I5, 1X,F6.2,
        2(1X,F6.0), 1X,I5, 1X,A7)
```

变量说明：

| 变量 | 含义与单位 |
|---|---|
| `year` | 年 |
| `month` | 月 |
| `day` | 日 |
| `j_day` | 儒略日，即年内日序号 |
| `hour` | 小时 |
| `H` | 感热通量，W/m² |
| `u*` | 地表摩阻速度，m/s |
| `w*` | 对流速度尺度，m/s |
| `VPTG` | `Zic` 以上的垂直位温梯度，K/m |
| `Zic` | 对流产生的边界层高度，m |
| `Zim` | 机械作用产生的边界层高度，m |
| `L` | Monin-Obukhov 长度，m |
| `z0` | 地表粗糙度长度，m |
| `B0` | Bowen 比 |
| `r` | 反照率 |
| `Ws` | 参考风速，m/s |
| `Wd` | 参考风向，度 |
| `zref` | 风的参考高度，m |
| `temp` | 参考温度，K |
| `ztemp` | 温度参考高度，m |
| `ipcode` | 降水类型代码 |
| `pamt` | 降水量，mm/h |
| `rh` | 相对湿度，% |
| `pres` | 站点气压，mb |
| `ccvr` | 云量，十分量 |
| `WSADJ` | 风速调整和数据来源标志 |

`ipcode` 的常用取值：

| 值 | 含义 |
|---:|---|
| `0` | 无降水 |
| `11` | 液态降水 |
| `22` | 固态降水 |
| `99` | 缺失 |

#### 现场资料存在时的参考风选择限制

当数据库包含现场气象数据时，参考高度处的风速和风向应满足：

- `Ws` 必须大于或等于现场数据的阈值风速；
- 测量高度必须大于或等于 `7*z0`；
- 测量高度必须小于或等于 100 m。

如果 AERMET 只使用 NWS 数据，即数据库中没有现场资料，则上述限制不适用。参考风直接采用 NWS 风，不受其测量高度限制。

#### 环境温度的高度限制

环境温度采用相似但较宽松的选择条件：

- 测量高度必须高于 `z0`；
- 测量高度必须小于或等于 100 m。

AERMOD 不使用感热通量、Bowen 比和反照率，但 AERMET 仍将这些变量传递到输出文件中，供信息参考。

### C.1.2 PROFILE OUTPUT

```fortran
READ( ) year, month, day, hour, height, top,
        WDnn, WSnn, TTnn, SAnn, SWnn

FORMAT (4(I2,1X), F7.1,1X, I1,1X,
        F7.1,1X, F8.2,1X, F8.2,1X, F8.2,1X, F8.2)
```

变量说明：

| 变量 | 含义与单位 |
|---|---|
| `height` | 测量高度，m |
| `top` | 若当前高度为该小时最后一个、也是最高的测量层，则为 `1`；否则为 `0` |
| `WDnn` | 当前高度的风向，度 |
| `WSnn` | 当前高度的风速，m/s |
| `TTnn` | 当前高度的温度，°C |
| `SAnn` | 风向标准差 `σθ`，度 |
| `SWnn` | 垂直风速标准差 `σw`，m/s |

[返回附录 C 导读](./appendix-c.md)
