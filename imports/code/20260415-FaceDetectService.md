---
title: FaceDetectService
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: FaceDetectService.ts
---

# FaceDetectService

```ts
/**
 * 人脸检测服务
 * Face Detection Service using MediaPipe
 *
 * 应用的 Vercel React Best Practices:
 * - bundle-dynamic-imports: 使用动态导入延迟加载 MediaPipe
 * - js-early-exit: 早期返回优化
 * - async-defer-await: 延迟 await 到真正需要的地方
 */

import { FaceDetector } from "@mediapipe/tasks-vision";

const TAG = "FaceDetectService";

/**
 * 检测框接口
 */
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 支持 video 和 canvas 元素
 */
export type VideoOrCanvasElement = HTMLVideoElement | HTMLCanvasElement;

/**
 * 人脸检测服务类
 */
export class FaceDetectService {
  private faceDetector: FaceDetector = null;
  private isModelLoaded = false;
  private lastVideoTime = -1;

  constructor() {
    // MediaPipe 初始化会在 loadModel 中进行
  }

  /**
   * 加载 MediaPipe 模型
   * bundle-dynamic-imports: 动态导入 MediaPipe，减少初始包大小
   */
  async loadModel(): Promise<void> {
    // js-early-exit: 如果模型已加载，直接返回
    if (this.isModelLoaded) {
      console.log(TAG, "Model already loaded");
      return;
    }

    const totalStartTime = performance.now();
    console.log(TAG, "🚀 Loading MediaPipe Face Detector model...");

    try {
      // bundle-dynamic-imports: 动态导入 MediaPipe tasks-vision
      const importStartTime = performance.now();
      const vision = await import("@mediapipe/tasks-vision");
      const { FilesetResolver, FaceDetector } = vision;
      const importEndTime = performance.now();
      console.log(TAG, `⏱️  Step 1: Import package - ${(importEndTime - importStartTime).toFixed(2)}ms`);

      // 初始化 WASM
      const wasmStartTime = performance.now();
      const visionFileset = await FilesetResolver.forVisionTasks("./@mediapipe/wasm");
      const wasmEndTime = performance.now();
      console.log(TAG, `⏱️  Step 2: Initialize WASM - ${(wasmEndTime - wasmStartTime).toFixed(2)}ms`);

      // 创建 Face Detector
      const detectorStartTime = performance.now();
      this.faceDetector = await FaceDetector.createFromOptions(visionFileset, {
        baseOptions: {
          modelAssetPath: "./@mediapipe/blaze_face_short_range.tflite",
        },
        runningMode: "VIDEO",
        minDetectionConfidence: 0.5,
        minSuppressionThreshold: 0.3,
      });
      const detectorEndTime = performance.now();
      console.log(TAG, `⏱️  Step 3: Create Face Detector - ${(detectorEndTime - detectorStartTime).toFixed(2)}ms`);

      this.isModelLoaded = true;

      // 记录总耗时
      const totalEndTime = performance.now();
      const totalTime = totalEndTime - totalStartTime;
      console.log(TAG, `✅ MediaPipe Face Detector loaded successfully!`);
      console.log(TAG, `📊 Total loading time: ${totalTime.toFixed(2)}ms (${(totalTime / 1000).toFixed(2)}s)`);
      console.log(TAG, `📊 Breakdown:`, {
        import: `${(importEndTime - importStartTime).toFixed(2)}ms`,
        wasm: `${(wasmEndTime - wasmStartTime).toFixed(2)}ms`,
        detector: `${(detectorEndTime - detectorStartTime).toFixed(2)}ms`,
        total: `${totalTime.toFixed(2)}ms`,
      });
    } catch (error) {
      const totalEndTime = performance.now();
      const totalTime = totalEndTime - totalStartTime;
      console.error(TAG, `❌ Failed to load MediaPipe Face Detector after ${totalTime.toFixed(2)}ms`, error);
      throw error;
    }
  }

  /**
   * 检测所有人脸
   * @param element - video 或 canvas 元素
   * @returns 检测到的人脸框数组
   */
  async detectAllFaces(element: VideoOrCanvasElement): Promise<Box[]> {
    // js-early-exit: 如果模型未加载，直接返回空数组
    if (!this.isModelLoaded || !this.faceDetector) {
      console.warn(TAG, "Model not loaded yet");
      return [];
    }

    try {
      let detections;

      if (element instanceof HTMLVideoElement) {
        // 对于视频元素，使用 detectForVideo
        const currentTime = element.currentTime;

        // 避免在同一帧重复检测
        if (currentTime === this.lastVideoTime) {
          return [];
        }
        this.lastVideoTime = currentTime;

        // 使用视频时间戳（毫秒）
        const timestamp = Math.floor(currentTime * 1000);
        const result = this.faceDetector.detectForVideo(element, timestamp);
        detections = result.detections;
      } else if (element instanceof HTMLCanvasElement) {
        // 对于 canvas 元素，也使用 detectForVideo
        const timestamp = Math.floor(performance.now());
        const result = this.faceDetector.detectForVideo(element, timestamp);
        detections = result.detections;
      } else {
        console.warn(TAG, "Unsupported element type");
        return [];
      }

      // 转换 MediaPipe 的检测结果为 Box 格式
      const boxes: Box[] = detections.map((detection) => {
        const bbox = detection.boundingBox;
        return {
          x: bbox.originX,
          y: bbox.originY,
          width: bbox.width,
          height: bbox.height,
        };
      });

      console.log(TAG, `Detected ${boxes.length} face(s)`, boxes);
      return boxes;
    } catch (error) {
      console.error(TAG, "Face detection failed", error);
      return [];
    }
  }

  /**
   * 释放资源
   */
  dispose(): void {
    if (this.faceDetector) {
      try {
        this.faceDetector.close();
        console.log(TAG, "Face detector disposed");
      } catch (error) {
        console.error(TAG, "Failed to dispose face detector", error);
      }
      this.faceDetector = null;
      this.isModelLoaded = false;
    }
  }
}

```
