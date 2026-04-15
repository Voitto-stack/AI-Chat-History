---
title: PreLiveView
date: 2026-04-15T17:05:31+08:00
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
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const PreLiveView = () => {
  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = useState(false);
  const { changeLiveState } = useLive();
  const { willCashoutStage } = useCashout();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | undefined>(undefined);
  const [localPermissionDenied, setLocalPermissionDenied] = useState(false);

  // 埋点：进入 GoLive 页面
  useEffect(() => {
    bpTrack(EventName.pwa_golive_enter, {
      is_app: isApp(),
      cashout_stage: willCashoutStage,
    });
  }, [willCashoutStage]);

  const handleClickEarning = () => {
    // 埋点：Live 收益点击
    bpTrack(EventName.pwa_live_earning_click, { tabId: "earnings" });
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
    // 埋点：开始 Live 点击
    bpTrack(EventName.pwa_conv_live_start_click, {
      is_app: isApp(),
      permission_denied: localPermissionDenied,
    });

    if (isApp()) {
      setShowCountdown(true);
      return;
    }

    if (localPermissionDenied) {
      // 埋点：下载 APK 点击（权限被拒）
      bpTrack(EventName.pwa_golive_download_apk_click, {
        trigger_reason: "permission_denied",
      });
      showApkDownloadModal("live_page");
    } else {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        setShowCountdown(true);
      } else {
        // 埋点：下载 APK 点击（权限检查失败）
        bpTrack(EventName.pwa_golive_download_apk_click, {
          trigger_reason: "permission_check_failed",
        });
        showApkDownloadModal("live_page");
      }
    }
  }, [localPermissionDenied, requestPermissions]);

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    changeLiveState(LiveState.Action);
    localStorage.setItem(STORAGE_KEYS.LIVE_START_UTC_TIME, Date.now().toString());
    changeDispatchStatus(true).catch(() => {});

    // 埋点：Live 开始
    bpTrack(EventName.pwa_live_start, { platform: "web" });

    // 二阶段：Go Live 后立即触发 mock 视频（任务完成后不再触发）
    if (willCashoutStage === CashoutStage.StageTwo) {
      if (localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_CALL_TASK_COMPLETED) !== "true") {
        const count = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
        const stagePrice = count === 0 ? 1.5 : 0.6;
        // 埋点：GoLive Mock 触发
        bpTrack(EventName.pwa_golive_mock_trigger, {
          cashout_stage: willCashoutStage,
          mock_count: count,
          stage_price: stagePrice,
          isShowGuide: count === 0,
        });
        mockCallManager.startMockCall(MockCallType.Normal, stagePrice);
      }
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
              style={{ fontFamily: "Pangram, -apple-system, system-ui, sans-serif" }}
            >
              Go LIVE
            </span>
            <span
              className="text-[10px] font-normal text-white"
              style={{ fontFamily: "Pangram, -apple-system, system-ui, sans-serif" }}
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
