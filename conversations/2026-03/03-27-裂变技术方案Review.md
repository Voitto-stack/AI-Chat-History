---
title: 裂变功能技术方案Review
date: 2026-03-27 15:30:00
model: Claude Opus 4.6 (1M context)
messages: 3
---

# 裂变功能技术方案Review

### User (15:25:00)
你根据当前的pwa项目，不包括当前工作区里新增修改的代码，你来review一下当前的技术方案：https://presence.feishu.cn/docx/MDbPdCHJSoCAaWxKJ5FciMEInHf，这是需求文档：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，都是飞书文档，不存在你读取不到的问题,然后提出一些修改的建议

### Assistant (15:30:00)

## 技术方案 Review

### 一、关键架构问题

#### 1. BffLanding 路由缺失 + 权限设计错误（P0）
技术方案提到 `/bff/:inviteCode` 落地页，但当前 router 里没有这个路由。落地页是给未注册用户看的，不能包在 ProtectedRoute 里。

#### 2. 提现成功触发弹窗的切入点不对（P0）
Cashout/index.tsx 只是展示页面，真正的提现成功回调不在这里。需要trace完整的提现flow找到正确切入点。

#### 3. W1-W5 与 CashoutStage 的映射关系未定义（P0）
需求的W1-W5和项目已有的StageOne-StageSeven（7个阶段）没有映射关系定义。

### 二、API 设计问题

#### 4. API 接口不符合项目现有 protobuf 模式
#### 5. searchStage 命名不规范
#### 6. 后端字段设计冗余、命名不一致

### 三、状态管理问题

#### 7. bffStore 职责过大
#### 8. 轮询机制缺失设计

### 四、组件设计问题

#### 9. BFF_SHOW_STAGE_INDEX 重复定义
#### 10. 分享功能降级方案缺失
#### 11. 金币飞行动效状态持久化

### 五、需求遗漏

#### 12. 被邀请人 W3/W5 提现页面改动未覆盖
#### 13. Push 通知点击跳转路由处理
#### 14. 催单冷却 UI 状态

### 六、核心建议
技术方案以页面为单位设计，但裂变功能核心复杂度在于跨用户状态机和与提现流程深度耦合。建议补充A/B两端完整状态流转图。
