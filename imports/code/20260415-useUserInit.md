---
title: useUserInit
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useUserInit.ts
---

# useUserInit

```ts
/**
 * 用户初始化 Hook
 * 统一处理 userId 变化后需要更新的所有逻辑
 */

import { useCallback } from "react";
import * as Sentry from "@sentry/react";
import WebsocketManager from "@/network/ws/WebsocketManager";
import { UserState, useUserStore } from "@/stores/userStore";
import { useTask } from "@/hooks/useTask";
import { useCash } from "@/hooks/useCash";
import { useUser } from "@/hooks/useUser";
import { initializeCashout } from "@/hooks/useCashout";
import { useTaskAutoCompletion } from "@/hooks/useTaskAutoCompletion";
import { useInsAuthCallback } from "@/hooks/useInsAuthCallback";
import { useInsTaskInit } from "@/hooks/useInsTaskInit";
import { useCallInit } from "@/hooks/useCall";
import IMManager from "@/services/IMManager";
import { initChatList, cleanupChatList } from "@/hooks/chatList";
import { useCashoutStore } from "@/stores/cashoutStore";
import { useTaskStore } from "@/stores/taskStore";
import { getCallStoreState } from "@/hooks/useCall";
import { useInsStore } from "@/stores/insStore";
import { useInsExchangeStore } from "@/stores/insExchangeStore";
import { usePostStore } from "@/stores/postStore";
import { useMockCallTask } from "@/hooks/useMockCallTask";
import { useOnlineStatusStore } from "@/stores/onlineStatusStore";
import { setupFirebaseMessaging } from "@/hooks/useFirebaseMessaging";
import { useMissCall } from "@/hooks/useMissCall";
import { preloadAvatarToCache } from "@/utils/avatarCache";
import { preloadCallSDK } from "@/utils/webCallManager";
import { updateLoginInfoToNative } from "@/utils/bridge";

export const useUserInit = () => {
  const { refreshTasks } = useTask();
  const { refresh: refreshCash } = useCash();
  const { refreshUserInfo } = useUser();
  const { initCall } = useCallInit();
  const { initTask } = useMockCallTask();
  const { updateMissCall, reset: resetMissCall } = useMissCall();
  const { init: initInsTask, cleanup: cleanupInsTask } = useInsTaskInit();
  // 全局挂载任务监听器和桥接方法
  useTaskAutoCompletion(); // 任务自动完成监听器
  useInsAuthCallback(); // 注册 Instagram 授权回调（APK 授权完成后调用）

  // 初始化用户数据
  const initUser = useCallback(
    async (userId: number | undefined, userState: UserState) => {
      if (!userId) return;

      // 设置 Sentry 用户上下文
      const currentUserInfo = useUserStore.getState().userInfo;
      Sentry.setUser({
        id: userId.toString(),
        username: currentUserInfo?.username,
      });

      // 初始化通话模块
      initCall();
      // 初始化提现模块（需要先完成，后续 initTask 依赖 willCashoutStage）
      await initializeCashout();

      // 初始化Mock视频任务
      initTask();

      // TIM SDK 登录（每次用户变化都重新登录，SDK 本体只初始化一次）
      const timUsersig = useUserStore.getState().timUsersig;
      if (timUsersig) {
        // 先注册会话监听器，确保事件不丢失
        initChatList();
        // SDK 只初始化一次（注册底层事件），切换用户不重复执行
        if (!IMManager.Chat) {
          await IMManager.initSdk();
        }
        await IMManager.timLogin(userId.toString(), timUsersig);
        // TIM 登录完成后启动 INS 交换核心逻辑（依赖 TIM + 用户数据）
        initInsTask();
      }

      // 更新用户信息、余额、任务列表（并行执行）
      await Promise.allSettled([
        refreshUserInfo(),
        refreshCash().catch((error) => console.error("Failed to update balance:", error)),
        refreshTasks().catch((error) => console.error("Failed to refresh tasks:", error)),
      ]);

      // 预加载 AI 头像到本地缓存，弹窗弹出时直接使用
      preloadAvatarToCache(useUserStore.getState().userInfo);

      // 🔥 风险缓解：登录后预加载通话 SDK（避免来电时延迟）
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => preloadCallSDK(), { timeout: 5000 });
      } else {
        setTimeout(() => preloadCallSDK(), 2000);
      }

      // 更新 WebSocket 连接
      try {
        const wsManager = WebsocketManager.getInstance();
        if (userState === UserState.SimpleRegister || userState === UserState.FullRegister) {
          wsManager.close();
          await wsManager.open();
        } else {
          wsManager.close();
        }
      } catch (error) {
        console.error("Failed to update WebSocket connection:", error);
      }

      // 初始化 Firebase 推送（H5 环境，不阻塞主流程）
      setupFirebaseMessaging();

      // 冷启动时加载未接来电数据
      updateMissCall();

      // 向原生同步登录信息
      updateLoginInfoToNative();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshCash, refreshTasks, refreshUserInfo, initCall],
  );

  // 清理用户数据（用户登出/切换时调用）
  const cleanUser = useCallback(() => {
    // 清除 Sentry 用户上下文
    Sentry.setUser(null);

    const wsManager = WebsocketManager.getInstance();
    wsManager.close();
    cleanupChatList();
    IMManager.logout(); // 退出 TIM，允许下一个用户重新登录
    cleanupInsTask(); // 注销 INS IM 监听，清空 peerRound 状态

    // 重置所有用户相关的 Zustand store，防止切换用户时显示上一个用户的数据
    useCashoutStore.getState().reset();
    useTaskStore.getState().reset();
    getCallStoreState().resetCall();
    useInsStore.getState().resetInsState();
    useInsExchangeStore.getState().clearMessages();
    useInsExchangeStore.getState().resetEarnings();
    usePostStore.getState().reset();
    useOnlineStatusStore.getState().reset();
    resetMissCall();
  }, [cleanupInsTask, resetMissCall]);

  return {
    initUser,
    cleanUser,
  };
};

```
