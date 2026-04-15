---
title: useCheckGCCoin
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useCheckGCCoin.ts
---

# useCheckGCCoin

```ts
import httpClient from "@/http/httpClient";
import {
  GetMaleUserBalanceRequest,
  GetMaleUserBalanceResponse,
  UserServiceCommonCode,
} from "@sitin/api-proto/gen/archat_api/user_api";
import { delay } from "../utils/callUtils";
import webCallManager from "../utils/webCallManager";
import { CallState } from "@/types/call";
import { useEffect, useRef } from "react";

const useCheckGCCoin = () => {
  const timer = useRef(null);

  const roomIdRef = useRef("");

  const check = async (roomId, remoteUserId) => {
    try {
      // ✅ 计算延迟，确保检测间隔至少 5 秒
      await delay(5000);
      // 发起余额检查请求
      const response = await httpClient
        .requestPost2(GetMaleUserBalanceRequest, { userId: parseInt(remoteUserId) }, GetMaleUserBalanceResponse)
        .catch(() => {
          return { code: 99 } as GetMaleUserBalanceResponse;
        });

      // 检查余额是否充足
      if (response.code === UserServiceCommonCode.Success) {
        const coin = parseInt(response.coin ?? "0");

        if (coin < 150) {
          // 当前的房间跟检测的是同一个房间才执行挂断

          if (roomIdRef.current === roomId) await webCallManager.hangup();
          return;
        } else {
          console.log(`[GC余额检测] ✅ 余额充足，继续通话`);
        }
      } else {
        console.warn(`[GC余额检测] 接口返回错误 code=${response.code}`);
      }

      // ✅ 递归调度下一次检测（50秒后）
      if (webCallManager.connectSession?.callState === CallState.Connected) {
        console.log(` [GC余额检测] 调度下次检测 (50秒后)`);

        if (roomIdRef.current === roomId) timer.current = setTimeout(() => check(roomId, remoteUserId), 50_000);
      }
    } catch (error) {
      console.error(`[GC余额检测] 异常错误:`, error);
    }
  };

  const start = async ({ roomId, remoteUserId }) => {
    roomIdRef.current = roomId;
    check(roomId, remoteUserId);

    console.log(`[GC余额检测] 开始检查 roomId=${roomId}, remoteUserId=${remoteUserId}`);
  };

  const stop = () => {
    clearTimeout(timer.current);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    start,
    stop,
  };
};

export default useCheckGCCoin;

```
