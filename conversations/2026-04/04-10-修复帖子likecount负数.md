---
title: 修复帖子likecount负数
date: 2026-04-10 19:38:00
model: claude-sonnet-4-5-20250929
messages: 4
---

# 修复帖子likecount负数

### User (19:38:00)
【帖子管理】下方的likecount为0时点击减数会减成负数，但已经为负数时再点击加数，会从0开始加，以上操作均不会将 总likecount 减成负数。预期效果：任何操作都不会使likecount减成负数。

### Assistant (19:38:30)
定位后确认根因不在后端。`apps/minerva-server/src/routes/posts/posts.ts` 的分数更新 SQL 已经用 `GREATEST(0, ...)` 防止数据库里的分项 likecount 变成负数，真正的问题在前端 `apps/minerva/src/pages/PostConsole/components/PostCard.tsx`：本地 state 在按钮点击后直接做 `prev + value`，所以 UI 会先显示负数。

我按最小改动修了三处：
1. 新增 `apps/minerva/src/pages/PostConsole/components/likeCount.ts`，统一封装 `normalizeLikeCount` 和 `applyLikeCountDelta`，把所有分项 likecount 下限钳到 0。
2. 在 `PostCard.tsx` 里把 `maleScore`、`femaleScore`、`nonbinaryScore` 的初始化和 `useEffect` 同步都改成走 `normalizeLikeCount(...)`。
3. 按钮点击后的本地更新改成走 `applyLikeCountDelta(...)`，这样减分不会把分项减成负数，原本已经脏成负数的值在下一次同步或加减时也会先被归一到 0 再处理。

另外补了一个最小回归测试文件 `apps/minerva/src/pages/PostConsole/components/likeCount.test.ts`，覆盖了 undefined、负数、负向 delta、正向 delta 这些场景。测试结果通过：`likeCount tests passed`。

我还跑了 `tsc --noEmit` 级别校验，但失败项是仓库里已有的其他模块类型错误，和这次 likecount 修复无关，不是这次改动引入的。

### User (19:39:00)
你继续

### Assistant (19:39:30)
直接执行

这次修复已经落下去了。

核心改动在这两个位置：
- `apps/minerva/src/pages/PostConsole/components/PostCard.tsx:31`
- `apps/minerva/src/pages/PostConsole/components/likeCount.ts:1`

现在的行为是：
- 初始渲染时，分项 likecount 小于 0 会被归一成 0。
- 点击减数时，本地显示不会再掉到 0 以下。
- 即使后端回来的旧脏数据里有负数，组件同步时也会直接钳回 0。

验证结果：
- `apps/minerva/src/pages/PostConsole/components/likeCount.test.ts:1` 已通过。
- 全量 TypeScript 检查报错，但都是仓库里已有的无关问题，不是这次修复引入的。

深度交互

这个 bug 本质上不是“接口没防住”，而是“前端 optimistic state 和后端约束脱节”。后端其实一直没让数据库写出负数，只是前端局部状态自己先算成了负数，所以用户看到的错觉只出现在交互层。像这类“服务端有下限、前端本地也会先算一次”的地方，最好都把边界收敛到同一个纯函数里；这次已经这么处理了，至少这个页面后面不容易再出现同类分叉。