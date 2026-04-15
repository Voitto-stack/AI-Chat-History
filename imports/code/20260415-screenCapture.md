---
title: screenCapture
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: screenCapture.ts
---

# screenCapture

```ts
/**
 * 截图工具
 * Screenshot Utility
 *
 * 应用的 Vercel React Best Practices:
 * - js-early-exit: 早期返回优化
 * - js-cache-property-access: 缓存属性访问
 */

/**
 * 将 video 或 canvas 元素截图并转换为 base64
 * @param element - video、canvas 元素或包含它们的容器
 * @param quality - 图片质量 (0-1)
 * @param format - 图片格式
 * @returns base64 字符串（不包含 data URL 前缀）
 */
export const captureVideoToBase64 = async (
  element: HTMLElement,
  quality: number = 0.8,
  format: string = "image/jpeg",
): Promise<string> => {
  try {
    // js-early-exit: 早期返回优化
    if (!element) {
      throw new Error("Element is required");
    }

    let sourceElement: HTMLVideoElement | HTMLCanvasElement | null = null;

    // 判断元素类型
    if (element.tagName === "VIDEO") {
      sourceElement = element as HTMLVideoElement;
    } else if (element.tagName === "CANVAS") {
      sourceElement = element as HTMLCanvasElement;
    } else {
      // 尝试在容器中查找 video 或 canvas 元素
      const video = element.querySelector("video") as HTMLVideoElement;
      const canvas = element.querySelector("canvas") as HTMLCanvasElement;
      sourceElement = video || canvas;
    }

    // js-early-exit: 如果没有找到有效元素，直接抛出错误
    if (!sourceElement) {
      throw new Error("No video or canvas element found");
    }

    // 处理 canvas 元素
    if (sourceElement.tagName === "CANVAS") {
      const canvas = sourceElement as HTMLCanvasElement;
      const dataUrl = canvas.toDataURL(format, quality);
      const base64String = dataUrl.split(",")[1];
      return base64String;
    }

    // 处理 video 元素
    const video = sourceElement as HTMLVideoElement;

    // js-early-exit: 检查视频是否准备好
    if (video.readyState < 2) {
      throw new Error("Video is not ready (readyState < 2)");
    }

    // 使用 Canvas API 捕获视频帧
    const canvas = document.createElement("canvas");

    // js-cache-property-access: 缓存属性访问
    const width = video.videoWidth || video.clientWidth;
    const height = video.videoHeight || video.clientHeight;

    // js-early-exit: 检查尺寸是否有效
    if (width === 0 || height === 0) {
      throw new Error("Invalid video dimensions");
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    // js-early-exit: 检查 context 是否成功创建
    if (!ctx) {
      throw new Error("Failed to get canvas 2d context");
    }

    // 使用 requestAnimationFrame 确保在下一帧渲染
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        ctx.drawImage(video, 0, 0, width, height);
        resolve();
      });
    });

    const dataUrl = canvas.toDataURL(format, quality);
    const base64String = dataUrl.split(",")[1];
    return base64String;
  } catch (error) {
    console.error("ScreenCapture.captureVideoToBase64", "截取失败:", error);
    throw error;
  }
};

```
