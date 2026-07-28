---
title: 3.3.15—3.3.18　污染源组与特殊源
sidebarDepth: 3
---

## 3.3.15 污染源组

`SRCGROUP` 定义模型结果合并的污染源组。特殊组 `ALL` 自动包含全部已定义污染源。

```text
SO SRCGROUP ALL
```

源组可用于：

- 输出不同源类别的合并影响；
- EVENT 源贡献分析；
- NO₂ Tier 2/Tier 3 方法；
- NAAQS 和 `MAXDCONT` 等专门后处理。

`BUOYLINE` 源组和 `PSDCREDIT` 模式存在额外限制；后者使用 `PSDGROUP`。

## 3.3.16 海上平台下洗

平台下洗参数描述平台几何、高度和点源相对位置，应与海洋气象处理及适用的 ALPHA/BETA 选项配合核对。

## 3.3.17 高浮力烟羽

`HBP` 选项用于烟羽穿透混合层顶部的高浮力点源，适用源类型和法规状态取决于模型版本。

## 3.3.18 飞机源

飞机源需要 CO 路径 `ARCFTOPT`、SO 路径 `ARCFTSRC` 以及逐小时排放文件中的附加参数。应明确 AREA/VOLUME 表示方法、运行阶段和排放单位。

SO 路径最终以：

```text
SO FINISHED
```

结束。
