# BFF 裂变功能（邀请端 A）实现计划

## Context

基于技术方案 v2.0，在 `apps/pwa` 中实现邀请端（A）的初版代码。后端尚未就绪，所有 API 使用 mock 数据。

## 文件清单

### 新增文件（15 个）

| # | 文件路径 | 说明 |
|---|---------|------|
| 1 | `src/types/bff.ts` | BFF 类型定义（枚举、接口） |
| 2 | `src/http/bffApi.ts` | API 层 + mock 数据 |
| 3 | `src/stores/bffStore.ts` | Zustand store（无 persist，mock 阶段不需要） |
| 4 | `src/utils/share.ts` | Web Share API + 剪贴板降级 |
| 5 | `src/components/BffBanner.tsx` | 首页顶部 Banner |
| 6 | `src/components/BffShareModal.tsx` | W3/W4/W5 提现成功全屏弹窗 |
| 7 | `src/components/BffW2Modal.tsx` | W2 提现成功底部弹窗 |
| 8 | `src/components/BffRuleModal.tsx` | 规则说明弹窗 |
| 9 | `src/pages/BffDashboard/index.tsx` | Dashboard 主页面 |
| 10 | `src/pages/BffDashboard/AccountSection.tsx` | 账户区（Locked + Available） |
| 11 | `src/pages/BffDashboard/InviteSection.tsx` | 邀请区（链接 + 分享） |
| 12 | `src/pages/BffDashboard/SquadCard.tsx` | 被邀请者卡片 |
| 13 | `src/pages/BffDashboard/SquadList.tsx` | Squad 列表（含空状态） |
| 14 | `src/pages/BffDashboard/constants.ts` | 阶段配置常量（话术、按钮文案等） |
| 15 | `src/pages/Earning/BffEntryCard.tsx` | Earnings 页入口卡片 |

### 修改文件（4 个）

| # | 文件路径 | 修改内容 |
|---|---------|---------|
| 1 | `src/constants/storageKeys.ts` | 新增 `BFF_STORAGE` key |
| 2 | `src/router/index.tsx` | 新增 `/bff-dashboard` 路由 |
| 3 | `src/pages/Home/index.tsx` | 插入 `<BffBanner />` |
| 4 | `src/pages/Earning/index.tsx` | 插入 `<BffEntryCard />` |

> 提现弹窗（BffShareModal/BffW2Modal）本期仅创建组件，**不改动 showCashoutModal.tsx**。因为后端未就绪，提现成功回调中触发 BFF 弹窗的逻辑等联调时再接入。Dashboard 页面提供手动触发入口供测试。

## 实现顺序

1. **类型 + 常量**：`types/bff.ts`、`constants/storageKeys.ts`、`BffDashboard/constants.ts`
2. **API + Mock**：`http/bffApi.ts`（纯 mock，返回 Promise.resolve）
3. **Store**：`stores/bffStore.ts`
4. **工具函数**：`utils/share.ts`
5. **组件**：BffBanner → BffEntryCard → BffRuleModal → BffShareModal → BffW2Modal
6. **Dashboard 页面**：AccountSection → InviteSection → SquadCard → SquadList → index.tsx
7. **路由 + 页面修改**：router → Home → Earning

## 关键模式匹配

- Store：`create<Interface>()((set, get) => ({...}))`，不用 persist（mock 阶段）
- API：mock 函数返回 `Promise.resolve(mockData)`，后续替换为 `httpClient.requestPost2`
- Modal：`useModal.getState().open(id, <Component />, { variant })`
- Toast：`import { toast } from "@/utils/toast"`
- NavigationBar：`rightSlot` prop 放规则按钮
- 样式：全 Tailwind，`mx-4 rounded-2xl bg-white p-5` 卡片风格

## 验证

1. `pnpm dev` 启动后访问首页，完成第二笔提现条件下可见 BFF Banner
2. 点击 Banner 进入 `/bff-dashboard`，看到 mock 数据的账户区、邀请区、Squad 列表
3. 点击 Rules 弹出规则弹窗
4. 点击 Send Gift Link 触发分享/复制
5. 点击 Squad 卡片的催单按钮触发分享
6. Earnings 页面可见 BFF 入口卡片
