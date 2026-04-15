---
title: CameraView
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: CameraView.tsx
---

# CameraView

```tsx
import { useEffect } from "react";
import { useCameraStream } from "@/hooks/useCameraStream";

const CameraView = () => {
  const { videoRef, startCamera, stopCamera, cameraStatus } = useCameraStream();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <div className="w-full h-full overflow-hidden bg-white">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover -scale-x-100 ${cameraStatus !== "active" ? "invisible" : ""}`}
        disablePictureInPicture={true}
      />
      {cameraStatus === "denied" && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <p className="text-center text-sm text-white/60 px-8">
            Camera access denied. Please enable camera permission in your device settings.
          </p>
        </div>
      )}
      {cameraStatus === "unavailable" && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <p className="text-center text-sm text-white/60 px-8">Camera is unavailable on this device.</p>
        </div>
      )}
    </div>
  );
};

export default CameraView;

```
