---
title: 2.4.8　运行模型并检查结果
sidebarDepth: 3
---

### 2.4.8 运行模型并检查结果

在建立完整且无错误的控制输入文件后，即可运行模型并检查结果。

SCRAM 网站提供的个人计算机可执行程序会打开控制输入文件和打印输出文件。可以通过命令提示符使用以下三种方式执行模型：

```text
Path-to-AERMOD.EXE\AERMOD

Path-to-AERMOD.EXE\AERMOD runstream_input_filename

Path-to-AERMOD.EXE\AERMOD runstream_input_filename output_filename
```

第一种方式适用于所有 AERMOD 版本，并假定：

- 控制输入文件名为 `AERMOD.INP`；
- 打印输出文件名为 `AERMOD.OUT`。

DOS 对文件名大小写不敏感，而 Unix 和 Linux 系统区分大小写。

后两种方式适用于 18081 及之后的 AERMOD 版本。用户可以指定控制输入文件名，也可以进一步指定输出文件名。

如果文件不在当前工作目录中，文件名可以包含目录路径。

若只指定输入文件而未指定输出文件，AERMOD 会使用输入文件的完整名称及路径，并把扩展名（例如 `.INP`）替换为 `.OUT`。

若同时指定输入和输出文件，两者可以位于不同目录。

运行时应确保：

- `AERMOD.EXE` 位于当前执行目录，或者其所在目录已加入系统的 DOS `PATH`；
- 当命令中未指定控制输入文件名时，`AERMOD.INP` 必须位于模型当前执行目录中。

如果使用默认输入、输出文件名，并且 `AERMOD.EXE` 与它们位于同一工作目录，也可在 Windows 资源管理器中双击可执行文件运行模型。

SCRAM 提供的 AERMOD PC 可执行文件显式打开输入和输出文件，其中一个原因是模型可以在终端屏幕上持续显示处理进度。

AERMOD 会先提示正在处理设置数据，随后显示当前处理的儒略日。

运行时可根据屏幕表现初步判断状态：

- 如果没有任何状态消息，模型可能没有正确载入内存；
- 如果完成设置处理后立即停止，可能是 `RUNORNOT` 设置为不运行；
- 如果设置阶段遇到致命错误，屏幕会显示相应说明，并停止模型执行。

不把打印输出发送到默认输出设备（屏幕或重定向文件）的另一原因，是让 DOS 错误消息直接显示在屏幕上，而不会混入模型打印输出文件。

例如，系统可能提示运行程序所需内存不足。除非消息含义非常直观，处理 DOS 错误可能需要一定 DOS 使用经验。

AERMOD 主输出文件的内容顺序和组织结构见图 2-5。

### 图 2-5 AERMOD 模型输出文件的组织结构

```text
输入控制文件命令回显

控制文件消息汇总

输入数据汇总
├─ 模拟选项汇总
├─ 污染源数据汇总
├─ 受体数据汇总
└─ 气象数据汇总

模型结果
├─ 每个处理日、各所选平均时间的逐日结果（如适用）
│  └─ 由 DAYTABLE 关键字控制
├─ 各污染源组的 PERIOD 全时段结果（如适用）
│  └─ 由 AVERTIME 中的 PERIOD 参数控制
├─ 各污染源组按受体列出的短期平均高值、第二高值等（如适用）
│  └─ 由 RECTABLE 关键字控制
└─ 各污染源组总体最大的短期平均结果（如适用）
   └─ 由 MAXTABLE 关键字控制

各平均时间与污染源组的高值汇总表
└─ 当计算 PERIOD 平均值或使用 RECTABLE 时提供

完整模型运行消息汇总
```

除输入文件回显部分外，输出文件的每一页均标注：

- 模型名称和版本号；
- 用户指定的一个或多个标题；
- 页码；
- 对 PC 版本而言，还包括该次运行的日期和时间。

每页页眉还包含一行本次运行模拟选项汇总，以控制选项的次级关键字表示，例如 `DFAULT`、`CONC` 等。

