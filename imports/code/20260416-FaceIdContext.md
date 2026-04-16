---
title: FaceIdContext
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: FaceIdContext.tsx
---

# FaceIdContext

```tsx
/**
 * FaceId Context - 管理人脸识别验证流程
 */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";
import {
  getFaceIdToken,
  getFaceIdResult,
  redirectToFaceIdPage,
  generateBizNo,
  generateUUID,
  dataURLtoFile,
  isFaceIdResultPassed,
  type FaceIdSuccessResponse,
  type FaceIdErrorResponse,
  type FaceIdResult,
} from "@/utils/faceIdUtils";
import { toast } from "@/utils/toast";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface FaceIdContextType {
  /**
   * 当前的 FaceId Token
   */
  token: string | null;

  /**
   * 开始人脸验证流程
   * @param imageFile 头像文件
   * @param imageSrc 头像 URL（Data URL 或普通 URL）
   * @param returnUrl 验证完成后的回调 URL
   * @returns 是否成功启动验证
   */
  startFaceVerification: (imageFile: File | undefined, imageSrc: string, returnUrl: string) => Promise<boolean>;

  /**
   * 获取人脸验证结果
   * @param bizId 业务 ID
   * @returns 验证结果
   */
  getFaceVerificationResult: (bizId: string) => Promise<{
    passed: boolean;
    result: FaceIdResult | null;
    errorMessage?: string;
  }>;
}

const FaceIdContext = createContext<FaceIdContextType | undefined>(undefined);

/**
 * 使用 FaceId Context
 */
export function useFaceId() {
  const context = useContext(FaceIdContext);
  if (!context) {
    throw new Error("useFaceId must be used within a FaceIdProvider");
  }
  return context;
}

/**
 * FaceId Provider
 */
export function FaceIdProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("faceIdToken") || null);

  /**
   * 开始人脸验证流程
   */
  const startFaceVerification = async (
    imageFile: File | undefined,
    imageSrc: string,
    returnUrl: string,
  ): Promise<boolean> => {
    try {
      // 埋点：开始获取 FaceId Token
      const startTime = Date.now();

      // 准备参数
      const bizNo = generateBizNo();
      const comparisonType = "0"; // 0: 活体+比对
      const uuid = generateUUID();
      // Megvii API 不接受 localhost，使用占位符或生产环境域名
      const notifyUrl =
        window.location.hostname === "localhost"
          ? "https://app.gracechat.com" // 使用生产环境域名作为占位符
          : window.location.origin;

      // 转换图片为 File 对象
      let file: File;
      if (imageFile) {
        file = imageFile;
      } else {
        file = await dataURLtoFile(imageSrc);
      }

      // 调用 FaceId API 获取 Token
      const result = await getFaceIdToken({
        bizNo,
        comparisonType,
        uuid,
        imageRef: file,
        returnUrl,
        notifyUrl,
      });

      // 埋点：获取 Token 耗时
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      bpTrack(EventName.pwa_avatar_get_face_id_token, { time: duration });
      bpTrack(EventName.pwa_face_get_face_id_token, { time: duration });

      // 处理错误响应
      if ("error_message" in result) {
        const errorResponse = result as FaceIdErrorResponse;
        const errorDetails = {
          error_message: errorResponse.error_message,
          request_id: errorResponse.request_id,
          time_used: errorResponse.time_used,
          bizNo,
          uuid,
        };

        console.error("❌ FaceId Token 获取失败:", errorDetails);

        // 根据错误类型显示不同提示
        switch (errorResponse.error_message) {
          case "NO_FACE_FOUND":
            console.error("拒绝原因: 上传的图片中未检测到人脸");
            toast.error("No face detected. Please upload a clear photo showing your face.");
            break;
          case "MULTIPLE_FACES":
            console.error("拒绝原因: 上传的图片中检测到多张人脸");
            toast.error("Multiple faces detected. Please upload a photo of just yourself.");
            break;
          default:
            console.error("拒绝原因: 未知错误 -", errorResponse.error_message);
            toast.error("Failed to verify image, please try another photo");
        }

        return false;
      }

      // 保存 Token 并跳转到 FaceId 页面
      const successResponse = result as FaceIdSuccessResponse;
      localStorage.setItem("faceIdToken", successResponse.token);
      setToken(successResponse.token);

      // 埋点：跳转到人脸识别页面
      bpTrack(EventName.pwa_avatar_face_liveness_page_show);
      bpTrack(EventName.pwa_face_liveness_detection_page_show);

      // 跳转到 FaceId 页面
      redirectToFaceIdPage(successResponse.token);

      return true;
    } catch (error) {
      console.error("Error starting face verification:", error);
      toast.error("Failed to start face verification, please try again");
      return false;
    }
  };

  /**
   * 获取人脸验证结果
   */
  const getFaceVerificationResult = async (
    bizId: string,
  ): Promise<{
    passed: boolean;
    result: FaceIdResult | null;
    errorMessage?: string;
  }> => {
    try {
      const result = await getFaceIdResult(bizId);

      if (!result) {
        console.error("❌ 获取验证结果失败: 无法从服务器获取结果", { bizId });
        return {
          passed: false,
          result: null,
          errorMessage: "Failed to get verification result",
        };
      }

      // 检查活体检测结果
      if (result.liveness_result?.result !== "PASS") {
        const livenessResult = result.liveness_result?.result || "UNKNOWN";
        const confidence = result.liveness_result?.confidence;
        console.error("❌ 活体检测失败:", {
          bizId,
          result: livenessResult,
          confidence,
          reason: "用户未通过活体检测，可能是照片、视频或其他非真人操作",
        });
        bpTrack(EventName.pwa_avatar_liveness_result, {
          result: "liveness failure",
          liveness_result: livenessResult,
          confidence,
        });
        bpTrack(EventName.pwa_liveness_detection_result, {
          result: "liveness failure",
        });
        return {
          passed: false,
          result,
          errorMessage: "Liveness detection failed",
        };
      }

      // 检查人脸比对结果
      const passed = isFaceIdResultPassed(result);

      if (passed) {
        const confidence = result.verify_result?.result_ref1?.confidence;
        console.log("✅ 人脸验证通过:", {
          bizId,
          confidence,
          liveness: result.liveness_result?.result,
        });
        bpTrack(EventName.pwa_avatar_liveness_result, {
          result: "success",
          confidence,
        });
        bpTrack(EventName.pwa_liveness_detection_result, {
          result: "success",
        });
        // 广告埋点：人脸验证完成
        bpTrack(EventName.ad_FaceVerifyComplete, {
          confidence,
          biz_id: bizId,
        });
      } else {
        const confidence = result.verify_result?.result_ref1?.confidence;
        const threshold = result.verify_result?.result_ref1?.thresholds?.["1e-4"];
        console.error("❌ 人脸比对失败:", {
          bizId,
          confidence,
          threshold,
          reason: `相似度不足，置信度 ${confidence?.toFixed(4)} 低于阈值 ${threshold?.toFixed(4)}`,
          liveness: result.liveness_result?.result,
        });
        bpTrack(EventName.pwa_avatar_liveness_result, {
          result: "verify failure",
          confidence,
          threshold,
        });
        bpTrack(EventName.pwa_liveness_detection_result, {
          result: "verify failure",
        });
      }

      return {
        passed,
        result,
        errorMessage: passed ? undefined : "Face verification failed",
      };
    } catch (error) {
      console.error("Error getting face verification result:", error);
      return {
        passed: false,
        result: null,
        errorMessage: "Error getting verification result",
      };
    }
  };

  return (
    <FaceIdContext.Provider
      value={{
        token,
        startFaceVerification,
        getFaceVerificationResult,
      }}
    >
      {children}
    </FaceIdContext.Provider>
  );
}

```
