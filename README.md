# 视未 — 站点

- **静态多页站点（HTML）**：根目录下的 `*.html` + `css/site.css` + `js/site.js`。适合直接托管或作为设计参考。
- **Next.js + i18n 应用**：见 [`web/`](./web/README.md)。同一套布局与样式，文案来自 `web/messages/*.json`，路由为 `/`、`/en/...`、`/zh-hant/...`（默认语言无前缀）。

运行 Next 应用：

```bash
cd web && npm install && npm run dev
```
