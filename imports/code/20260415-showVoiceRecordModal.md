---
title: showVoiceRecordModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: showVoiceRecordModal.tsx
---

# showVoiceRecordModal

```tsx
import { useModal } from "@/hooks/useModal";
import VoiceRecordModalContent from "./VoiceRecordModalContent";

const MODAL_ID_PREFIX = "voice-record-modal";

/**
 * 显示语音录制弹窗
 * @param voiceType 类型
 * @param onTaskClose 上传成功后关闭任务弹窗的回调
 */
export function showVoiceRecordModal(
  voiceType: "first" | "second" | "third" | "forth",
  onTaskClose?: () => void,
): void {
  const modalStore = useModal.getState();
  const modalId = `${MODAL_ID_PREFIX}-${voiceType}`;

  const handleClose = () => {
    modalStore.close(modalId);
  };

  modalStore.open(
    modalId,
    <VoiceRecordModalContent onClose={handleClose} voiceType={voiceType} onTaskClose={onTaskClose} />,
    {
      variant: "center",
    },
  );
}

```
