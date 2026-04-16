---
title: keyboard-and-safe-area
date: 2026-04-16T11:07:55+08:00
source: import
original: keyboard-and-safe-area.md
---

# PWA 键盘弹起 & 安全区域适配方案

## 一、键盘弹起处理

### 问题

APK WebView 和 H5 全屏模式下，软键盘弹起会遮挡输入框，或导致页面布局错乱。

### 方案

#### 1. Viewport 配置

```html
<!-- index.html -->
<meta name="viewport" content="..., interactive-widget=resizes-content" />
```

`interactive-widget=resizes-content` 让键盘弹起时自动缩小内容区域，而非覆盖。

#### 2. APK 端：原生 Bridge 通知

```ts
// bridge.ts - initBridge()
registerBridgeHandler("notifyKeyboardChanged", (data) => {
  const height = data?.height ?? 0;
  document.body.style.paddingBottom = height > 0 ? `${height}px` : "";
});
```

原生层监听键盘高度变化，通过 Bridge 通知 PWA，PWA 直接设置 `body.paddingBottom`。

#### 3. H5 端：visualViewport 监听

```ts
// App.tsx
window.visualViewport?.addEventListener("resize", () => {
  const heightDiff = window.innerHeight - visualViewport.height;
  if (heightDiff > 150) {
    // 键盘弹出 → 退出全屏，避免遮挡
  }
});
```

通过 `visualViewport.height` 与 `window.innerHeight` 的差值判断键盘是否弹出（阈值 150px）。

---

## 二、安全区域适配

### 问题

APK 和 H5 全屏模式下，内容被状态栏/底部导航栏遮挡。

### 方案：三级降级策略

`useSafeArea.ts` 中实现：

| 优先级 | 来源                         | 适用场景              |
| ------ | ---------------------------- | --------------------- |
| 1      | CSS `env(safe-area-inset-*)` | 浏览器 PWA standalone |
| 2      | Bridge `getSafeAreaInsets()` | APK WebView           |
| 3      | Android 默认状态栏高度 24dp  | 兜底                  |

### CSS 变量同步

```ts
// useSafeArea.ts - syncToCSS()
document.documentElement.style.setProperty("--sat", `${top}px`); // safe-area-top
document.documentElement.style.setProperty("--sab", `${bottom}px`); // safe-area-bottom
document.documentElement.style.setProperty("--sal", `${left}px`); // safe-area-left
document.documentElement.style.setProperty("--sar", `${right}px`); // safe-area-right
```

### 组件中使用

```tsx
// 顶部安全区域
<div className="pt-[var(--sat,0px)]">

// 底部安全区域（TabBar）
<div className="pb-[var(--sab,0px)]">

// NavigationBar 顶部留白
<div className="pt-[calc(var(--sat,0px)+12px)]">
```

### 涉及的组件

- `NavigationBar` — 顶部导航栏 `pt-[calc(var(--sat,0px)+12px)]`
- `TopBar` — 顶部栏 `pt-[var(--sat,0px)]`
- `TabBar` — 底部标签栏 `pb-[var(--sab,0px)]`
- `LiveRoomTopPanel` — 直播间顶部 `pt-[var(--sat,0px)]`
- 各页面（Chats、Login、Me、Profile 等）— 统一使用 CSS 变量

---

## 三、架构总结

```
┌─────────────────────────────────────┐
│  APK Native Layer                   │
│  ├─ 键盘高度 → notifyKeyboardChanged│
│  └─ 安全区域 → getSafeAreaInsets    │
└──────────────┬──────────────────────┘
               │ Bridge
┌──────────────▼──────────────────────┐
│  PWA Layer                          │
│  ├─ body.paddingBottom (键盘)       │
│  ├─ CSS 变量 --sat/--sab (安全区域) │
│  └─ visualViewport (H5 键盘检测)    │
└─────────────────────────────────────┘
```

关键原则：

- **不再使用 React 状态管理键盘高度**，改用原生 Bridge 直接操作 DOM
- **CSS 变量统一管理安全区域**，组件通过 `var(--sat,0px)` 引用，解耦具体数值
- **三级降级**确保在浏览器、PWA standalone、APK WebView 三种环境下都能正确适配

