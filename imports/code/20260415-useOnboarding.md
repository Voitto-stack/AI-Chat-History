---
title: useOnboarding
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useOnboarding.ts
---

# useOnboarding

```ts
/**
 * Onboarding 流程状态管理 Hook
 * 直接导出 onboardingStore，保留 Zustand 的所有功能（包括 selector）
 */

import { useOnboardingStore } from "@/stores/onboardingStore";

export const useOnboarding = useOnboardingStore;

```
