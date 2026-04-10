---
name: 迁移时必须对齐前端默认值
description: 迁移老项目页面时，前端组件的 useState 默认值必须与老项目一致，否则会导致初始加载数据不一致
type: feedback
---

迁移老项目页面时，前端 useState 的默认值必须与老项目完全一致。

**Why:** union-streamer 主播查询页面，新项目 `useState('active')` 而老项目默认是 `'all'`，导致新项目初始加载的数据比老项目少很多。这类 bug 不会报错，只能通过新老对比才能发现。

**How to apply:** 迁移任何页面时，逐个检查筛选项、下拉框、Tab 的默认值是否对齐老项目。尤其注意 Select/Radio/Tab 的初始状态。
