---
title: userStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: userStore.ts
---

# userStore

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { STORAGE_KEYS, clearUserLocalStorage } from "@/constants/storageKeys";

export enum UserState {
  NotLogin = "NotLogin",
  SimpleRegister = "SimpleRegister",
  FullRegister = "FullRegister",
}

interface UserStoreState {
  isReady: boolean;
  userState: UserState;
  token: string | null;
  userInfo: UserInfo | null;
  cash: number;
  paypalAccount: string; // PayPal 账号
  timUsersig: string;
  setToken: (token: string | null) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
  setCash: (cash: number) => void;
  setPaypalAccount: (account: string) => void;
  logout: () => void;
  setTimUsersig: (timUsersig: string) => void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      isReady: false,
      userState: UserState.NotLogin,
      token: null,
      userInfo: null,
      cash: 0,
      paypalAccount: "",
      timUsersig: "",
      setToken: (token) => {
        set({ token });
        // 同步保存 token 到 localStorage，供 httpClient 使用
        if (token) {
          localStorage.setItem(STORAGE_KEYS.HAVEN_TOKEN, token);
        } else {
          localStorage.removeItem(STORAGE_KEYS.HAVEN_TOKEN);
        }
      },
      setTimUsersig: (timUsersig) => {
        set({ timUsersig });
        // 同步保存 token 到 localStorage，供 httpClient 使用
        if (timUsersig) {
          localStorage.setItem(STORAGE_KEYS.TIM_USERSIG, timUsersig);
        } else {
          localStorage.removeItem(STORAGE_KEYS.TIM_USERSIG);
        }
      },
      setUserInfo: (userInfo) => {
        let userState = UserState.NotLogin;
        if (userInfo) {
          userState = userInfo.pending ? UserState.SimpleRegister : UserState.FullRegister;
        }
        set({ userInfo, userState });
      },
      setCash: (cash) => {
        set({ cash });
      },
      setPaypalAccount: (account) => {
        set({ paypalAccount: account });
      },
      logout: () => {
        set({
          userState: UserState.NotLogin,
          token: null,
          userInfo: null,
          cash: 0,
          paypalAccount: "",
          timUsersig: "",
        });
        clearUserLocalStorage();
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_STORAGE,
      onRehydrateStorage: () => (state) => {
        // localStorage 恢复完成后自动设置 isReady 为 true
        state && (state.isReady = true);
      },
    },
  ),
);

```
