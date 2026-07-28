---
title: 2.4.7　错误消息与调试
sidebarDepth: 3
---

### 2.4.7 使用错误消息文件调试输入控制文件

前述各节逐步建立了一个 AERMOD 示例控制文件，并展示了模型中较常用的选项。

实际应用往往比本例复杂得多，可能包括：

- 多个污染源；
- 多个污染源组；
- 多个受体网络；
- 额外的离散受体位置；
- 高地形高度数据。

为减少模拟应用中的错误，AERMOD 设计了较为详细的错误处理功能。

AERMOD 的错误处理主要实现两个目标。

第一，模型会读取完整输入文件并报告所有错误或可疑输入，而不是在遇到第一个错误时立即停止、等待用户修改后再逐个发现后续错误。

第二，模型给出的错误和警告消息包含足够详细的说明，帮助用户定位并调试输入文件。有关 AERMOD 错误处理功能的更多内容，见附录 B。

AERMOD 在处理输入数据和执行模型计算时会生成消息。这些消息涵盖以下情况：

- **致命错误：** 除继续识别其他错误条件外，将阻止进一步处理；
- **警告：** 不会终止处理，但提示可能存在错误或可疑条件；
- **信息消息：** 可能对用户有用，但不直接影响结果有效性。

模型遇到需要生成消息的情况时，会先把消息写入临时存储文件。

在完成某次运行的设置处理后，以及完成模型计算后，模型会重新读取消息文件，并生成消息汇总，写入主打印输出文件。

如果模型设置阶段没有发现错误或警告，并且用户在 CO 路径的 `RUNORNOT` 记录中选择了 `RUN`，模型会在输出文件中说明设置已成功完成。

否则，模型会报告遇到的消息汇总。

图 2-3 给出了示例问题的一份模型运行消息汇总。该表统计各类消息的出现次数，并列出生成的致命错误或警告消息。
### 图 2-3 AERMOD 运行消息汇总表示例

> 以下为模型实际输出格式，保持英文原样。

```text
*** Message Summary : AERMOD Model Execution ***

  --------- Summary of Total Messages --------

 A Total of             0 Fatal Error Message(s)
 A Total of             1 Warning Message(s)
 A Total of             0 Informational Message(s)

 A Total of            96 Hours Were Processed

 A Total of             0 Calm Hours Identified

 A Total of             0 Missing Hours Identified (   0.00 Percent)


    ******** FATAL ERROR MESSAGES ********
               *** NONE ***


    ********    WARNING MESSAGES   ********
 MX W403       57       PFLCNV: Turbulence data is being used w/o ADJ_U* option   SigA & SigW

   ************************************
   *** AERMOD Finishes Successfully ***
   ************************************
```

如果在 RE 路径中遗漏用于指定极坐标受体网络原点的记录，模型可能生成如下警告：

```text
RE W220 39 REPOLR: Missing Origin (Use Default = 0,0) In GRIDPOLR POL1
│  │    │  │       │                                             │
│  │    │  │       │                                             └─ 提示信息
│  │    │  │       └─ 详细错误/警告消息
│  │    │  └─ 生成消息的子程序
│  │    └─ 输入文件中发生消息的行号
│  └─ 消息代码：消息类型（E、W、I）和消息编号
└─ 消息所属路径 ID
```

该消息属于警告，因此会显示在输出文件消息汇总表的末尾，但不会使数据处理停止。

消息行最后的“提示信息”可能包含：

- 造成错误的关键字或参数名称；
- 污染源 ID；
- 污染源组 ID；
- 受体网络 ID；
- 在处理气象数据时触发消息的日期变量。

例如，信息消息可以指出某个静风小时的出现。

对于初次使用者和特别复杂的应用，强烈建议第一次运行时把 CO 路径中的 `RUNORNOT` 设置为不运行。这样，在投入资源执行完整模拟之前，可以先确认控制文件是否正确设置了模型。

用户应认真检查每条警告，确认模型在该应用中按预期运行。由于警告不会使模型停止，因此不能仅凭程序成功结束就忽略它们。

详细消息一般应提供足够信息，使用户确定控制文件中错误的位置和性质。

消息中的行号对于定位输入文件中的错误尤其有用。不过，如果错误属于遗漏某项输入，并由模型在某条路径输入结束时检查发现，则消息行号可能对应该路径的最后一条记录，而不是实际遗漏位置。

