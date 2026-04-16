---
title: cashoutApi
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: cashoutApi.ts
---

# cashoutApi

```ts
/**
 * 提现相关 API
 */

import {
  QueryUserWithdrawTasksRequest,
  QueryUserWithdrawTasksResponse,
  GetUserCallOrderTotalEarnRequest,
  GetUserCallOrderTotalEarnResponse,
  GetUserInsTotalEarnRequest,
  GetUserInsTotalEarnResponse,
  NormalMediumWithdrawRequest,
  NormalMediumWithdrawResponse,
  NormalMediumWithdrawCheckRequest,
  NormalMediumWithdrawCheckResponse,
  ReportPwaWithdrawPhaseRequest,
  ReportPwaWithdrawPhaseResponse,
  UserServiceCommonCode,
  UserWithdrawInfo,
} from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import httpClient from "./httpClient";
import { WithdrawInfo, WithdrawStatus, USPaypalAccountType } from "@/types/cashout";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import { useCashoutStore } from "@/stores/cashoutStore";

// 查询用户提现任务列表
export async function queryUserWithdrawTasks(): Promise<QueryUserWithdrawTasksResponse> {
  const request: QueryUserWithdrawTasksRequest = {};

  return await httpClient.requestPost2(QueryUserWithdrawTasksRequest, request, QueryUserWithdrawTasksResponse);
}

/**
 * 正常提现接口（阶段性提现）
 * @param amount 提现金额
 * @param allowPayment 是否允许支付（GPS在美国 + 语言en-US）
 * @param isLbsAmerica GPS定位是否在美国
 * @param usPaypalAccountType PayPal账户类型（0=未验证, 1=美国账户, 2=非美国账户）
 */
export async function normalMediumWithdraw(params: {
  amount: string;
  allowPayment: boolean;
  isLbsAmerica: boolean;
  usPaypalAccountType: USPaypalAccountType;
}): Promise<NormalMediumWithdrawResponse> {
  const request: NormalMediumWithdrawRequest = {
    amount: params.amount,
    allowPayment: params.allowPayment,
    isLbsAmerica: params.isLbsAmerica,
    usPaypalAccountType: params.usPaypalAccountType,
  };

  const response = await httpClient.requestPost2(NormalMediumWithdrawRequest, request, NormalMediumWithdrawResponse);

  // 埋点：提现完成对应阶段的广告事件
  if (response?.code === UserServiceCommonCode.Success) {
    const stage = useCashoutStore.getState().willCashoutStage;
    const stageEventMap = {
      1: EventName.ad_WithdrawComplete_Stage1,
      2: EventName.ad_WithdrawComplete_Stage2,
      3: EventName.ad_WithdrawComplete_Stage3,
      4: EventName.ad_WithdrawComplete_Stage4,
      5: EventName.ad_WithdrawComplete_Stage5,
      6: EventName.ad_WithdrawComplete_Stage6,
      7: EventName.ad_WithdrawComplete_Stage7,
    };
    const eventName = stageEventMap[stage];
    if (eventName) {
      bpTrack(eventName, {
        amount: params.amount,
        stage: stage,
      });
    }
  }

  return response;
}

/**
 * 提现检查接口（用于 PayPal 登录后检查是否ban用户）
 * 如果地理位置和 PayPal 账户来源都不是美国，后端会 ban 该用户
 * @param isLbsAmerica GPS定位是否在美国
 * @param usPaypalAccountType PayPal账户类型（0=未验证, 1=美国账户, 2=非美国账户）
 */
export async function normalMediumWithdrawCheck(params: {
  isLbsAmerica: boolean;
  usPaypalAccountType: USPaypalAccountType;
}): Promise<NormalMediumWithdrawCheckResponse> {
  const request: NormalMediumWithdrawCheckRequest = {
    isLbsAmerica: params.isLbsAmerica,
    usPaypalAccountType: params.usPaypalAccountType,
  };

  return await httpClient.requestPost2(NormalMediumWithdrawCheckRequest, request, NormalMediumWithdrawCheckResponse);
}

// 将后端 status 字符串映射为前端枚举（还原老项目逻辑）
function parseWithdrawStatus(raw?: string): WithdrawStatus {
  if (raw === "FINISHED") return WithdrawStatus.Finished;
  if (raw === "FAILED") return WithdrawStatus.Failed;
  return WithdrawStatus.Processing;
}

// 转换 Proto 提现记录为应用内格式
export function convertWithdrawInfo(protoInfo: UserWithdrawInfo): WithdrawInfo {
  return {
    id: String(protoInfo.id || ""),
    amount: Number(protoInfo.amount || 0),
    status: parseWithdrawStatus(protoInfo.status),
    createTime: protoInfo.createAt,
    finishTime: protoInfo.updateAt,
  };
}

/**
 * 获取用户视频通话总收益
 */
export async function getUserCallOrderTotalEarn(): Promise<number> {
  try {
    const response = await httpClient.requestPost2(
      GetUserCallOrderTotalEarnRequest,
      {},
      GetUserCallOrderTotalEarnResponse,
    );
    if (response?.code === UserServiceCommonCode.Success) {
      return Number(response.totalEarnBalance ?? 0);
    }
    return 0;
  } catch (error) {
    console.error("Failed to get video call earn:", error);
    return 0;
  }
}

/**
 * 上报 PWA 提现阶段完成
 * 当某个阶段所有任务完成后调用
 * @param phase 第几笔提现（从1开始）
 */
export async function reportPwaWithdrawPhase(phase: number): Promise<void> {
  try {
    await httpClient.requestPost2(ReportPwaWithdrawPhaseRequest, { phase }, ReportPwaWithdrawPhaseResponse);
  } catch (error) {
    console.error("Failed to report PWA withdraw phase:", error);
  }
}

/**
 * 获取用户 Instagram 总收益
 */
export async function getUserInsTotalEarn(): Promise<number> {
  try {
    const response = await httpClient.requestPost2(GetUserInsTotalEarnRequest, {}, GetUserInsTotalEarnResponse);
    if (response?.code === UserServiceCommonCode.Success) {
      return Number(response.totalEarnBalance ?? 0);
    }
    return 0;
  } catch (error) {
    console.error("Failed to get instagram earn:", error);
    return 0;
  }
}

```
