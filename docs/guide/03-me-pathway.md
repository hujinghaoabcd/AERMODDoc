---
title: 第 3 章　ME 气象路径
sidebarDepth: 3
---

# 3.5 ME 气象路径的输入与选项

ME（Meteorology）路径指定 AERMOD 使用的地表边界层参数文件和廓线文件，以及气象站、年份和处理时段。

## 必需输入

| 关键字 | 作用 |
|---|---|
| `SURFFILE` | 地表气象文件 `.SFC` 及可选格式 |
| `PROFFILE` | 廓线气象文件 `.PFL` 及可选格式 |
| `SURFDATA` | 地表站 ID、年份和站点名称 |
| `UAIRDATA` | 高空站 ID、年份和站点名称 |
| `PROFBASE` | 廓线基准高程及单位 |

现场资料可通过 `SITEDATA` 标识。

```text
ME STARTING
   SURFFILE project.SFC
   PROFFILE project.PFL
   SURFDATA 12345 2021 SURFACE_STATION
   UAIRDATA 67890 2021 UPPER_AIR_STATION
   PROFBASE 15.0 METERS
ME FINISHED
```

## 可选处理

- `STARTEND`：限制处理日期范围；
- `DAYRANGE`：选择一个或多个儒略日范围；
- `WDROTATE`：旋转风向；
- 其他关键字：控制气象资料检查和专门处理。

## 文件一致性检查

AERMOD 会检查控制文件中的站点、年份和气象文件头信息。还应人工检查：

1. AERMET 与 AERMOD 版本是否配套；
2. `.SFC` 和 `.PFL` 是否来自同一次 AERMET 处理；
3. 日期、小时、时区和地方标准时间是否一致；
4. 静风、缺失小时和湍流参数标志；
5. `ADJ_U*`、`BULKRN`、`COARE` 等文件头标志与控制选项是否兼容。

气象文件字段和格式见附录 C。
