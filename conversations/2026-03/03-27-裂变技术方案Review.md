---
title: 裂变功能技术方案Review
date: 2026-03-27 15:30:00
model: Claude Opus 4.6 (1M context)
messages: 5
---

# 裂变功能技术方案Review

### User (15:25:00)
你根据当前的pwa项目，不包括当前工作区里新增修改的代码，你来review一下当前的技术方案：https://presence.feishu.cn/docx/MDbPdCHJSoCAaWxKJ5FciMEInHf，这是需求文档：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，都是飞书文档，不存在你读取不到的问题,然后提出一些修改的建议

### Assistant (15:30:00)

## 技术方案 Review

### 一、关键架构问题

#### 1. BffLanding 路由缺失 + 权限设计错误（P0）
技术方案提到 `/bff/:inviteCode` 落地页，但当前 router 里没有这个路由。落地页是给未注册用户看的，不能包在 ProtectedRoute 里，否则未登录用户会被直接重定向到 `/onboarding`，永远看不到邀请者信息。

同时，落地页需要在注册完成后把 inviteCode 传给后端建立邀请关系。当前只在 storageKeys.ts 存了 BFF_INVITE_CODE，但没有写入/读取的消费逻辑。

#### 2. 提现成功触发弹窗的切入点不对（P0）
Cashout/index.tsx 只是展示页面——展示余额、支付方式、阶段任务。真正的提现成功回调不在这里。提现流程涉及 PayPal OAuth 跳转，成功回调可能在 PayPalResult 页面或 useCashout hook 的某个方法里。

需要 trace 完整提现 flow：用户点击 Cash Out → PayPal OAuth → 回调 → 提现请求 → 成功，在最后一步插入弹窗逻辑。

#### 3. W1-W5 与 CashoutStage 的映射关系未定义（P0）
需求的 W1-W5 和项目已有的 StageOne-StageSeven（7个阶段）没有映射关系定义。

| BFF W阶段 | 对应 CashoutStage | 提现金额 |
|-----------|-------------------|----------|
| W2 | StageTwo | $4 |
| W3 | StageThree | $10 |
| W4 | StageFour | $12 |
| W5 | StageFive | $25 |

这个映射需要显式定义为常量，不能靠隐式推断。

### 二、API 设计问题

#### 4. API 接口不符合项目现有 protobuf 模式
现有项目所有 API 用 protobuf，但技术方案的 proto 类型并不存在于 @sitin/api-proto。需要明确 proto 定义谁来写、什么时候就绪。

#### 5. searchStage 命名不规范
应该是 `getBffCurrentStage` 或 `fetchBffProgress`。返回类型 `currentStage` 小写开头不符合 TypeScript 接口命名规范。

#### 6. 后端字段设计冗余、命名不一致
- `invitedUrl`(主页) vs `inviteLink`(store)，同一个字段两个名字
- `availableAmount` 在 Banner、Earnings入口、裂变主页三个地方都要，建议统一成 1-2 个接口

### 三、状态管理问题

#### 7. bffStore 职责过大
把账户、邀请链接、Squad列表、所有操作方法全放一个 store 里。建议拆分 overview（轻量）和 dashboard（完整）两个数据结构。

#### 8. 轮询机制缺失设计
没有设计细节：轮询间隔、页面不可见时是否停止、组件卸载清理。

### 四、组件设计问题

#### 9. BFF_SHOW_STAGE_INDEX 重复定义
Home 和 Earnings 都定义了 `const BFF_SHOW_STAGE_INDEX = 2`，应提取到 constants/ 统一管理。

#### 10. 分享功能降级方案缺失
Web Share API 只在 HTTPS + 部分浏览器支持，需要降级方案：复制链接到剪贴板 + Toast 提示。APK WebView 需通过 Bridge 调用原生分享。

#### 11. 金币飞行动效状态持久化
"待播放"状态怎么存？后端返回字段还是前端本地状态？

### 五、需求遗漏

#### 12. 被邀请人 W3/W5 提现页面改动未覆盖
B 端用户在 W3/W5 提现时需要看到额外奖励的 UI 和 claim 按钮，技术方案完全没涉及。

#### 13. Push 通知点击跳转路由处理
Service Worker 中 notificationclick 如何解析 BFF 相关推送？

#### 14. 催单冷却 UI 状态
建议后端直接返回 pokeAvailable 即可，前端不需要处理倒计时逻辑。

### 六、核心建议
技术方案以页面为单位设计，但裂变功能核心复杂度在于跨用户状态机和与提现流程深度耦合。建议补充 A/B 两端完整状态流转图。

---

### User (15:40:00)
你用我发给你的需求文档，画一个A/B两端完整状态流转图

### Assistant (15:42:00)

## BFF 裂变 A/B 两端状态流转图

### 核心流转时序

