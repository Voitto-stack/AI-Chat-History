---
title: receiveCallModalHelpers
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: receiveCallModalHelpers.ts
---

# receiveCallModalHelpers

```ts
import React from "react";
import { useModal } from "@/hooks/useModal";
import { ReceiveCallModalContent } from "./ReceiveCallModal";

const MODAL_ID = "receive-call-modal";

export const closeReceiveCallModal = (): void => {
  useModal.getState().close(MODAL_ID);
};

export const showReceiveCallModal = (params: {
  callType?: "video" | "audio";
  price?: number;
  onAccept: () => void;
  onDecline: () => void;
}): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    React.createElement(ReceiveCallModalContent, {
      callType: params.callType,
      price: params.price,
      onAccept: params.onAccept,
      onDecline: params.onDecline,
      onClose: handleClose,
    }),
    { variant: "fullscreen" },
  );
};

```
