---
title: 对比PWA BFF迁移
date: 2026-04-15 20:42:00
model: claude-sonnet-4-5-20250929
messages: 2
---

# 对比PWA BFF迁移

### User (20:42:00)
你对比一下woke目录下的sitin-monorepo-dev项目的pwa里的bff相关的内容，看看是否有没迁移过来的

### Assistant (20:42:30)
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
1. `packages/app-pwa/src/utils/bffShare.ts:167` 的剪贴板兜底现在是注释掉的，但这不是“没迁移”，因为源项目这里更不完整，连 Web Share 也注释了。
2. `packages/app-pwa/src/hooks/useBffShare.ts:17` 现在分享时取的是 `userInfo?.invitationCode`，而别的 BFF 页面常用的是 overview/dashboard 返回的 inviteCode。这个更像现有实现一致性问题，不像迁移遗漏，因为源项目同样这么写。

### 2. 深度交互
如果你的目标是“BFF v2 功能完整可用”，那现在真正该盯的不是 dashboard，而是 **invite landing 链路是否要并回 app-pwa，还是继续保留成独立 static page**。

因为目前 `BFF_LANDING_PATH` 已经明确依赖 `/invite/index.html`，这说明产品链路默认认为“用户点分享链接后会先到一个落地页”，不是直接进 PWA 内路由。也就是说，当前缺口不是零碎函数，而是一个完整入口页。

所以从优先级看，我会这样判断：
- **高优先级**：补 invite landing 页面及其埋点/安装/跳转链路
- **中优先级**：补 `bffStore` 测试
- **低优先级**：再收敛 `useBffShare` 的 inviteCode 来源
