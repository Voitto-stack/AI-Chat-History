# Plan: reject 提现改为前端直调 gateway

## Context

当前 reject 提现接口走 `前端 → minerva-server → gateway → dora-service` 链路，minerva-server 中为此维护了 ~80 行 gateway 代理代码（token 管理、认证、重试）。这些逻辑与前端 `request/config.ts` 中已有的 `api.post(protoId, body)` 完全重复。改为前端直调 gateway 可删除后端代理层，与 PWADataboard 等模块保持一致。

## 改动

### 1. 前端：`apps/minerva/src/api/transactions.ts`

`rejectWithdrawal` 改用 `api.post(4384, { id })`，适配 gateway 响应格式 `{ code: "Success" }` → `{ isSuccessful: true }`：

```ts
import { api } from '@/request/config';

export async function rejectWithdrawal(id: number) {
  const res = await api.post<{ code: string }>(4384, { id });
  return { isSuccessful: res.code === 'Success' };
}
```

组件 `WithdrawalList.tsx` 无需改动（接口签名不变，仍返回 `{ isSuccessful: boolean }`）。

### 2. 后端：`apps/minerva-server/src/routes/transactions/transactions.ts`

删除全部 gateway 代理代码：
- `getGatewayUrl()` 函数
- `getLegacyCredentials()` 函数
- `cachedGatewayToken` 变量
- `refreshGatewayToken()` 函数
- `gatewayPost()` 函数
- `router.post('/withdrawals/:id/reject', ...)` 整个路由
- 文件头注释中 gateway 相关的描述

### 3. 环境配置：删除 `GATEWAY_URL`

- `apps/minerva-server/.env.local`
- `apps/minerva-server/.env.development`
- `apps/minerva-server/.env.production`

## 不改的文件

- `WithdrawalList.tsx` — `handleAction` 调用 `rejectWithdrawal(id)` 后检查 `res.isSuccessful`，接口签名不变
- `request/config.ts` — 已有完整的 gateway 调用机制（token 管理、401 重试），无需修改
- `minerva-schemas` — `WithdrawActionResponse` 类型不变

## 验证

1. 前端点击 Reject 按钮，确认返回 `isSuccessful: true`
2. 确认 minerva-server 终端无 reject 相关日志（请求不再经过后端）
3. 确认 approve 接口仍正常（走 minerva-server，不受影响）
