---
title: mockVideoRecord
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: mockVideoRecord.ts
---

# mockVideoRecord

```ts
/**
 * Mock 通话本方视频录制器
 * 通过 Canvas 降采样 + MediaRecorder 实现低码率录制
 */

const TAG = "VideoRecorder";

// 压缩参数
const RECORD_CONFIG = {
  maxWidth: 426,
  maxHeight: 240,
  videoBitrate: 150000,
  audioBitrate: 48000,
  frameRate: 10,
} as const;

// 帧间隔（毫秒）
const FRAME_INTERVAL = 1000 / RECORD_CONFIG.frameRate;

/**
 * 视频录制器（纯类实现，单例，方便跨组件共享）
 */
class VideoRecorder {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private animFrameId: number | null = null;
  private lastFrameTime = 0;
  private videoEl: HTMLVideoElement | null = null;
  private resolveStop: ((blob: Blob) => void) | null = null;

  /**
   * 开始录制
   * @param stream 本地摄像头 MediaStream（需包含 video + audio）
   */
  start(stream: MediaStream): void {
    if (this.recorder) {
      console.warn(TAG, "录制已在进行中");
      return;
    }

    try {
      console.log(TAG, "开始录制");

      // 创建隐藏 video 元素用于绘制到 canvas
      this.videoEl = document.createElement("video");
      this.videoEl.srcObject = stream;
      this.videoEl.muted = true;
      this.videoEl.playsInline = true;
      this.videoEl.play().catch((err) => console.error(TAG, "video play 失败:", err));

      // 创建 canvas 用于降采样
      this.canvas = document.createElement("canvas");
      this.canvas.width = RECORD_CONFIG.maxWidth;
      this.canvas.height = RECORD_CONFIG.maxHeight;
      this.ctx = this.canvas.getContext("2d");

      // 以固定帧率绘制 video 到 canvas
      this.lastFrameTime = 0;
      const drawFrame = (timestamp: number) => {
        if (timestamp - this.lastFrameTime >= FRAME_INTERVAL) {
          this.lastFrameTime = timestamp;
          if (this.ctx && this.videoEl) {
            this.ctx.drawImage(this.videoEl, 0, 0, RECORD_CONFIG.maxWidth, RECORD_CONFIG.maxHeight);
          }
        }
        this.animFrameId = requestAnimationFrame(drawFrame);
      };
      this.animFrameId = requestAnimationFrame(drawFrame);

      // 从 canvas 获取降采样视频流
      const canvasStream = this.canvas.captureStream(RECORD_CONFIG.frameRate);

      // 合并原始音频轨道
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach((track) => canvasStream.addTrack(track));

      // 选择 mimeType
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
        ? "video/webm;codecs=vp8,opus"
        : "video/webm";

      // 创建 MediaRecorder
      this.chunks = [];
      this.recorder = new MediaRecorder(canvasStream, {
        mimeType,
        videoBitsPerSecond: RECORD_CONFIG.videoBitrate,
        audioBitsPerSecond: RECORD_CONFIG.audioBitrate,
      });

      this.recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };

      this.recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: mimeType });
        console.log(TAG, "录制完成, size:", (blob.size / 1024).toFixed(1) + "KB");
        this.resolveStop?.(blob);
        this.cleanup();
      };

      this.recorder.onerror = (e) => {
        console.error(TAG, "MediaRecorder 错误:", e);
        this.resolveStop?.(new Blob());
        this.cleanup();
      };

      this.recorder.start(1000); // 每秒收集一次数据
    } catch (err) {
      console.error(TAG, "启动录制失败:", err);
      this.cleanup();
    }
  }

  /**
   * 停止录制并返回录制的 Blob
   */
  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.recorder || this.recorder.state === "inactive") {
        console.warn(TAG, "录制器未在运行");
        resolve(new Blob());
        return;
      }

      this.resolveStop = resolve;
      this.recorder.stop();
    });
  }

  /** 清理资源 */
  private cleanup() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.videoEl) {
      this.videoEl.srcObject = null;
      this.videoEl = null;
    }
    this.canvas = null;
    this.ctx = null;
    this.recorder = null;
    this.chunks = [];
    this.resolveStop = null;
  }
}

/** 单例 */
const videoRecorder = new VideoRecorder();
export default videoRecorder;

```