由于完整输入文件通常会回显到输出文件中，而且输入处理在遇到 `OU FINISHED` 后终止，因此可以直接把某次输出文件指定为下一次运行的输入控制文件，从而复现该次运行。

另一种方式是用文本编辑器把输出文件中的输入记录复制到独立控制文件中。

模型默认把控制文件每一行原样回显到打印输出文件。这样可以保留模型最初读取的输入记录，包括输入汇总表中可能被舍入的数值之前的原始精度。

这一机制也使输出文件能够作为输入文件复现某一应用。

然而，在某些应用中，控制文件很长，将其全部放在每个输出文件开头可能过于冗长。例如：

- 定义大量污染源；
- 使用大量离散受体位置。

因此，用户可在控制文件中的任意位置关闭后续输入回显。方法是在前两个字段输入：

```text
NO ECHO
```

即在路径字段写入 `NO`，空一格后在关键字字段写入 `ECHO`。`NO ECHO` 之后的控制文件内容不会回显到输出文件。

例如，用户可以把 `NO ECHO` 放在 CO 路径之后，从而保留控制选项回显，但不回显其余大量输入数据。

上一节已经介绍消息汇总表。图 2-6 展示了本示例的部分模拟选项输入汇总。

污染源参数输入汇总会按污染源类型分别列成不同表格，而不是把所有类型放在同一张表中，因此各表列标题能够与相应污染源类型匹配。

### 图 2-6 AERMOD 输出文件中的模型选项汇总表示例

> 以下为模型输出，保持英文原样。

```text
*** AERMOD - VERSION 22112      ***     *** A Simple Example Problem for the AERMOD-PRIME Model                    ***        06/07/22

*** AERMET - VERSION     22112 ***      ***                                                                        ***        14:18:02
                                                                                                                              PAGE   1
*** MODELOPTs:      NonDFAULT    CONC    FLAT   RURAL   SigA&SigW

                                            ***    MODEL SETUP OPTIONS SUMMARY       ***
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
** Model Options Selected:
     * Model Allows User-Specified Options
     * Model Is Setup For Calculation of Average CONCentration Values.
     * NO GAS DEPOSITION Data Provided.
     * NO PARTICLE DEPOSITION Data Provided.
     * Model Uses NO DRY DEPLETION. DDPLETE = F
     * Model Uses NO WET DEPLETION. WETDPLT = F
     * Stack-tip Downwash.
     * Model Assumes Receptors on FLAT Terrain.
     * Use Calms Processing Routine.
     * Use Missing Data Processing Routine.
     * No Exponential Decay.
     * Model Uses RURAL Dispersion Only.
     * CCVR_Sub - Meteorological data includes CCVR substitutions
     * Model Assumes No FLAGPOLE Receptor Heights.
     * The User Specified a Pollutant Type of: SO2

**NOTE: Special processing requirements applicable for the 1-hour SO2 NAAQS have been disabled!!!
        User has specified non-standard averaging periods:    3-HR 24-HR
        High ranked 1-hour values are NOT averaged across the number of years modeled, and
        complete years of data are NOT required.

**Model Calculates 2 Short Term Average(s) of:           3-HR   24-HR
    and Calculates PERIOD Averages

**This Run Includes:         1 Source(s);           1 Source Group(s); and        144 Receptor(s)

                 with:       1 POINT(s), including
                             0 POINTCAP(s) and      0 POINTHOR(s)
                  and:       0 VOLUME source(s)
                  and:       0 AREA type source(s)
                  and:       0 LINE source(s)
                  and:       0 RLINE/RLINEXT source(s)
                  and:       0 OPENPIT source(s)
                  and:       0 BUOYANT LINE source(s) with a total of          0 line(s)
                  and:       0 SWPOINT source(s)


**Model Set To Continue RUNning After the Setup Testing.

**The AERMET Input Meteorological Data Version Date:         22112

**Output Options Selected:
         Model Outputs Tables of PERIOD Averages by Receptor
         Model Outputs Tables of Highest Short Term Values by Receptor (RECTABLE Keyword)
         Model Outputs Tables of Overall Maximum Short Term Values (MAXTABLE Keyword)

**NOTE:   The Following Flags May Appear Following CONC Values:         c for Calm Hours
                                                                        m for Missing Hours
                                                                        b for Both Calm and Missing Hours

**Misc. Inputs:    Base Elev. for Pot. Temp. Profile (m MSL) =           0.00 ;    Decay Coef. =   0.000     ; Rot. Angle =     0.0
                   Emission Units = GRAMS/SEC                                        ; Emission Rate Unit Factor =  0.10000E+07
                   Output Units   = MICROGRAMS/M**3

**Approximate Storage Requirements of Model =             3.5 MB of RAM.
```

