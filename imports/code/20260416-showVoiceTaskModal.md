---
title: showVoiceTaskModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: showVoiceTaskModal.tsx
---

# showVoiceTaskModal

```tsx
import { useModal } from "@/hooks/useModal";
import VoiceTaskModalContent from "./VoiceTaskModalContent";

type VoiceType = "first" | "second" | "third" | "forth";

const MODAL_ID_PREFIX = "voice-task-modal";

/**
 * 显示语音任务详情弹窗
 * @param voiceType 语音场景类型
 * @param onClose 关闭回调
 */
export function showVoiceTaskModal(voiceType: VoiceType, onClose?: () => void): void {
  const modalStore = useModal.getState();
  const modalId = `${MODAL_ID_PREFIX}-${voiceType}`;

  const handleClose = () => {
    modalStore.close(modalId);
    onClose?.();
  };

  modalStore.open(modalId, <VoiceTaskModalContent onClose={handleClose} voiceType={voiceType} />, {
    variant: "bottom-sheet",
    onClose,
  });
}

```
