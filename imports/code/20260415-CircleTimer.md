---
title: CircleTimer
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: CircleTimer.tsx
---

# CircleTimer

```tsx
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { CallState } from "@/types/call";
import { useCallStore } from "@/stores/callStore";
import { useUserStore } from "@/stores/userStore";
import { queryUserBalance } from "@/http/api";
import circleTimerAnim from "@/assets/animation/circle-timer.json";
import bgCircleTimerFill from "@/assets/images/live/bg_circle_timer_fill.svg";
import bgCircleTimerCircle from "@/assets/images/live/bg_circle_timer_circle.svg";

export const CircleTimer = () => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const [moneyTextAnimateStep, setMoneyTextAnimateStep] = useState("");
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const callState = useCallStore((s) => s.callState);
  const durationRef = useRef(35_000);

  useEffect(() => {
    if (callState !== CallState.Connected) {
      setProgress(0);
      progressRef.current = 0;
      return;
    }

    if (lottieRef.current) {
      lottieRef.current.stop();
    }

    durationRef.current = 35_000;
    progressRef.current = 0;
    setProgress(0);
    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const _progress = Math.min((elapsed / durationRef.current) * 100, 100);
      if (_progress - progressRef.current >= 1 || _progress >= 100 || progressRef.current === 0) {
        setProgress(_progress);
        progressRef.current = _progress;
      }
      if (elapsed < durationRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        if (durationRef.current === 35_000) {
          durationRef.current = 60_000;
        }
        setProgress(0);
        progressRef.current = 0;
        startTimeRef.current = Date.now();
        setMoneyTextAnimateStep("animate-slide-out-bck-center");
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [callState]);

  const handleSlideOutEnd = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
      setTimeout(async () => {
        try {
          const response = await queryUserBalance();
          const cash = parseFloat(response.balance || "0");
          useUserStore.getState().setCash(cash);
        } catch {
          // ignore
        }
      }, 500);

      setTimeout(() => {
        setMoneyTextAnimateStep("animate-tracking-in-expand");
      }, 2500);
    }
  };

  const handleTrackingInEnd = () => {
    setMoneyTextAnimateStep("");
  };

  return (
    <>
      {callState === CallState.Connected && (
        <div className="flex z-10 absolute top-[126px] left-3 flex-col items-center w-[42px] h-[42px]">
          <div className="flex relative items-center justify-center w-[42px] h-[42px]">
            <img className="absolute shrink-0 w-9 h-9" src={bgCircleTimerFill} />
            <img className="absolute shrink-0 w-10 h-10" src={bgCircleTimerCircle} />
            <svg className="absolute -rotate-90" width="42" height="42" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="circle-gradient" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#FFF828" />
                  <stop offset="100%" stopColor="#6AFF30" />
                </linearGradient>
              </defs>
              <circle
                className="fill-none [stroke-width:5] [stroke-linecap:round] transition-[stroke-dashoffset] duration-100 ease-linear"
                cx="50"
                cy="50"
                r="45"
                stroke="url(#circle-gradient)"
                strokeDasharray="283"
                strokeDashoffset={(283 * (1 - progress / 100)).toFixed(2)}
              />
            </svg>

            <div
              className={`absolute bg-gradient-to-b from-[#6aff30] to-[#68ff30] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-normal text-[15px] leading-[18px] font-[RacingSansOne] ${moneyTextAnimateStep}`}
              onAnimationEnd={(e) => {
                if (e.animationName === "slide-out-bck-center") {
                  handleSlideOutEnd();
                } else if (e.animationName === "tracking-in-expand-fwd") {
                  handleTrackingInEnd();
                }
              }}
            >
              $1
            </div>

            <Lottie
              lottieRef={lottieRef}
              animationData={circleTimerAnim}
              loop={false}
              autoPlay={false}
              className="absolute -top-[66px] -left-[7px] w-[102px] h-[102px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

```
