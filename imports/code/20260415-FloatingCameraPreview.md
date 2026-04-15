---
title: FloatingCameraPreview
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: FloatingCameraPreview.tsx
---

# FloatingCameraPreview

```tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCameraStream } from "@/hooks/useCameraStream";
import { useLive, LiveState } from "@/hooks/useLive";

/** 不显示浮窗的页面 */
const CALL_ROUTES = ["/mock-call", "/video-call", "/audio-call"];

const MARGIN = 6;
const CONTENT_WIDTH = 88;
const CONTENT_HEIGHT = 130;
const HANDLE_WIDTH = 18;
const AUTO_COLLAPSE_DELAY = 5000;

export default function FloatingCameraPreview() {
  const { isFloatingVisible, setFloatingVisible, liveState } = useLive();
  const navigate = useNavigate();
  const location = useLocation();
  const isInCallPage = CALL_ROUTES.includes(location.pathname);
  const { videoRef, startCamera, stopCamera } = useCameraStream();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [docked, setDocked] = useState<"left" | "right">("right");

  const initialPosRef = useRef({ x: 0, y: 0 });
  const initialTouchRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // 启动/停止摄像头
  useEffect(() => {
    if (isFloatingVisible) {
      startCamera();
      return () => stopCamera();
    }
  }, [isFloatingVisible, startCamera, stopCamera]);

  // 初始化位置（右上角）
  useEffect(() => {
    if (isFloatingVisible) {
      setPosition({
        x: window.innerWidth - (CONTENT_WIDTH + MARGIN),
        y: MARGIN,
      });
      setDocked("right");
      setCollapsed(false);
    }
  }, [isFloatingVisible]);

  // 自动折叠计时器
  useEffect(() => {
    if (!isFloatingVisible || collapsed || isDragging) return;

    const timer = window.setTimeout(() => {
      setCollapsed(true);
      setPosition((prev) => ({
        x: docked === "right" ? window.innerWidth - HANDLE_WIDTH : -(CONTENT_WIDTH - HANDLE_WIDTH),
        y: prev.y,
      }));
    }, AUTO_COLLAPSE_DELAY);

    return () => clearTimeout(timer);
  }, [isFloatingVisible, collapsed, isDragging, docked]);

  if (!isFloatingVisible || liveState !== LiveState.Action || isInCallPage) return null;

  const handleClick = () => {
    if (hasDraggedRef.current) return;
    setFloatingVisible(false);
    navigate("/live");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    initialPosRef.current = { x: position.x, y: position.y };
    initialTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (collapsed) setCollapsed(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    hasDraggedRef.current = true;

    const deltaX = e.touches[0].clientX - initialTouchRef.current.x;
    const deltaY = e.touches[0].clientY - initialTouchRef.current.y;

    let newX = initialPosRef.current.x + deltaX;
    let newY = initialPosRef.current.y + deltaY;

    // 边界约束
    newX = Math.max(0, Math.min(newX, window.innerWidth - CONTENT_WIDTH));
    newY = Math.max(0, Math.min(newY, window.innerHeight - CONTENT_HEIGHT));

    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // 吸附到最近边缘
    const rightGap = window.innerWidth - (position.x + CONTENT_WIDTH);
    const leftGap = position.x;
    const newDock = leftGap <= rightGap ? "left" : "right";
    setDocked(newDock);

    const snappedX = newDock === "left" ? MARGIN : window.innerWidth - (CONTENT_WIDTH + MARGIN);
    setPosition((prev) => ({ x: snappedX, y: prev.y }));
  };

  const handleExpand = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const x = docked === "left" ? MARGIN : window.innerWidth - (CONTENT_WIDTH + MARGIN);
    setTimeout(() => {
      setCollapsed(false);
      setPosition((prev) => ({ x, y: prev.y }));
    }, 10);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[1000] w-max h-max overflow-hidden touch-none [contain:layout_paint] [will-change:transform] shadow-[0_4px_12px_rgba(0,0,0,0.2)] ${collapsed ? "rounded-lg" : "rounded-[14px]"} ${isDragging ? "opacity-90 transition-none" : "transition-transform duration-[120ms] ease-out"}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`w-[88px] ${collapsed ? "h-[78px] max-w-[88px] overflow-hidden pointer-events-none scale-[1.02] blur-[6px]" : "h-[130px]"}`}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          disablePictureInPicture
          className="w-full h-full object-cover -scale-x-100"
          muted
        />
      </div>
      {collapsed && (
        <div
          className={`absolute top-0 z-[11] w-[18px] h-[78px] bg-black/35 before:block before:absolute before:top-[calc((100%-22px)/2)] before:left-[calc((100%-4px)/2)] before:w-1 before:h-[22px] before:rounded-full before:bg-white before:content-[''] ${docked === "right" ? "left-0" : "right-0"}`}
          onClick={handleExpand}
          onTouchStart={handleExpand}
        />
      )}
    </div>
  );
}

```
