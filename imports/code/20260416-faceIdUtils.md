---
title: faceIdUtils
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: faceIdUtils.ts
---

# faceIdUtils

```ts
/**
 * FaceId 人脸识别工具函数
 * 基于 Megvii（旷视）FaceID API
 */

// FaceID API 配置（生产环境应该从环境变量读取）
export const FACE_ID_API_KEY = import.meta.env.VITE_FACE_ID_API_KEY || "p4oFiNpBcS9eLCbNZ1PBGdXF_ruCn7iu";
export const FACE_ID_API_SECRET = import.meta.env.VITE_FACE_ID_API_SECRET || "0U5tTu_0viE5m-kTE5cLbyA5SbAKR6m-";
export const FACE_ID_API_URL = "https://api-idn.megvii.com/faceid/lite";

/**
 * FaceId 成功响应
 */
export interface FaceIdSuccessResponse {
  time_used: number;
  token: string;
  biz_id: string;
  request_id: string;
  expired_time: number;
}

/**
 * FaceId 错误响应
 */
export interface FaceIdErrorResponse {
  error_message: string;
  request_id: string;
  time_used: number;
}

/**
 * FaceId 验证结果
 */
export interface FaceIdResult {
  status?: "CANCELLED" | "COMPLETED";
  liveness_result?: {
    result: "PASS" | "FAIL";
    confidence?: number;
  };
  verify_result?: {
    result_ref1?: {
      confidence?: number;
      thresholds?: {
        "1e-4"?: number;
        "1e-3"?: number;
        "1e-5"?: number;
      };
    };
  };
}

/**
 * 从 URL 参数中提取 biz_id
 */
export function useBizId(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("biz_id");
}

/**
 * 生成业务流水号（时间戳 + UUID）
 */
export function generateBizNo(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const uuid = crypto.randomUUID();
  return `${timestamp}-${uuid}`;
}

/**
 * 生成 UUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * 判断字符串是否为 Data URL
 */
function isDataURL(str: string): boolean {
  return str.startsWith("data:");
}

/**
 * 将普通 URL 转换为 Data URL
 */
async function urlToDataUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error("Failed to read blob as Data URL"));
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`Failed to convert URL to Data URL: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Base64 字符串转 Uint8Array
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * 将 Data URL 或普通 URL 转换为 File 对象
 */
export async function dataURLtoFile(input: string): Promise<File> {
  let dataUrl: string;

  if (isDataURL(input)) {
    dataUrl = input;
  } else {
    dataUrl = await urlToDataUrl(input);
  }

  // 分离 Data URL 的元信息和内容部分
  const [header, base64Data] = dataUrl.split(",");
  const mimeType = header.match(/:(.*?);/)?.[1] || "application/octet-stream";

  // 将 Base64 转换为二进制数据
  const byteArray = base64ToUint8Array(base64Data);

  // 创建 Blob，然后生成 File
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  const fileName = `avatar-${timestamp}-${randomNum}.jpg`;
  const blob = new Blob([byteArray], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

/**
 * 获取 FaceId Token（用于跳转到人脸识别页面）
 */
export async function getFaceIdToken(params: {
  bizNo: string;
  comparisonType: string;
  uuid: string;
  imageRef: File;
  returnUrl: string;
  notifyUrl: string;
}): Promise<FaceIdSuccessResponse | FaceIdErrorResponse> {
  const { bizNo, comparisonType, uuid, imageRef, returnUrl, notifyUrl } = params;

  const formData = new FormData();
  formData.append("api_key", FACE_ID_API_KEY);
  formData.append("api_secret", FACE_ID_API_SECRET);
  formData.append("biz_no", bizNo);
  formData.append("comparison_type", comparisonType); // 0: 活体+比对
  formData.append("uuid", uuid);
  formData.append("image_ref1", imageRef);
  formData.append("return_url", returnUrl);
  formData.append("notify_url", notifyUrl);
  formData.append("scene_id", "presence123"); // 使用与 react-haven 相同的 scene_id
  formData.append("action_http_method", "GET");

  // 调试：打印请求参数
  console.log("🔍 FaceID API Request:", {
    url: `${FACE_ID_API_URL}/get_token`,
    bizNo,
    comparisonType,
    uuid,
    returnUrl,
    notifyUrl,
    imageRef: {
      name: imageRef.name,
      size: imageRef.size,
      type: imageRef.type,
    },
    apiKey: FACE_ID_API_KEY,
  });

  try {
    const response = await fetch(`${FACE_ID_API_URL}/get_token`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    // 调试信息
    if (!response.ok) {
      console.error("FaceID API Error:", {
        status: response.status,
        statusText: response.statusText,
        result,
        params: {
          bizNo,
          comparisonType,
          uuid,
          returnUrl,
          notifyUrl,
          imageRefName: imageRef.name,
          imageRefSize: imageRef.size,
          imageRefType: imageRef.type,
        },
      });
    }

    if (response.ok && "token" in result) {
      return result as FaceIdSuccessResponse;
    } else {
      return result as FaceIdErrorResponse;
    }
  } catch (error) {
    console.error("Network Error:", error);
    return {
      error_message: "NETWORK_ERROR",
      request_id: "",
      time_used: 0,
    };
  }
}

/**
 * 获取 FaceId 验证结果
 */
export async function getFaceIdResult(bizId: string): Promise<FaceIdResult | null> {
  try {
    const url = new URL(`${FACE_ID_API_URL}/get_result`);
    url.searchParams.append("api_key", FACE_ID_API_KEY);
    url.searchParams.append("api_secret", FACE_ID_API_SECRET);
    url.searchParams.append("biz_id", bizId);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "PostmanRuntime-ApipostRuntime/1.1.0",
        Connection: "keep-alive",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch FaceId result:", response.status);
      return null;
    }

    const data = await response.json();
    return data as FaceIdResult;
  } catch (error) {
    console.error("Error fetching FaceId result:", error);
    return null;
  }
}

/**
 * 跳转到 FaceId 人脸识别页面
 */
export function redirectToFaceIdPage(token: string): void {
  const faceIdUrl = `${FACE_ID_API_URL}/do?token=${token}`;

  // 保存当前历史栈长度，用于验证完成后返回
  if (!sessionStorage.getItem("faceVerifyHistoryStackLength")) {
    sessionStorage.setItem("faceVerifyHistoryStackLength", window.history.length.toString());
  }

  // 跳转到 FaceId 页面
  window.location.href = faceIdUrl;
}

/**
 * 检查 FaceId 验证结果是否通过
 */
export function isFaceIdResultPassed(result: FaceIdResult): boolean {
  if (result.liveness_result?.result !== "PASS") {
    return false;
  }

  const resultRef1 = result.verify_result?.result_ref1;
  if (!resultRef1) {
    return false;
  }

  const { confidence, thresholds } = resultRef1;
  if (confidence === undefined || !thresholds?.["1e-4"]) {
    return false;
  }

  return confidence > thresholds["1e-4"];
}

```
