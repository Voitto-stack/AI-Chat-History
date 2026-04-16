---
title: MissedCallsModalStack
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: MissedCallsModalStack.tsx
---

# MissedCallsModalStack

```tsx
/**
 * MissedCallsModalStack - 堆栈式未接来电卡片
 * 支持左右滑动划走卡片，类似 Tinder 交互
 *
 * 交互流程：
 * 1. 显示当前第一张卡片，下方叠放骨架屏卡片
 * 2. 用户左/右滑动超过阈值 → 当前卡片飞出 → 从队列移除该用户 → 刷新数据 → 显示下一张
 * 3. 用户点击 "Call back" → 发起回拨 → 同样移除并刷新
 * 4. 所有卡片处理完毕 → 自动关闭弹窗
 */

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { removeQueueUser } from "@/http/api";
import { bpTrack } from "@/tracking/api/byteplus";
import { EventName } from "@/tracking/events";
import { useMissCall } from "@/hooks/useMissCall";
import { MissedCallsModal } from "./MissedCallsModal";

/** 滑动触发阈值（像素），超过此距离判定为有效滑动 */
const SWIPE_THRESHOLD = 50;
/** 卡片飞出后，等待骨架屏动画完成再替换为真实数据的延迟（ms） */
const REFRESH_DELAY = 600;

interface MissedCallsModalStackProps {
  /** 初始未接来电列表 */
  missedCalls: UserInfo[];
  /** 未接来电总数（可能大于 missedCalls.length，因为后端分页） */
  totalCount?: number;
  /** 回拨成功回调 */
  onCallBack?: (user: UserInfo, index: number) => void;
  /** 关闭弹窗回调 */
  onClose?: () => void;
}

/**
 * SkeletonCard - 骨架屏卡片
 * 在当前卡片下方展示，模拟"下一张"的加载状态
 * 尺寸与 MissedCallsModal 一致：330x530
 */
const SkeletonCard: FC = () => (
  <div className="flex flex-col w-[330px] h-[530px] rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden px-3 pt-3.5 pb-[68px]">
    {/* 标题 */}
    <div className="shrink-0 mb-4 pt-[11px] text-center">
      <h2 className="m-0 text-[21px] font-bold leading-[22px] text-black">Missed calls</h2>
    </div>
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      {/* 卡片容器骨架 */}
      <div className="flex flex-1 flex-col min-h-0 mb-4 rounded-xl bg-[#eee] overflow-hidden">
        {/* 头像区域骨架 */}
        <div className="flex shrink-0 items-center gap-2.5 p-3 bg-[#f5f5f5]">
          <div className="relative w-[37px] h-[37px] shrink-0">
            <div className="w-full h-full rounded-full missed-skeleton-shimmer" />
            <div className="absolute right-0 bottom-0 z-[2] w-2 h-2 rounded-full bg-[#34c759] border border-white" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="h-3 w-[40%] rounded-md missed-skeleton-shimmer" />
            <div className="h-3 w-[60%] rounded-md missed-skeleton-shimmer" />
          </div>
        </div>
        {/* 聊天区域骨架 */}
        <div className="flex-1 flex flex-col gap-2 p-3">
          <div className="h-3 w-[85%] rounded-md missed-skeleton-shimmer" />
          <div className="h-3 w-[60%] rounded-md missed-skeleton-shimmer" />
          <div className="h-3 w-[40%] rounded-md missed-skeleton-shimmer" />
        </div>
      </div>
      {/* 按钮骨架 */}
      <div className="shrink-0 w-full h-12 rounded-3xl missed-skeleton-shimmer" />
    </div>
    {/* 底部警告 */}
    <div className="absolute bottom-0 left-0 w-full px-[22px] py-[15px] bg-[#f0f9ff] text-[12px] leading-4 text-center text-[#3c3c4399] rounded-b-[20px]">
      Warning: Auto-reply is hidden. Contacts won't know calls are declined.
    </div>
  </div>
);

export const MissedCallsModalStack: FC<MissedCallsModalStackProps> = ({
  missedCalls,
  totalCount,
  onCallBack,
  onClose,
}) => {
  const { updateMissCall } = useMissCall();

  // ---- 状态 ----
  const [callList, setCallList] = useState<UserInfo[]>(missedCalls);
  const [total, setTotal] = useState<number>(totalCount ?? missedCalls.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right">("left");
  const [isLeaving, setIsLeaving] = useState(false);

  // ---- Refs ----
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // props 变化时同步更新本地状态
  useEffect(() => {
    setCallList(missedCalls);
    setTotal(totalCount ?? missedCalls.length);
  }, [missedCalls, totalCount]);

  /**
   * 从服务端刷新未接来电列表
   * 延迟 REFRESH_DELAY 后更新数据，留出骨架屏过渡动画时间
   */
  const refreshMissedCalls = useCallback(async () => {
    try {
      const result = await updateMissCall();
      timerRef.current = setTimeout(() => {
        setCallList(result.userInfos);
        setTotal(result.userTotal);
        if (result.userTotal === 0) {
          onClose?.();
          return;
        }
        setIsLeaving(false);
        setIsTransitioning(false);
      }, REFRESH_DELAY);
    } catch (error) {
      console.error("[MissedCallsModalStack] refresh failed:", error);
      setIsLeaving(false);
      setIsTransitioning(false);
    }
  }, [onClose, updateMissCall]);

  /**
   * 从回拨队列中移除用户，然后刷新列表
   * @param userId 要移除的用户 ID
   */
  const removeUserAndRefresh = useCallback(
    async (userId?: number) => {
      try {
        if (userId) {
          bpTrack(EventName.pwa_fake_call_back_popup_dislike_click, { maleUserId: userId });
          await removeQueueUser(userId);
        }
      } catch (error) {
        console.error("[MissedCallsModalStack] remove user failed:", error);
      }
      await refreshMissedCalls();
    },
    [refreshMissedCalls],
  );

  // ---- 手势处理 ----

  /** 获取事件的 X 坐标（兼容 Touch / Mouse） */
  const getClientX = (e: React.TouchEvent | React.MouseEvent): number => {
    if ("touches" in e) return e.touches[0].clientX;
    return e.clientX;
  };

  /** 手势开始 */
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isTransitioning) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = getClientX(e);
    currentXRef.current = startXRef.current;
    setDragOffset(0);
  };

  /** 手势移动：实时更新偏移量 */
  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current || isTransitioning || callList.length === 0) return;
    currentXRef.current = getClientX(e);
    setDragOffset(currentXRef.current - startXRef.current);
  };

  /** 手势结束：判断飞出或回弹 */
  const handleEnd = () => {
    if (!isDraggingRef.current || isTransitioning || callList.length === 0) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const deltaX = currentXRef.current - startXRef.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      setSwipeDirection(deltaX > 0 ? "right" : "left");
      goToNext();
    } else {
      setDragOffset(0);
    }
  };

  /** 触发当前卡片飞出动画 */
  const goToNext = () => {
    if (callList.length === 0 || isTransitioning) return;
    const currentUser = callList[0];
    if (!currentUser) return;

    setIsLeaving(true);
    setIsTransitioning(true);
    setDragOffset(0);
    void removeUserAndRefresh(currentUser.userId);
  };

  if (callList.length === 0) return null;

  const currentUser = callList[0];
  const showSkeleton = callList.length > 1 || total > callList.length || total > 1;

  // 飞出动画 class
  const leavingClass = isLeaving
    ? swipeDirection === "left"
      ? "animate-missed-leave-left"
      : "animate-missed-leave-right"
    : "";
  // 进入动画 class
  const enteringClass = isTransitioning && !isLeaving ? "animate-missed-card-enter" : "";

  // 当前卡片的样式（统一用 style 控制 transform，避免与 Tailwind class 冲突）
  // isLeaving 时不设置 transform，让 CSS 飞出动画类完全接管
  const currentCardStyle: React.CSSProperties = isDragging
    ? {
        transform: `translateX(calc(-50% + ${dragOffset}px)) scale(${1 - Math.abs(dragOffset) / 1000})`,
        opacity: 1 - Math.abs(dragOffset) / 300,
        transition: "none",
      }
    : isLeaving
      ? {} // CSS 动画类接管
      : {
          transform: "translateX(-50%)",
          transition: !isTransitioning
            ? "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease-out"
            : "none",
        };

  return (
    // 全屏遮罩
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
      {/* 手势容器 - touch-action: none 禁止浏览器默认手势 */}
      <div
        className="relative flex items-start justify-center w-[500px] max-w-[95vw] min-h-[530px] overflow-visible"
        style={{ touchAction: "none" }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {/* 骨架屏卡片 - z-index: 1，缩小 0.95 在下方露出边缘 */}
        {showSkeleton && (
          <div
            className={`absolute left-1/2 pointer-events-none ${
              isTransitioning && !isLeaving ? "animate-missed-skeleton-enter" : ""
            }`}
            style={{
              zIndex: 1,
              top: 25,
              transform: "translateX(-50%) scale(0.95)",
            }}
          >
            <SkeletonCard />
          </div>
        )}

        {/* 当前卡片 - z-index: 10 */}
        {currentUser && (
          <div
            key={currentUser.userId}
            className={`absolute top-0 left-1/2 will-change-[transform,opacity] ${leavingClass} ${enteringClass}`}
            style={{ zIndex: 10, ...currentCardStyle }}
          >
            <MissedCallsModal
              missedCall={currentUser}
              onCallBack={() => {
                void removeUserAndRefresh(currentUser.userId);
                onCallBack?.(currentUser, 0);
              }}
              onClose={onClose}
            />
          </div>
        )}
      </div>

      {/* 分页指示器 */}
      {total > 1 && (
        <div className="mt-3.5 z-10">
          <span className="min-w-[40px] px-2.5 py-1 rounded-xl bg-white/20 text-white text-xs">1/{total}</span>
        </div>
      )}
    </div>
  );
};

```