图 2-7 给出了本示例按受体输出的最高值结果。表中数值为每个受体位置的最高 3 小时平均浓度。

每个浓度值后括号内的数字表示该值对应的日期。日期采用 8 位整数，依次包括：

- 两位年份；
- 月；
- 日；
- 对应平均时段结束时的小时。

### 图 2-7 按受体列出的高值输出表示例

> 以下为模型输出，保持英文原样。

```text
*** AERMOD - VERSION 22112 ***         *** A Simple Example Problem for the AERMOD-PRIME Model                        ***    06/07/22
*** AERMET - VERSION 22112 ***         ***                                                                            ***    14:18:02
                                                                                                                             PAGE   9
*** MODELOPTs:      NonDFAULT   CONC    FLAT   RURAL   SigA&SigW

                                *** THE   1ST HIGHEST 3-HR AVERAGE CONCENTRATION         VALUES FOR SOURCE GROUP:     ALL   ***
                                    INCLUDING SOURCE(S):    STACK1      ,

                                       *** NETWORK ID: POL1        ;   NETWORK TYPE: GRIDPOLR ***

                                           ** CONC OF SO2          IN MICROGRAMS/M**3                          **

DIRECTION |                                                  DISTANCE (METERS)
(DEGREES) |          175.00                  350.00                  500.00                 1000.00
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    10.0 |         1.60637 (88030212)        4.32183 (88030215)          9.87871 (88030215)     20.31341 (88030215)
    20.0 |         1.27691 (88030212)        7.75747 (88030215)         19.35471 (88030215)     43.24437 (88030215)
    30.0 |         1.31753 (88030321)        6.80000 (88030215)         16.96932 (88030215)     37.21008 (88030215)
    40.0 |         1.37996 (88030321)        2.78658 (88030215)          6.56111 (88030215)     13.02309 (88030215)
    50.0 |         1.41988 (88030321)        2.62563 (88030115)          4.10823 (88030115)      4.68748 (88030212)
    60.0 |         1.43198 (88030321)        2.82901 (88030115)          4.55254 (88030115)      4.68748 (88030212)
    70.0 |         1.41464 (88030321)        8.49965 (88030115)         11.29511 (88030115)     11.52741 (88030115)
    80.0 |         2.58429 (88030115)       43.19500 (88030115)         48.25320 (88030115)     34.37546 (88030115)
    90.0 |         7.93441 (88030115)      113.82878 (88030115)        143.17280 (88030115)     83.53515 (88030115)
   100.0 |        49.08751 (88030112)      182.84906 (88030115)        220.83958 (88030115)    145.67442 (88030115)
   110.0 |       112.74908 (88030112)      242.27766 (88030112)        278.47896 (88030115)    163.85177 (88030115)
   120.0 |       133.57972 (88030112)      303.36789 (88030112)        329.96015 (88030112)    201.18211 (88030112)
   130.0 |        84.37463 (88030112)      177.43472 (88030112)        193.23411 (88030112)    123.90900 (88030112)
   140.0 |        34.33105 (88030112)       78.48757 (88030115)         90.16431 (88030115)     66.26935 (88030112)
   150.0 |         3.26313 (88030112)       28.20306 (88030115)         35.81299 (88030112)     33.54932 (88030112)
   160.0 |         1.45757 (88030209)        8.53192 (88030112)         13.46873 (88030112)     12.93284 (88030112)
   170.0 |         1.33663 (88030209)        2.92150 (88030112)          4.70642 (88030112)      9.87872 (88030415)
   180.0 |         1.23781 (88030212)        2.59400 (88030115)          4.58665 (88030415)     11.25826 (88030415)
   190.0 |         1.23781 (88030212)        2.62640 (88030115)          4.10607 (88030115)      6.95118 (88030415)
   200.0 |         1.23781 (88030212)        2.63486 (88030115)          4.10609 (88030115)      4.68748 (88030212)
   210.0 |         1.23781 (88030212)        2.63700 (88030115)          4.10609 (88030115)      4.68748 (88030212)
   220.0 |         1.23783 (88030212)        2.63762 (88030115)          4.10609 (88030115)      4.68748 (88030212)
   230.0 |         1.26732 (88030212)        2.63762 (88030115)          4.10609 (88030115)      4.68767 (88030212)
   240.0 |         1.59395 (88030212)        2.63762 (88030115)          4.10609 (88030115)      4.72694 (88030212)
   250.0 |         2.39221 (88030212)        2.63762 (88030115)          4.10609 (88030115)      5.24318 (88030212)
   260.0 |         3.44586 (88030212)        3.11001 (88030212)          4.10609 (88030115)      7.70339 (88030212)
   270.0 |         4.67900 (88030212)        4.53914 (88030212)          4.60912 (88030212)     13.41550 (88030212)
   280.0 |         6.10725 (88030212)        6.15657 (88030212)          6.42897 (88030212)     21.16129 (88030212)
   290.0 |         7.47165 (88030212)        7.75530 (88030212)          8.18188 (88030212)     27.76976 (88030212)
   300.0 |         8.45754 (88030212)        8.93592 (88030212)          9.35713 (88030212)     30.22723 (88030212)
   310.0 |         8.83767 (88030212)        9.29972 (88030212)          9.54143 (88030212)     27.40028 (88030212)
   320.0 |         8.53526 (88030212)        8.67663 (88030212)          8.65382 (88030212)     20.68075 (88030212)
   330.0 |         7.53807 (88030212)        7.17470 (88030212)          6.91694 (88030212)     13.22924 (88030212)
   340.0 |         5.96054 (88030212)        5.15139 (88030212)          4.78244 (88030212)      8.04861 (88030212)
   350.0 |         4.10326 (88030212)        3.16494 (88030212)          4.10609 (88030115)      5.75319 (88030212)
   360.0 |         2.52862 (88030212)        2.63762 (88030115)          4.10609 (88030115)      4.96113 (88030212)
```

