---
title: locationUtils
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: locationUtils.ts
---

# locationUtils

```ts
/**
 * GPS 定位工具
 */

import { checkLocationPermission } from "./permissions";

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface GeocodeInfo {
  country_code?: string;
  zipcode?: string;
  city?: string;
  state?: string;
}

/**
 * 通过 GPS 坐标反查国家代码（使用 Nominatim API）
 */
export async function getGeocodeInfo(latitude: number, longitude: number): Promise<GeocodeInfo> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          "User-Agent": "Haven-PWA/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch geocode info");
    }

    const data = await response.json();
    const country_code = data.address?.country_code?.toLowerCase();

    return {
      country_code,
      zipcode: data.address?.postcode,
      city: data.address?.city || data.address?.town || data.address?.village,
      state: data.address?.state || data.address?.province,
    };
  } catch (error) {
    console.error("Error fetching geocode info:", error);
    return {};
  }
}

/**
 * 获取用户位置并返回国家代码
 */
export async function getUserCountryCode(): Promise<string | undefined> {
  try {
    const locationResult = await checkLocationPermission();

    if (locationResult.status !== "granted" || !locationResult.latitude || !locationResult.longitude) {
      console.error("Failed to get location permission or coordinates");
      return undefined;
    }

    const { latitude, longitude } = locationResult;
    const { country_code } = await getGeocodeInfo(latitude, longitude);
    return country_code;
  } catch (error) {
    console.error("Error getting user country code:", error);
    return undefined;
  }
}

```
