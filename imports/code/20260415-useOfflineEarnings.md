---
title: useOfflineEarnings
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: useOfflineEarnings.tsx
---

# useOfflineEarnings

```tsx
import { useEffect, useRef } from "react";
import { useVisibility } from "./useVisibility";
import { useOfflineEarningsStore, EarningsData } from "@/stores/offlineEarningsStore";
import { useUserStore, UserState } from "@/stores/userStore";
import { useModalStore } from "@/stores/modalStore";
import { OfflineEarningsModal, OFFLINE_EARNINGS_MODAL_ID } from "@/components/OfflineEarningsModal";
import { BytePlusManager } from "@/tracking";
import { EventName } from "@/tracking";

/**
 * 发送离线收益弹窗展示埋点
 */
function trackEarningsPopupShow(earnings: EarningsData) {
  if (earnings.idle > 0) {
    BytePlusManager.getInstance().trackEvent(EventName.pwa_ai_avatar_earnings_pop_up_show, {
      reward_type: "waiting_background_reward",
      reward_amount: Math.round(earnings.idle * 100),
    });
  }
  if (earnings.instagram > 0) {
    BytePlusManager.getInstance().trackEvent(EventName.pwa_ai_avatar_earnings_pop_up_show, {
      reward_type: "ins_assistant_reward",
      reward_amount: Math.round(earnings.instagram * 100),
    });
  }
}

/**
 * 离线收益 Hook
 * - 监听前后台切换
 * - 在合适时机显示收益弹窗
 */
export function useOfflineEarnings() {
  const { isBackground } = useVisibility();
  const userState = useUserStore((s) => s.userState);
  const userInfo = useUserStore((s) => s.userInfo);
  const { setBgStartTime, shouldShowModal, fetchEarnings } = useOfflineEarningsStore();
  const openModal = useModalStore((s) => s.open);

  // 使用 ref 避免闭包问题
  const prevIsBackgroundRef = useRef(isBackground);

  // 监听前后台切换
  useEffect(() => {
    // 只在完全注册后启用
    if (userState !== UserState.FullRegister || !userInfo) return;

    const wasBackground = prevIsBackgroundRef.current;
    const nowBackground = isBackground;

    // 更新 ref
    prevIsBackgroundRef.current = nowBackground;

    if (nowBackground && !wasBackground) {
      // 进入后台
      setBgStartTime(Date.now());
      console.log("📱 [OfflineEarnings] App entered background");
    } else if (!nowBackground && wasBackground) {
      // 回到前台 - 检查是否需要显示弹窗
      const bgStartTime = useOfflineEarningsStore.getState().bgStartTime;
      if (bgStartTime) {
        const bgDuration = Date.now() - bgStartTime;
        console.log(
          `📱 [OfflineEarnings] App returned to foreground, bg duration: ${(bgDuration / 1000 / 60).toFixed(1)} mins`,
        );

        // 检查是否需要显示弹窗
        if (shouldShowModal()) {
          fetchEarnings().then((earnings) => {
            if (earnings) {
              // 重置后台时间
              setBgStartTime(null);

              // 埋点：显示离线收益弹窗
              trackEarningsPopupShow(earnings);

              // 延迟显示，确保页面已渲染
              setTimeout(() => {
                openModal(OFFLINE_EARNINGS_MODAL_ID, <OfflineEarningsModal earnings={earnings} />, {
                  variant: "center",
                });
              }, 500);
            }
          });
        }
      }
    }
  }, [isBackground, userState, userInfo, setBgStartTime, shouldShowModal, fetchEarnings, openModal]);
}

```
