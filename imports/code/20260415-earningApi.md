---
title: earningApi
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: earningApi.ts
---

# earningApi

```ts
/**
 * 收益相关 API
 */

import {
  GetPwaUserBalanceChangeHistoryRequest,
  GetPwaUserBalanceChangeHistoryResponse,
  ListCallOrderByRangeRequest,
  ListCallOrderByRangeResponse,
} from "@sitin/api-proto/gen/archat_api/user_api";
import httpClient from "./httpClient";

/**
 * 获取指定时间范围内的余额变动历史
 * @param startTime 开始时间（unix 秒）
 * @param endTime 结束时间（unix 秒）
 */
export async function getPwaUserBalanceChangeHistory(
  startTime: number,
  endTime: number,
): Promise<GetPwaUserBalanceChangeHistoryResponse> {
  const request: GetPwaUserBalanceChangeHistoryRequest = { startTime, endTime };
  return await httpClient.requestPost2(
    GetPwaUserBalanceChangeHistoryRequest,
    request,
    GetPwaUserBalanceChangeHistoryResponse,
  );
}

/**
 * 获取指定时间范围内的通话订单列表
 * @param startTime 开始时间（unix 秒）
 * @param endTime 结束时间（unix 秒）
 */
export async function listCallOrderByRange(startTime: number, endTime: number): Promise<ListCallOrderByRangeResponse> {
  const request: ListCallOrderByRangeRequest = { startTime, endTime };
  return await httpClient.requestPost2(ListCallOrderByRangeRequest, request, ListCallOrderByRangeResponse);
}

```
