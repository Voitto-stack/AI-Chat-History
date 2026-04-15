---
title: CreatePost
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: CreatePost.tsx
---

# CreatePost

```tsx
import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CreatePostResult, PostPicture } from "@sitin/api-proto/gen/archat_api/post_api";
import { createPost, postSuggestedContent } from "@/http/postApi";
import { compressImage } from "@/utils/fileUtils";
import { usePost } from "@/hooks/usePost";
import { useLockFn } from "@/hooks/useLockFn";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { toast } from "@/utils/toast";
import { goBack } from "@/utils/navigation";
import Layout from "@/components/Layout";
import NavigationBar from "@/components/NavigationBar";
import ImagePicker, { type ImagePickerRef } from "./ImagePicker";

/** 尝试从 JSON 格式的 AI 响应中提取纯文本 */
function extractTextFromAiResponse(raw: string): string {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
    if (typeof parsed.text === "string") return parsed.text;
    if (typeof parsed.content === "string") return parsed.content;
    if (typeof parsed.caption === "string") return parsed.caption;
    if (typeof parsed.suggested_content === "string") return parsed.suggested_content;
    if (typeof parsed.suggestedContent === "string") return parsed.suggestedContent;
  } catch {
    // 不是 JSON，直接返回原始字符串
  }
  return raw;
}

const POST_COOLDOWN_HOURS = 3;
const AI_COMPRESS_MAX_SIZE_MB = 0.05;
const AI_COMPRESS_MAX_DIMENSION = 512;

function checkPostCooldown(): boolean {
  const raw = localStorage.getItem(STORAGE_KEYS.LAST_POST_TIME);
  if (!raw) return true;
  const elapsed = (Date.now() - parseInt(raw, 10)) / (1000 * 60 * 60);
  return elapsed >= POST_COOLDOWN_HOURS;
}

export default function CreatePost() {
  const navigate = useNavigate();
  const { fetchMyPosts } = usePost();
  const imagePickerRef = useRef<ImagePickerRef>(null);

  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasUserTypedRef = useRef(false);
  const lastAiContentRef = useRef("");
  const requestSeqRef = useRef(0);
  const contentRef = useRef(content);
  contentRef.current = content;

  /**
   * 图片变更后自动请求 AI 文案建议
   * 仅当文本为空或仍是上一次 AI 生成的文案时，才覆盖
   */
  const handleImagesChange = useCallback(async (files: File[]) => {
    if (!files.length) {
      return;
    }

    if (hasUserTypedRef.current) {
      console.log("[CreatePost] 用户已手动输入，跳过 AI 文案请求");
      return;
    }

    const seq = ++requestSeqRef.current;
    setIsGenerating(true);

    try {
      // 压缩图片
      const pictures: PostPicture[] = await Promise.all(
        files.map(async (file) => {
          const compressed = await compressImage(file, AI_COMPRESS_MAX_SIZE_MB, AI_COMPRESS_MAX_DIMENSION);
          const buf = await compressed.arrayBuffer();
          return { name: compressed.name, file: new Uint8Array(buf) };
        }),
      );

      console.log("[CreatePost] 开始请求 AI 文案建议, 图片数量:", files.length);
      const res = await postSuggestedContent({
        pictures,
        timezoneOffsetMinutes: new Date().getTimezoneOffset(),
      });
      console.log("[CreatePost] AI 文案建议请求完成:", res);

      if (seq !== requestSeqRef.current) {
        console.log("[CreatePost] 忽略过期请求结果 (seq:", seq, "latest:", requestSeqRef.current, ")");
        return;
      }

      if (res.suggestedContent) {
        if (hasUserTypedRef.current) {
          console.log("[CreatePost] 用户已手动输入，放弃应用 AI 文案");
          return;
        }

        const text = extractTextFromAiResponse(res.suggestedContent);
        const current = contentRef.current.trim();
        if (!current || current === lastAiContentRef.current.trim()) {
          console.log("[CreatePost] 已应用 AI 文案到文本框:", text);
          lastAiContentRef.current = text;
          setContent(text);
        }
      } else {
        console.log("[CreatePost] 请求成功但返回文案为空");
      }
    } catch (error) {
      console.error("[CreatePost] AI 文案建议请求出错:", error);
    } finally {
      if (seq === requestSeqRef.current) {
        setIsGenerating(false);
      }
    }
  }, []);

  const submitHandler = useCallback(async () => {
    const images = await imagePickerRef.current?.getImages();
    const hasContent = content.trim().length > 0;
    const hasImages = images && images.length > 0;

    if (!hasContent && !hasImages) {
      toast.info("Please input content or upload images");
      return;
    }

    if (!checkPostCooldown()) {
      toast.info("You're posting too often. Try again in 3 hours");
      return;
    }

    setIsSubmitting(true);
    try {
      const pictures: PostPicture[] = (images || []).map((img) => ({
        name: img.name,
        file: img.data,
      }));

      console.log("[CreatePost] 开始提交发布帖子, 内容长度:", content.trim().length, "图片数量:", pictures.length);
      const res = await createPost({ content: content.trim(), pictures });
      console.log("[CreatePost] 发布帖子请求完成, 结果代码:", res.code, "消息:", res.message);

      switch (res.code) {
        case CreatePostResult.SuccessResult:
          localStorage.setItem(STORAGE_KEYS.LAST_POST_TIME, Date.now().toString());
          // Backend as SSoT
          await fetchMyPosts(true);
          goBack(navigate, "/me");
          return;

        case CreatePostResult.FileSizeNotSupported:
          toast.error("Image is too large, please select another one");
          break;

        case CreatePostResult.FileTypeNotSupported:
          toast.error("Image type not supported, please select another one");
          break;

        case CreatePostResult.PostContentNotSafe:
          toast.error("Post content violates our guidelines");
          break;

        default:
          toast.error(res.message || "Failed to create post");
          break;
      }
    } catch (error) {
      console.error("[CreatePost] 发布帖子请求出错:", error);
      toast.error("Network error, please try again");
    } finally {
      setIsSubmitting(false);
    }
  }, [content, fetchMyPosts, navigate]);

  const handleSubmit = useLockFn(submitHandler);

  return (
    <Layout showTabBar={false}>
      <div className="flex flex-col h-full bg-white">
        <NavigationBar
          leftIcon="close"
          onBack={() => goBack(navigate, "/me")}
          showBorder={false}
          rightSlot={
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isGenerating}
              className="px-4 py-1.5 min-h-[32px] text-sm font-medium text-white bg-blue-500 rounded-full border-none disabled:opacity-40"
            >
              {isSubmitting || isGenerating ? (
                <span className="flex items-center justify-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
                </span>
              ) : (
                "Post"
              )}
            </button>
          }
        />

        {/* 内容区 */}
        <div className="flex-1 flex flex-col gap-4 px-4 py-4 overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => {
              hasUserTypedRef.current = true;
              setContent(e.target.value);
            }}
            placeholder="What's on your mind?"
            className="w-full min-h-[50px] text-base text-gray-900 placeholder:text-gray-400 font-light bg-transparent border-none outline-none resize-none"
          />
          <ImagePicker ref={imagePickerRef} onImagesChange={handleImagesChange} />
        </div>
      </div>
    </Layout>
  );
}

```
