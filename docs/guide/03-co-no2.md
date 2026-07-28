---
title: 3.2.5　NO₂ 转换选项
sidebarDepth: 3
---

### 3.2.5 NO₂ 转换选项的输入参数

AERMOD 支持多种 NO₂/NOx 转换方法。方法通过 `MODELOPT` 选择，臭氧、背景 NOx 和比值参数通过 CO 路径其他关键字提供。

#### 臭氧输入

适用于 `PVMRM`、`OLM`、`TTRM/TTRM2` 和 `GRSM` 的关键字包括：

- `O3SECTOR`：定义臭氧风向扇区；
- `OZONEVAL`：指定单一臭氧浓度；
- `O3VALUES`：按时段或扇区给出臭氧值；
- `OZONUNIT`：指定臭氧单位；
- `OZONEFIL`：指定逐小时臭氧文件。

#### GRSM 背景 NOx 输入

- `NOXSECTR`：定义背景 NOx 风向扇区；
- `NOXVALUE`：指定单一背景 NOx 值；
- `NOX_VALS`：给出多组背景 NOx 值；
- `NOX_UNIT`：指定单位；
- `NOX_FILE`：指定逐小时背景 NOx 文件。

#### 比值参数

- `NO2EQUIL`：环境平衡 NO₂/NOx 比值；
- `NO2STACK`：默认烟囱内 NO₂/NOx 比值。

使用 NO₂ 转换时，应同时检查：污染物类型、污染源是否支持所选方法、臭氧与背景 NOx 的单位和时间匹配、逐小时文件缺失值，以及污染源级比值是否覆盖全局默认值。
