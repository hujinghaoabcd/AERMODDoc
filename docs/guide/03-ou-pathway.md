---
title: 第 3 章　OU 输出路径
sidebarDepth: 3
---

# 3.7 OU 输出路径的输入与选项

OU（Output）路径控制主输出表和专用结果文件。虽然各关键字通常为可选，但如果既未请求打印输出，也未请求文件输出，模型将停止处理。

## 表格型输出

| 关键字 | 作用 |
|---|---|
| `RECTABLE` | 按受体列出指定名次的高值 |
| `MAXTABLE` | 列出模型域总体最大值 |
| `DAYTABLE` | 输出逐日、逐受体同期值；文件可能很大 |
| `MAXDAILY` | 逐日最大 1 小时值 |
| `MAXDYBYYR` | 按年份和排序汇总逐日最大 1 小时值 |

## 专用文件

| 关键字 | 输出 |
|---|---|
| `MAXIFILE` | 达到或超过阈值的结果 |
| `POSTFILE` | 用于后处理的同期结果 |
| `PLOTFILE` | 每个受体指定名次的高值，便于绘图 |
| `TOXXFILE` | TOXST/TOXX 等组件使用的文件 |
| `RANKFILE` | 去除重复时段后的排序值 |
| `EVALFILE` | 模型评价用弧线最大值及烟羽参数 |
| `SEASONHR` | 按季节和一天中小时汇总 |
| `MAXDCONT` | 排序多年设计值的污染源组贡献 |

## 输出设置示例

```text
OU STARTING
   RECTABLE ALLAVE FIRST SECOND
   MAXTABLE ALLAVE 50
   PLOTFILE 24 ALL SECOND plot24.out
OU FINISHED
```

## 使用建议

- 只输出实际需要的数据，避免 `DAYTABLE`、格式化 `POSTFILE` 等生成过大文件；
- 为每个文件指定唯一文件名和无冲突的 Fortran 单元号；
- 检查浓度、沉降和排放单位转换；
- 核对平均时间、源组和高值名次；
- 使用 `MAXDCONT` 时确认目标源组、贡献源组、排序范围和阈值；
- 读取文件时以附录 C 的格式说明为准。

OU 路径必须是控制文件最后一条功能路径，并以：

```text
OU FINISHED
```

结束整个输入处理。
