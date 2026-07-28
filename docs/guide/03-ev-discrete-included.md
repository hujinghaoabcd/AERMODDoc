---
title: 3.6 EV 事件路径：离散事件与外部文件
sidebarDepth: 3
---

# 3.6 EV 事件路径：离散事件与外部文件

> 对应 EPA 2023 版 AERMOD 用户指南第 3.6 节完整中文译文。路径标识、关键字、参数名、事件名、源组 ID、文件名和控制文件示例保留英文；法规应用应以 EPA 英文原文及当前模型版本为准。

<a id="ev-3-6-2"></a>
## 3.6.2 指定离散事件

用户可以按照第 3.6.0 节的语法，手动输入 `EVENTPER` 和 `EVENTLOC` 记录来指定离散事件。

事件所使用的：

- 平均时间必须已在 `CO AVERTIME` 中指定；
- 污染源组必须已在 `SO SRCGROUP` 中定义。

如果事件处理输入文件最初由 AERMOD 自动生成，用户仍可在文件中加入新的事件。新增事件可以使用原始模型运行中已存在的平均时间和污染源组。

用户也可以在事件处理输入文件中：

- 增加新的平均时间；
- 定义新的污染源组；

然后使用这些新增设置定义其他事件。

### 手动事件示例

```text
EV STARTING

EV EVENTPER EVNT0001 24 ALL 23071524
EV EVENTLOC EVNT0001 XR= 500.0 YR= 1000.0 35.0 1.5

EV EVENTPER EVNT0002 1 SRCGRP1 23071608
EV EVENTLOC EVNT0002 RNG= 1500.0 DIR= 90.0 28.0 0.0

EV FINISHED
```

其中：

- `EVNT0001` 是一个 24 小时平均事件，使用笛卡尔坐标；
- `EVNT0002` 是一个 1 小时平均事件，使用相对于 `(0, 0)` 的极坐标。

---

<a id="ev-3-6-3"></a>
## 3.6.3 从外部文件引入事件数据

用户可以通过 `EV` 路径中的 `INCLUDED` 关键字，从外部文件引入事件数据。

`EV INCLUDED` 可以位于事件路径中的任意位置，但必须：

- 位于 `EV STARTING` 之后；
- 位于 `EV FINISHED` 之前。

外部文件本身不能包含：

```text
EV STARTING
EV FINISHED
```

外部文件中的记录会被当作主控制文件的一部分处理。

### 语法

```text
EV INCLUDED Incfil
```

**类型：** 可选，可重复。

`Incfil` 为外部事件数据文件名，最多 40 个字符。文件内容必须是有效的 `EV` 路径控制命令，例如：

```text
EV EVENTPER ...
EV EVENTLOC ...
```

### 错误定位与输入列偏移

如果处理外部文件时产生错误，错误消息会报告该外部文件中的行号，消息格式见附录 B。

如果 `EV` 路径中使用了多个 `INCLUDED` 文件，用户需要结合文件在主控制文件中的输入顺序，判断错误具体来自哪个文件。

如果主输入控制文件的起始列不在第 1 列，而是按第 2.4.8 节所述进行了整体偏移，则外部文件中的控制命令也必须采用相同的列偏移量。

### 示例

主控制文件：

```text
EV STARTING

EV INCLUDED event_data_1.inp
EV INCLUDED event_data_2.inp

EV FINISHED
```

外部文件 `event_data_1.inp`：

```text
EV EVENTPER EVT00001 24 ALL 23070124
EV EVENTLOC EVT00001 XR= 1000.0 YR= 2000.0 15.0 0.0
```

外部文件中不应再次写入 `EV STARTING` 或 `EV FINISHED`。