用户有时需要综合检查全部消息才能找到真正错误。单个错误可能引起模型在后续输入中识别出多个衍生错误，而这些后续问题本身并不是相互独立的错误。

图 2-4 展示了一个例子：SO 路径中的建筑物尺寸关键字输入错误。由于建筑物宽度使用了续行，而第一行关键字拼写错误，模型也把后续关键字字段为空的续行解释为无效输入。

这些记录的错误消息内容相近，但对于关键字字段为空的记录，消息由模型中的另一个子程序 `SOCARD` 生成。
### 图 2-4 关键字错误及相应消息汇总表示例

> 以下输入和模型消息保持英文原样。示例中的错误关键字是有意设置的。

```text
SO STARTING
LOCATION    STACK1   POINT 0.0 0.0 0.0
** Point Source       QS    HS     TS    VS     DS
** Parameters:       ---- ---- ----     ----   ----
   SRCPARAM STACK1   500.0 65.0 425.0 15.0      5.0
   BUILDHTS STACK1   36*50.
   BUILDWTS STACK1   62.26     72.64   80.80    86.51     89.59    89.95
            STACK1   87.58     82.54   75.00    82.54     87.58    89.95
            STACK1   89.59     86.51   80.80    72.64     62.26    50.00
            STACK1   62.26     72.64   80.80    86.51     89.59    89.95
            STACK1   87.58     82.54   75.00    82.54     87.58    89.95
            STACK1   89.59     86.51   80.80    72.64     62.26    50.00
   XBADJ    STACK1 -47.35    -55.76   -62.48   -67.29    -70.07   -70.71
            STACK1 -69.21    -65.60   -60.00   -65.60    -69.21   -70.71
            STACK1 -70.07    -67.29   -62.48   -55.76    -47.35   -37.50
            STACK1 -35.19    -31.82   -27.48   -22.30    -16.44   -10.09
            STACK1   -3.43      3.34   10.00      3.34    -3.43   -10.09
            STACK1 -16.44    -22.30   -27.48   -31.82    -35.19   -37.50
   YBADJ    STACK1   34.47     32.89   30.31    26.81     22.50    17.50
            STACK1   11.97      6.08    0.00     -6.08   -11.97   -17.50
            STACK1 -22.50      26.81  -30.31   -32.89    -34.47   -35.00
            STACK1 -34.47    -32.89   -30.31   -26.81   -22.50   -17.50
            STACK1 -11.97      -6.08    0.00      6.08    11.97    17.50
            STACK1   22.50     26.81   30.31    32.89    34.47    35.00
   SRCGROUP     ALL
SO FINISHED
  *** Message Summary For AERMOD Model Setup ***

  --------- Summary of Total Messages --------

 A Total of            7 Fatal Error Message(s)
 A Total of            1 Warning Message(s)
 A Total of            0 Informational Message(s)


    ******** FATAL ERROR MESSAGES ********
 SO E105      15        SETUP: Invalid Keyword Specified. The Troubled Keyword is     BUILDWTS
 SO E110      16       SOCARD: Keyword is Not Valid for This Pathway. Keyword is      BUILDWTS
 SO E110      17       SOCARD: Keyword is Not Valid for This Pathway. Keyword is      BUILDWTS
 SO E110      18       SOCARD: Keyword is Not Valid for This Pathway. Keyword is      BUILDWTS
 SO E110      19       SOCARD: Keyword is Not Valid for This Pathway. Keyword is      BUILDWTS
 SO E110      20       SOCARD: Keyword is Not Valid for This Pathway. Keyword is      BUILDWTS
 SO E237      40        SRCQA: Not Enough BUILDWIDs Specified for SourceID              STACK1

    ********    WARNING MESSAGES   ********
 MX W403       57       PFLCNV: Turbulence data is being used w/o ADJ_U* option     SigA & SigW

    **************************************
    *** SETUP Finishes UN-successfully ***
    **************************************
```

由于详细错误和警告已经列入主输出文件的消息汇总表，用户通常不需要单独检查完整的详细消息文件。

因此，模型默认把某次运行产生的消息写入临时文件，并在运行完成后删除该临时文件。

如果用户需要查看全部类型消息的完整清单，可以使用 CO 路径中的可选关键字 `ERRORFIL`，把详细消息保存到用户指定的文件。详见第 3.2.19 节。
