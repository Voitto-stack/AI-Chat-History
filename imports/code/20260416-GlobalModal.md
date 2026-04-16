---
title: GlobalModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: GlobalModal.tsx
---

# GlobalModal

```tsx
import { createPortal } from "react-dom";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "./ModalContainer";

/**
 * 全局 Modal 容器组件
 * 在 App 根组件中渲染，所有通过 modalStore 打开的弹窗都会在此渲染
 * 统一处理 ModalContainer 的包装，各个 modal 组件只需要提供内容即可
 */
export function GlobalModal() {
  const modals = useModal((state) => state.modals);
  const closeModal = useModal((state) => state.close);

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modal) =>
        createPortal(
          <ModalContainer
            key={modal.id}
            open={true}
            onClose={() => closeModal(modal.id)}
            variant={modal.variant || "center"}
          >
            {modal.content}
          </ModalContainer>,
          document.body,
        ),
      )}
    </>
  );
}

```
