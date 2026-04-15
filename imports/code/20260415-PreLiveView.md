---
title: PreLiveView
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: PreLiveView.tsx
---

# PreLiveView

```tsx
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EarningsCard from "./EarningsCard";
import Countdown from "./Countdown";
import icLiveProfileEdge from "@/assets/images/live/ic_live_profile_edge.webp";
import { useLive, LiveState } from "@/hooks/useLive";
import { changeDispatchStatus } from "@/http/liveApi";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { useCashout } from "@/hooks/useCashout";
import { CashoutStage } from "@/types/cashout";
import mockCallManager from "@/utils/mockCallManager";
import { MockCallType } from "@/types/call";
import { isApp } from "@/utils/bridge";
import { checkCameraPermission, checkMicrophonePermission } from "@/utils/permissions";
import CommonUpTip from "@/components/CommonUpTip";
import { showApkDownloadModal } from "@/components/showApkDownloadModal";

const PreLiveView = () => {
  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = useState(false);
  const { changeLiveState } = useLive();
  const { willCashoutStage } = useCashout();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | undefined>(undefined);
  const [localPermissionDenied, setLocalPermissionDenied] = useState(false);

  const handleClickEarning = () => {
    navigate("/earnings");
  };

  useEffect(() => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, []);

  useLayoutEffect(() => {
    const task = setTimeout(() => {
      if (buttonRef.current) {
        setButtonRect(buttonRef.current.getBoundingClientRect());
      }
    }, 1000);
    return () => clearTimeout(task);
  }, []);

  const requestPermissions = useCallback(async () => {
    const [camera, microphone] = await Promise.all([checkCameraPermission(), checkMicrophonePermission()]);
    if (camera === "denied" || microphone === "denied") {
      setLocalPermissionDenied(true);
      return false;
    }
    return true;
  }, []);

  const handleGoLive = useCallback(async () => {
    if (isApp()) {
      setShowCountdown(true);
      return;
    }

    if (localPermissionDenied) {
      showApkDownloadModal();
    } else {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        setShowCountdown(true);
      } else {
        showApkDownloadModal();
      }
    }
  }, [localPermissionDenied, requestPermissions]);

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    changeLiveState(LiveState.Action);
    localStorage.setItem(STORAGE_KEYS.LIVE_START_UTC_TIME, Date.now().toString());
    changeDispatchStatus(true).catch(() => {});

    // 二阶段：Go Live 后立即触发 mock 视频
    if (willCashoutStage === CashoutStage.StageTwo) {
      const count = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
      const stagePrice = count === 0 ? 1.5 : 0.6;
      mockCallManager.startMockCall(MockCallType.Normal, stagePrice);
    }
  };

  return (
    <div className="absolute inset-0 z-[2]">
      <EarningsCard onClick={handleClickEarning} />

      {/* 人脸框 */}
      <img
        src={icLiveProfileEdge}
        className="absolute top-[178px] left-1/2 z-[2] h-[370px] w-[370px] -translate-x-1/2"
        alt=""
      />

      {/* 提示气泡 */}
      {(!localPermissionDenied || isApp()) && (
        <CommonUpTip targetRect={buttonRect} content="Estimated 1-5 minutes to receive a call" marginTop={8.5} />
      )}

      {/* Go LIVE / Install APP 按钮 */}
      <button
        ref={buttonRef}
        className="absolute bottom-[34px] left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center justify-center rounded-[28px] px-4 py-[15.5px]"
        style={{
          width: "calc(100% - 48px)",
          background: "linear-gradient(90deg, #2888FF 0%, #2888FF 100%)",
        }}
        onClick={handleGoLive}
      >
        {!localPermissionDenied || isApp() ? (
          <>
            <span
              className="text-[16px] font-bold leading-[19.09px] text-white"
              style={{ fontFamily: "SF Pro Display, -apple-system, system-ui, sans-serif" }}
            >
              Go LIVE
            </span>
            <span
              className="text-[10px] font-normal text-white"
              style={{ fontFamily: "SF Pro Display, -apple-system, system-ui, sans-serif" }}
            >
              $40/hour guaranteed
            </span>
          </>
        ) : (
          <span
            className="text-[16px] font-bold leading-[19.09px] text-white"
            style={{ fontFamily: "SF Pro Display, -apple-system, system-ui, sans-serif" }}
          >
            Install APP
          </span>
        )}
      </button>

      {/* 倒计时 */}
      {showCountdown && <Countdown initialCount={3} onFinish={handleCountdownFinish} isFullScreen={false} />}
    </div>
  );
};

export default PreLiveView;

```
