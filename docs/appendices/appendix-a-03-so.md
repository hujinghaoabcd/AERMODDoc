---
title: A.3　SO 污染源路径
sidebarDepth: 3
---

# A.3 SO 污染源路径

<a id="table-a-3"></a>

## 表 A-3　污染源路径关键字

| 关键字 | 类型 | 功能 |
|---|---:|---|
| `STARTING` | M–N | `SO` 路径开始 |
| `ELEVUNIT` | O–N | 污染源高程单位；若使用，必须紧跟 `SO STARTING` |
| `LOCATION` | M–R | 污染源类型、坐标和基底高程 |
| `RLEMCONV` | O–N | 将 RLINE/RLINEXT 输入排放单位改为 g/h/link |
| `SRCPARAM` | M–R | 污染源释放参数 |
| `BUILDHGT` | O–R | 各风向扇区建筑物高度 |
| `BUILDLEN` | O–R | 各风向扇区建筑物投影长度 |
| `BUILDWID` | O–R | 各风向扇区建筑物投影宽度 |
| `XBADJ` | O–R | 沿流向烟囱至建筑物迎风面中心距离 |
| `YBADJ` | O–R | 横流向烟囱至建筑物迎风面中心距离 |
| `AREAVERT` | M–R | AREAPOLY 顶点 |
| `RBARRIER` | O–R | RLINEXT 障碍物设置，需 `ALPHA` |
| `RDEPRESS` | O–R | RLINEXT 下沉道路设置，需 `ALPHA` |
| `BLPINPUT` | M–R | 浮力线源组参数 |
| `URBANSRC` | O–R | 指定采用城市扩散的源 |
| `EMISFACT` | O–R | 可变排放系数 |
| `EMISUNIT` | O–N | 排放和浓度输出单位转换 |
| `CONCUNIT` | O–N | 浓度单位转换 |
| `DEPOUNIT` | O–N | 沉降单位转换 |
| `PARTDIAM` | O–R | 粒径类别 |
| `MASSFRAX` | O–R | 粒径类别质量分数 |
| `PARTDENS` | O–R | 粒径类别密度 |
| `METHOD_2` | O–R | 颗粒物沉降 Method 2 参数，需 `ALPHA` |
| `GASDEPOS` | O–R | 气体沉降源参数，需 `ALPHA` |
| `NO2RATIO` | O–R | 分源烟囱内 NO₂/NOx 比 |
| `HOUREMIS` | O–R | 外部逐小时排放文件 |
| `BGSECTOR` | O–N | 背景浓度风向扇区 |
| `BACKGRND` | O–R | 随时间变化的背景浓度 |
| `BACKUNIT` | O–N | 背景浓度单位 |
| `INCLUDED` | O–R | 引入外部污染源文件 |
| `OLMGROUP` | O–R | OLM 合并烟羽分组 |
| `BLPGROUP` | M–R | 将浮力线源与 BLP 组关联 |
| `PSDGROUP` | O–R | PSDCREDIT 污染源组 |
| `HBPSRCID` | M–R | HBP 源标识；使用 HBP 时必需 |
| `ARCFTSRC` | M–R | 飞机源标识；使用 ARCFTOPT 时必需 |
| `SRCGROUP` | M–R | 一般污染源组 |
| `PLATFORM` | O–R | 海上平台 POINT/POINTHOR/POINTCAP 源参数 |
| `FINISHED` | M–N | `SO` 路径结束 |

`PSDGROUP` 或 `SRCGROUP` 必须是 `SO FINISHED` 前的最后一类关键字。使用 `PSDCREDIT` 时以 `PSDGROUP` 代替 `SRCGROUP`。

<a id="table-a-4"></a>

## 表 A-4　污染源路径关键字和参数

### 高程、位置和排放单位

```text
SO ELEVUNIT METERS | FEET
SO RLEMCONV
SO LOCATION SrcID SrcType Xs Ys Zs
```

- `SrcID`：源 ID。
- `SrcType`：`POINT`、`POINTHOR`、`POINTCAP`、`VOLUME`、`AREA`、`AREAPOLY`、`AREACIRC`、`OPENPIT`、`LINE`、`RLINE`、`RLINEXT`、`BUOYLINE` 或 `SWPOINT`。
- `Xs`、`Ys`：源坐标。
- `Zs`：源基底高程；也可按允许情形输入 `FLAT`。

### SRCPARAM

```text
SO SRCPARAM SrcID Ptemis Stkhgt Stktmp Stkvel Stkdia
SO SRCPARAM SrcID Vlemis Relhgt Syinit Szinit
SO SRCPARAM SrcID Aremis Relhgt Xinit Yinit Angle Numvert
SO SRCPARAM SrcID Aremis Relhgt Radius Numvert
SO SRCPARAM SrcID Opemis Relhgt Xinit Yinit Pitvol (Angle)
SO SRCPARAM SrcID Lnemis Relhgt Width (Szinit)
SO SRCPARAM SrcID Rlemis Relhgt Width Szinit
SO SRCPARAM SrcID Rlemis DCL Width Szinit
SO SRCPARAM SrcID Blemis Relhgt
SO SRCPARAM SrcID Swemis Relhgt Stktmp Stkvel Stkdia BldgID
```

参数含义随源类型变化：

