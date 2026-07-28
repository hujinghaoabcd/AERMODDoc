---
title: 3.2.1—3.2.2　标题与扩散选项
sidebarDepth: 3
---

### 3.2.1 标题信息

CO 路径使用 `TITLEONE` 和可选的 `TITLETWO` 设置运行标题。标题会显示在主输出文件页眉中，大小写和前导空格按输入保留。

```text
CO TITLEONE Title1
CO TITLETWO Title2
```

### 3.2.2 扩散选项

`MODELOPT` 是 CO 路径的必需、不可重复关键字，用于选择输出类型、地形处理、法规状态、沉降、NO₂ 转换及其他扩散选项。

```text
CO MODELOPT Option1 Option2 ...
```

常用次级关键字包括：

| 类别 | 关键字 | 说明 |
|---|---|---|
| 法规状态 | `DFAULT` | 启用法规默认选项 |
| 研究功能 | `ALPHA`、`BETA` | 启用相应开发或拟议法规功能 |
| 输出类型 | `CONC`、`DEPOS`、`DDEP`、`WDEP` | 浓度、总沉降、干沉降、湿沉降 |
| 地形 | `FLAT`、`ELEV` | 平坦或高地形处理 |
| NO₂ | `PVMRM`、`OLM`、`ARM2`、`TTRM`、`TTRM2`、`GRSM` | NO₂ 转换方法 |
| 性能 | `FASTALL`、`FASTAREA` | 加速部分计算 |
| 沉降耗减 | `DRYDPLT`、`NODRYDPLT`、`WETDPLT`、`NOWETDPLT` | 控制烟羽耗减 |
| 特殊模式 | `SCREEN`、`SCIM`、`PSDCREDIT` | 筛选、抽样和 PSD 处理 |

::: warning
`ALPHA` 和 `BETA` 功能的法规状态会随版本和规则更新而变化。正式项目应核对当前版本的模型变更公告、实施指南和主管机构要求。
:::

`DFAULT` 与非法规选项存在冲突时，AERMOD 会在设置阶段报告错误。沉降、NO₂ 转换、城市边界层过渡、筛选模式和线源选项的详细参数应与相应污染源输入同时检查。
