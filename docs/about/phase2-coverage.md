---
title: 第二阶段文档覆盖报告
sidebarDepth: 2
---

# 第二阶段文档覆盖报告

本报告用于记录第 3 章和附录 A—E 的在线化完整度，并为后续维护提供基线。

## 总体统计

| 指标 | 数量 |
|---|---:|
| Markdown 页面 | 42 |
| 文档总行数 | 12,330 |
| 文档总字符数 | 277,882 |
| Markdown 标题 | 605 |
| 第 3 章字符数 | 154,832 |
| 附录 A—E 字符数 | 53,802 |

## 核心页面

| 页面 | 行数 | 字符数 | 标题数 |
|---|---:|---:|---:|
| `guide/03-keyword-index.md` | 218 | 11,999 | 8 |
| `guide/03-co-pathway.md` | 44 | 864 | 3 |
| `guide/03-co-dispersion.md` | 792 | 18,251 | 54 |
| `guide/03-co-lowwind-downwash.md` | 267 | 6,235 | 12 |
| `guide/03-co-no2.md` | 527 | 11,135 | 15 |
| `guide/03-co-averaging-urban.md` | 306 | 5,781 | 7 |
| `guide/03-co-run-debug.md` | 323 | 8,147 | 11 |
| `guide/03-so-pathway.md` | 37 | 1,125 | 2 |
| `guide/03-so-location.md` | 145 | 4,564 | 7 |
| `guide/03-so-emissions.md` | 582 | 14,049 | 25 |
| `guide/03-so-deposition-no2.md` | 475 | 9,498 | 22 |
| `guide/03-so-background-downwash.md` | 451 | 8,339 | 22 |
| `guide/03-so-variable-emissions.md` | 354 | 6,853 | 20 |
| `guide/03-so-groups-special.md` | 191 | 3,898 | 10 |
| `guide/03-re-pathway.md` | 559 | 12,293 | 26 |
| `guide/03-me-pathway.md` | 468 | 7,557 | 14 |
| `guide/03-ev-pathway.md` | 322 | 4,373 | 19 |
| `guide/03-ou-pathway.md` | 1,062 | 19,871 | 21 |
| `appendices/appendix-a.md` | 881 | 19,685 | 49 |
| `appendices/appendix-b.md` | 278 | 3,966 | 16 |
| `appendices/appendix-c.md` | 785 | 16,108 | 20 |
| `appendices/appendix-d.md` | 368 | 7,165 | 39 |
| `appendices/appendix-e.md` | 583 | 6,878 | 94 |

## 自动检查

GitHub Actions 在每次 Pull Request 和主分支构建前执行 `npm run docs:check`，检查：

- 第 3 章与附录必需页面是否存在；
- Markdown 代码围栏是否闭合；
- 本地链接是否指向有效文件；
- 是否存在常见的未完成或占位标记；
- 第 3 章和附录内容量是否低于完整译文基线。
