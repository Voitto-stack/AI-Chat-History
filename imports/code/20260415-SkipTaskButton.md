---
title: SkipTaskButton
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: SkipTaskButton.tsx
---

# SkipTaskButton

```tsx
import { useNavigate } from "react-router-dom";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import { getTaskStep } from "./taskMode";

interface SkipTaskButtonProps {
  to: string;
  replace?: boolean;
}

export default function SkipTaskButton({ to, replace = false }: SkipTaskButtonProps) {
  const navigate = useNavigate();

  const handleSkip = () => {
    // 根据当前路径确定跳过哪个任务
    const pathname = window.location.pathname;
    if (pathname.includes("/tags")) {
      bpTrack(EventName.pwa_profile_task_interest_tag_skip);
    } else if (pathname.includes("/bio")) {
      bpTrack(EventName.pwa_profile_task_bio_skip);
    } else if (pathname.includes("/profession")) {
      bpTrack(EventName.pwa_profile_task_profession_skip);
    }

    navigate(to, {
      replace,
      state: { taskMode: true },
    });
  };

  return (
    <button
      type="button"
      onClick={handleSkip}
      className="px-1 py-1 text-[12px] font-medium capitalize text-[rgba(1,34,105,0.5)]"
    >
      Skip
    </button>
  );
}

```
