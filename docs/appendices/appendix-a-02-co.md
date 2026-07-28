---
title: A.2　CO 控制路径
sidebarDepth: 3
---

# A.2 CO 控制路径

<a id="table-a-1"></a>

## 表 A-1　控制路径关键字

| 关键字 | 类型 | 功能 |
|---|---:|---|
| `STARTING` | M–N | 标识 `CO` 路径开始 |
| `TITLEONE` | M–N | 输出标题第一行 |
| `TITLETWO` | O–N | 输出标题第二行 |
| `MODELOPT` | M–N | 任务控制和扩散选项 |
| `AVERTIME` | M–N | 指定平均时间 |
| `URBANOPT` | O–R | 指定城市扩散参数 |
| `POLLUTID` | M–N | 指定模拟污染物 |
| `HALFLIFE` | O–N | 指定指数衰减半衰期 |
| `DCAYCOEF` | O–N | 指定指数衰减系数 |
| `GASDEPDF` | O–N | 覆盖气体干沉降默认参数 |
| `GASDEPVD` | O–N | 直接指定气体干沉降速度 |
| `GDLANUSE` | O–N | 按方向扇区指定气体干沉降土地利用类型 |
| `GDSEASON` | O–N | 定义气体干沉降季节 |
| `LOW_WIND` | O–N | 低风速 ALPHA 选项参数 |
| `AWMADWNW` | O–N | AWMA 建筑物下洗选项 |
| `ORD_DWNW` | O–N | ORD 建筑物下洗选项 |
| `NO2EQUIL` | O–N | 覆盖 PVMRM、OLM、TTRM/TTRM2 的默认环境平衡 NO₂/NOx 比 |
| `NO2STACK` | O–N | 指定默认烟囱内 NO₂/NOx 比 |
| `NOX_FILE` | O–N | GRSM 使用的逐小时背景 NOx 文件 |
| `NOX_UNIT` | O–N | `NOX_VALS` 的浓度单位 |
| `NOXVALUE` | O–N | GRSM 的固定背景 NOx 值 |
| `NOXSECTR` | O–N | 按风向扇区变化背景 NOx |
| `NOX_VALS` | O–R | 按时间变化的背景 NOx 值 |
| `ARMRATIO` | O–N | 覆盖 ARM2 默认最小、最大比值 |
| `O3SECTOR` | O–N | 按风向扇区变化背景 O₃ |
| `OZONEFIL` | O–N | OLM、PVMRM、TTRM/TTRM2、GRSM 的逐小时 O₃ 文件 |
| `OZONEVAL` | O–R | 固定背景 O₃ 值 |
| `O3VALUES` | O–R | 按时间变化的背景 O₃ 值 |
| `OZONUNIT` | O–N | `O3VALUES` 的浓度单位 |
| `FLAGPOLE` | O–N | 接受受体离地高度并可指定默认旗杆高度 |
| `ARCFTOPT` | O–N | 对 `SO ARCFTSRC` 指定的飞机 AREA/VOLUME 源考虑烟羽抬升 |
| `RUNORNOT` | M–N | 运行模型或仅检查输入 |
| `EVENTFIL` | O–N | 生成 EVENT 处理输入文件 |
| `SAVEFILE` | O–N | 保存中间结果以便重启 |
| `INITFILE` | O–N | 从已保存中间结果初始化 |
| `MULTYEAR` | O–N | 分年度处理多年气象并累计高值 |
| `DEBUGOPT` | O–N | 生成调试文件 |
| `ERRORFIL` | O–N | 生成详细错误清单 |
| `FINISHED` | M–N | 标识 `CO` 路径结束 |

说明：

- `HALFLIFE` 与 `DCAYCOEF` 二选一；若同时输入，模型使用先出现的值并发出警告。
- `EVENTFIL` 生成的事件由 `OU RECTABLE` 和 `OU MAXIFILE` 决定。
- `SAVEFILE`、`INITFILE` 与 `MULTYEAR` 不能在同一运行中同时使用。

<a id="table-a-2"></a>

## 表 A-2　控制路径关键字和参数

### 标题

```text
CO TITLEONE Title1
CO TITLETWO Title2
```

- `Title1`、`Title2`：输出标题文本；打印时最多采用前 68 个字符。

### MODELOPT

```text
CO MODELOPT DFAULT ALPHA BETA CONC DEPOS DDEP WDEP
             AREADPLT FLAT ELEV NOSTD NOCHKD WARNCHKD NOWARN
             SCREEN SCIM PVMRM OLM ARM2 TTRM TTRM2 GRSM
             PSDCREDIT FASTALL FASTAREA NOMINO3 RLINEFDH
             NOURBTRAN VECTORWS DRYDPLT WETDPLT
             NODRYDPLT NOWETDPLT AREAMNDR HBP
```

