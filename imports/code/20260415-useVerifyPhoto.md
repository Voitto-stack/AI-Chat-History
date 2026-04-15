---
title: useVerifyPhoto
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useVerifyPhoto.ts
---

# useVerifyPhoto

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useTask } from "@/hooks/useTask";
import { useLoading } from "@/hooks/useLoading";
import { getAvatarUrl } from "@/utils/userUtil";
import { isApp, redirectToFaceIdPage } from "@/utils/bridge";
import { compressImage, readFileAsDataUrl } from "@/utils/fileUtils";
import { urlToDataUrl, dataURLtoFile } from "@/utils/imageUtil";
import { toast } from "@/utils/toast";
import { goBack } from "@/utils/navigation";
import { TaskId } from "@/types/task";
import { requestFaceIdToken, verifyFaceIdResult } from "@/http/faceIdApi";
import { faceScore } from "@/http/api";
import { redirectToFaceIdWeb, getBizIdFromUrl, parseTokenErrorType } from "@/utils/faceId";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

export function useVerifyPhoto() {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { finishTask } = useTask();
  const { showLoading, hideLoading } = useLoading();

  const [imageSrc, setImageSrc] = useState(() => getAvatarUrl(userInfo));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasPickedNewPhoto, setHasPickedNewPhoto] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const pendingCropRef = useRef(false);

  // ==================== 回跳处理 ====================

  useEffect(() => {
    const bizId = getBizIdFromUrl();
    if (bizId) {
      handleFaceIdReturn(bizId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 旷视 H5 回跳后，提交 bizId 给后端做统一校验 */
  const handleFaceIdReturn = async (bizId: string) => {
    showLoading();
    try {
      const result = await verifyFaceIdResult(bizId);

      if (result.verified) {
        // 埋点：验证成功
        bpTrack(EventName.pwa_conv_verify_success, {
          verify_method: "web",
          biz_id: bizId,
        });
        setShowSuccessCard(true);
      } else {
        // 埋点：验证失败
        bpTrack(EventName.pwa_conv_verify_fail, {
          verify_method: "web",
          biz_id: bizId,
          fail_reason: result.message || "unknown",
        });
        toast.error(result.message || "Face verification failed. Please upload a different photo.");
        setHasPickedNewPhoto(true);
        setShowPhotoModal(true);
      }
    } catch (error) {
      // 埋点：验证失败（异常）
      bpTrack(EventName.pwa_conv_verify_fail, {
        verify_method: "web",
        biz_id: bizId,
        fail_reason: error instanceof Error ? error.message : "exception",
      });
      toast.error("Face verification failed. Please try again.");
      setHasPickedNewPhoto(true);
      setShowPhotoModal(true);
    } finally {
      hideLoading();
    }
  };

  const handleBack = useCallback(() => {
    goBack(navigate);
  }, [navigate]);

  // ==================== 照片处理 ====================

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgSize({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  };

  useEffect(() => {
    if (pendingCropRef.current && imgSize.width > 0) {
      setShowCropModal(true);
      pendingCropRef.current = false;
    }
  }, [imgSize]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImageSrc(dataUrl);
      setImageFile(file);
      pendingCropRef.current = true;
    } catch {
      toast.error("Failed to load image. Please try another photo.");
    }

    event.target.value = "";
  };

  const triggerFileInput = (capture: boolean) => {
    // 埋点：上传新照片点击
    bpTrack(EventName.pwa_verify_photo_page_upload_new_photo_click, {
      source: capture ? "camera" : "album",
    });

    const input = fileInputRef.current;
    if (!input) return;

    if (capture) {
      input.setAttribute("capture", "environment");
    } else {
      input.removeAttribute("capture");
    }
    input.click();
    setShowPhotoModal(false);
    setShowPhotoModal(false);
  };

  const handleCropComplete = useCallback(
    ({ imageUrl, imageFile: croppedFile }: { imageUrl: string; imageFile: File }) => {
      setImageSrc(imageUrl);
      setImageFile(croppedFile);
      setShowCropModal(false);
      setHasPickedNewPhoto(true);
    },
    [],
  );

  const getImageBase64 = async (): Promise<string> => {
    if (imageFile) {
      return await readFileAsDataUrl(imageFile);
    }
    return await urlToDataUrl(imageSrc);
  };

  // ==================== 验证流程 ====================

  /** 颜值分校验：appearance < 60 不允许通过 */
  const checkBeautyScore = async (): Promise<boolean> => {
    if (!userInfo?.userId) return false;

    try {
      // 获取图片 base64，压缩后用于打分
      let scoreFile: File;
      if (imageFile) {
        scoreFile = await compressImage(imageFile, 0.05, 300);
      } else {
        const file = await dataURLtoFile(imageSrc);
        scoreFile = await compressImage(file, 0.05, 300);
      }
      const scoreBase64 = await readFileAsDataUrl(scoreFile);

      const response = await faceScore({
        userId: userInfo.userId,
        imageUrl: scoreBase64,
      });

      const appearance = response.beautyScore?.appearance ?? 0;
      const pass = appearance >= 60;

      // 埋点：颜值分检测结果
      bpTrack(EventName.pwa_verify_photo_beauty_score, {
        beauty_score: appearance,
        pass,
      });

      if (!pass) {
        toast.error("Photo doesn't meet requirements. Please upload a clear, well-lit photo of your face.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Beauty score check failed:", error);
      toast.error("Photo doesn't meet requirements. Please upload a clear, well-lit photo of your face.");
      return false;
    }
  };

  const handleVerify = async () => {
    // 埋点：验证按钮点击
    bpTrack(EventName.pwa_conv_verify_btn_click, {
      verify_method: isApp() ? "app" : "web",
      has_picked_new_photo: hasPickedNewPhoto,
    });
    bpTrack(EventName.pwa_verify_photo_page_verify_click);

    showLoading();

    try {
      // 先校验颜值分
      const passed = await checkBeautyScore();
      if (!passed) {
        hideLoading();
        return;
      }

      if (isApp()) {
        console.log("handleVerifyInApp");
        await handleVerifyInApp();
      } else {
        console.log("handleVerifyInWeb");
        await handleVerifyInWeb();
      }
    } catch {
      toast.error("Verification failed. Please try again.");
      hideLoading();
    }
  };

  /** App 端：通过 Bridge 调用原生 FaceID */
  const handleVerifyInApp = async () => {
    const uuid = crypto.randomUUID();
    const bizNo = `${Math.floor(Date.now() / 1000)}-${crypto.randomUUID()}`;

    const result = await redirectToFaceIdPage(imageSrc, uuid, bizNo);

    if (result.startsWith("error:NO_FACE_FOUND")) {
      toast.error("No face detected. Please upload a clear photo showing your face.");

      // 埋点：验证失败
      bpTrack(EventName.pwa_conv_verify_fail, {
        verify_method: "app",
        fail_reason: "NO_FACE_FOUND",
      });
      toast.error("No face detected in uploaded image");
      setHasPickedNewPhoto(true);
      setShowPhotoModal(true);
      hideLoading();
      return;
    }

    if (result.startsWith("error:MULTIPLE_FACES")) {
      toast.error("Multiple faces detected. Please upload a photo of just yourself.");

      // 埋点：验证失败
      bpTrack(EventName.pwa_conv_verify_fail, {
        verify_method: "app",
        fail_reason: "MULTIPLE_FACES",
      });
      toast.error("Multiple faces detected in uploaded image");
      setHasPickedNewPhoto(true);
      setShowPhotoModal(true);
      hideLoading();
      return;
    }

    if (result === "true") {
      // 埋点：验证成功
      bpTrack(EventName.pwa_conv_verify_success, {
        verify_method: "app",
        biz_no: bizNo,
      });
      setShowSuccessCard(true);
      hideLoading();
    } else {
      // 埋点：验证失败
      bpTrack(EventName.pwa_conv_verify_fail, {
        verify_method: "app",
        fail_reason: result,
      });
      toast.error("Face verification failed. Please try again.");
      setHasPickedNewPhoto(true);
      setShowPhotoModal(true);
      hideLoading();
    }
  };

  /** Web 端：后端获取 Token → 跳转旷视 H5 */
  const handleVerifyInWeb = async () => {
    const imageBase64 = await getImageBase64();
    const result = await requestFaceIdToken(imageBase64);

    if (result.code === 1 && result.faceIdUrl) {
      redirectToFaceIdWeb(result.faceIdUrl);
    } else {
      const errorType = parseTokenErrorType(result.message);
      switch (errorType) {
        case "NO_FACE_FOUND":
          toast.error("No face detected. Please upload a clear photo showing your face.");
          setShowPhotoModal(true);
          break;
        case "MULTIPLE_FACES":
          toast.error("Multiple faces detected. Please upload a photo of just yourself.");
          setShowPhotoModal(true);
          break;
        default:
          toast.error(result.message || "Failed to process image. Please try again.");
          break;
      }
      hideLoading();
    }
  };

  /**
   * 验证成功后的处理
   * 完成任务（触发奖励弹窗）+ 更新 UI
   */
  const handleVerifySuccess = async () => {
    setShowSuccessCard(false);
    setIsVerified(true);

    await finishTask(TaskId.FaceVerify);

    navigate("/");
  };

  return {
    // state
    imageSrc,
    imageFile,
    imgSize,
    showPhotoModal,
    showCropModal,
    showSuccessCard,
    isVerified,
    hasPickedNewPhoto,
    // refs
    fileInputRef,
    imgRef,
    // actions
    setShowPhotoModal,
    setShowCropModal,
    handleBack,
    handleImageLoad,
    handleFileChange,
    triggerFileInput,
    handleCropComplete,
    handleVerify,
    handleVerifySuccess,
  };
}

```
