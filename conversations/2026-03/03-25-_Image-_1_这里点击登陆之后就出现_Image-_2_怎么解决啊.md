---
title: [Image #1]这里点击登陆之后就出现[Image #2]怎么解决啊
date: 2026-03-25T20:29:37+08:00
session_id: ed5653b3-d523-418a-bc13-611a1f023c1c
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 1
---

# [Image #1]这里点击登陆之后就出现[Image #2]怎么解决啊

### User (20:29:37)

[Image #1]这里点击登陆之后就出现[Image #2]怎么解决啊

### Assistant (20:31:14)

错误 `400: redirect_uri_mismatch` 说明 Google OAuth 配置的回调地址与代码里发送的 redirect_uri 不匹配。让我查找相关代码。

### Assistant (20:32:01)

问题很清楚了。

## 根因

`googleAuth.ts:36` 中，redirect_uri 动态取当前页面地址：
```js
let redirectUri = `${window.location.origin}${window.location.pathname}`;
// 结果: http://localhost:3001/onboarding
```

但 Google Cloud Console 里注册的"已授权重定向 URI"里没有这个地址，所以报 `redirect_uri_mismatch`。

## 解决方法（二选一）

### 方法一：去 Google Cloud Console 添加本地开发地址（推荐）

1. 打开 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. 找到 client_id `928752046408-...` 对应的 OAuth 凭据
3. 在"已授权的重定向 URI"中添加：
   - `http://localhost:3001/onboarding`
   - `http://localhost:3001/login`
4. 保存，等几分钟生效

### 方法二：改代码，把 redirect_uri 固定为 origin 根路径

这样只需要注册一个 URI，所有页面都走同一个回调：

```ts
// googleAuth.ts:36
// 改前：动态取当前 pathname
let redirectUri = `${window.location.origin}${window.location.pathname}`;

// 改后：始终用根路径
const redirectUri = window.location.origin;
```

但这样改需要在根路径（`/`）的组件里也挂 `useGoogleAuth` hook，否则回调拿不到。

---

**建议用方法一**，不改代码逻辑，只是 Google Console 配置问题。生产环境的域名 URI 是否已经加过，可以顺便确认。

