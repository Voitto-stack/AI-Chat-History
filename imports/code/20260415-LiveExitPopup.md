---
title: LiveExitPopup
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: LiveExitPopup.tsx
---

# LiveExitPopup

```tsx
interface LiveExitPopupProps {
  onEndLive: () => void;
  onKeepEarning: () => void;
}

const LiveExitPopup = ({ onEndLive, onKeepEarning }: LiveExitPopupProps) => {
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
          onClick={onEndLive}
        >
          End Live
        </button>
        <button
          className="rounded-[15px] bg-white px-[25px] py-[13px] text-[15px] font-bold"
          style={{ color: "#159cd7" }}
          onClick={onKeepEarning}
        >
          Keep Earning
        </button>
      </div>
    </div>
  );
};

export default LiveExitPopup;

```
