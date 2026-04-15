---
title: bffStore去掉immer
 date: 2026-04-15 19:45:12
model: claude-sonnet-4-5-20250929
messages: 6
---

# bffStore去掉immer

### User (19:42:26)
你看这里的immer，如果不用这个，不安装额外依赖，可以达成同等功能吗

### Assistant (19:43:04)
### 1. 直接执行

可以，**这里的 `immer` 不是必须的**。你现在用它只是为了能写这种“可变风格”：

```ts
set((state) => {
  state.loading = loading;
});
```

不用 `immer` 的话，改成直接返回部分新对象就行，**这份文件可以做到同等功能，而且不需要额外依赖**。

比如 `apps/pwa/src/stores/bffStore.ts:24` 这一段可以改成：

```ts
import { create } from "zustand";
import type { BffNotification, BffOverview, BffDashboard } from "@/types/bff";

export const useBffOverviewStore = create<BffOverviewState>((set) => ({
  overview: null,
  loading: false,
  error: null,

  setOverview: (data) =>
    set({
      overview: data,
      error: null,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  reset: () =>
    set({
      overview: null,
      loading: false,
      error: null,
    }),
}));
```

`dashboard` 和 `notification` 那两块也一样，像 `apps/pwa/src/stores/bffStore.ts:71`、`apps/pwa/src/stores/bffStore.ts:122` 都能这么改。

原因很简单：

- Zustand 原生就支持 `set({ ...partialState })`
- 你的 store 这里全是**顶层字段赋值**
- 没有复杂的深层嵌套改写
- 也没有必须依赖 draft mutation 的场景

所以在这个文件里，去掉 `immer` 基本没有功能损失。

如果要对照一个例子，`setDashboard` 现在是：

```ts
set((state) => {
  state.dashboard = data;
  state.error = null;
  state.lastUpdated = Date.now();
});
```

不用 `immer` 直接写：

```ts
set({
  dashboard: data,
  error: null,
  lastUpdated: Date.now(),
});
```

效果是一样的。

### 2. 深度交互

你真正要判断的不是“能不能不用 immer”，而是“**这个 store 的状态更新复杂度，值不值得引入 immer**”。

这份代码里答案基本是：**不值**。

因为 `immer` 真正有价值的场景通常是这种：

```ts
set((state) => {
  state.user.profile.name = name;
  state.user.settings.theme = theme;
  state.list[3].done = true;
});
```

也就是深层对象、数组、嵌套修改很多的时候，它能明显减少样板代码。

但你这里几乎全是这种一层字段：

- `overview`
- `loading`
- `error`
- `lastUpdated`
- `notification`
- `hasUnread`

这种场景原生 `set` 反而更直接，读代码的人也更容易一眼看懂。

所以如果你的目标是：

- 少一个中间层
- 少一点心智负担
- 不依赖 `zustand/middleware/immer`

那这里完全可以去掉。

但要注意一个边界：**如果后面这个 store 演化成深层嵌套结构，再拿回 `immer` 也合理**。现在是因为它还很扁平。

### User (19:43:15)
那就按照去掉immer的写法来

### Assistant (19:45:12)
### 1. 直接执行

已经改完了。

改动：
- `apps/pwa/src/stores/bffStore.ts` 去掉了 `zustand/middleware/immer` 导入
- `useBffOverviewStore`、`useBffDashboardStore`、`useBffNotificationStore` 全部改成原生 `set({ ... })` 写法
- 补了一个最小表征测试文件：`apps/pwa/src/stores/bffStore.test.ts`

验证：
- 用 `tsx --test apps/pwa/src/stores/bffStore.test.ts` 跑过
- 3 个测试全通过

### 2. 深度交互

这次改动本质上是“去中间层”，不是“改行为”。所以收益主要是：
- 依赖更少
- 写法更直白
- 对这种扁平 store 更匹配

代价是后面如果这个 store 开始出现深层嵌套更新，再写原生不可变更新会慢慢变啰嗦。当前这份 `bffStore` 还没到那个复杂度。