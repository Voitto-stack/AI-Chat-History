---
title: LiveExitPopup
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: LiveExitPopup.tsx
---

# LiveExitPopup

```tsx
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface LiveExitPopupProps {
  onEndLive: () => void;
  onKeepEarning: () => void;
}

const LiveExitPopup = ({ onEndLive, onKeepEarning }: LiveExitPopupProps) => {
  const handleEndLive = () => {
    // 埋点：停止 Live 点击
    bpTrack(EventName.pwa_conv_live_stop_click);
    onEndLive();
  };

  const handleKeepEarning = () => {
    // 埋点：取消停止 Live
    bpTrack(EventName.pwa_conv_live_stop_cancel);
    onKeepEarning();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#000000e6]">
      {/* 标题区 */}
      <div className="flex flex-1 items-center justify-center">
        <span className="mx-[50px] text-center text-[17px] font-normal text-white">
          Are you sure you want to end your live video?
        </span>
      </div>

      {/* 按钮区 */}
      <div className="flex flex-row items-center justify-center gap-[13px] mb-[43px]">
        <button
          className="rounded-[15px] bg-white/20 px-[43px] py-[13px] text-[15px] font-bold text-white"
          onClick={handleEndLive}
        >
          End Live
        </button>
        <button
          className="rounded-[15px] bg-white px-[25px] py-[13px] text-[15px] font-bold"
          style={{ color: "#159cd7" }}
          onClick={handleKeepEarning}
        >
          Keep Earning
        </button>
      </div>
    </div>
  );
};

export default LiveExitPopup;

```
