---
title: SuccessCard
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: SuccessCard.tsx
---

# SuccessCard

```tsx
import Button from "@/components/Button";
import { useEffect } from "react";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface SuccessCardProps {
  open: boolean;
  onFinish: () => void;
}

export default function SuccessCard({ open, onFinish }: SuccessCardProps) {
  // 埋点：验证成功结果页展示
  useEffect(() => {
    if (open) {
      bpTrack(EventName.pwa_scan_face_result_page_show);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end bg-black/40">
      <div className="w-full rounded-t-3xl bg-white px-6 pt-8 pb-10 flex flex-col items-center animate-[slideUp_300ms_ease-out]">
        <svg
          className="w-16 h-16 rounded-full bg-[#34C759] p-4 text-white mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>

        <h2 className="text-2xl font-bold text-brand-dark mb-2">Verified!</h2>
        <p className="text-[15px] text-[rgba(1,34,105,0.6)] mb-8">You can now cash out to PayPal</p>

        <Button onClick={onFinish} variant="primary">
          Continue
        </Button>
      </div>
    </div>
  );
}

```
