---
title: modalStore
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: modalStore.ts
---

# modalStore

```ts
import { create } from "zustand";
import { ReactNode } from "react";

type ModalVariant = "fullscreen" | "bottom-sheet" | "center";

interface Modal {
  id: string;
  content: ReactNode;
  variant?: ModalVariant;
  onClose?: () => void;
}

interface ModalState {
  modals: Modal[];
  open: (id: string, content: ReactNode, options?: { variant?: ModalVariant; onClose?: () => void }) => void;
  close: (id: string) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  open: (id, content, options) =>
    set((state) => ({
      // 先移除同 id 的旧弹窗，避免重复
      modals: [
        ...state.modals.filter((m) => m.id !== id),
        { id, content, variant: options?.variant, onClose: options?.onClose },
      ],
    })),
  close: (id) =>
    set((state) => {
      const modal = state.modals.find((m) => m.id === id);
      modal?.onClose?.();
      return {
        modals: state.modals.filter((m) => m.id !== id),
      };
    }),
  closeAll: () =>
    set((state) => {
      state.modals.forEach((modal) => modal.onClose?.());
      return { modals: [] };
    }),
}));

```
