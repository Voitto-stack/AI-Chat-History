---
title: LiveRoomTopPanel
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: LiveRoomTopPanel.tsx
---

# LiveRoomTopPanel

```tsx
import { useEffect, useState, useRef } from "react";
import { useUser } from "@/hooks/useUser";
import IcEarnings from "@/assets/images/call/ic_bag_of_money.webp";
import IcDiamond from "@/assets/images/call/ic_upgrade.webp";
import { getAvatarUrl, CustomAvatarType } from "@/utils/userUtil";
import { NumberRoll } from "@/components/NumberRoll";
import { useCash } from "@/hooks/useCash";
import { LottieRefCurrentProps } from "lottie-react";
import { getCurrentTime } from "@/utils/timeFormat";
import { useCall } from "@/hooks/useCall";

/**
 * LiveRoomTopPanel - 通话页面顶部面板
 */

interface LiveRoomTopPanelProps {
  onClickClose: () => void;
  isAlwaysShow?: boolean;
}

const LiveRoomTopPanel = ({ onClickClose, isAlwaysShow = true }: LiveRoomTopPanelProps) => {
  const [visible, setVisible] = useState(isAlwaysShow);
  const { userInfo } = useUser();
  const { cash, refresh } = useCash();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { noFaceVisible } = useCall();
  const isPaused = noFaceVisible;

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    // 每分钟更新一次时间
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
      refresh();
    }, 60000);

    return () => clearInterval(timer);
  }, [refresh]);

  useEffect(() => {
    setVisible(isAlwaysShow);
  }, [isAlwaysShow]);

  // 用于防止lottie刚开始就直接播放
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.pause();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
    }
  }, [cash, visible]);

  return visible ? (
    <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
      {/* 渐变背景 */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />

      {/* 内容区域 */}
      <div className="relative px-3 pt-[var(--sat,0px)]">
        {/* 时间 */}
        <div className="flex items-center h-11 px-4">
          <span className="text-white text-xs font-normal tracking-tight">{currentTime} GraceChat</span>
        </div>

        {/* 用户信息卡片和关闭按钮 - 同一行 */}
        <div className="flex items-center justify-between px-1">
          {/* Lottie 动画 - 覆盖在卡片上方 */}
          {/* <Lottie
            lottieRef={lottieRef}
            animationData={infobot}
            loop={false}
            autoPlay={false}
            className="absolute left-3 h-[46px] z-20 pointer-events-none"
            style={{
              width: "160px",
            }}
          /> */}

          {/* 用户信息卡片 - 根据 Figma 设计 */}
          <div className="flex items-center">
            <div
              className="relative flex items-start gap-0 rounded-[22.5px] overflow-hidden"
              style={{
                width: "160px",
                height: "46px",
                background: "linear-gradient(270deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)",
              }}
            >
              {/* 头像 - 位置 (3, 3) */}
              <img
                src={getAvatarUrl(userInfo, CustomAvatarType.Min)}
                alt="avatar"
                className="absolute rounded-full object-cover"
                style={{
                  left: "3px",
                  top: "3px",
                  width: "40px",
                  height: "40px",
                }}
              />

              {/* 收益信息 - 位置 (46, 3) */}
              <div
                className="absolute flex flex-col"
                style={{
                  left: "46px",
                  top: "3px",
                  width: "71px",
                  gap: "3px",
                }}
              >
                {/* 第一行: Earnings 标签 */}
                <div className="flex items-center gap-0.5">
                  <img src={IcEarnings} alt="" className="w-3.5 h-3.5" />
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: "10px",
                      lineHeight: "1.193359375em",
                      color: "rgba(255, 255, 255, 0.8)",
                      fontFamily: "Pangram, -apple-system, system-ui, sans-serif",
                    }}
                  >
                    Earnings
                  </span>
                </div>

                {/* 第二行: 金额和钻石图标 / PAUSED 状态 */}
                {isPaused ? (
                  <div className="flex items-center gap-1">
                    <span
                      className="font-bold"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.26em",
                        color: "#ff3b30",
                        fontFamily: "'RacingSansOne', sans-serif",
                      }}
                    >
                      PAUSED
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <NumberRoll
                      value={cash}
                      prefix="$"
                      suffix=""
                      className="font-normal"
                      style={{
                        fontSize: "18px",
                        lineHeight: "1.26em",
                        color: "#FFFFFF",
                        fontFamily: "'RacingSansOne', sans-serif",
                      }}
                    />
                    <img src={IcDiamond} alt="" className="w-2.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 关闭按钮 - 与卡片同一行 */}
          <button
            onClick={onClickClose}
            className="w-11 h-11 flex items-center justify-center pointer-events-auto"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LiveRoomTopPanel;

```
