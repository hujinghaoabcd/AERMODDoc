---
title: 附录 D　AERMOD 23132 版本修订概述
sidebarDepth: 3
---

# 附录 D　AERMOD 23132 版本修订概述

本附录对应模型变更公告 MCB 17，概述 AERMOD 23132 的缺陷修复、增强和算法更新。

## 缺陷修复

主要包括：

1. 两位年份的世纪解释；
2. `NO2STACK` 初始化值；
3. `BUOYLINE` EVENT 源组冲突；
4. gfortran 递归检查运行错误；
5. `NOURBTRAN` 城市循环；
6. BUOYLINE 调试文件头；
7. `DHP3PLAT` 初始化；
8. `DAYRANGE` 虚假儒略日警告；
9. `RLINEXT` 必须启用 `ALPHA`；
10. `NOMINO3` 与 `ARM2` 冲突改为错误；
11. `INCLUDED` 文件中多个 `AREACIRC`；
12. `ARMRATIO` 有效范围；
13. `I_ALPHA` 初始化；
14. 未实现 NO₂ 方法的源类型警告；
15. `SCREEN` 与部分源类型的警告；
16. `FLAT` 源高程时忽略受体地形值的警告；
17. BUOYLINE/RLINE/RLINEXT 的 FLAT 处理一致性；
18. `SWPOINT` 数组分配。

## 功能增强

- `RLINE` 和 `RLINEXT` 支持高地形 `ELEV`；
- 新增城市源温度和位温廓线调试文件。

## BETA 更新

- 重新表述 `RLINE`，协调风速、其他源类型和扩散系数；
- 更新 `GRSM` NO₂ 转换；
- AERMET 增加海洋气象 `COARE`，文件头出现 `COARE` 时 AERMOD 要求相应 `BETA` 设置。

## ALPHA 更新

- AREA 类源烟羽摆动；
- AREA/VOLUME 飞机源参数；
- 高浮力烟羽 `HBP`。

## 文档更新

包括 ARM2 与 `SRCGROUP ALL`、模型理论文件方程引用、OPENPIT 有效深度、浮力通量公式和方程 77 变量定义。
