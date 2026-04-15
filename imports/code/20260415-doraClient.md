---
title: doraClient
date: 2026-04-15T17:04:52+08:00
source: import
language: ts
original: doraClient.ts
---

# doraClient

```ts
/**
 * dora-service HTTP 代理客户端
 *
 * 仅用于需要事务保证的写操作（提现审批/拒绝）。
 * dora-service 内部通过 PostgreSQL 事务 + 悲观锁保证原子性，
 * 直接改 DB 无法复现该逻辑，必须走此代理。
 */
import { AppError } from '../utils/AppError.js';

const DORA_BASE_URL = process.env.DORA_SERVICE_URL;

if (!DORA_BASE_URL) {
  console.warn('[doraClient] DORA_SERVICE_URL not set — approve/reject will fail at runtime');
}

async function doraPost<T>(path: string, body: object): Promise<T> {
  if (!DORA_BASE_URL) {
    throw AppError.internal('DORA_SERVICE_URL not configured', 'DORA_NOT_CONFIGURED');
  }

  let res: Response;
  try {
    res = await fetch(`${DORA_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw AppError.badGateway(`dora-service unreachable: ${msg}`);
  }

  if (!res.ok) {
    throw AppError.badGateway(`dora-service returned ${res.status}`);
  }

  return res.json() as Promise<T>;
}

/** 批准提现（触发 dora-service 两阶段余额 freeze → moveOut） */
export function adminApproveWithdraw(idList: number[]) {
  return doraPost<{ isSuccessful: boolean }>('/user/admin_approve_user_withdraw', { idList });
}

/** 拒绝提现（触发 dora-service unfreeze 余额） */
export function adminRejectWithdraw(id: number) {
  return doraPost<{ isSuccessful: boolean }>('/user/admin_reject_user_withdraw', { id });
}

```
