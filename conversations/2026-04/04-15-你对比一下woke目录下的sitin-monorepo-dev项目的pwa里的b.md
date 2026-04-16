---
title: 你对比一下woke目录下的sitin-monorepo-dev项目的pwa里的b
date: 2026-04-15T20:46:09+08:00
session_id: 3d753c7a-d26d-45ab-b466-114fbe84f968
project: /Users/presence79/Desktop/WORK/sitin-next
source: claude-code-capture
messages: 3
---

# 你对比一下woke目录下的sitin-monorepo-dev项目的pwa里的b

### User (20:46:09)

你对比一下woke目录下的sitin-monorepo-dev项目的pwa里的bff相关的内容，看看是否有没迁移过来的

### Assistant (20:46:57)

我先分别梳理两个项目里 PWA 的 BFF 相关实现，再做差异对比。

### Assistant (20:50:48)

我再去源项目里找对应的 PWA BFF 实现，重点看有没有当前仓库缺失的文件或逻辑。

### Assistant (21:00:13)

我再核对一下源项目里几个关键文件，确保结论不是只基于搜索摘要。

### Assistant (21:03:01)

### 1. 直接执行

我对比完了，结论是：**PWA 主体的 BFF 代码基本都迁过来了**，真正明显还没补上的主要有 2 块。

第一块是 **邀请落地页**。  
当前仓库里 `packages/app-pwa/src/constants/bff.ts:9` 把落地页写死成了 `/invite/index.html`，但我在 `packages/app-pwa` 下面没找到对应页面文件，也没找到对应路由；当前只剩一个接口封装 `packages/app-pwa/src/http/landingApi.ts:15`，也就是只能请求落地页数据，但没有真正承载这个链路的页面。

而源项目里虽然核心 PWA 代码也在 `apps/pwa`，但完整的邀请落地页实现其实落在 `apps/static-pages/invite/inviteLanding.js:81`、`apps/static-pages/invite/inviteLanding.js:145`、`apps/static-pages/invite/inviteLanding.js:215` 这一套：
- 解析 URL 里的邀请码并落本地
- 调 `getLandingInfo` 渲染 inviter 信息
- 做 BytePlus 埋点
- 处理 `beforeinstallprompt` / `appinstalled`
- 安装后跳去 `/onboarding`

这块在 `sitin-next` 里目前是缺的，所以 **分享链接虽然能拼出来，但目标页链路并不完整**。

第二块是 **store 测试**。  
源项目有 `apps/pwa/src/stores/bffStore.test.ts:1`，当前仓库没有对应测试文件。我看下来这不影响功能运行，但确实算没迁过来的配套内容。

除此之外，`apps/pwa` 里的核心 BFF 文件基本都已经有对应实现了，包括：
- overview/dashboard API
- BFF store
- BFF dashboard 页面
- share hook / referral 工具
- `/bff-dashboard` 路由

还有两个补充点：
1. `packages/app-pwa/src/utils/bffShare.ts:167` 的剪贴板兜底现在是注释掉的，但这不是“没迁移“，因为源项目这里更不完整，连 Web Share 也注释了。
2. `packages/app-pwa/src/hooks/useBffShare.ts:17` 现在分享时取的是 `userInfo?.invitationCode`，而别的 BFF 页面常用的是 overview/dashboard 返回的 inviteCode。这个更像现有实现一致性问题，不像迁移遗漏，因为源项目同样这么写。

### 2. 深度交互

如果你的目标是“BFF v2 功能完整可用“，那现在真正该盯的不是 dashboard，而是 **invite landing 链路是否要并回 app-pwa，还是继续保留成独立 static page**。

因为目前 `BFF_LANDING_PATH` 已经明确依赖 `/invite/index.html`，这说明产品链路默认认为“用户点分享链接后会先到一个落地页“，不是直接进 PWA 内路由。也就是说，当前缺口不是零碎函数，而是一个完整入口页。

所以从优先级看，我会这样判断：
- **高优先级**：补 invite landing 页面及其埋点/安装/跳转链路
- **中优先级**：补 `bffStore` 测试
- **低优先级**：再收敛 `useBffShare` 的 inviteCode 来源

### User (21:05:42)

完善一下样式，在一些手机中这里背景图会覆盖不全：[Image #1]

### Assistant (21:07:10)

我先看一下相关页面和样式实现。

### Assistant (21:07:49)

### 1. 直接执行

我看了实现，问题点基本就在这里：`packages/app-pwa/src/pages/BffDashboard/index.tsx:240-243`

现在整页容器用了：

```tsx
style={{ background: `url(${bgDashboardTop})`, backgroundSize: "contain" }}
```

`contain` 会保证整张图完整显示，但在某些窄屏 / 高屏手机上，**图片不会铺满容器宽高**，右侧或底部就会露白，你截图里就是这个情况。

### 2. 深度交互

这里我建议的方案是这三个里选一个，我推荐第一个：

1. **改成 `background-size: cover`，并加纯色兜底背景**（推荐）  
   优点：最稳，适配各种手机时不会露白；视觉上也更接近设计稿“顶部蓝色背景铺满“。  
   代价：背景图边缘可能会被裁掉一点，但通常是可接受的。

2. **保留 `contain`，外层补同色渐变背景**  
   优点：图片本体不裁切。  
   代价：一旦图片四周有明显设计边界，露出来的补色区域还是可能看出断层。

3. **把顶部背景拆成图片层 + 纯色底层，限定只作用于 hero 区域**  
   优点：结构更清晰。  
   代价：改动比这次问题需要的大一点。

我建议用 **方案 1**：  
把当前容器背景改成：
- `backgroundImage: url(...)`
- `backgroundSize: "cover"`
- `backgroundPosition: "center top"`
- 再补一个接近设计稿的蓝色 `backgroundColor`

这样能直接解决“部分手机覆盖不全“的问题。

这个方向你确认下，我再继续给你整理具体设计。

### User (21:09:42)

那就用方案1

### Assistant (21:10:15)

### 1. 直接执行

那就按方案 1 走。

设计我建议这样定：

- 修改位置：`packages/app-pwa/src/pages/BffDashboard/index.tsx:240-243`
- 保持现有背景图不变，仍然用 `bgDashboardTop`
- 把 `backgroundSize` 从 `contain` 改成 `cover`
- 补上：
  - `backgroundPosition: "center top"`
  - `backgroundRepeat: "no-repeat"`
  - `backgroundColor: "#8ECDF5"` 这类接近当前蓝色背景的底色兜底

这样效果会是：
- 各类手机屏幕下顶部背景都能铺满，不再露出右侧白边
- 背景图允许轻微裁切，但主要内容一般还在安全区域内
- 就算图片因比例差异被裁，底层也还是蓝色，不会出现白底穿帮

### 2. 深度交互

这个修法本质上是在承认一件事：**这张图应该被当作“装饰性背景“而不是“必须完整展示的内容图“**。  
如果设计后面又要求“背景图上的某个边缘元素必须完整可见“，那单纯 `cover` 就不够了，到时应该把背景里的关键元素拆出来做独立层，不该继续塞进整张背景图里。

你现在这个场景里，明显更重要的是“整屏观感稳定“，所以这个选择是对的。

