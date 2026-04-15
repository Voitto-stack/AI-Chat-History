---
title: toastStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: toastStore.ts
---

# toastStore

```ts
import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
  closing?: boolean;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  closeToast: (id: number) => void;
  removeToast: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (type, message, duration = 3000) => {
    const id = ++nextId;
    set((state) => ({
      toasts: [...state.toasts, { id, type, message, duration }],
    }));
    // Auto dismiss
    setTimeout(() => {
      useToastStore.getState().closeToast(id);
    }, duration);
  },
  closeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, closing: true } : t)),
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// 函数式 API
export const showToast = (type: ToastType, message: string, duration?: number) => {
  useToastStore.getState().addToast(type, message, duration);
};

```