对于不同类型的模型结果表，图 2-5 已在相应说明后列出其控制关键字。

同一类型的全部输出，例如“按受体列出的高值”，会集中打印。表格排列顺序为：

1. 对某一平均时间，依次遍历所有污染源组；
2. 然后依次遍历全部平均时间。

模型结果末尾的高值汇总表也采用相同循环顺序。

图 2-8 给出本示例的结果汇总表示例。

### 图 2-8 AERMOD 模型结果汇总表示例

> 以下为模型输出，保持英文原样。

```text
 *** AERMOD - VERSION 22112 ***         *** A Simple Example Problem for the AERMOD-PRIME Model                           ***        06/07/22
 *** AERMET - VERSION 22112 ***         ***                                                                               ***        14:18:02
                                                                                                                                     PAGE 15
 *** MODELOPTs:     NonDFAULT    CONC   FLAT     RURAL    SigA&SigW

                                               *** THE SUMMARY OF MAXIMUM PERIOD (        96 HRS) RESULTS ***


                                        ** CONC OF SO2           IN MICROGRAMS/M**3                             **

                                                                                                             NETWORK
GROUP ID                       AVERAGE CONC                RECEPTOR (XR, YR, ZELEV, ZHILL, ZFLAG) OF TYPE GRID-ID
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ALL       1ST HIGHEST VALUE IS          24.85173 AT (          433.01,     -250.00,       0.00,    0.00,    0.00)    GP    POL1
          2ND HIGHEST VALUE IS          23.13772 AT (          469.85,     -171.01,       0.00,    0.00,    0.00)    GP    POL1
          3RD HIGHEST VALUE IS          21.03529 AT (          303.11,     -175.00,       0.00,    0.00,    0.00)    GP    POL1
          4TH HIGHEST VALUE IS          19.33506 AT (          328.89,     -119.71,       0.00,    0.00,    0.00)    GP    POL1
          5TH HIGHEST VALUE IS          17.19044 AT (          383.02,     -321.39,       0.00,    0.00,    0.00)    GP    POL1
          6TH HIGHEST VALUE IS          16.86865 AT (          866.03,     -500.00,       0.00,    0.00,    0.00)    GP    POL1
          7TH HIGHEST VALUE IS          15.01122 AT (          939.69,     -342.02,       0.00,    0.00,    0.00)    GP    POL1
          8TH HIGHEST VALUE IS          14.27336 AT (          268.12,     -224.98,       0.00,    0.00,    0.00)    GP    POL1
          9TH HIGHEST VALUE IS          12.80321 AT (          492.40,      -86.82,       0.00,    0.00,    0.00)    GP    POL1
         10TH HIGHEST VALUE IS          12.38150 AT (          766.04,     -642.79,       0.00,    0.00,    0.00)    GP    POL1


 *** RECEPTOR TYPES:  GC = GRIDCART
                      GP = GRIDPOLR
                      DC = DISCCART
                      DP = DISCPOLR
 *** AERMOD - VERSION 22112 ***     *** A Simple Example Problem for the AERMOD-PRIME Model                               ***        06/07/22
 *** AERMET - VERSION 22112 ***     ***                                                                                   ***        14:18:02
                                                                                                                                     PAGE 16
 *** MODELOPTs:     NonDFAULT    CONC   FLAT    RURAL     SigA&SigW

                                                         *** THE SUMMARY OF HIGHEST   3-HR RESULTS ***


                                        ** CONC OF SO2           IN MICROGRAMS/M**3                             **

                                                      DATE                                                                    NETWORK
GROUP ID                          AVERAGE CONC     (YYMMDDHH)             RECEPTOR (XR, YR, ZELEV, ZHILL, ZFLAG)     OF TYPE GRID-ID
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ALL      HIGH     1ST HIGH VALUE IS       329.96015       ON 88030112: AT (     433.01,       -250.00,     0.00,      0.00,       0.00)   GP   POL1
         HIGH     2ND HIGH VALUE IS       261.07805       ON 88030112: AT (     469.85,       -171.01,     0.00,      0.00,       0.00)   GP   POL1


 *** RECEPTOR TYPES:  GC = GRIDCART
                      GP = GRIDPOLR
                      DC = DISCCART
                      DP = DISCPOLR
 *** AERMOD - VERSION 22112 ***     *** A Simple Example Problem for the AERMOD-PRIME Model                               ***        06/07/22
 *** AERMET - VERSION 22112 ***     ***                                                                                   ***        14:18:02
                                                                                                                                     PAGE 17
 *** MODELOPTs:     NonDFAULT    CONC   FLAT    RURAL     SigA&SigW
                                                    *** THE SUMMARY OF HIGHEST 24-HR RESULTS ***


                                       ** CONC OF SO2       IN MICROGRAMS/M**3                         **

                                                      DATE                                                                    NETWORK
GROUP ID                          AVERAGE CONC     (YYMMDDHH)             RECEPTOR (XR, YR, ZELEV, ZHILL, ZFLAG)     OF TYPE GRID-ID
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ALL      HIGH   1ST HIGH VALUE IS        88.89517    ON 88030124: AT (     433.01,      -250.00,   0.00,    0.00,   0.00)   GP   POL1
         HIGH   2ND HIGH VALUE IS        10.09519    ON 88030324: AT (     866.03,      -500.00,   0.00,    0.00,   0.00)   GP   POL1


 *** RECEPTOR TYPES:   GC = GRIDCART
                       GP = GRIDPOLR
                       DC = DISCCART
                       DP = DISCPOLR
```

---

::: tip 继续查阅
输出路径各类表格和专用文件的详细设置见 [3.7 OU 输出路径](./03-ou-pathway.md)，文件字段与格式见 [附录 C](../appendices/appendix-c.md)。
:::
