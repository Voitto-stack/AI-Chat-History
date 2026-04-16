---
title: EventRulesModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: EventRulesModal.tsx
---

# EventRulesModal

```tsx
/* eslint-disable react-refresh/only-export-components */
import { useModal } from "@/hooks/useModal";

const MODAL_ID = "event-rules-modal";

interface EventRulesModalContentProps {
  onClose: () => void;
}

const EventRulesModalContent: React.FC<EventRulesModalContentProps> = ({ onClose }) => {
  return (
    <div className="w-[318px] rounded-[24px] bg-white px-6 pt-10 pb-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="text-[22px] font-bold leading-[30px] tracking-[-0.23px] text-black font-['Pangram']">
        Event Rules
      </div>
      <div className="mt-6 text-[15px] font-normal leading-[22px] tracking-[-0.23px] text-[rgba(60,60,67,0.72)] font-['Saans_TRIAL']">
        Invite a friend. She gets $20 to start, you get up to $60 as she earns! No limit
      </div>
      <button
        type="button"
        className="mt-8 h-[52px] w-full rounded-full bg-[#4BAAF5] text-[16px] font-medium leading-[21px] tracking-[-0.23px] text-white font-['Saans_TRIAL']"
        onClick={onClose}
      >
        Get
      </button>
    </div>
  );
};

export const showEventRulesModal = (): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(MODAL_ID, <EventRulesModalContent onClose={handleClose} />, {
    variant: "center",
  });
};

```
