---
title: LiveAction
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: LiveAction.tsx
---

# LiveAction

```tsx
import LiveRoomTopPanel from "@/components/LiveRoomTopPanel";
import { useLive } from "@/hooks/useLive";

const LiveAction = () => {
  const { requestExit } = useLive();

  return (
    <div className="absolute inset-0 z-[2]">
      <LiveRoomTopPanel onClickClose={requestExit} isAlwaysShow />
    </div>
  );
};

export default LiveAction;

```
