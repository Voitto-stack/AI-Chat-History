---
date: 2026-04-22T14:43:48+08:00
source: clipboard
chars: 2601
---

所有修改已同步到 sitin-next。汇总一下两个仓库的变更：

  ┌────────────────┬──────────────────────────────┬───────────────────────────────────┐
  │      修改      │     sitin-monorepo 路径      │          sitin-next 路径          │
  ├────────────────┼──────────────────────────────┼───────────────────────────────────┤
  │ 通话订单时区   │ apps/minerva/src/.../UserTra │ packages/app-minerva-web/src/.../ │
  │ Bug（前端）    │ nsactions.tsx                │ UserTransactions.tsx              │
  ├────────────────┼──────────────────────────────┼───────────────────────────────────┤
  │ 通话订单时区   │ apps/minerva-server/src/rout │ packages/app-minerva-server/src/r │
  │ Bug（后端）    │ es/users/user-data.ts        │ outes/users/user-data.ts          │
  ├────────────────┼──────────────────────────────┼───────────────────────────────────┤
  │ 视频模糊（User │ apps/minerva/src/.../UserTes │ packages/app-minerva-web/src/.../ │
  │ TestVideo）    │ tVideo.module.css            │ UserTestVideo.module.css          │
  ├────────────────┼──────────────────────────────┼───────────────────────────────────┤
  │ 视频模糊（Call │ apps/minerva/src/pages/CallF │ packages/app-minerva-web/src/page │
  │ Feed）         │ eed/styles.less              │ s/CallFeed/styles.less            │
  └────────────────┴──────────────────────────────┴───────────────────────────────────┘

  两个仓库的修改内容完全一致，共 4 个文件同步完成。
