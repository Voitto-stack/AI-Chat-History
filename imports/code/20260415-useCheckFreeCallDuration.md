---
title: useCheckFreeCallDuration
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useCheckFreeCallDuration.ts
---

# useCheckFreeCallDuration

```ts
/**
 * 免费通话时长检测 Hook
 * Free Call Duration Check Hook
 *
 * 应用的 Vercel React Best Practices:
 * - rerender-use-ref-transient-values: 使用 ref 存储定时器
 * - rerender-functional-setstate: 使用稳定的回调
 * - js-early-exit: 早期返回优化
 * - async-defer-await: 延迟 await 到真正需要的地方
 * - js-cache-property-access: 缓存属性访问
 */

import { useCallback, useEffect, useRef } from "react";
import {
  CheckUserFreeCallDurationRequest,
  CheckUserFreeCallDurationResponse,
} from "@sitin/api-proto/gen/archat_api/user_api";
import httpClient from "@/http/httpClient";
import { useCall } from "@/hooks/useCall";
import { isApp, notifyCallType } from "@/utils/bridge";

const TAG = "useCheckFreeCallDuration";
const DETECTION_LOG = "🔍[CALL-DETECTION]";

// 检测间隔（毫秒）
const CHECK_INTERVAL = 2000;

/**
 * 免费通话时长检测 Hook
 * 定期检查用户是否还有免费通话时长，如果时长用完则停止检测
 */
const useCheckFreeCallDuration = () => {
  // ==================== State & Refs ====================
  // rerender-use-ref-transient-values: 使用 ref 存储定时器
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 从 store 获取状态和更新函数
  const { hasFreeCallDuration, setHasFreeCallDuration } = useCall();

  // ==================== API 调用 ====================

  /**
   * 查询用户免费通话时长
   * async-defer-await: 独立的异步操作
   */
  const fetchFreeCallDuration = useCallback(
    async (remoteUserId: number): Promise<CheckUserFreeCallDurationResponse | undefined> => {
      console.log(TAG, `${DETECTION_LOG} [免费时长检测] 查询免费时长: remoteUserId=${remoteUserId}`);

      try {
        const response = await httpClient.requestPost2(
          CheckUserFreeCallDurationRequest,
          { userId: remoteUserId },
          CheckUserFreeCallDurationResponse,
        );

        console.log(
          TAG,
          `${DETECTION_LOG} [免费时长检测] 查询结果: hasFreeCallDuration=${response.hasFreeCallDuration}`,
        );
        return response;
      } catch (error) {
        console.error(TAG, `${DETECTION_LOG} [免费时长检测] ❌ 查询失败:`, error);
        return undefined;
      }
    },
    [],
  );

  /**
   * 更新免费通话标记
   * rerender-functional-setstate: 使用稳定的回调
   */
  const updateFreeCallTag = useCallback(
    async (remoteUserId: number): Promise<boolean> => {
      const response = await fetchFreeCallDuration(remoteUserId);

      // js-cache-property-access: 缓存属性访问
      const isFreeCall = !!response?.hasFreeCallDuration;

      // 更新 store 状态
      setHasFreeCallDuration(isFreeCall);

      // 通知原生 App
      if (isApp()) {
        console.log(TAG, `${DETECTION_LOG} [免费时长检测] 通知Native: isFreeCall=${isFreeCall}`);
        await notifyCallType({ isFreeCall });
      }

      return isFreeCall;
    },
    [fetchFreeCallDuration, setHasFreeCallDuration],
  );

  // ==================== 定时检测控制 ====================

  /**
   * 停止检测
   */
  const stop = useCallback(() => {
    console.log(TAG, `${DETECTION_LOG} [免费时长检测] 停止检测`);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * 开始检测
   * async-defer-await: 延迟 await 到真正需要的地方
   */
  const start = useCallback(
    async (remoteUserId: number) => {
      // js-early-exit: 早期返回优化
      if (!remoteUserId) {
        console.error(TAG, `${DETECTION_LOG} [免费时长检测] ❌ remoteUserId 为空`);
        return;
      }

      console.log(
        TAG,
        `${DETECTION_LOG} [免费时长检测] 开始检测 (每${CHECK_INTERVAL / 1000}秒): remoteUserId=${remoteUserId}`,
      );

      // 立即执行一次检测
      const isFreeCall = await updateFreeCallTag(remoteUserId);

      // js-early-exit: 如果不是免费通话，直接返回
      if (!isFreeCall) {
        console.log(TAG, `${DETECTION_LOG} [免费时长检测] ✅ 非免费通话，停止检测`);
        stop();
        return;
      }

      // 启动定时检测
      console.log(TAG, `${DETECTION_LOG} [免费时长检测] 是免费通话，启动定时检测 (${CHECK_INTERVAL / 1000}秒间隔)`);

      // rerender-use-ref-transient-values: 存储定时器到 ref
      timerRef.current = setInterval(async () => {
        const currentIsFreeCall = await updateFreeCallTag(remoteUserId);

        // 如果免费时长用完，停止检测
        if (!currentIsFreeCall) {
          console.log(TAG, `${DETECTION_LOG} [免费时长检测] ⚠️ 免费时长已用完，停止检测`);
          stop();
        }
      }, CHECK_INTERVAL);
    },
    [updateFreeCallTag, stop],
  );

  // ==================== 清理 ====================

  /**
   * 组件卸载时清理定时器
   */
  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==================== 返回 ====================

  return {
    /** 是否有免费通话时长 */
    hasFreeCallDuration,
    /** 开始检测 */
    start,
    /** 停止检测 */
    stop,
  };
};

export default useCheckFreeCallDuration;

```
