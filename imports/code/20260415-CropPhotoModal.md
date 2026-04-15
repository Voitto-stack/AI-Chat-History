---
title: CropPhotoModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: CropPhotoModal.tsx
---

# CropPhotoModal

```tsx
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import ModalContainer from "@/components/ModalContainer";
import { toast } from "@/utils/toast";
import { useLoading } from "@/hooks/useLoading";
import { getCroppedImg, dataURLtoFile } from "@/utils/imageUtil";

interface CropThumbnail {
  imageUrl: string;
  imageFile: File;
}

interface CropState {
  crop: { x: number; y: number };
  zoom: number;
  croppedAreaPixels: Area | null;
}

const createDefaultCropState = (): CropState => ({
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: null,
});

interface CropPhotoModalProps {
  open: boolean;
  onClose: () => void;
  avatarUri: string;
  avatarFile: File;
  onCropPhoto: (payload: { imageUrl: string; imageFile: File; index?: number }) => void;
  initImgSize: { width: number; height: number };
  images?: CropThumbnail[];
  initialIndex?: number;
}

export default function CropPhotoModal({
  open,
  onClose,
  avatarUri,
  avatarFile,
  onCropPhoto,
  initImgSize,
  images,
  initialIndex = 0,
}: CropPhotoModalProps) {
  const { showLoading, hideLoading } = useLoading();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageUrl, setImageUrl] = useState(avatarUri);
  const [imageSize, setImageSize] = useState(initImgSize);
  const [currentFile, setCurrentFile] = useState<File>(avatarFile);
  const [thumbnailList, setThumbnailList] = useState<CropThumbnail[]>(() =>
    images && images.length > 0 ? images : [{ imageUrl: avatarUri, imageFile: avatarFile }],
  );
  const [currentIndex, setCurrentIndex] = useState(() => {
    const total = images?.length ?? 1;
    if (total === 0) return 0;
    return Math.min(initialIndex, total - 1);
  });
  const cropStatesRef = useRef<CropState[]>(
    new Array(thumbnailList.length).fill(null).map(() => createDefaultCropState()),
  );

  const loadImageSize = useCallback((url: string, fallbackSize?: { width: number; height: number }) => {
    if (fallbackSize && fallbackSize.width > 0 && fallbackSize.height > 0) {
      setImageSize(fallbackSize);
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = url;
  }, []);

  const handleFileSelect = useCallback((event: Event | React.ChangeEvent<HTMLInputElement>) => {
    if ("target" in event && event.target && "files" in event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
          };
          if (typeof reader.result === "string") {
            setImageUrl(reader.result);
            setCurrentFile(file);
            img.src = reader.result.toString();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleRetake = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => handleFileSelect(e);
    input.click();
  }, [handleFileSelect]);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const needCrop = useCallback((): boolean => {
    if (!croppedAreaPixels) {
      return false;
    }

    return (
      croppedAreaPixels.x !== 0 ||
      croppedAreaPixels.y !== 0 ||
      croppedAreaPixels.width !== imageSize.width ||
      croppedAreaPixels.height !== imageSize.height
    );
  }, [croppedAreaPixels, imageSize]);

  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels) {
      toast.error("Please wait for the image to load");
      return;
    }

    showLoading();
    try {
      let file = currentFile;
      let url = imageUrl;
      if (needCrop()) {
        url = await getCroppedImg(imageUrl, croppedAreaPixels);
        file = await dataURLtoFile(url, `cropped-${Date.now()}.jpg`);
      }

      setThumbnailList((prev) => {
        const list = [...prev];
        list[currentIndex] = { imageUrl: url, imageFile: file };
        return list;
      });

      onCropPhoto({ imageUrl: url, imageFile: file, index: currentIndex });
    } catch (error) {
      toast.error("Failed to crop image, please try again");
      console.error("Error cropping image:", error);
    } finally {
      hideLoading();
    }
  }, [croppedAreaPixels, imageUrl, currentFile, currentIndex, needCrop, onCropPhoto, showLoading, hideLoading]);

  // 弹窗打开时状态栏变黑，关闭时还原
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const original = meta.getAttribute("content") || "#FDFBF9";
    if (open) {
      meta.setAttribute("content", "#000000");
    }
    return () => {
      meta.setAttribute("content", original);
    };
  }, [open]);

  // 初始化缩略图列表
  useEffect(() => {
    const list = images && images.length > 0 ? images : [{ imageUrl: avatarUri, imageFile: avatarFile }];
    setThumbnailList(list);
    setCurrentIndex(Math.min(initialIndex, list.length - 1));
    cropStatesRef.current = list.map((_, idx) => cropStatesRef.current[idx] ?? createDefaultCropState());
  }, [images, avatarUri, avatarFile, initialIndex]);

  // 切换图片时恢复裁剪状态
  useEffect(() => {
    if (thumbnailList.length === 0) {
      return;
    }
    const safeIndex = Math.min(currentIndex, thumbnailList.length - 1);
    if (safeIndex !== currentIndex) {
      setCurrentIndex(safeIndex);
      return;
    }
    const current = thumbnailList[safeIndex];
    setImageUrl(current.imageUrl);
    setCurrentFile(current.imageFile);
    if (safeIndex === 0) {
      loadImageSize(current.imageUrl, initImgSize);
    } else {
      loadImageSize(current.imageUrl);
    }
    const state = cropStatesRef.current[safeIndex] ?? createDefaultCropState();
    setCrop(state.crop);
    setZoom(state.zoom);
    setCroppedAreaPixels(state.croppedAreaPixels);
  }, [thumbnailList, currentIndex, initImgSize, loadImageSize]);

  // 保存当前裁剪状态
  useEffect(() => {
    if (thumbnailList.length === 0 || currentIndex >= thumbnailList.length) {
      return;
    }
    cropStatesRef.current[currentIndex] = {
      crop,
      zoom,
      croppedAreaPixels,
    };
  }, [crop, zoom, croppedAreaPixels, currentIndex, thumbnailList.length]);

  return (
    <ModalContainer open={open} onClose={onClose} variant="fullscreen">
      <div className="relative w-full h-full bg-black">
        {/* 标题栏 */}
        <div className="absolute top-[var(--sat,0px)] left-0 right-0 h-[50px] flex items-center justify-center z-10">
          <button type="button" className="absolute left-4 text-white" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <h2 className="text-white font-medium text-base">Crop photo</h2>
        </div>

        {/* 裁剪区域 */}
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid
          style={{
            containerStyle: {
              backgroundColor: "#000000",
            },
            cropAreaStyle: {
              borderRadius: "20px",
            },
          }}
        />

        {/* 底部操作区 */}
        <div className="absolute bottom-0 left-0 right-0 pb-[calc(var(--sab,0px)+32px)] px-6 flex flex-col items-center gap-4 z-10">
          {/* 缩略图列表 */}
          {thumbnailList.length > 1 && (
            <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
              {thumbnailList.map((item, index) => (
                <button
                  key={`${item.imageUrl}-${index}`}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 ${
                    index === currentIndex ? "border-[#6bc4ff]" : "border-transparent"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  type="button"
                >
                  <img src={item.imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* 按钮组 */}
          <button
            className="w-full h-12 rounded-[999px] bg-[#6bc4ff] text-white font-medium text-base"
            onClick={handleCrop}
            type="button"
          >
            Confirm
          </button>
          <button
            className="text-white/60 font-normal text-base bg-transparent border-none"
            onClick={handleRetake}
            type="button"
          >
            Retake
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

```
