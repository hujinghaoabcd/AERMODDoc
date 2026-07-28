---
title: A.7　OU 输出路径
sidebarDepth: 3
---

# A.7 OU 输出路径

<a id="table-a-11"></a>

## 表 A-11　输出路径关键字

| 关键字 | 类型 | 功能 |
|---|---:|---|
| `STARTING` | M–N | `OU` 路径开始 |
| `RECTABLE` | O–R | 按受体输出指定排序高值 |
| `MAXTABLE` | O–R | 汇总总体最大值 |
| `DAYTABLE` | O–N | 按日、平均时间和受体打印同期结果 |
| `MAXIFILE` | O–R | 输出达到或超过阈值的事件 |
| `POSTFILE` | O–R | 输出用于后处理的同期结果 |
| `PLOTFILE` | O–R | 输出适合绘图的设计值 |
| `TOXXFILE` | O–R | 输出供 TOXX/RISK 使用的结果 |
| `RANKFILE` | O–R | 输出用于 Q-Q 图的排序值 |
| `EVALFILE` | O–R | 输出 EVALCART 弧线最大归一化结果 |
| `SEASONHR` | O–R | 按季节和一天中的小时输出 |
| `MAXDAILY` | O–R | 输出逐日最大 1 小时值 |
| `MXDYBYYR` | O–R | 按年份输出逐日最大 1 小时排序值 |
| `MAXDCONT` | O–R | 输出各源组对多年平均排序值的贡献 |
| `SUMMFILE` | O–N | 单独输出高排序值汇总 |
| `FILEFORM` | O–N | 结果文件采用定点或指数格式 |
| `NOHEADER` | O–N | 取消指定输出文件的文件头 |
| `EVENTOUT` | M–N | EVENT 输出详细程度 |
| `FINISHED` | M–N | `OU` 路径结束 |

<a id="table-a-12"></a>

## 表 A-12　输出路径关键字和参数

### 主输出表格

```text
OU RECTABLE Aveper FIRST SECOND ... N ... 999
OU RECTABLE ALLAVE Rank1 Rank2 ... RankN
```

- `Aveper`：平均时间。
- 排序可以写作 `FIRST`、`SECOND`、`1ST`、`2ND` 或数字。
- `FIRST-THIRD`、`4-12` 表示包含端点的连续范围。
- `RECTABLE` 定义的排序范围也限制 `MAXDCONT` 可分析范围。

```text
OU MAXTABLE Aveper Maxnum
OU DAYTABLE Avper1 Avper2 ... AvperN
```

- `Maxnum`：总体最大值数量。
- `ALLAVE` 表示全部短期平均时间。

### 专用结果文件

```text
OU MAXIFILE Aveper GrpID Thresh Filnam (Funit)
OU POSTFILE Aveper GrpID UNFORM|PLOT Filnam (Funit)
OU PLOTFILE Aveper GrpID Hivalu Filnam (Funit)
OU PLOTFILE PERIOD|ANNUAL GrpID Filnam (Funit)
OU TOXXFILE Aveper Cutoff Filnam (Funit)
OU RANKFILE Aveper Hinum Filnam (Funit)
OU EVALFILE SrcID Filnam (Funit)
OU SEASONHR GrpID FileName (FileUnit)
```

- `Thresh`：MAXIFILE 阈值。
- `UNFORM`：未格式化后处理文件。
- `PLOT`：格式化 x、y、结果文件。
- `Hivalu`：PLOTFILE 排序，必须包含在 `RECTABLE` 中。
- `Cutoff`：TOXXFILE 阈值，单位固定为 g/m³。
- `Hinum`：RANKFILE 排序值数量，且不得超过相应 `MAXTABLE` 数量。
- `SrcID`：EVALFILE 的污染源。
- `Funit/FileUnit`：可选 Fortran 文件单元号。

### NAAQS 专用输出

```text
OU MAXDAILY GrpID FileName (FileUnit)
OU MXDYBYYR GrpID FileName (FileUnit)
OU MAXDCONT GrpID UpperRank LowerRank FileName (FileUnit)
OU MAXDCONT GrpID UpperRank THRESH ThreshValue FileName (FileUnit)
```

- `MAXDAILY`：逐日最大 1 小时值。
- `MXDYBYYR`：各年份逐日最大 1 小时排序汇总。
- `MAXDCONT`：目标源组在给定排序范围内的分源组贡献。
- `UpperRank`：高浓度端排序。
- `LowerRank`：低浓度端排序。
- `THRESH`：以浓度阈值确定停止处理位置。
- `MAXDCONT` 分析范围必须落在 `RECTABLE` 定义范围内。

### 其他输出

```text
OU SUMMFILE SummFileName
OU FILEFORM EXP | FIX
OU NOHEADER FileType1 FileType2 ... FileTypeN
OU NOHEADER ALL
OU EVENTOUT SOCONT | DETAIL
```

- `SUMMFILE`：单独保存高排序值汇总。
- `EXP`：指数格式。
- `FIX`：定点格式，为默认值。
- `NOHEADER` 可用于 `POSTFILE`、`PLOTFILE`、`MAXIFILE`、`RANKFILE`、`SEASONHR`、`MAXDAILY`、`MXDYBYYR` 和 `MAXDCONT`。
- `SOCONT`：EVENT 仅输出源贡献。
- `DETAIL`：同时输出逐小时分源结果和逐小时气象信息。

[返回附录 A 导读](./appendix-a.md)
