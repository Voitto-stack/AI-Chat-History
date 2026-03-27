---
title: 裂变功能技术方案Review
date: 2026-03-27 15:30:00
model: Claude Opus 4.6 (1M context)
messages: 7
---

# 裂变功能技术方案Review

### User (15:25:00)
你根据当前的pwa项目，不包括当前工作区里新增修改的代码，你来review一下当前的技术方案：https://presence.feishu.cn/docx/MDbPdCHJSoCAaWxKJ5FciMEInHf，这是需求文档：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，都是飞书文档，不存在你读取不到的问题,然后提出一些修改的建议

### Assistant (15:30:00)

## 技术方案 Review（V1）

### 一、关键架构问题
1. BffLanding 路由缺失 + 权限设计错误（P0）
2. 提现成功触发弹窗的切入点不对（P0）
3. W1-W5 与 CashoutStage 的映射关系未定义（P0）

### 二、API 设计问题
4. API 接口不符合项目现有 protobuf 模式
5. searchStage 命名不规范
6. 后端字段设计冗余、命名不一致

### 三、状态管理问题
7. bffStore 职责过大
8. 轮询机制缺失设计

### 四、组件设计问题
9. BFF_SHOW_STAGE_INDEX 重复定义
10. 分享功能降级方案缺失
11. 金币飞行动效状态持久化

### 五、需求遗漏
12. 被邀请人 W3/W5 提现页面改动未覆盖
13. Push 通知点击跳转路由处理
14. 催单冷却 UI 状态

### 六、核心建议
技术方案以页面为单位设计，但裂变功能核心复杂度在于跨用户状态机和与提现流程深度耦合。建议补充A/B两端完整状态流转图。

---

### User (15:40:00)
你用我发给你的需求文档，画一个A/B两端完整状态流转图

### Assistant (15:42:00)

（画了 A/B 两端完整状态流转图，包含时序图、W阶段映射、接口调用时序、风控拦截点）

---

### User (16:10:00)
（重新发起 review，技术方案文档已更新，加入了状态图和修正了落地页路由）

### Assistant (16:15:00)

## 技术方案 Review（V2 — 基于已提交代码）

### 已修复
- 新增 1.4 节状态流转图
- /bff/:inviteCode 路由改为公开路由

### 仍存在的关键问题

#### P0: 提现成功弹窗切入点不精确
技术方案写"修改 Cashout/index.tsx"，但 Cashout/index.tsx 根本不参与提现成功回调。实际提现成功发生在 showCashoutModal.tsx 的 SUCCESS 状态 onClose 回调中（line 243-247）。

关键发现：handleClose() 里只在 willCashoutStage === StageTwo 时才 emit CASHOUT_SUCCESS 事件，W3/W4/W5 不能依赖此事件。

建议切入点：showCashoutModal 的 onConfirm 回调或 SUCCESS 的 onClose。

#### P0: B 端 W3/W5 额外奖励 UI 完全缺失
需求文档要求 B 在 W3/W5 提现时看到额外奖励 claim UI，技术方案完全没涉及。需要修改 Cashout 流程核心组件。

#### P1: API 命名和字段问题
- searchStage → fetchBffStageStatus
- currentStage 小写 → BffStageStatus
- invitedUrl vs inviteLink 不一致
- shareTYext 拼写错误
- inactiveDays 使用了中文标点

#### P1: 轮询、分享降级、埋点仍缺设计

### 需求覆盖差距
- 14 个埋点事件完全未涉及
- B 端 W3/W5 额外奖励 UI 缺失
- 金币动效触发机制不明确
- 卡片排序算法未给出
