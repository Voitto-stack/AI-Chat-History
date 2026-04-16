---
title: useOnlineStatusReport
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useOnlineStatusReport.ts
---

# useOnlineStatusReport

```ts
import { useEffect, useRef, useCallback } from "react";
import { useLive, LiveState } from "@/hooks/useLive";
import { useCall, getCallStoreState } from "@/hooks/useCall";
import { CallState } from "@/types/call";
import { useOnlineStatusStore } from "@/stores/onlineStatusStore";
import { useVisibility } from "@/hooks/useVisibility";
import { reportOnlineStatus } from "@/http/onlineStatusApi";
import { pwaStatus } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import IMManager from "@/services/IMManager";

const REPORT_INTERVAL = 5000; // 5 秒

/**
 * 推导当前 pwaStatus
 * 优先级：通话中(BUSY) > Live 状态 > 默认状态，然后叠加网络降级
 */
export function derivePwaStatus(
  liveState: LiveState,
  callState: CallState,
  isBackground: boolean,
  isNetConnected: boolean,
): pwaStatus {
  // 1. 推导基础状态
  let status: pwaStatus;

  if (callState === CallState.Connected) {
    // 通话中 → BUSY（最高优先级）
    status = pwaStatus.PWA_STATUS_FRONTEND_ONLINE_BUSY;
  } else if (liveState === LiveState.Action) {
    // Live 开启中
    status = isBackground ? pwaStatus.PWA_STATUS_BACKEND_ONLINE_ACTIVE : pwaStatus.PWA_STATUS_FRONTEND_ONLINE_ACTIVE;
  } else {
    // 默认：未直播
    status = isBackground
      ? pwaStatus.PWA_STATUS_BACKEND_ONLINE_INACTIVE
      : pwaStatus.PWA_STATUS_FRONTEND_ONLINE_INACTIVE;
  }

  // 2. 网络降级：IM 网络断开时，前台→FRONTEND_OFFLINE，后台→OFFLINE
  if (!isNetConnected) {
    if (
      status === pwaStatus.PWA_STATUS_FRONTEND_ONLINE_INACTIVE ||
      status === pwaStatus.PWA_STATUS_FRONTEND_ONLINE_ACTIVE
    ) {
      status = pwaStatus.PWA_STATUS_FRONTEND_OFFLINE;
    } else if (
      status === pwaStatus.PWA_STATUS_BACKEND_ONLINE_ACTIVE ||
      status === pwaStatus.PWA_STATUS_BACKEND_ONLINE_INACTIVE
    ) {
      status = pwaStatus.PWA_STATUS_OFFLINE;
    }
  }

  return status;
}

/**
 * 在线状态上报 hook
 *
 * 两条上报逻辑：
 * 1. 状态变化时即时上报
 * 2. 每 5 秒轮询上报
 *
 * @param isActive 是否激活上报
 */
export function useOnlineStatusReport(isActive: boolean) {
  const { isBackground } = useVisibility();
  const { liveState } = useLive();
  const { callState } = useCall();
  const currentStatus = useOnlineStatusStore((s) => s.pwaStatus);
  const setPwaStatus = useOnlineStatusStore((s) => s.setPwaStatus);
  const statusRef = useRef(currentStatus);
  statusRef.current = currentStatus;

  // IM 网络状态变化时重新推导
  const recomputeAndSet = useCallback(() => {
    if (!isActive) return;
    const newStatus = derivePwaStatus(
      liveState,
      getCallStoreState().callState,
      document.visibilityState !== "visible",
      IMManager.getIsNetConnected(),
    );
    setPwaStatus(newStatus);
  }, [isActive, liveState, setPwaStatus]);

  // 状态推导：当信号源变化时重新计算 pwaStatus
  useEffect(() => {
    if (!isActive) return;
    const newStatus = derivePwaStatus(liveState, callState, isBackground, IMManager.getIsNetConnected());
    setPwaStatus(newStatus);
  }, [isActive, liveState, callState, isBackground, setPwaStatus]);

  // 监听 IM 网络状态变化，触发重新推导
  useEffect(() => {
    if (!isActive) return;
    IMManager.registerNetStateChangeListener(recomputeAndSet);
    return () => IMManager.unregisterNetStateChangeListener(recomputeAndSet);
  }, [isActive, recomputeAndSet]);

  // 即时上报：pwaStatus 变化时立即上报
  useEffect(() => {
    if (!isActive) return;
    if (currentStatus === pwaStatus.PWA_STATUS_UNKNOWN) return;
    reportOnlineStatus(currentStatus);
  }, [isActive, currentStatus]);

  // 轮询上报：每 5 秒上报一次当前状态
  //
  // 设计局限性说明：
  // 当前后端通过"统计收到的上报次数 × 5 秒"来计算用户在线时长，因此需要客户端保持固定频率的心跳上报。
  // 此设计存在问题，待优化
  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      reportOnlineStatus(statusRef.current);
    }, REPORT_INTERVAL);
    return () => clearInterval(timer);
  }, [isActive]);
}

```