主要二级关键字：

| 选项 | 含义 |
|---|---|
| `DFAULT` | 使用法规默认选项 |
| `ALPHA` | 启用研究/试验性非法规选项，不能与 `DFAULT` 同用 |
| `BETA` | 启用已通过科学审查、但尚未正式法规化的选项 |
| `CONC` | 计算浓度 |
| `DEPOS` | 计算总沉降通量 |
| `DDEP` | 计算干沉降通量 |
| `WDEP` | 计算湿沉降通量 |
| `AREADPLT` | 面源干去除的非法规优化算法 |
| `FLAT` | 使用平坦地形；RLINE/RLINEXT 要求该选项 |
| `ELEV` | 使用高地形算法 |
| `NOSTD` | 不考虑烟囱顶部下洗 |
| `NOCHKD` | 不检查非连续气象文件日期 |
| `WARNCHKD` | 日期不连续时给出警告而非致命错误 |
| `NOWARN` | 主输出文件不打印详细警告，错误文件仍保留 |
| `SCREEN` | AERSCREEN 筛选模式 |
| `SCIM` | 按规定间隔抽样气象数据，仅用于 `ANNUAL` |
| `PVMRM` | 烟羽体积摩尔比法 NO₂ 转换 |
| `OLM` | 臭氧限制法 NO₂ 转换 |
| `ARM2` | 环境比值法第 2 版 |
| `TTRM` | 行程时间反应法，需 `ALPHA` |
| `TTRM2` | 将 TTRM 与 PVMRM、OLM 或 ARM2 配合 |
| `GRSM` | 通用反应集法，需 `BETA` |
| `PSDCREDIT` | 采用 PVMRM 计算 PSD 增量抵扣 |
| `FASTALL` | 多源类型运行时间优化 |
| `FASTAREA` | AREA、AREAPOLY、AREACIRC、OPENPIT 混合优化 |
| `NOMINO3` | 不使用 PVMRM/OLM 的最小背景臭氧限制 |
| `RLINEFDH` | RLINE/RLINEXT 使用固定排放高度处理 |
| `NOURBTRAN` | 忽略夜间城市边界层向白天对流边界层的过渡 |
| `VECTORWS` | 使用风矢量平均风速 |
| `DRYDPLT`、`WETDPLT` | 在 PLOTFILE 中输出干/湿沉降 |
| `NODRYDPLT`、`NOWETDPLT` | 不在相关输出中写入干/湿沉降 |
| `AREAMNDR` | 对 AREA 类源采用替代水平摆动处理 |
| `HBP` | 高浮力烟羽选项，源由 `SO HBPSRCID` 指定 |

### 平均时间与城市参数

```text
CO AVERTIME Aveper1 Aveper2 ... AveperN
CO URBANOPT UrbanID Urbpop (Urbname) (UrbRoughness)
CO URBANOPT Urbpop (Urbname) (UrbRoughness)
```

- `Aveper`：小时数、`MONTH`、`ANNUAL` 或 `PERIOD`。
- `UrbanID`：多城市情形的城市 ID。
- `Urbpop`：城市人口。
- `Urbname`：可选城市名称。
- `UrbRoughness`：可选城市粗糙度长度。

### 污染物与衰减

```text
CO POLLUTID Pollut
CO HALFLIFE Haflif
CO DCAYCOEF Decay
```

- `Pollut`：污染物标识。
- `Haflif`：半衰期，s。
- `Decay`：衰减系数，s⁻¹，关系为 `0.693/Haflif`。

### 气体干沉降

```text
CO GASDEPDF Diffus DiffH2O AlphaStar Reactivity
CO GASDEPVD Dpvel
CO GDLANUSE Sector1 LandUse1 ... SectorN LandUseN
CO GDSEASON Season1 Month1 ... SeasonN MonthN
```

- `Diffus`：污染物在空气中的分子扩散系数。
- `DiffH2O`：污染物相对于水蒸气的扩散率。
- `AlphaStar`：有效亨利定律常数。
- `Reactivity`：表面反应性参数。
- `Dpvel`：用户指定的沉降速度。
- `Sector`：风向扇区起始角。
- `LandUse`：土地利用类别。
- `Season`：沉降季节类别。
- `Month`：季节开始月份。

### 低风速与建筑物下洗

```text
CO LOW_WIND SVmin (WSmin) (FRANmax) (SWmin) (BigT) (Adj_U*)
CO AWMADWNW Option1 Option2 ...
CO ORD_DWNW Option1 Option2 ...
```

`LOW_WIND` 参数依次表示：

