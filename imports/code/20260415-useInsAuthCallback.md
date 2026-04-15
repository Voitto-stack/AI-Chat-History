---
title: useInsAuthCallback
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useInsAuthCallback.ts
---

# useInsAuthCallback

```ts
/**
 * 注册 Instagram 授权回调 Hook
 *
 * APK 在 Instagram 授权完成后会调用 window.finishPWAInsTask(state, insId, insAvatar)
 * 该 Hook 在应用初始化时挂载，确保回调方法始终可用
 */

import { useEffect, useCallback } from "react";
import { useInsStore } from "@/stores/insStore";
import { useUser } from "@/hooks/useUser";

// 扩展 Window 接口，声明全局方法
declare global {
  interface Window {
    finishPWAInsTask?: (state: string, insId: string, insAvatar: string) => Promise<void>;
  }
}

export function useInsAuthCallback() {
  const { setInsState } = useInsStore();
  const { bindInstagram } = useUser();

  /**
   * 处理 Instagram 授权结果（由 APK 调用）
   */
  const handleInsAuthResult = useCallback(
    async (state: string, insId: string, insAvatar: string) => {
      const newState = state === "true";

      if (newState) {
        try {
          // 去掉首尾引号
          const sanitize = (val: string) => {
            const trimmed = val?.trim() ?? "";
            if (
              (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
              (trimmed.startsWith("'") && trimmed.endsWith("'"))
            ) {
              return trimmed.slice(1, -1);
            }
            return trimmed;
          };

          const cleanInsId = sanitize(insId);
          const cleanInsAvatar = sanitize(insAvatar);

          console.log("Instagram 授权成功，保存信息:", {
            insId: cleanInsId,
            insAvatar: cleanInsAvatar,
          });

          // 调用 API 保存 Instagram 信息并自动刷新用户信息
          await bindInstagram({
            insId: cleanInsId,
            insAvatar: cleanInsAvatar,
          });

          // 设置授权状态为 true，显示授权成功
          setInsState(newState);
        } catch (error) {
          console.error("保存 Instagram 信息失败:", error);
          // 即使保存失败也设置状态，让用户看到成功
          setInsState(newState);
        }
      } else {
        setInsState(newState);
      }
    },
    [bindInstagram, setInsState],
  );

  // 注册全局方法供 APK 调用（应用启动时注册一次）
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.finishPWAInsTask = handleInsAuthResult;
      console.log("[useInsAuthCallback] 授权回调已注册: window.finishPWAInsTask");
    }

    // 清理：应用卸载时移除全局方法
    return () => {
      if (typeof window !== "undefined") {
        delete window.finishPWAInsTask;
        console.log("[useInsAuthCallback] 授权回调已清理");
      }
    };
  }, [handleInsAuthResult]);
}

```
