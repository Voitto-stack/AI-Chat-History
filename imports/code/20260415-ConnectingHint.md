---
title: ConnectingHint
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: ConnectingHint.tsx
---

# ConnectingHint

```tsx
import { CustomAvatarType, getAvatarUrl } from "@/utils/userUtil";
import IcAvatarPlaceholder from "@/assets/images/call/ic_avatar_placeholder.webp";
import { FC, useEffect, useState } from "react";
import { useCall } from "@/hooks/useCall";
import { CallType } from "@/types/call";
import mockCallManager from "@/utils/mockCallManager";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

// 通话时薪常量（单位：$/小时）
const AUDIO_CALL_HOURLY_RATE = 30; // 音频通话时薪

interface ConnectingHintProps {
  callType: CallType;
}

export const ConnectingHint: FC<ConnectingHintProps> = ({ callType }) => {
  const { remoteUserInfo, releasePrice } = useCall();
  const [hourlyRate, setHourlyRate] = useState<number>(releasePrice * 60);

  // 计算每小时收益率
  useEffect(() => {
    const calculatePrice = async () => {
      if (callType === CallType.MOCK_CALL) {
        const mockPrice = mockCallManager.connectSession?.price ?? 0;
        setHourlyRate(mockPrice * 60);
      } else {
        setHourlyRate(callType === CallType.AUDIO_CALL ? AUDIO_CALL_HOURLY_RATE : releasePrice * 60);
      }
    };

    calculatePrice();
  }, [callType, releasePrice]);

  // 埋点：连接中提示展示
  useEffect(() => {
    bpTrack(EventName.pwa_video_call_connecting_show, {
      call_type: callType === CallType.AUDIO_CALL ? "audio" : "video",
      remote_user_id: remoteUserInfo?.userId || 0,
    });
  }, [callType, remoteUserInfo?.userId]);

  return (
    <div className="flex flex-col font-[Pangram] will-change-opacity transition-opacity duration-500 ease-out">
      <div className="flex flex-row items-center rounded-[18px] py-1.5 px-3 pl-1.5 bg-black/40 text-white will-change-[transform,opacity]">
        <img
          className="w-6 h-6 shrink-0 rounded-full object-cover"
          src={getAvatarUrl(remoteUserInfo, CustomAvatarType.Min) || IcAvatarPlaceholder}
          alt="avatar"
        />
        <div className="flex flex-row items-baseline text-sm ml-1.5 min-w-0">
          <span className="truncate font-bold" style={{ color: "var(--white_60)" }}>
            {remoteUserInfo?.username ?? "User"}, {remoteUserInfo?.age ?? ""}
          </span>
          <span className="text-[#68eaff] shrink-0 whitespace-pre">
            {` is making a ${callType === CallType.AUDIO_CALL ? "Voice" : "Video"} Call`}
          </span>
        </div>
      </div>
      <div className="w-fit mt-1.5 px-3 py-1.5 rounded-[18px] bg-black/40 text-white font-normal text-sm">
        Earning rate: <span className="text-[#68eaff]">${hourlyRate}/hour</span>
      </div>
    </div>
  );
};

```
