---
title: MissCallBar
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: MissCallBar.tsx
---

# MissCallBar

```tsx
/**
 * MissCallBar - 聊天页面未接来电提示条
 * 显示未接来电数量和前 3 个用户头像
 */

import { FC, useEffect } from "react";
import { useMissCall } from "@/hooks/useMissCall";
import { getAvatarUrl, DEFAULT_AVATAR } from "@/utils/userUtil";

/** 最多显示的头像数量 */
const MAX_AVATARS = 3;

interface MissCallBarProps {
  /** 点击 View 的回调 */
  onView: () => void;
}

export const MissCallBar: FC<MissCallBarProps> = ({ onView }) => {
  const { userTotal, userInfos, updateMissCall } = useMissCall();

  useEffect(() => {
    void updateMissCall();
  }, [updateMissCall]);

  if (userTotal <= 0) return null;

  const displayAvatars = userInfos.slice(0, MAX_AVATARS);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between rounded-3xl bg-[#d9ecfa] px-2.5 py-2.5">
        {/* 左侧头像堆叠 */}
        <div className="flex items-center">
          {displayAvatars.map((user, index) => (
            <img
              key={user.userId}
              src={getAvatarUrl(user)}
              alt=""
              className="h-[26px] w-[26px] rounded-full border-2 border-[#d9ecfa] object-cover"
              style={{ marginLeft: index === 0 ? 0 : -10 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
            />
          ))}
        </div>

        {/* 中间文案 */}
        <span className="ml-1.5 flex-1 text-[15px] font-semibold leading-5 tracking-[-0.23px] text-[#1b1c1e]">
          {userTotal} missed calls
        </span>

        {/* 右侧 View 按钮 */}
        <button
          onClick={onView}
          className="rounded-[28px] bg-brand px-[11px] py-1.5 text-sm font-medium leading-4 tracking-[-0.23px] text-white active:opacity-90"
        >
          view
        </button>
      </div>
    </div>
  );
};

```
