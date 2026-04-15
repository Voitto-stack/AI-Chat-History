---
title: useVideoRecordTask
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: useVideoRecordTask.tsx
---

# useVideoRecordTask

```tsx
import {
  CreateCloudRecordingRequest,
  CreateCloudRecordingResponse,
  DeleteCloudRecordingRequest,
  DeleteCloudRecordingResponse,
} from "@sitin/api-proto/gen/archat_api/data_bridge_api";
import httpClient from "@/http/httpClient";
import { useRef } from "react";

export const useVideoRecordTask = () => {
  const taskIdRef = useRef("");

  const start = (remoteUserId: string, userId: string, roomId: string) => {
    const customPrefix = `f-${userId}_m-${remoteUserId}_rm-${roomId}`;
    const request = {
      StorageParams: {
        CloudVod: {
          TencentVod: {
            ExpireTime: 0,
            UserDefineRecordId: customPrefix, // 客户端传递
          },
        },
      },
      UserSig: "",
      UserId: "",
      RecordParams: {
        MaxIdleTime: 60,
        StreamType: 0,
        RecordMode: 2,
      },
      RoomIdType: 1,
      MixTranscodeParams: {
        VideoParams: {
          Width: 640,
          BitRate: 500000,
          Fps: 15,
          Height: 640,
          Gop: 10,
        },
      },
      MixLayoutParams: {
        MixLayoutMode: 3,
      },
      SdkAppId: 0,
      RoomId: roomId.toString(), // 客户端传递
    };
    httpClient
      .requestPost2(CreateCloudRecordingRequest, { request: JSON.stringify(request) }, CreateCloudRecordingResponse)
      .then((res) => {
        taskIdRef.current = res?.taskId ?? "";
      });
  };

  const stop = () => {
    if (taskIdRef.current) {
      httpClient.requestPost2(DeleteCloudRecordingRequest, { taskId: taskIdRef.current }, DeleteCloudRecordingResponse);
    }
  };

  return {
    start,
    stop,
  };
};

export default useVideoRecordTask;

```
