---
title: CallUserInfoView
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CallUserInfoView.tsx
---

# CallUserInfoView

```tsx
import { FC } from "react";

interface CallUserInfoViewProps {
  avatar: string;
  username?: string;
  age?: number;
  isConnecting: boolean;
}

export const CallUserInfoView: FC<CallUserInfoViewProps> = ({ avatar, username, age, isConnecting }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        className="w-full h-full object-cover blur-[16px] brightness-[0.7] scale-[1.2]"
        src={avatar}
        alt="background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img className="w-28 h-28 rounded-full object-cover" src={avatar} alt={username} />
        <div className="text-white text-[15px] text-center mt-4">
          {username}, {age}
        </div>
        {isConnecting && <div className="text-white/60 text-[15px] text-center mt-1">Connecting...</div>}
      </div>
    </div>
  );
};

```
