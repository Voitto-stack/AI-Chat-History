---
title: useAuthNavigation
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useAuthNavigation.ts
---

# useAuthNavigation

```ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore, UserState } from "@/stores/userStore";

/**
 * 统一的认证导航 hook
 * 根据用户状态自动跳转到对应页面
 */
export const useAuthNavigation = () => {
  const { isReady, userState } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // 等待 userStore 从 localStorage 恢复数据
    if (!isReady) {
      return;
    }

    // 根据 userState 自动跳转
    if (userState === UserState.FullRegister) {
      navigate("/", { replace: true });
      return;
    }

    if (userState === UserState.SimpleRegister) {
      navigate("/onboardingcontainer", { replace: true });
      return;
    }
  }, [isReady, userState, navigate]);
};

```
