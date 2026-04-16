---
title: imageUtil
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: imageUtil.ts
---

# imageUtil

```ts
import { blobToDataUrl } from "./fileUtils";

/**
 * 创建图片对象（异步加载）
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

/**
 * 获取裁剪后的图片
 * @param imageSrc 图片源 URL (Data URL)
 * @param pixelCrop 裁剪的像素区域
 * @returns 裁剪后的图片 Data URL (JPEG)
 */
export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL("image/jpeg");
};

/**
 * 判断字符串是否为 Data URL
 */
export const isDataURL = (str: string): boolean => {
  return str.startsWith("data:");
};

/**
 * 将 Data URL 转换为 File 对象
 */
export const dataURLtoFile = async (dataUrl: string, fileName = "cropped.jpg"): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: "image/jpeg" });
};

/**
 * 将 URL 转换为 Data URL（用于网络图片）
 */
export const urlToDataUrl = async (url: string): Promise<string> => {
  if (isDataURL(url)) {
    return url;
  }

  const response = await fetch(url);
  const blob = await response.blob();

  return blobToDataUrl(blob);
};

```
