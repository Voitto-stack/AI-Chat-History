---
title: ModalContainer
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: ModalContainer.tsx
---

# ModalContainer

```tsx
import { ReactNode, MouseEvent, useRef, useState, useCallback, useEffect, TouchEvent, KeyboardEvent } from "react";

interface ModalContainerProps {
  open: boolean;
  onClose: () => void;
  variant?: "fullscreen" | "bottom-sheet" | "center";
  children: ReactNode;
}

const SWIPE_THRESHOLD = 100;

export default function ModalContainer({ open, onClose, variant = "center", children }: ModalContainerProps) {
  const [closing, setClosing] = useState(false);
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
  }, []);

  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleCloseEnd = useCallback(() => {
    if (closing) {
      setClosing(false);
      setDragY(0);
      onClose();
    }
  }, [closing, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (dragY > SWIPE_THRESHOLD) {
      handleClose();
    }
    setDragY(0);
  }, [dragY, handleClose]);

  // 打开时自动聚焦弹窗容器，支持 Escape 关闭
  useEffect(() => {
    if (!open && !closing) return;
    dialogRef.current?.focus();
  }, [open, closing]);

  if (!open && !closing) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[1000] outline-none"
    >
      {variant === "fullscreen" && children}

      {variant === "center" && (
        <div
          className="flex items-center justify-center w-full h-full bg-black/50"
          onClick={handleBackdropClick}
          style={{
            animation: closing ? undefined : "fade-in 300ms ease-out",
            opacity: closing ? 0 : 1,
            transition: "opacity 250ms ease",
          }}
        >
          <div
            onAnimationEnd={handleCloseEnd}
            style={{
              animation: closing ? "scale-down 250ms ease forwards" : "scale-up 0.3s ease-out",
            }}
          >
            {children}
          </div>
        </div>
      )}

      {variant === "bottom-sheet" && (
        <div
          className="flex items-end w-full h-full bg-black/40"
          onClick={handleBackdropClick}
          style={{
            animation: closing ? undefined : "fade-in 300ms ease-out",
            opacity: closing ? 0 : 1,
            transition: "opacity 250ms ease",
          }}
        >
          <div
            className="w-full"
            onAnimationEnd={handleCloseEnd}
            style={{
              animation: closing ? "slide-down-out 250ms ease-in forwards" : "slide-up 300ms ease-out",
              transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
              transition: dragY > 0 ? "none" : undefined,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

```
