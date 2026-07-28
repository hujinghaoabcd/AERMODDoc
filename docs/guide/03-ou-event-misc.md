---
title: 3.7 OU 输出路径：EVENT 与其他输出
sidebarDepth: 3
---

# 3.7 OU 输出路径：EVENT 与其他输出

> 对应 EPA 2023 版 AERMOD 用户指南第 3.7 节完整中文译文。路径标识、关键字、参数名、文件名、单位、格式说明和模型原始输出保留英文；法规应用应以 EPA 英文原文及当前模型版本为准。

<a id="ou-3-7-3"></a>

## 3.7.3 EVENT 处理输出选项

AERMOD 中的 `EVENT` 处理专门用于对短期平均事件开展污染源贡献分析，其平均时间不超过 24 小时。

事件可以是：

- 由 AERMOD 模型生成的事件；
- 用户指定的事件；
- 两者同时存在。

由于应用范围较为专门，输出选项只由一个关键字控制。

`EVENTOUT` 关键字控制 `EVENT` 模型污染源贡献输出的详细程度。

语法和类型如下：

```text
OU EVENTOUT SOCONT
```

或者：

```text
OU EVENTOUT DETAIL
```

**类型：** 必需，不可重复。

其中：

- `SOCONT`：只在输出文件中生成污染源贡献信息；
- `DETAIL`：在输出文件中生成更详细的汇总。

`SOCONT` 选项提供：

- 对应事件时段内；
- 针对该事件污染源组；
- 每个污染源的平均浓度或总沉降值，即该污染源的贡献。

`DETAIL` 同样提供上述基本污染源贡献信息，此外还提供：

- 平均时段内每一个小时、每一个污染源的逐小时平均浓度或总沉降值；
- 事件时段的逐小时气象数据汇总。

通常，`DETAIL` 生成的输出文件比 `SOCONT` 更大，尤其是在污染源数量较多时。

`EVENTOUT` 没有默认设置。

---

<a id="ou-3-7-4"></a>

## 3.7.4 其他输出选项

以下三个可选关键字用于其他输出控制：

- `SUMMFILE`：生成单独的格式化输出文件，其中包含标准 `aermod.out` 文件末尾的高排序值汇总；
- `FILEFORM`：指定单独结果文件采用指数格式，而不是当前使用的定点格式；
- `NOHEADER`：取消格式化输出文件中的文件头记录。

### SUMMFILE

语法、类型和参数顺序如下：

```text
OU SUMMFILE SummFileName
```

**类型：** 可选，不可重复。

其中，`SummFileName` 是包含高排序值汇总的外部文件名。

按照 AERMOD 默认参数，`SUMMFILE` 文件名最长可以为 200 个字符。

文件名开头和结尾可以使用双引号作为字段分隔符，以允许文件名中包含空格。

除高排序值汇总外，`SUMMFILE` 还包含主 `aermod.out` 文件中的：

```text
MODEL SETUP OPTIONS SUMMARY
```

页面。

### FILEFORM

语法、类型和参数顺序如下：

```text
OU FILEFORM EXP
```

或者：

```text
OU FILEFORM FIX
```

**类型：** 可选，不可重复。

其中：

- `EXP`：结果输出文件使用指数格式；
- `FIX`：结果输出文件使用定点格式。

默认采用定点格式，因此显式使用：

```text
OU FILEFORM FIX
```

是多余的。

AERMOD 只检查输入字段的前三个字符，因此也可以使用完整形式：

```text
EXPONENTIAL
FIXED
```

`FILEFORM` 指定的格式适用于：

- `PLOTFILE`；
- 采用 `PLOT` 格式的 `POSTFILE`；
- `MAXIFILE`；
- `RANKFILE`；
- `SEASONHR`。

该选项不会影响：

- 标准 `aermod.out` 文件中的结果格式；
- 可选 `SUMMFILE` 中的结果格式。

在模拟影响较小时，`FILEFORM` 有助于保留结果精度，尤其适用于使用 `POSTFILE` 对逐小时浓度进行后处理。

在模拟影响较大时，该选项也可能有用，因为较大数值可能超出定点输出所采用的 Fortran 格式说明符 `F13.5` 的表示范围。

如果模型检测到数值超出定点格式允许范围，且没有选择 `FILEFORM EXP`，AERMOD 会生成警告消息。

### NOHEADER

语法、类型和参数顺序如下：

```text
OU NOHEADER FileType1 FileType2 FileType3 ... FileTypeN
```

或者：

```text
OU NOHEADER ALL
```

**类型：** 可选，不可重复。

其中，`FileTypeN` 表示需要取消文件头记录的格式化输出文件关键字，可以包括：

- `POSTFILE`；
- `PLOTFILE`；
- `MAXIFILE`；
- `RANKFILE`；
- `SEASONHR`；
- `MAXDAILY`；
- `MXDYBYYR`；
- `MAXDCONT`。

使用 `ALL` 时，所有适用输出文件类型的文件头记录都会被取消。
