---
title: doraPage-migration
date: 2026-04-15T17:04:49+08:00
source: import
original: doraPage-migration.md
---

# doraPage 迁移方案

## 概述

纯静态页面，根据 `window.appName` 显示对应品牌全屏图片（8 个品牌）。第三方在用，访问地址不能变。

## 方案：独立项目 `apps/static-pages/`

通用命名，未来其他纯静态页面也可放入。doraPage 改动无需触发 PWA 发版。

### 项目结构

```
apps/static-pages/
├── package.json               ← @sitin/static-pages
├── doraPage/                  ← 访问路径名，不可改
│   ├── index.html             ← 图片引用已改为 .webp
│   └── *.webp                 ← PNG 已转 WebP (质量 90)
└── scripts/
    ├── build.cjs              ← cp doraPage → build/doraPage
    ├── post-build.dev.cjs     ← 测试环境 → pwa-grace-chat-dev
    └── post-build.prod.cjs    ← 生产环境 → archat-apk
```

### 部署

Jenkins 复用现有 Job，`Apps=static-pages` 即可。

| 环境 | Bucket               | 地址                                                    |
| ---- | -------------------- | ------------------------------------------------------- |
| 测试 | `pwa-grace-chat-dev` | `https://app-dev1012.gracechat.com/doraPage/index.html` |
| 生产 | `archat-apk`         | `https://app.gracechat.com/doraPage/index.html`         |

### 变更点

- 图片格式：PNG → WebP（质量 90）
- `doraPage/index.html` 中 imageMap 引用改为 `.webp`
- `doraPage/index.html` 设置 `no-cache`，第三方每次拿最新版本

