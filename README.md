<p align="center">
  <img src="docs/images/aermod2.svg" width="150" alt="AERMOD 中文文档" />
</p>

<h1 align="center">AERMOD 中文文档</h1>

<p align="center">
  <a href="https://github.com/hujinghaoabcd/AERMODDoc/actions"><img src="https://img.shields.io/github/actions/workflow/status/hujinghaoabcd/AERMODDoc/docs.yml?branch=main&label=docs" alt="Documentation build" /></a>
  <img src="https://img.shields.io/badge/AERMOD%20User%20Guide-EPA--454%2FB--23--008-blue" alt="EPA user guide" />
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
</p>

本项目提供美国 EPA **AERMOD 用户指南（EPA-454/B-23-008，2023 年 10 月）**的完整中文在线版本，包含第 1—4 章和附录 A—E。

## 在线阅读

[AERMOD 中文文档](https://hujinghaoabcd.github.io/AERMODDoc/)

## 内容

- 第 1 章：引言
- 第 2 章：入门——简明教程
- 第 3 章：CO、SO、RE、ME、EV、OU 六条功能路径的详细关键字参考
- 第 4 章：参考文献
- 附录 A—E：关键字/参数、错误消息、文件格式、版本修订和术语表

## 本地运行

```bash
npm ci
npm run docs:dev
```

构建静态站点：

```bash
npm run docs:build
```

## 说明

本译文用于阅读、研究和软件使用辅助。涉及法规应用时，应以 EPA 发布的英文原文、现行《空气质量模型指南》及主管机构要求为准。

## 贡献

欢迎通过 Issue 或 Pull Request 报告翻译、格式、链接和技术表述问题。请尽量注明章节、小节和英文原文页码。

## License

[MIT © Jinghao Hu | University of Chinese Academy of Sciences](./LICENSE)
