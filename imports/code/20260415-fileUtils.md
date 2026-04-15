---
title: fileUtils
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: fileUtils.ts
---

# fileUtils

```ts
import imageCompression, { type Options } from "browser-image-compression";

/**
 * 将 Blob 或 File 读取为 DataURL
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || "");
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * 读取文件为 DataURL
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return blobToDataUrl(file);
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(file: File): string {
  const fileName = file.name;
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
    return "";
  }

  return fileName.substring(lastDotIndex);
}

/**
 * 简单的 MD5 哈希函数实现
 * 注意: 这是一个简化版本，用于文件命名
 */
export function MD5(str: string): string {
  // 使用 Web Crypto API 的 SHA-256 作为替代
  // 因为浏览器原生不支持 MD5，这里使用简单的哈希方案
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * 压缩图片
 * @param file 原始图片文件
 * @param maxSizeMB 压缩后的最大大小（MB），默认 0.1
 * @param maxWidthOrHeight 压缩后的最大宽高，可选
 * @returns 压缩后的文件，统一转换为 JPG 格式
 */
export async function compressImage(file: File, maxSizeMB = 0.1, maxWidthOrHeight?: number): Promise<File> {
  const options: Options = {
    maxSizeMB,
    useWebWorker: true,
    fileType: "image/jpeg", // 统一输出为 JPEG 格式
  };

  if (maxWidthOrHeight) {
    options.maxWidthOrHeight = maxWidthOrHeight;
  }

  const compressed = await imageCompression(file, options);

  // 确保文件名为 .jpg 扩展名（因为后端要求 JPEG）
  const baseName = file.name.replace(/\.[^/.]+$/, "") || "compressed";
  return new File([compressed], `${baseName}.jpg`, { type: "image/jpeg" });
}


export async function copyToClipboard(text: string) {
  // 检查是否支持 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("Clipboard API failed, trying fallback", err);
    }
  }

  // 回退到 execCommand
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand("copy");
    if (document.body.contains(textarea)) {
      document.body.removeChild(textarea);
    }
    return success;
  } catch (err) {
    console.error("Fallback failed", err);
    return false;
  }
}
```
