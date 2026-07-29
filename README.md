<p align="center">
  <img src="docs/.vuepress/public/images/aermod2.svg" width="150" alt="AERMOD 中文文档" />
</p>

<h1 align="center">AERMOD 中文文档</h1>

<p align="center">
  <a href="https://github.com/hujinghaoabcd/AERMODDoc/actions"><img src="https://img.shields.io/github/actions/workflow/status/hujinghaoabcd/AERMODDoc/docs.yml?branch=main&label=docs" alt="Documentation build" /></a>
  <a href="https://github.com/hujinghaoabcd/AERMODDoc/releases/latest"><img src="https://img.shields.io/github/v/release/hujinghaoabcd/AERMODDoc?label=release" alt="Latest release" /></a>
  <img src="https://img.shields.io/badge/AERMOD%20User%20Guide-EPA--454%2FB--23--008-blue" alt="EPA user guide" />
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
</p>

本项目提供美国 EPA **AERMOD 用户指南（EPA-454/B-23-008，2023 年 10 月）**的完整中文在线版本，包含前置部分、第 1—4 章和附录 A—E。

## 在线阅读

- [AERMOD 中文文档](https://hujinghaoabcd.github.io/AERMODDoc/)
- [第 2 章：入门教程](https://hujinghaoabcd.github.io/AERMODDoc/guide/02-getting-started.html)
- [第 3 章：关键字索引](https://hujinghaoabcd.github.io/AERMODDoc/guide/03-keyword-index.html)
- [附录 A—E](https://hujinghaoabcd.github.io/AERMODDoc/appendices/)

## 内容

- 前置部分：声明、前言、目录、图目录和表目录；
- 第 1 章：引言与模型能力概述；
- 第 2 章：输入输出文件、控制文件教程、调试和完整结果示例；
- 第 3 章：CO、SO、RE、ME、EV、OU 六条功能路径的详细关键字参考；
- 第 4 章：原文 1—48 条参考文献；
- 附录 A—E：关键字/参数、错误消息、文件格式、版本修订和 73 个术语。

## 正式版本

- 当前版本：[v1.0.0](https://github.com/hujinghaoabcd/AERMODDoc/releases/tag/v1.0.0)
- 版本变化：[CHANGELOG.md](./CHANGELOG.md)
- 引用信息：[CITATION.cff](./CITATION.cff)

文档版本用于标记中文在线文档的内容和基础设施状态，不代表 EPA AERMOD 模型版本。

## 本地开发

要求已安装 Node.js 和 npm。

```bash
npm ci
npm run docs:dev
```

构建并检查静态站点：

```bash
npm run docs:check
npm run docs:build
npm run docs:check-links
```

其中：

- `docs:check` 检查仓库元数据、版本配置、章节内容、编号、术语和防退化标记；
- `docs:build` 生成 VuePress 静态站点；
- `docs:check-links` 检查构建后的站内链接与页面锚点。

## 项目结构

```text
docs/
├─ guide/          用户指南第 1—4 章
├─ appendices/     附录 A—E
├─ resources/      EPA 官方资源
├─ about/          项目状态与质量报告
└─ .vuepress/      VuePress 配置、侧栏和静态资源
scripts/           文档完整性与构建后检查
.github/           Pages、Release 工作流以及 Issue/PR 模板
```

## 说明

本译文用于阅读、研究和软件使用辅助。涉及法规应用时，应以 EPA 发布的英文原文、现行《空气质量模型指南》、当前模型版本说明及主管机构要求为准。

## 贡献与引用

- 提交修改前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)；
- 报告问题可使用仓库 Issue 模板；
- 学术或项目引用信息见 [CITATION.cff](./CITATION.cff)；
- 主要版本变化见 [CHANGELOG.md](./CHANGELOG.md)。

## License

[MIT © Jinghao Hu | University of Chinese Academy of Sciences](./LICENSE)
