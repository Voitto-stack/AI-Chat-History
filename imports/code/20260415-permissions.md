---
title: permissions
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: permissions.ts
---

# permissions

```ts
/**
 * 权限管理工具
 * 支持 H5 和 APK WebView 环境，自动根据环境选择合适的权限请求方式
 */

import { isApp, requestPermission as requestApkPermission, Permissions } from "./bridge";
import { toast } from "./toast";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const TAG = "PermissionUtils";

type PermissionStatus = "granted" | "denied" | "unavailable";

interface LocationPermissionResult {
  status: PermissionStatus;
  latitude?: number;
  longitude?: number;
}

type NotificationPermissionStatus = "granted" | "denied" | "default" | "unsupported";

async function checkMediaPermission(browserName: "camera" | "microphone"): Promise<PermissionStatus> {
  if (!navigator.mediaDevices?.getUserMedia) {
    console.error(TAG, "Browser does not support media devices API");
    return "unavailable";
  }

  // 通过 permissions.query 查询权限状态，避免触发 getUserMedia
  if (navigator.permissions?.query) {
    try {
      const status = await navigator.permissions.query({ name: browserName as PermissionName });
      if (status.state === "granted") return "granted";
      if (status.state === "denied") return "denied";
    } catch {
      // 忽略查询失败
    }
  }

  // permissions.query 不支持或返回 prompt，返回 granted 让调用方尝试 getUserMedia
  return "granted";
}

/**
 * 请求相机权限
 * APK 环境会先请求原生摄像头权限，再检查浏览器权限
 *
 * TODO: APK 原生端暂未实现 Camera 权限 bridge，暂时禁用 APK bridge 调用
 */
export async function checkCameraPermission(): Promise<PermissionStatus> {
  console.log("[Permissions] checkCameraPermission called, isApp:", isApp());

  // APK 环境需要先请求原生摄像头权限
  // if (isApp()) {
  //   try {
  //     console.log("[Permissions] Requesting APK camera permission...");
  //     const granted = await requestApkPermission(Permissions.Camera);
  //     console.log("[Permissions] APK camera permission result:", granted);
  //     if (!granted) {
  //       toast.error("Camera permission has been denied. Please allow the app to access your camera.");
  //       return "denied";
  //     }
  //   } catch (error) {
  //     console.error(TAG, "APK camera permission error:", error);
  //     return "unavailable";
  //   }
  // }

  console.log("[Permissions] Checking browser media permission...");

  // 埋点：相机权限请求
  bpTrack(EventName.pwa_perm_camera_request);
  bpTrack(EventName.pwa_camera_permission_request);
  bpTrack(EventName.pwa_camera_permission_request);
  const result = await checkMediaPermission("camera");
  console.log("[Permissions] Browser camera permission result:", result);
  if (result === "granted") {
    bpTrack(EventName.pwa_camera_permission_granted);
  } else if (result === "denied") {
    bpTrack(EventName.pwa_camera_permission_denied);
  }
  return result;
}

/**
 * 请求麦克风权限
 */
export async function checkMicrophonePermission(): Promise<PermissionStatus> {
  // 埋点：麦克风权限请求
  bpTrack(EventName.pwa_perm_mic_request);
  bpTrack(EventName.pwa_microphone_permission_request);
  const result = await checkMediaPermission("microphone");
  if (result === "granted") {
    bpTrack(EventName.pwa_microphone_permission_granted);
  } else if (result === "denied") {
    bpTrack(EventName.pwa_microphone_permission_denied);
  }
  return result;
}

/**
 * 请求位置权限并获取坐标
 *
 * TODO: APK 原生端暂未实现 Location 权限 bridge，暂时禁用 APK bridge 调用
 */
export async function checkLocationPermission(): Promise<LocationPermissionResult> {
  // 埋点：位置权限请求
  bpTrack(EventName.pwa_perm_location_request);
  // 埋点：位置权限提示展示（在请求权限前）
  bpTrack(EventName.pwa_onboarding_location_permission_toast_show);

  console.log("[Permissions] checkLocationPermission called, isApp:", isApp());

  // TODO: 等待 APK 原生端实现 requestPermission("AccessFineLocation") 后再启用
  // APK 环境需要先请求原生位置权限
  // if (isApp()) {
  //   try {
  //     console.log("[Permissions] Requesting APK location permission...");
  //     const granted = await requestApkPermission(Permissions.AccessFineLocation);
  //     console.log("[Permissions] APK location permission result:", granted);
  //     if (!granted) {
  //       // 埋点：位置权限弹窗拒绝
  //       bpTrack(EventName.pwa_location_permission_modal_not_allowed);
  //       toast.error("Location permission has been denied. Please allow the app to access your location.");
  //       return { status: "denied" };
  //     }
  //     // 埋点：位置权限弹窗允许
  //     // bpTrack(EventName.pwa_onboarding_location_permission_modal_allowed);
  //   } catch (error) {
  //     console.error(TAG, "APK location permission error:", error);
  //     return { status: "unavailable" };
  //   }
  // }

  if (!navigator.geolocation) {
    console.error(TAG, "Browser does not support Geolocation API");
    toast.error("Location service is not available on your device or browser.");
    return { status: "unavailable" };
  }

  try {
    // H5 环境检查权限状态
    if (!isApp() && navigator.permissions?.query) {
      try {
        const status = await navigator.permissions.query({ name: "geolocation" });

        if (status.state === "denied") {
          toast.error("Location permission has been denied. Please allow the app to access your location.");
          return { status: "denied" };
        }
      } catch {
        // 忽略不支持的浏览器
      }
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });

    const { latitude, longitude } = position.coords;

    // 埋点：位置权限授予成功（不传参数，与 react-haven 保持一致）
    bpTrack(EventName.pwa_onboarding_location_permission_granted);

    return {
      status: "granted",
      latitude,
      longitude,
    };
  } catch (error: unknown) {
    console.error(TAG, "Location permission error:", error);

    // 错误码: 1=拒绝 2=不可用 3=超时
    const errorCode = error instanceof GeolocationPositionError ? error.code : 0;
    if (errorCode === 1) {
      toast.error(
        "Location permission has been denied. Please allow the app to access your location to find nearby services and users.",
      );
      return { status: "denied" };
    }

    toast.error("Location service is not available on your device or browser.");
    return { status: "unavailable" };
  }
}

/**
 * 请求通知权限
 */
export async function checkNotificationPermission(): Promise<NotificationPermissionStatus> {
  // 埋点：通知权限提示展示
  bpTrack(EventName.pwa_onboarding_notfiication_permission_toast_show);
  if (isApp()) {
    try {
      const granted = await requestApkPermission(Permissions.PostNotification);
      if (granted) {
        // 埋点：通知权限允许
        bpTrack(EventName.pwa_onboarding_notfiication_permission_allowed);
        return "granted";
      } else {
        // 埋点：通知权限拒绝
        bpTrack(EventName.pwa_onboarding_notfiication_permission_not_allowed);
        return "denied";
      }
    } catch (error) {
      console.error(TAG, "APK notification permission error:", error);
      return "unsupported";
    }
  }

  if (!("Notification" in window)) {
    console.error(TAG, "Browser does not support Notification API");
    toast.error("Notification service is not available on your device or browser.");
    return "unsupported";
  }

  try {
    const current = Notification.permission;

    if (current === "granted") {
      // 埋点：通知权限已授予
      bpTrack(EventName.pwa_onboarding_notfiication_permission_allowed);
      return "granted";
    }

    if (current === "denied") {
      // 埋点：通知权限已拒绝
      bpTrack(EventName.pwa_onboarding_notfiication_permission_not_allowed);
      toast.error("Notifications are turned off. Please allow the app to send notifications.");
      return "denied";
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // 埋点：通知权限允许
      bpTrack(EventName.pwa_onboarding_notfiication_permission_allowed);
      bpTrack(EventName.pwa_newuser_permission_group_allowed);
    } else if (permission === "denied") {
      // 埋点：通知权限拒绝
      bpTrack(EventName.pwa_onboarding_notfiication_permission_not_allowed);
      bpTrack(EventName.pwa_newuser_permission_group_not_allowed);
      toast.error("Notifications are turned off. Please allow the app to send notifications.");
    }

    return permission;
  } catch (error) {
    console.error(TAG, "Notification permission error:", error);
    return "unsupported";
  }
}

```
