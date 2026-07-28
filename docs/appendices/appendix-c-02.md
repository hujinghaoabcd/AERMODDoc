---
title: C.2　阈值超标文件（MAXIFILE）
sidebarDepth: 3
---

# C.2 阈值超标文件（MAXIFILE 选项）

`OU MAXIFILE` 允许用户针对特定的污染源组和平均时间组合，生成一个或多个阈值超标文件。

## C.2.1 文件结构与字段

文件由若干文件头记录和数据记录组成。每条文件头记录的第 1 列为星号 `*`。

文件头包括：

- 模型名称和版本号；
- 本次运行的第一行标题；
- 适用于结果的模型选项关键字；
- 文件所对应的平均时间；
- 污染源组；
- 阈值；
- 数据记录的 Fortran 格式；
- 变量列标题。

任何等于或超过阈值的结果都会写入文件。

每条数据记录包含：

| 字段 | 含义 |
|---|---|
| `AVE` | 平均时间 |
| `GRP` | 污染源组 ID |
| `DATE` | 平均时段结束日期和小时，格式 `YYMMDDHH` |
| `X` | 受体 x 坐标 |
| `Y` | 受体 y 坐标 |
| `ZELEV` | 受体地形高程 |
| `ZHILL` | 山丘高度尺度 |
| `ZFLAG` | 旗杆受体高度 |
| `AVERAGE CONC` | 超过阈值的平均浓度 |

## C.2.2 示例

```text
* AERMOD ( 15181): A Simple Example Problem for the AERMOD-PRIME Model
* AERMET ( 15181):
* MODELING OPTIONS USED:       NonDFAULT CONC         FLAT         RURAL
* MAXI-FILE FOR   3-HR VALUES >= A THRESHOLD OF            50.00
* FOR SOURCE GROUP: ALL
* FORMAT: (1X,I3,1X,A8,1X,I8.8,2(1X,F13.5),3(1X,F7.2),1X,F13.5)

*AVE    GRP       DATE             X              Y       ZELEV   ZHILL   ZFLAG   AVERAGE CONC
*___ ________ ________        ____________   ____________ ______  ______  ______  ____________

   3 ALL       88030112       344.68271       -60.77686    0.00    0.00    0.00       71.36678
   3 ALL       88030112       492.40388       -86.82409    0.00    0.00    0.00       73.20689
   3 ALL       88030112       984.80775      -173.64818    0.00    0.00    0.00       50.65556
```

[返回附录 C 导读](./appendix-c.md)
