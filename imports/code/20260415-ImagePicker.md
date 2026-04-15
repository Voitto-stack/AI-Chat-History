---
title: ImagePicker
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: ImagePicker.tsx
---

# ImagePicker

```tsx
import { useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { compressImage } from "@/utils/fileUtils";
import { toast } from "@/utils/toast";
import icFeedImagePlus from "@/assets/images/feed/ic_feed_image_plus.svg";
import icClose from "@/assets/images/common/ic_close.svg";

const MAX_IMAGES = 9;
const MAX_SIZE_MB = 0.1;

export interface ImagePickerRef {
  getImages: () => Promise<{ name: string; data: Uint8Array }[]>;
}

interface ImagePickerProps {
  onImagesChange?: (files: File[]) => void;
}

const ImagePicker = forwardRef<ImagePickerRef, ImagePickerProps>(function ImagePicker({ onImagesChange }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const filesRef = useRef<File[]>([]);

  useImperativeHandle(ref, () => ({
    getImages: async () => {
      const results: { name: string; data: Uint8Array }[] = [];
      for (const file of filesRef.current) {
        try {
          const compressed = await compressImage(file, MAX_SIZE_MB);
          const buf = await compressed.arrayBuffer();
          results.push({ name: compressed.name, data: new Uint8Array(buf) });
        } catch {
          toast.error("Failed to compress image");
        }
      }
      return results;
    },
  }));

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []);
      if (!selected.length) return;

      const remaining = MAX_IMAGES - filesRef.current.length;
      if (remaining <= 0) {
        toast.info(`You can only select up to ${MAX_IMAGES} pictures`);
        return;
      }

      const toAdd = selected.slice(0, remaining);
      if (selected.length > remaining) {
        toast.info(`You can only select up to ${MAX_IMAGES} pictures`);
      }

      // 生成预览并缓存文件
      const newPreviews: string[] = [];
      for (const file of toAdd) {
        newPreviews.push(URL.createObjectURL(file));
      }

      filesRef.current = [...filesRef.current, ...toAdd];
      setPreviews((prev) => [...prev, ...newPreviews]);
      onImagesChange?.(filesRef.current);

      if (inputRef.current) inputRef.current.value = "";
    },
    [onImagesChange],
  );

  const handleRemove = useCallback(
    (index: number) => {
      setPreviews((prev) => {
        URL.revokeObjectURL(prev[index]);
        return prev.filter((_, i) => i !== index);
      });
      filesRef.current = filesRef.current.filter((_, i) => i !== index);
      onImagesChange?.(filesRef.current);
    },
    [onImagesChange],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {previews.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => handleRemove(i)}
              className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-white/85 border-none p-0"
            >
              <img src={icClose} alt="Remove image" className="w-3 h-3" />
            </button>
          </div>
        ))}

        {previews.length < MAX_IMAGES && (
          <button
            onClick={() => inputRef.current?.click()}
            className="aspect-square w-full rounded-lg overflow-hidden cursor-pointer border-none bg-transparent p-0"
            aria-label="Add image"
          >
            <img src={icFeedImagePlus} alt="" className="w-full h-full object-cover" />
          </button>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
    </div>
  );
});

export default ImagePicker;

```
