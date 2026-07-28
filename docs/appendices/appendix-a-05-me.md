---
title: A.5　ME 气象路径
sidebarDepth: 3
---

# A.5 ME 气象路径

<a id="table-a-7"></a>

## 表 A-7　气象路径关键字

| 关键字 | 类型 | 功能 |
|---|---:|---|
| `STARTING` | M–N | `ME` 路径开始 |
| `SURFFILE` | M–N | 地表气象文件 |
| `PROFFILE` | M–N | 廓线气象文件 |
| `SURFDATA` | M–N | 地表气象站 |
| `UAIRDATA` | M–N | 高空气象站 |
| `SITEDATA` | O–N | 现场气象站 |
| `PROFBASE` | M–N | 位温廓线基准高程 |
| `STARTEND` | O–N | 读取气象文件的开始、结束日期 |
| `DAYRANGE` | O–R | 选择处理日期或日期范围 |
| `NOSA` | O–N | 全部小时将 σθ 设为缺失 |
| `NOSACO` | O–N | 仅对流小时将 σθ 设为缺失 |
| `NOSAST` | O–N | 仅稳定小时将 σθ 设为缺失 |
| `NOSW` | O–N | 全部小时将 σw 设为缺失 |
| `NOSWCO` | O–N | 仅对流小时将 σw 设为缺失 |
| `NOSWST` | O–N | 仅稳定小时将 σw 设为缺失 |
| `NOTURB` | O–N | 全部小时将 σθ、σw 设为缺失 |
| `NOTURBCO` | O–N | 仅对流小时将 σθ、σw 设为缺失 |
| `NOTURBST` | O–N | 仅稳定小时将 σθ、σw 设为缺失 |
| `SCIMBYHR` | O–N | SCIM 抽样参数 |
| `WDROTATE` | O–N | 风向旋转修正 |
| `WINDCATS` | O–N | 风速类别上限 |
| `NUMYEARS` | O–N | 处理年份数量，用于数组分配 |
| `FINISHED` | M–N | `ME` 路径结束 |

<a id="table-a-8"></a>

## 表 A-8　气象路径关键字和参数

```text
ME SURFFILE Sfcfil
ME PROFFILE Profil
```

`Sfcfil` 和 `Profil` 分别为 AERMET 地表、廓线文件名；当前版本采用自由格式读取。

```text
ME SURFDATA Stanum Year (Name) (Xcoord) (Ycoord)
ME UAIRDATA Stanum Year (Name) (Xcoord) (Ycoord)
ME SITEDATA Stanum Year (Name) (Xcoord) (Ycoord)
```

- `Stanum`：站号。
- `Year`：气象数据第一个年份。
- `Name`、`Xcoord`、`Ycoord`：可选站名和位置。

```text
ME PROFBASE BaseElev (METERS|FEET)
```

`BaseElev` 为主要气象塔基底相对平均海平面的高程。

```text
ME STARTEND Strtyr Strtmn Strtdy (Strthr)
            Endyr Endmn Enddy (Endhr)
ME DAYRANGE Range1 Range2 ... RangeN
```

- `STARTEND` 选择从文件读取的日期范围。
- `DAYRANGE` 选择在该范围内实际处理的日期，可使用儒略日、`月/日` 或范围形式。

```text
ME NUMYEARS NumYrs
ME NOSA
ME NOSACO
ME NOSAST
ME NOSW
ME NOSWCO
ME NOSWST
ME NOTURB
ME NOTURBCO
ME NOTURBST
```

`NUMYEARS` 缺省为 5 年。

```text
ME SCIMBYHR NRegStart NRegInt NWetStart NWetInt
             (SfcFilnam PflFilnam)
```

- `NRegStart`：常规抽样首小时。
- `NRegInt`：常规抽样间隔。
- `NWetStart`、`NWetInt`：湿时段抽样参数；当前湿沉降算法未启用时均设为 0。
- 可选输出抽样后的地表、廓线气象文件。

```text
ME WDROTATE Rotang
ME WINDCATS Ws1 Ws2 Ws3 Ws4 Ws5
```

- `Rotang` 从输入风向中减去。
- `Ws1`—`Ws5` 为前五个风速类别上限，第六类无上限。

[返回附录 A 导读](./appendix-a.md)
