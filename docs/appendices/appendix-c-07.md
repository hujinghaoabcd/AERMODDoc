---
title: C.7　用于评估的弧线最大值（EVALFILE）
sidebarDepth: 3
---

# C.7 用于评估的弧线最大值（EVALFILE 选项）

> 原文小节标题写作 `EVALFIL option`，实际关键字为 `EVALFILE`。

`OU EVALFILE` 用于为单个污染源生成弧线最大浓度输出，适用于模型评估研究。

## C.7.1 适用范围与输出变量

弧线上的受体由 `RE EVALCART` 定义。受体可以按以下方式分组：

- 按距污染源的距离形成弧线；
- 按其他合理规则分组。

对每一个选定污染源和每一个气象小时，格式化 `EVALFILE` 输出一组信息。变量共 32 项：

1. 污染源 ID，12 个字符；
2. 日期，`YYMMDDHH`；
3. 弧线 ID，8 个字符；
4. 弧线最大 `P/Q`；
5. 弧线最大值对应的排放速率，含单位换算；
6. 基于真实中心线浓度的横风向积分浓度；
7. 归一化、无量纲横风向积分浓度；
8. 弧线最大值对应的下风向距离，m；
9. 弧线最大值对应的有效风速，m/s；
10. 弧线最大值对应的有效 `Fv`，m/s；
11. 弧线最大值对应的有效 `Fw`，m/s；
12. 弧线最大值对应的 `Fy`，m；
13. 弧线最大值对应的有效烟羽高度，m；
14. 当前小时的 Monin-Obukhov 长度，m；
15. 当前小时的混合层高度，m；
16. 当前小时的地表摩阻速度，m/s；
17. 不稳定条件下为当前小时对流速度尺度，m/s；稳定条件下为当前小时 `Fz`；
18. 当前小时浮力通量，m⁴/s³；
19. 当前小时动量通量，m⁴/s²；
20. 当前小时 Bowen 比；
21. 当前小时烟羽穿透因子；
22. 直接烟羽的中心线 `P/Q`；
23. 间接烟羽的中心线 `P/Q`；
24. 穿透烟羽的中心线 `P/Q`；
25. 无量纲下风向距离；
26. 烟羽高度/混合层高度比；
27. 无量纲浮力通量；
28. 污染源释放高度，m；
29. 弧线中心线 `P/Q`；
30. 开发选项设置占位符，固定为 10 个零；
31. 当前小时流动矢量，度；
32. 稳定烟羽反射的有效高度，m。

## C.7.2 Fortran 输出格式

模型采用以下 Fortran 语句写入 `EVALFILE`：

```fortran
WRITE(IELUNT(ISRC),9000) SRCID(ISRC), KURDAT, ARCID(I),
     & ARCMAX(I), QMAX(I), CWIC, CWICN,
     & DXMAX(I), UOUT, SVMAX(I),
     & SWMAX(I), SYOUT, HEMAX(I),
     & OBUOUT, ZI, USTAR, PWSTAR, FB, FM,
     & BOWEN, PPF, CHIDML(I), CHINML(I), CHI3ML(I),
     & XNDIM, HEOZI, FSTAR, AHS(ISRC), ARCCL(I),
     & AFV, HSBLMX(I)

9000 FORMAT(1X,A12,1X,I8.8,1X,A8,4(1X,G12.6),
     & 9X,6(1X,G12.4),9X,6(1X,G12.4),
     & 9X,6(1X,G12.4),9X,4(1X,G12.4),1X,'0000000000',
     & 1X,G12.4,1X,G12.4)
```

原文 C-11 页为空白页。

[返回附录 C 导读](./appendix-c.md)