- `SVmin`：最小横向湍流速度标准差；
- `WSmin`：最小风速；
- `FRANmax`：最大随机摆动比例；
- `SWmin`：最小垂直湍流速度标准差；
- `BigT`：拉格朗日时间尺度；
- `Adj_U*`：是否调整摩阻速度。

`AWMADWNW`、`ORD_DWNW` 的二级选项控制 PRIME 初始扩散、尾流、空腔、侧洗等试验性下洗处理；其组合限制见第 3.2.4 节。

### NO₂ 转换参数

```text
CO NO2EQUIL NO2Equil
CO NO2STACK NO2Stack
CO ARMRATIO MinRatio MaxRatio
```

- `NO2Equil`：环境平衡 NO₂/NOx 比。
- `NO2Stack`：默认烟囱内 NO₂/NOx 比，可被 `SO NO2RATIO` 覆盖。
- `MinRatio`、`MaxRatio`：ARM2 最小和最大环境比值。

### 背景臭氧

```text
CO O3SECTOR StartSect1 StartSect2 ... StartSectN
CO OZONEFIL Ozfilnam (Ozformat)
CO OZONEVAL Ozonval
CO OZONEVAL SECTx Ozonval
CO O3VALUES O3Flag Values...
CO O3VALUES SECTx O3Flag Values...
CO OZONUNIT OzonUnits
```

- `StartSect`：各风向扇区起始角，最多 6 个。
- `Ozfilnam`：逐小时臭氧文件。
- `Ozformat`：可选 Fortran 格式；默认自由格式。
- `Ozonval`：固定背景臭氧。
- `SECTx`：适用扇区。
- `O3Flag`：`ANNUAL`、`SEASON`、`MONTH`、`HROFDY`、`WSPEED`、`SEASHR`、`HRDOW` 或 `SHRDOW`。
- `Values`：与时间变化标志对应的臭氧值序列。
- `OzonUnits`：`PPB`、`PPM` 或 `UG/M3`。

### 背景 NOx（GRSM）

```text
CO NOXSECTR StartSect1 ... StartSectN
CO NOX_FILE NOXfilnam (NOXformat)
CO NOXVALUE NOXval
CO NOXVALUE SECTx NOXval
CO NOX_VALS NOXFlag Values...
CO NOX_VALS SECTx NOXFlag Values...
CO NOX_UNIT NOXUnits
```

参数定义与臭氧输入对应；`NOXUnits` 可为 `PPB`、`PPM` 或 `UG/M3`。

### 其他控制

```text
CO FLAGPOLE (Flagdf)
CO ARCFTOPT (AirportID)
CO RUNORNOT RUN
CO RUNORNOT NOT
CO EVENTFIL (Evfile) (Evopt)
CO SAVEFILE (Savfil) (Dayinc) (Savfl2)
CO INITFILE (Inifil)
CO MULTYEAR (H6H) Savfil (Inifil)
CO ERRORFIL (Errfil)
```

- `Flagdf`：默认旗杆高度，缺省为 0.0 m。
- `AirportID`：可选机场标识。
- `RUN`：执行完整计算。
- `NOT`：只读取输入并检查错误。
- `Evfile`：EVENT 输入文件名，默认 `EVENTFIL.INP`。
- `Evopt`：`SOCONT` 或 `DETAIL`，缺省为 `DETAIL`。
- `Savfil`：中间结果文件。
- `Dayinc`：保存间隔天数，默认 1。
- `Savfl2`：交替保存的第二个文件。
- `Inifil`：初始化文件。
- `Errfil`：详细错误文件，默认 `ERRORS.LST`。

### 调试选项

```text
CO DEBUGOPT MODEL (Dbgfil)
             METEOR (Dbmfil)
             PRIME (Prmfil)
             AWMADW (AwmaDwfil)
             PLATFORM (PlatfmDbgFil)
             DEPOS
             AREA (AreaDbFil) | LINE (LineDbFil)
             RLINE (RlineDbgFil)
             BLPDBUG (BLPDbFil)
             URBANDB (UrbanDbFil)
             PVMRM (Dbpvfil) | OLM (OLMfil) | ARM2 (ARM2fil)
             TTRM (TTRMfil) | TTRM2 | GRSM (GRSMfil)
             SWPOINT (SWfil)
             HBPDBG (HBPfil)
             AIRCRAFT (DbARCFTfil)
```

每个调试类型后可紧跟可选文件名。省略时使用对应默认文件名，如 `MODEL.DBG`、`METEOR.DBG`、`PRIME.DBG`、`RLINE.DBG`、`HBP_DEBUG.DBG`、`AIRCRAFT.DBG` 等。

[返回附录 A 导读](./appendix-a.md)
