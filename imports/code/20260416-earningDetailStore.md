---
title: earningDetailStore
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: earningDetailStore.ts
---

# earningDetailStore

```ts
import { create } from "zustand";
import type { RecordItem } from "@/pages/Earning/types";

interface EarningDetailState {
  records: RecordItem[];
  /** 上次成功请求的时间戳，用于判断缓存新鲜度 */
  lastFetchedAt: number;
  setRecords: (records: RecordItem[]) => void;
}

export const useEarningDetailStore = create<EarningDetailState>((set) => ({
  records: [],
  lastFetchedAt: 0,
  setRecords: (records) => set({ records, lastFetchedAt: Date.now() }),
}));

```
