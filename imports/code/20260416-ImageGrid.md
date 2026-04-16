---
title: ImageGrid
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: ImageGrid.tsx
---

# ImageGrid

```tsx
import { useState, useCallback } from "react";
import { PostPictureInQuery } from "@heyhru/business-pwa-proto/gen/archat_api/post_api";
import ImagePreview from "@/components/ImagePreview";

interface ImageGridProps {
  pictures: PostPictureInQuery[];
}

// 单张优先 midUrl，多张优先 minUrl
function getDisplayUrl(pic: PostPictureInQuery, isMulti: boolean): string {
  if (!isMulti) return pic.midUrl || pic.url || "";
  return pic.minUrl || pic.midUrl || pic.url || "";
}

// 预览优先原图
function getPreviewUrl(pic: PostPictureInQuery): string {
  return pic.url || pic.midUrl || pic.minUrl || "";
}

export default function ImageGrid({ pictures }: ImageGridProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleImageClick = useCallback((index: number) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  }, []);

  if (!pictures?.length) return null;

  const count = pictures.length;
  const isMulti = count > 1;
  const previewUrls = pictures.map(getPreviewUrl);
  const onClosePreview = () => setPreviewOpen(false);

  return (
    <>
      <div className={isMulti ? "grid grid-cols-3 gap-0.5 w-full" : "w-52"}>
        {pictures.map((pic, i) => (
          <img
            key={i}
            src={getDisplayUrl(pic, isMulti)}
            alt=""
            className="aspect-square w-full rounded-lg object-cover cursor-pointer"
            onClick={() => handleImageClick(i)}
            loading="lazy"
          />
        ))}
      </div>
      <ImagePreview images={previewUrls} initialIndex={previewIndex} open={previewOpen} onClose={onClosePreview} />
    </>
  );
}

```