- `Ptemis`、`Vlemis`、`Aremis`、`Opemis`、`Lnemis`、`Rlemis`、`Blemis`、`Swemis`：对应源类型的排放率。
- `Stkhgt`：烟囱高度。
- `Stktmp`：排气温度。
- `Stkvel`：出口速度。
- `Stkdia`：烟囱内径。
- `Relhgt`：释放高度。
- `Syinit`、`Szinit`：初始横向、垂向尺寸。
- `Xinit`、`Yinit`：面源尺寸。
- `Angle`：旋转角。
- `Numvert`：顶点数。
- `Radius`：圆形面源半径。
- `Pitvol`：露天矿体积。
- `Width`：线源宽度。
- `DCL`：距道路中心线的偏移。
- `BldgID`：SWPOINT 对应建筑物 ID。

### 建筑物下洗

```text
SO BUILDHGT SrcID|SrcRange Dsbh(i), i=1,36
SO BUILDLEN SrcID|SrcRange Dsbl(i), i=1,36
SO BUILDWID SrcID|SrcRange Dsbw(i), i=1,36
SO XBADJ    SrcID|SrcRange Xbadj(i), i=1,36
SO YBADJ    SrcID|SrcRange Ybadj(i), i=1,36
```

36 个方向值从 10° 流向开始，每 10° 顺时针递增。

### 多边形、道路和浮力线源

```text
SO AREAVERT SrcID Xvert1 Yvert1 ... XvertN YvertN
SO RBARRIER SrcID Hbar Dbar
SO RDEPRESS SrcID Depth Wtop Wbottom
SO BLPINPUT Blavgblen Blavgbhgt Blavgbwid Blavglwid Blavgbsep Blavgfprm
```

- `Hbar`、`Dbar`：障碍物高度及相对道路位置。
- `Depth`：下沉道路深度。
- `Wtop`、`Wbottom`：顶部、底部宽度。
- `BLPINPUT` 参数依次为平均建筑长度、高度、宽度、线源宽度、建筑间距和浮力参数。

### 城市源与可变排放

```text
SO URBANSRC UrbanID SrcID...|SrcRange...
SO URBANSRC SrcID...|SrcRange...
SO EMISFACT SrcID|SrcRange Varflag Factors...
```

`Varflag` 可为 `ANNUAL`、`SEASON`、`MONTH`、`HROFDY`、`WSPEED`、`SEASHR`、`HRDOW`、`SHRDOW` 等；`Factors` 数量与所选变化方式一致。

### 单位

```text
SO EMISUNIT Emifac Emilbl Conlbl
SO CONCUNIT Emifac Emilbl Conlbl
SO DEPOUNIT Emifac Emilbl Deplbl
```

- `Emifac`：输出单位转换系数。
- `Emilbl`：排放单位标签。
- `Conlbl`：浓度单位标签。
- `Deplbl`：沉降单位标签。

### 颗粒物和气体沉降

```text
SO PARTDIAM SrcID Diam1 ... DiamN
SO MASSFRAX SrcID Frac1 ... FracN
SO PARTDENS SrcID Dens1 ... DensN
SO METHOD_2 SrcID FineMass MeanDiam
SO GASDEPOS SrcID Diffus DiffH2O AlphaStar Reactivity
SO GASDEPOS SrcID Dpvel
```

- `Diam`：粒径，μm。
- `Frac`：质量分数，总和应为 1。
- `Dens`：颗粒密度，g/cm³。
- `FineMass`：细粒部分质量分数。
- `MeanDiam`：平均粒径。
- 气体沉降参数与 `CO GASDEPDF/GASDEPVD` 对应，但按源指定。

### NO₂、逐小时排放和背景浓度

```text
SO NO2RATIO SrcID|SrcRange Ratio
SO HOUREMIS SrcID|SrcRange EmisFile (Format)
SO BGSECTOR StartSect1 ... StartSectN
SO BACKGRND BGFlag Values...
SO BACKGRND BGfilnam (BGformat)
SO BACKUNIT BGUnits
```

- `Ratio`：烟囱内 NO₂/NOx 比。
- `EmisFile`：逐小时排放文件。
- `BGFlag`：背景浓度时间变化方式。
- `BGUnits`：`PPB`、`PPM`、`UG/M3` 或污染物允许的其他单位。

### 外部文件、分组和专用源

```text
SO INCLUDED Incfil
SO OLMGROUP OLMGrpID SrcID...|SrcRange...
SO BLPGROUP BLPGrpID SrcID...|SrcRange...
SO PSDGROUP GrpID SrcID...|SrcRange...
SO SRCGROUP GrpID SrcID...|SrcRange...
SO SRCGROUP ALL (NOBACKGROUND)
SO HBPSRCID SrcID...|SrcRange... | ALL
SO ARCFTSRC SrcID...|SrcRange... | ALL
SO PLATFORM SrcID Zelp Hb Wb
```

- `Incfil`：外部源数据文件。
- `GrpID`：源组 ID。
- `NOBACKGROUND`：从 `ALL` 组中排除背景浓度。
- `Zelp`：平台底部高出海面的高度。
- `Hb`：平台上最高有效建筑物的总高度。
- `Wb`：平台有效建筑物的较小水平尺度。

[返回附录 A 导读](./appendix-a.md)
