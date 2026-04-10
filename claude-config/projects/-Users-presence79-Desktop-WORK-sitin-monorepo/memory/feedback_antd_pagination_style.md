---
name: antd-table-pagination-center
description: Ant Design v5 Table 分页居中的正确方式 — 用 pagination.style 而非 CSS 选择器
type: feedback
---

Ant Design v5 的 Table pagination 居中，不要用 CSS `:global(.ant-table-pagination)` 选择器覆盖，无论怎么加 `!important` 都不生效。

正确做法是在 Table 的 `pagination` 属性里直接传 `style`:

```tsx
pagination={{
  style: { justifyContent: 'center', flexWrap: 'nowrap' },
  ...
}}
```

**Why:** Antd v5 Table 的 pagination 容器有内联样式或高优先级的 CSS-in-JS 样式，外部 less 文件的选择器无法覆盖。

**How to apply:** 任何需要修改 Antd Table pagination 布局的场景，都优先用 `pagination.style` 而不是外部 CSS。
