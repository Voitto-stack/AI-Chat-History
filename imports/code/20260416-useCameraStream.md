---
title: useCameraStream
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useCameraStream.ts
---

# useCameraStream

```ts
import { useCallback, useRef, useState } from "react";
import { checkCameraPermission, checkMicrophonePermission } from "@/utils/permissions";

// 单例 stream refs，在组件间共享
let sharedVideoStream: MediaStream | null = null;
let sharedAudioStream: MediaStream | null = null;
let sharedCombinedStream: MediaStream | null = null;
let refCount = 0;

export type CameraStatus = "idle" | "active" | "denied" | "unavailable";

export function useCameraStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");

  const startCamera = useCallback(async () => {
    if (sharedCombinedStream || sharedVideoStream) {
      if (videoRef.current) {
        videoRef.current.srcObject = sharedCombinedStream ?? sharedVideoStream;
      }
      setCameraStatus("active");
      refCount++;
      return;
    }

    const [camera, microphone] = await Promise.all([checkCameraPermission(), checkMicrophonePermission()]);

    const requests: Promise<MediaStream>[] = [];
    if (camera === "granted") {
      requests.push(navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }));
    }
    if (microphone === "granted") {
      requests.push(navigator.mediaDevices.getUserMedia({ audio: true }));
    }

    if (requests.length === 0) {
      console.error("No media permission available");
      setCameraStatus(camera === "denied" ? "denied" : "unavailable");
      return;
    }

    const results = await Promise.allSettled(requests);

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const stream = result.value;
        if (stream.getVideoTracks().length > 0) {
          sharedVideoStream = stream;
        }
        if (stream.getAudioTracks().length > 0) {
          sharedAudioStream = stream;
        }
      }
    });

    if (sharedVideoStream && sharedAudioStream) {
      const videoTracks = sharedVideoStream.getVideoTracks();
      const audioTracks = sharedAudioStream.getAudioTracks();
      sharedCombinedStream = new MediaStream([...videoTracks, ...audioTracks]);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = sharedCombinedStream ?? sharedVideoStream;
    }

    setCameraStatus(sharedVideoStream ? "active" : "unavailable");
    refCount++;
  }, []);

  const stopCamera = useCallback(() => {
    refCount--;
    if (refCount > 0) return;

    [sharedVideoStream, sharedAudioStream, sharedCombinedStream].forEach((stream) => {
      stream?.getTracks().forEach((track) => track.stop());
    });

    sharedVideoStream = null;
    sharedAudioStream = null;
    sharedCombinedStream = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const getStream = useCallback(() => {
    return sharedCombinedStream ?? sharedVideoStream;
  }, []);

  return { videoRef, startCamera, stopCamera, getStream, cameraStatus };
}

```