```
时间线 ──────────────────────────────────────────────────────────────────►

A 端（邀请者）                              B 端（被邀请者）
══════════════                              ══════════════

[前提] 完成 StageTwo 提现
    │
    ▼
┌─────────────┐
│ 首页出现     │
│ BFF Banner  │
│ Earning入口  │
└──────┬──────┘
       │ 点击进入
       ▼
┌─────────────┐
│ BFF Dashboard│
│ 空状态       │     分享链接
│ "Share now!" │ ───────────────────►  收到链接
└──────┬──────┘                         │
       │                                ▼
       │                        ┌───────────────┐
       │                        │ /bff/:code    │
       │                        │ 落地页(公开)    │
       │                        │ "$20 Head Start"│
       │                        └───────┬───────┘
       │                                │ 注册
       │                                ▼
  ┌────┴─── W1 ──────────────── B 注册完成 ───────┐
  │                                               │
  │  A 看到:                           B 进入:     │
  │  Dashboard 出现卡片                正常 Onboarding│
  │  $60 Locked 🔒                    流程          │
  │  Squad 列表新增 B                               │
  └────┬──────────────────────────────────────────┘
       │
  ┌────┴─── W2 ──────────────── B 完成$4提现 ─────┐
  │                                               │
  │  A 收到:                           B:          │
  │  ① Push通知                        正常提现流程  │
  │  ② 金币飞行动效                     拔出 $4      │
  │  ③ 获得 1h 优先派单                             │
  │  ④ 底部弹窗: "First $4 just landed!"           │
  └────┬──────────────────────────────────────────┘
       │
  ┌────┴─── W3 ──────────────── B 赚$7+提现$10 ───┐
  │                                               │
  │  A 收到:                           B 收到:     │
  │  ① Push: "[B] unlocked $5!"       "Claim $5    │
  │  ② 全屏弹窗: "You just got paid!"  gift from A" │
  │  ③ $5 转入可提现                   合并拔出 $10  │
  └────┬──────────────────────────────────────────┘
       │
  ┌────┴─── W4 ──────────────── B 赚$10+提现$12 ──┐
  │                                               │
  │  A 收到:                           B:          │
  │  ① Push: "[B] unlocked $15!"      正常提现流程  │
  │  ② 全屏弹窗                       拔出 $12     │
  │  ③ $15 转入可提现 (累计$20)                     │
  └────┬──────────────────────────────────────────┘
       │
  ┌────┴─── W5 ───── B 赚$20+通话5min+提现$25 ────┐
  │                                               │
  │  A 收到:                           B 收到:     │
  │  ① Push: "[B] unlocked $30!"      "Claim $15   │
  │  ② 全屏弹窗                        gift from A" │
  │  ③ $30 转入可提现 (累计$50)        合并拔出 $45   │
  └───────────────────────────────────────────────┘
```

### W阶段 → CashoutStage 映射

```
BFF阶段  │ 触发条件                    │ CashoutStage    │ 提现金额  │ A端奖励    │ B端额外
─────────┼────────────────────────────┼─────────────────┼──────────┼───────────┼─────────
W1       │ B 注册完成                  │ (注册事件)       │ -        │ $0(锁$60) │ 落地页
W2       │ B 完成$4提现                │ StageTwo ($4)   │ $4       │ 1h派单    │ 无
W3       │ B 赚$7 + 提现$10           │ StageThree ($10)│ $10      │ $5现金    │ +$5
W4       │ B 赚$10 + 提现$12          │ StageFour ($12) │ $12      │ $15现金   │ 无
W5       │ B 赚$20+5min + 提现$25     │ StageFive ($25) │ $25      │ $30现金   │ +$15
```

### 关键接口调用时序

```
事件触发                    A 端前端                    后端                      B 端前端
────────                    ────────                    ────                      ────────

B注册完成 ─────────────────────────────► 建立邀请关系 ◄──── POST register(inviteCode)
                                        更新 B.stage=W1
                          fetchBffDashboard ◄──┘ (轮询/Push感知)
                          → 卡片出现

B完成$4提现 ───────────────────────────► 更新 B.stage=W2 ◄──── POST withdraw($4)
                                        触发 A 的 1h 派单
                                        发 Push 给 A
                          fetchBffDashboard ◄──┘
                          → BffW2Modal 弹窗
                          → 金币动效

B赚$7+提现$10 ────────────────────────► 更新 B.stage=W3 ◄──── POST withdraw($10)
                                        A.available += $5      追加 $5 奖励
                                        发 Push 给 A           合并拔出 $10
                          fetchBffDashboard ◄──┘              显示 claimBffGift UI
                          → BffShareModal 弹窗

A点击催单 ──► POST pokeMember ─────────► 生成短链消息 ─────────► B收到 Push/SMS
              24h 冷却计时开始           记录 poke 时间           点击打开 APP
```

### 风控拦截点

```
          ┌────────────┬────────────┐
          ▼            ▼            ▼
     W2 提现时    W2 人脸验证    绑定 PayPal
     GPS定位检测   1:N 人脸碰撞   邮箱去重
          │            │            │
     ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
     │非美国    │  │相似≥90% │  │已被使用  │
     │risk=1   │  │risk=2   │  │risk=3   │
     └────┬────┘  └────┬────┘  └────┬────┘
          ▼            ▼            ▼
     拦截提现      熔断奖励      封禁B账号
     弹窗上传ID   取消A邀请资格   A奖励冻结
     48h人工审核   关联账号记录    等待申诉
```
