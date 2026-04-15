---
title: ImagePreview
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: ImagePreview.tsx
---

# ImagePreview

```tsx
import ModalContainer from "@/components/ModalContainer";

interface ImagePreviewProps {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export default function ImagePreview({ images, initialIndex = 0, open, onClose }: ImagePreviewProps) {
  if (images.length === 0) return null;

  return (
    <ModalContainer open={open} onClose={onClose} variant="fullscreen">
      <div className="flex items-center justify-center size-full bg-black/80" onClick={onClose}>
        <img src={images[initialIndex] ?? images[0]} alt="" className="max-w-full max-h-full object-contain" />
      </div>
    </ModalContainer>
  );
}

```
