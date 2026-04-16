---
title: audioUtils
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: audioUtils.ts
---

# audioUtils

```ts
/**
 * 音频处理工具函数
 */

/**
 * 将 WebM 格式音频转换为 WAV 格式
 *
 * WAV 文件格式说明：
 * WAV（Waveform Audio File Format）是一种无损音频格式，结构简单，兼容性好。
 *
 * WAV 文件结构：
 * ┌─────────────────────────────────────────┐
 * │ RIFF Header (12 bytes)                  │
 * │  - "RIFF" (4 bytes): 文件标识           │
 * │  - File Size (4 bytes): 文件大小-8      │
 * │  - "WAVE" (4 bytes): 格式标识           │
 * ├─────────────────────────────────────────┤
 * │ Format Chunk (24 bytes)                 │
 * │  - "fmt " (4 bytes): 格式块标识         │
 * │  - Chunk Size (4 bytes): 固定为16       │
 * │  - Audio Format (2 bytes): 1=PCM        │
 * │  - Num Channels (2 bytes): 声道数       │
 * │  - Sample Rate (4 bytes): 采样率        │
 * │  - Byte Rate (4 bytes): 字节率          │
 * │  - Block Align (2 bytes): 块对齐        │
 * │  - Bits Per Sample (2 bytes): 位深度    │
 * ├─────────────────────────────────────────┤
 * │ Data Chunk Header (8 bytes)             │
 * │  - "data" (4 bytes): 数据块标识         │
 * │  - Data Size (4 bytes): 音频数据大小    │
 * ├─────────────────────────────────────────┤
 * │ Audio Data (variable)                   │
 * │  - 实际的音频采样数据                   │
 * └─────────────────────────────────────────┘
 *
 * 总大小 = 44 bytes (header) + 音频数据大小
 *
 * @param webmBlob - WebM 格式的音频 Blob 对象
 * @returns Promise<Blob> - WAV 格式的音频 Blob 对象
 * @throws {Error} 当音频解码失败时抛出错误
 */
export async function convertWebMToWav(webmBlob: Blob): Promise<Blob> {
  // 创建临时的 AudioContext 用于解码
  const audioContext = new AudioContext();

  try {
    // 步骤1: 读取 WebM 音频数据
    const arrayBuffer = await webmBlob.arrayBuffer();

    // 步骤2: 解码音频数据到 AudioBuffer
    // AudioBuffer 包含解码后的原始 PCM 数据
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 步骤3: 提取音频参数
    const numberOfChannels = audioBuffer.numberOfChannels; // 声道数（1=单声道, 2=立体声）
    const length = audioBuffer.length; // 采样点总数
    const sampleRate = audioBuffer.sampleRate; // 采样率（Hz，通常是 44100 或 48000）

    // 步骤4: 创建 WAV 文件缓冲区
    // WAV 文件 = 44字节头 + 音频数据
    // 音频数据大小 = 采样点数 * 声道数 * 每个采样2字节(16bit)
    const wavBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(wavBuffer);

    /**
     * 写入字符串到缓冲区的辅助函数
     * @param offset - 写入的起始位置
     * @param string - 要写入的字符串
     */
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    // ========== 写入 WAV 文件头（44 字节）==========

    // RIFF Header（12 字节）
    writeString(0, "RIFF"); // 字节 0-3: "RIFF" 标识
    view.setUint32(4, 36 + length * numberOfChannels * 2, true); // 字节 4-7: 文件大小-8
    writeString(8, "WAVE"); // 字节 8-11: "WAVE" 格式标识

    // Format Chunk（24 字节）
    writeString(12, "fmt "); // 字节 12-15: "fmt " 格式块标识
    view.setUint32(16, 16, true); // 字节 16-19: 格式块大小（固定为16）
    view.setUint16(20, 1, true); // 字节 20-21: 音频格式（1 = PCM 无压缩）
    view.setUint16(22, numberOfChannels, true); // 字节 22-23: 声道数
    view.setUint32(24, sampleRate, true); // 字节 24-27: 采样率（Hz）
    view.setUint32(28, sampleRate * numberOfChannels * 2, true); // 字节 28-31: 字节率（每秒字节数）
    view.setUint16(32, numberOfChannels * 2, true); // 字节 32-33: 块对齐（每个采样的字节数）
    view.setUint16(34, 16, true); // 字节 34-35: 位深度（16 bit）

    // Data Chunk Header（8 字节）
    writeString(36, "data"); // 字节 36-39: "data" 数据块标识
    view.setUint32(40, length * numberOfChannels * 2, true); // 字节 40-43: 音频数据大小

    // ========== 写入音频数据 ==========

    const offset = 44; // 音频数据从第44字节开始

    // 从 AudioBuffer 中提取每个声道的数据
    const channelData: Float32Array[] = [];
    for (let i = 0; i < numberOfChannels; i++) {
      channelData.push(audioBuffer.getChannelData(i));
    }

    // 交错写入多声道数据
    // 例如立体声：L R L R L R...（左声道、右声道交替）
    let pos = 0;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        // Float32Array 的值范围是 [-1.0, 1.0]
        // 需要转换为 16-bit PCM 的值范围 [-32768, 32767]
        const sample = Math.max(-1, Math.min(1, channelData[channel][i]));

        // 转换为 16-bit 整数
        // 负数: sample * 32768 (0x8000)
        // 正数: sample * 32767 (0x7FFF)
        const value = sample < 0 ? sample * 0x8000 : sample * 0x7fff;

        // 写入 16-bit 小端序整数
        view.setInt16(offset + pos, value, true);
        pos += 2;
      }
    }

    // 步骤5: 创建并返回 WAV Blob
    return new Blob([wavBuffer], { type: "audio/wav" });
  } finally {
    // 确保关闭 AudioContext 释放资源
    if (audioContext.state !== "closed") {
      await audioContext.close();
    }
  }
}

/**
 * 检查音频文件的时长
 *
 * 有些浏览器在刚创建 Audio 元素时，duration 可能是 Infinity，
 * 需要通过特殊方法来获取实际时长。
 *
 * @param audio - HTML Audio 元素
 * @param timeout - 超时时间（毫秒），默认 5000ms
 * @returns Promise<number> - 音频时长（秒）
 *
 */
export function getAudioDuration(audio: HTMLAudioElement, timeout = 5000): Promise<number> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Audio duration check timeout"));
    }, timeout);

    /**
     * 处理 metadata 加载完成事件
     */
    const handleLoadedMetadata = () => {
      if (audio.duration !== Infinity) {
        // 正常情况：直接获取到了有效的时长
        clearTimeout(timer);
        resolve(audio.duration);
        return;
      }

      // 处理 Infinity 的情况
      // 某些浏览器需要通过设置 currentTime 来触发时长计算
      audio.currentTime = 24 * 60 * 60; // 设置为一个很大的值

      audio.addEventListener("timeupdate", function timeUpdateHandler() {
        if (audio.currentTime !== 0) {
          // 重置到开始位置
          audio.currentTime = 0;
          audio.removeEventListener("timeupdate", timeUpdateHandler);
          clearTimeout(timer);
          resolve(audio.duration);
        }
      });
    };

    /**
     * 处理加载错误
     */
    const handleError = (e: Event) => {
      clearTimeout(timer);
      const errorMessage = (e as ErrorEvent).message || "Audio loading error";
      reject(new Error(errorMessage));
    };

    // 注册事件监听
    audio.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    audio.addEventListener("error", handleError);
  });
}

```
