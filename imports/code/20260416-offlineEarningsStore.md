---
title: offlineEarningsStore
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: offlineEarningsStore.ts
---

# offlineEarningsStore

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  QueryPreIncrBalanceRequest,
  QueryPreIncrBalanceResponse,
  ConfirmPreIncrBalanceRequest,
  ConfirmPreIncrBalanceResponse,
  UserServiceCommonCode,
} from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import httpClient from "@/http/httpClient";
import { BytePlusManager } from "@/tracking";
import { EventName } from "@/tracking";

const ONE_HOUR_MS = 1 * 1 * 1000;
const STORAGE_KEY = "offline-earnings";

export interface EarningsData {
  instagram: number;
  idle: number;
  total: number;
}

interface OfflineEarningsState {
  // 后台开始时间戳
  bgStartTime: number | null;
  // 上次成功请求时间
  lastFetchTime: number;

  setBgStartTime: (time: number | null) => void;
  fetchEarnings: () => Promise<EarningsData | null>;
  claimEarnings: () => Promise<{ success: boolean; balance?: string }>;
  shouldShowModal: () => boolean;
}

export const useOfflineEarningsStore = create<OfflineEarningsState>()(
  persist(
    (set, get) => ({
      bgStartTime: null,
      lastFetchTime: 0,

      setBgStartTime: (time) => set({ bgStartTime: time }),

      // 检查是否应该显示弹窗（后台时长 >= 1小时）
      shouldShowModal: () => {
        const { bgStartTime } = get();
        if (!bgStartTime) return false;
        return Date.now() - bgStartTime >= ONE_HOUR_MS;
      },

      // 获取收益数据
      fetchEarnings: async () => {
        const { lastFetchTime } = get();
        const now = Date.now();

        // 1小时内不重复请求
        if (lastFetchTime && now - lastFetchTime < ONE_HOUR_MS) {
          return null;
        }

        try {
          const response = await httpClient.requestPost2(QueryPreIncrBalanceRequest, {}, QueryPreIncrBalanceResponse);

          if (response.code !== UserServiceCommonCode.Success) {
            return null;
          }

          const instagram = parseFloat(response.totalPreInsTextEarnings || "0");
          const idle = parseFloat(response.totalPreWaitingEarnings || "0");
          const total = instagram + idle;

          // 埋点：查询到有收益时
          if (idle > 0) {
            BytePlusManager.getInstance().trackEvent(EventName.pwa_ai_avatar_afk_reward, {
              afk_reward: Math.round((idle + instagram) * 100),
              afk_time: Math.round((idle / 0.01) * 60),
              current_afk_reward: Math.round(idle * 100),
            });
          }

          // 无论是否有收益，都更新 lastFetchTime 防止频繁请求
          if (total > 0) {
            set({ lastFetchTime: now });
          } else {
            // 即使没有收益也要更新，避免频繁调用 API
            set({ lastFetchTime: now });
            return null;
          }

          return { instagram, idle, total };
        } catch (error) {
          console.error("❌ [OfflineEarnings] API call failed:", error);
          return null;
        }
      },

      // 领取收益
      claimEarnings: async () => {
        try {
          const response = await httpClient.requestPost2(
            ConfirmPreIncrBalanceRequest,
            {},
            ConfirmPreIncrBalanceResponse,
          );

          return {
            success: response.code === UserServiceCommonCode.Success,
            balance: response.balance,
          };
        } catch {
          return { success: false };
        }
      },
    }),
    {
      name: STORAGE_KEY,
      // 只持久化必要字段
      partialize: (state) => ({
        bgStartTime: state.bgStartTime,
        lastFetchTime: state.lastFetchTime,
      }),
    },
  ),
);

```
