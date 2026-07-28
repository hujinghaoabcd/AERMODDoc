---
title: 附录 D　AERMOD 23132 版本修订概述
sidebarDepth: 3
---

# 附录 D　AERMOD 23132 版本修订概述

> 对应原文印刷页码 D-1 至 D-6。原文标题为 *Model Change Bulletin (MCB) 17, AERMOD version 23132 (April 22, 2022)*。版本号、日期、源代码文件名、子程序名、关键字和选项名均按原文保留。

## 本页目录

- [D.1 缺陷修复](#d-1-缺陷修复-bug-fixes)
- [D.2 功能增强](#d-2-功能增强-enhancements)
- [D.3 理论与算法更新——法规选项](#d-3-理论与算法更新——法规选项)
- [D.4 理论与算法更新——BETA 选项](#d-4-理论与算法更新——beta-选项)
- [D.5 理论与算法更新——ALPHA 选项](#d-5-理论与算法更新——alpha-选项)
- [D.6 仅文档更新](#d-6-仅文档更新-documentation-updates-only)

## 模型变更公告（MCB）17

**AERMOD 版本：** `23132`  
**原文标注日期：** 2022 年 4 月 22 日

以下变更按类型列出。每项变更同时注明受影响的污染物和污染源类型。

## D.1 缺陷修复（Bug Fixes）

### 1. 两位年份的解释逻辑

- **修改内容：** 更新地表气象文件中两位年份的解释逻辑：
  - 年份大于或等于 `50` 时，解释为 1900 年代；
  - 年份小于 `50` 时，解释为 2000 年代。
- **适用情形：** 当 `ME` 路径中 `SURFDATA` 指定的年份与 `SFC` 气象文件中记录的年份不一致时，需要此项更新。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

### 2. NO2STACK 初始化值

- **修改内容：** 将 `NO2STACK` 的初始化值由 `0.1` 改为 `-9.0`。
- **原因：** `-9.0` 位于有效范围 `0.0-1.0` 之外，可防止程序内部错误地把一个有效但用户未明确指定的值赋给 `NO2STACK`。
- **受影响污染物：** NO₂。
- **受影响源类型：** 全部。

### 3. BUOYLINE 的 EVENT 处理

- **修改内容：** 更新 `BUOYLINE` 源类型的事件处理逻辑。
- **修复问题：** 当 `SO` 路径中定义多个源类型时，避免污染源组 ID 冲突。
- **受影响污染物：** 全部。
- **受影响源类型：** `BUOYLINE`。

### 4. 递归子程序导致的运行时错误

- **修改内容：** 修正递归子程序。
- **原问题：** 使用 `gfortran` 编译器并启用 `fcheck-recursive` 或 `fcheck-all` 标志时，可能产生运行时错误。
- **涉及子程序：**
  - `aermod.f` 中的 `RECSIZ`；
  - `reset.f` 中的 `RECARD`。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

### 5. NOURBTRAN 条件下的城市源循环

- **修改内容：** 在 `METEXT.f` 的 `URBCALC` 子程序中增加逻辑。
- **作用：** 当 AERMOD 选择无城市过渡选项 `NOURBTRAN` 时，程序跳过相应城市源循环。
- **修复效果：** 消除城市调试文件中可能出现的 `NaN`。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

### 6. BUOYLINE 调试文件文件头

- **修改内容：** 为 `BUOYLINE` 调试文件增加文件头。
- **受影响污染物：** 全部。
- **受影响源类型：** `BUOYLINE`。

### 7. DHP3PLAT 初始化

- **修改内容：** 修正变量 `DHP3PLAT` 的初始化。
- **背景：**
  - `DHP3PLAT` 与穿透烟羽及平台下洗的 `ALPHA` 选项有关；
  - 该变量在 `modules.f` 中已声明，但此前未初始化，程序默认其为零；
  - `DHP3PLAT` 是为后续更新预留的占位变量，应明确设为 `0`。
- **受影响污染物：** 全部。
- **受影响源类型：**
  - `POINT`；
  - `POINTCAP`；
  - `POINTHOR`；
  - 仅限海上平台源。

### 8. DAYRANGE 的虚假警告

- **修改内容：** 修正使用 `DAYRANGE` 关键字时错误触发的以下警告：

```text
Julian Day Out of Range
```

- **原问题：** `meset.f` 中的逻辑语句错误引用变量 `JDAY`。
- **修正：** 将 `JDAY` 替换为 `JDAYB` 和 `JDAYE`。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

### 9. RLINEXT 与 ALPHA 标志

- **修改内容：** 修正控制逻辑，使指定 `RLINEXT` 源类型时必须同时启用 `ALPHA` 标志。
- **受影响污染物：** 全部。
- **受影响源类型：** `RLINEXT`。

### 10. NOMINO3 与 ARM2 的冲突消息

- **修改内容：** 当 `NOMINO3` 与 `ARM2` 同时使用时，模型现在生成错误消息，而不是警告消息。
- **原因：**
  - `NOMINO3` 用于关闭最小背景臭氧浓度限制；
  - 该设置不适用于 `ARM2`。
- **受影响污染物：** NO₂。
- **受影响源类型：** 全部。

### 11. INCLUDED 文件中的 AREACIRC 源

- **修改内容：** 修正通过 `INCLUDED` 文件列出 `AREACIRC` 源时的处理逻辑。
- **原问题：**
  - 多次读取 `AREACIRC` 源会在数组尺寸分配和 ID 分配之间产生内存冲突；
  - 源信息可能被覆盖。
- **修复效果：** 正确跟踪多个 `AREACIRC` 源的源 ID 和 `NVERT`。
- **受影响污染物：** 全部。
- **受影响源类型：** `AREACIRC`。

### 12. ARMRATIO 有效范围

- **修改内容：** 更新 `ARMRATIO` 最小值和最大值的逻辑。
- **目的：** 根据是否指定 `DFAULT` 关键字，使程序中的有效范围与《AERMOD 用户指南》给出的范围一致。
- **受影响污染物：** NO₂。
- **受影响源类型：** 全部。

### 13. I_ALPHA 初始化

- **修改内容：** 在 `INTERP_COEFFS` 子程序中初始化变量 `I_ALPHA`。
- **目的：** 避免 64 位可执行程序在某些情形下产生运行时错误。
- **受影响污染物：** 全部。
- **受影响源类型：** `RLINE`。

### 14. 未实现 NO₂ 转换的源类型

- **修改内容：** 当某种 NO₂ 转换方法用于尚未实现该方法的源类型时，增加警告消息。
- **模型行为：**
  - 模型运行仍会完成；
  - 警告会说明该 NO₂ 选项未应用于相应源类型。
- **受影响污染物：** NO₂。
- **受影响源类型：** 全部。

### 15. SCREEN 与特定源类型

- **修改内容：** 当 `SCREEN` 选项与以下源类型同时使用时，增加警告：
  - `RLINE`；
  - `RLINEXT`；
  - `BUOYLINE`；
  - `SWPOINT`；
  - `AREA`；
  - `AREAPOLY`；
  - `AREACIRC`；
  - `LINE`。
- **受影响污染物：** 全部。
- **受影响源类型：** 上述源类型。

### 16. FLAT 源高程下忽略受体高程

- **修改内容：** 增加警告消息。
- **适用情形：** 在 `SO LOCATION` 的源高程字段中使用 `FLAT` 时，受体的 `ZHILL` 和 `ZELEV` 值会被忽略。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

### 17. FLAT 地形指定方式导致的不一致结果

- **修改内容：** 修正 `bline.f`、`rline.f` 和 `soset.f` 中的代码逻辑。
- **原问题：** `BUOYLINE`、`RLINE` 和 `RLINEXT` 的结果会因 `FLAT` 地形的指定方式不同而不一致。
- **受影响污染物：** 全部。
- **受影响源类型：**
  - `BUOYLINE`；
  - `RLINE`；
  - `RLINEXT`。

### 18. SWPOINT 源数组分配

- **修改内容：** 修正 `SWPOINT` 源数组的错误分配。
- **受影响污染物：** 全部。
- **受影响源类型：** `SWPOINT`。

## D.2 功能增强（Enhancements）

### 1. RLINE 和 RLINEXT 支持高地形

- **修改内容：** 为 `RLINE` 和 `RLINEXT` 增加使用高地形选项 `ELEV` 的能力。
- **此前限制：** 旧版本要求这两类源必须指定 `FLAT` 地形标志。
- **原文注意事项：** 在进行项目级交通一致性分析和热点分析时，应参考美国 EPA 交通与空气质量办公室（Office of Transportation and Air Quality，OTAQ）关于道路源模拟的现行指南。
- **受影响污染物：** 全部。
- **受影响源类型：**
  - `RLINE`；
  - `RLINEXT`。

### 2. 城市源调试文件

- **修改内容：** 增加新的城市源调试文件。
- **输出内容：**
  - 温度廓线；
  - 垂直位温廓线。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

## D.3 理论与算法更新——法规选项

**无。**

## D.4 理论与算法更新——BETA 选项

### 1. RLINE 源类型重新表述

- **变更性质：** 拟议法规更新。
- **修改内容：** 重新表述 `RLINE` 源类型。
- **目的：**
  - 使 `RLINE` 与其他 AERMOD 源类型更加一致；
  - 同时不降低此前评估数据库中的模型表现。

重新表述主要包含三个方面：

1. 风速计算；
2. 与 AERMOD 其他源类型的协调；
3. 扩散系数。

修改顺序为：

1. 首先调整风速计算和协调处理；
2. 随后重新检查垂向和横向扩散计算所使用的参数。

- **受影响污染物：** 全部。
- **受影响源类型：**
  - `RLINE`；
  - `RLINEXT`。

详细说明见 EPA SCRAM 网站所列文件：

> EPA, 2023. *Incorporation and Evaluation of the RLINE Source Type in AERMOD for Mobile Source Applications*. EPA-2023/R-23-011, Office of Air Quality Planning and Standards, RTP, NC.

中文题名：**《面向移动源应用的 AERMOD RLINE 源类型纳入与评估》**。

### 2. GRSM NO₂ 转换方法更新

- **变更性质：** 拟议法规更新。
- **修改内容：** 更新 `GRSM` NO₂ 转换选项的理论与算法。
- **受影响污染物：** NO₂。
- **受影响源类型：**
  - `POINT`；
  - `POINTHOR`；
  - `POINTCAP`；
  - `AREA`；
  - `AREAPOLY`；
  - `AREACIRC`；
  - `LINE`；
  - `VOLUME`；
  - `OPENPIT`。

详细说明见 EPA SCRAM 网站所列技术支持文件：

> Environmental Protection Agency, 2023. *Technical Support Document (TSD) for Adoption of the Generic Reaction Set Method (GRSM) as a Regulatory Non-Default Tier-3 NO₂ Screening Option*. EPA-454/R-23-009. Office of Air Quality Planning & Standards, Research Triangle Park, NC.

中文题名：**《采用通用反应集方法（GRSM）作为法规非默认第三级 NO₂ 筛选选项的技术支持文件》**。

### 3. COARE 海洋气象算法

- **变更性质：** 拟议法规更新。
- **修改内容：** AERMET `v23132` 增加 `COARE` 算法，用于处理海洋气象数据并模拟海上污染源。
- **法规状态：** 该项更新被提出作为 AERMET 法规模拟理论与算法的更新。
- **文件标志：** 使用 `COARE` 时，AERMET 会在 `SFC` 文件头中写入字符串：

```text
COARE
```

- **AERMOD 控制要求：**
  - 如果 AERMOD 在 `SFC` 文件头中发现 `COARE`，控制文件必须包含 `BETA` 标志；
  - 若文件头中存在 `COARE` 而控制文件未指定 `BETA`，模型会生成错误消息。
- **受影响污染物：** 全部。
- **受影响源类型：** 全部。

## D.5 理论与算法更新——ALPHA 选项

### 1. AREA 类源的烟羽摆动

- **修改内容：** 为 AREA 类源增加烟羽摆动（meander）处理。
- **当前实现：** 仅对下风向受体计算烟羽摆动。
- **受影响污染物：** 全部。
- **受影响源类型：**
  - `AREA`；
  - `AREAPOLY`；
  - `AREACIRC`；
  - `LINE`。

### 2. 飞机源参数

- **修改内容：** 更新 AREA 和 VOLUME 类源，使其可以接受用于表征飞机源的附加参数。
- **控制文件要求：**
  - 必须指定新关键字 `ARCFTOPT`；
  - 必须使用新关键字 `ARCFTSRC` 标识飞机源；
  - AREA 和/或 VOLUME 飞机源的新参数必须通过逐小时排放文件提供。
- **受影响污染物：** 全部。
- **受影响源类型：**
  - `AREA`；
  - `AREAPOLY`；
  - `AREACIRC`；
  - `LINE`；
  - `VOLUME`。

### 3. 高浮力烟羽选项

- **修改内容：** 增加高浮力烟羽 `HBP` 的 `ALPHA` 选项。
- **适用条件：** 烟羽穿透混合层顶部。
- **受影响污染物：** 全部。
- **受影响源类型：**
  - `POINT`；
  - `POINTHOR`；
  - `POINTCAP`。

## D.6 仅文档更新（Documentation Updates Only）

### 1. ARM2 与 SRCGROUP ALL

更新《AERMOD 用户指南》第 3.2.5 节，以明确：

- `ARM2` 仅应用于 `SRCGROUP ALL`；
- 如果至少定义了一个源组且其 ID 不是 `ALL`，AERMOD 会假定存在 `SRCGROUP ALL`，并将 `ARM2` 应用于该组。

### 2. 模型理论与算法文件中的方程引用

更新《模型理论与算法文件》（Model Formulation Document，MFD）第 5.9 节：

- 正确说明应为方程 109 推导得到方程 110；
- 旧版文档错误地写成方程 103 推导得到方程 110。

### 3. OPENPIT 的 Zs 和有效深度

更新《AERMOD 用户指南》第 3.3.1 节，补充定义：

- `Zs`；
- `OPENPIT` 源的有效深度。

### 4. 浮力通量计算公式

在《AERMOD 用户指南》第 3.3.2.11 节中增加浮力通量计算公式。

### 5. MFD 方程 77 中 X 的定义

更新 MFD 第 5.5.1.1 节，修正方程 77 中 `X` 项的定义。

原文公式排版为：

$$
X = \sigma_v x / (u z_i)
$$

::: warning 译文说明
PDF 中该公式的字形提取存在重叠；上述形式按原式可辨识内容转写，变量定义应以英文版 MFD 的方程 77 为准。
:::
