---
title: useSafeArea
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useSafeArea.ts
---

# useSafeArea

```ts
import { useEffect, useState } from "react";
import { isApp, getSafeAreaInsets } from "@/utils/bridge";

export interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** Android 默认状态栏高度（dp），覆盖绝大多数设备 */
const ANDROID_STATUS_BAR_DEFAULT = 24;

/**
 * 同步安全区域值到 CSS 变量
 * body padding 依赖这些变量，更新后立即生效
 */
function syncToCSS(insets: SafeAreaInsets) {
  const el = document.documentElement.style;
  el.setProperty("--sat", `${insets.top}px`);
  el.setProperty("--sar", `${insets.right}px`);
  el.setProperty("--sab", `${insets.bottom}px`);
  el.setProperty("--sal", `${insets.left}px`);
}

/**
 * 获取设备安全区域的 Hook
 * 用于处理刘海屏、底部手势栏等安全区域
 *
 * 优先使用 CSS env() 变量，端内 WebView 中 env() 可能返回 0，
 * 此时通过 bridge 从原生获取安全区域值作为 fallback；
 * 若 bridge 也不可用，使用 Android 默认状态栏高度兜底。
 */
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const getCssEnvSafeArea = (): SafeAreaInsets => {
      const computedStyle = getComputedStyle(document.documentElement);
      return {
        top: parseInt(computedStyle.getPropertyValue("--sat").replace("px", "") || "0") || 0,
        right: parseInt(computedStyle.getPropertyValue("--sar").replace("px", "") || "0") || 0,
        bottom: parseInt(computedStyle.getPropertyValue("--sab").replace("px", "") || "0") || 0,
        left: parseInt(computedStyle.getPropertyValue("--sal").replace("px", "") || "0") || 0,
      };
    };

    const updateSafeArea = async () => {
      // 1. 优先使用 CSS env() 值（浏览器 / PWA 独立模式）
      const cssInsets = getCssEnvSafeArea();
      if (cssInsets.top > 0 || cssInsets.bottom > 0) {
        setSafeArea(cssInsets);
        return;
      }

      // 2. 端内 WebView：通过 bridge 获取原生安全区域
      if (isApp()) {
        const nativeInsets = await getSafeAreaInsets();
        if (nativeInsets && (nativeInsets.top > 0 || nativeInsets.bottom > 0)) {
          setSafeArea(nativeInsets);
          syncToCSS(nativeInsets);
          return;
        }

        // 3. Bridge 不可用或返回 0：使用 Android 默认状态栏高度兜底
        const fallback: SafeAreaInsets = { top: ANDROID_STATUS_BAR_DEFAULT, right: 0, bottom: 0, left: 0 };
        setSafeArea(fallback);
        syncToCSS(fallback);
        return;
      }

      setSafeArea(cssInsets);
    };

    updateSafeArea();

    window.addEventListener("resize", updateSafeArea);
    window.addEventListener("orientationchange", updateSafeArea);

    return () => {
      window.removeEventListener("resize", updateSafeArea);
      window.removeEventListener("orientationchange", updateSafeArea);
    };
  }, []);

  return safeArea;
}

/**
 * 生成安全区域的内联样式
 * 用于需要动态设置安全区域padding的组件
 */
export function getSafeAreaStyle(options?: {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
}): React.CSSProperties {
  const { top = true, right = true, bottom = true, left = true } = options || {};

  return {
    paddingTop: top ? "var(--sat)" : undefined,
    paddingRight: right ? "var(--sar)" : undefined,
    paddingBottom: bottom ? "var(--sab)" : undefined,
    paddingLeft: left ? "var(--sal)" : undefined,
  };
}

```
