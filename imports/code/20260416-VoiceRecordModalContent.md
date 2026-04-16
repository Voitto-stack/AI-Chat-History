---
title: VoiceRecordModalContent
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: VoiceRecordModalContent.tsx
---

# VoiceRecordModalContent

```tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { TaskId } from "@/types/task";
import { toast } from "@/utils/toast";
import { useLoading } from "@/hooks/useLoading";
import { useTask } from "@/hooks/useTask";
import { uploadVoiceGreeting } from "@/http/api";
import { UserServiceCommonCode } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { convertWebMToWav, getAudioDuration } from "@/utils/audioUtils";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const MAX_RECORDING_DURATION = 45000; // 45秒
const AUDIO_BAR_COUNT = 20;
const AUDIO_MIME_TYPE = "audio/webm;codecs=opus";
const FFT_SIZE = 1024;

// 音频上下文状态（用于控制音频分析和波形显示）
enum AudioContextState {
  SUSPENDED = "suspended", // 已暂停
  RUNNING = "running", // 运行中
  CLOSED = "closed", // 已关闭
}

// 录音器状态（用于控制录音和保存音频文件）
enum RecordingState {
  INACTIVE = "inactive", // 未录音
  RECORDING = "recording", // 录音中
  PAUSED = "paused", // 已暂停
}

// type配置
export const VOICE_TYPE_CONFIG = {
  first: {
    title: "Scenario 1",
    text: "You matched with someone you like on a dating app. How would you greet them?",
    taskId: TaskId.RecordFirstVoiceMessage,
  },
  second: {
    title: "Scenario 2",
    text: "Sing a few lines from your favorite song (vocals must be clear).",
    taskId: TaskId.RecordSecondVoiceMessage,
  },
  third: {
    title: "Scenario 3",
    text: "Tell a friend about something that bothered you today.",
    taskId: TaskId.RecordThirdVoiceMessage,
  },
  forth: {
    title: "Scenario 4",
    text: "Briefly share something recent that made you happy (no dating-related topics).",
    taskId: TaskId.RecordForthVoiceMessage,
  },
} as const;

export interface VoiceRecordModalContentProps {
  onClose: () => void;
  voiceType: "first" | "second" | "third" | "forth";
  onTaskClose?: () => void;
}

export default function VoiceRecordModalContent({ onClose, voiceType, onTaskClose }: VoiceRecordModalContentProps) {
  const { finishTask } = useTask();
  const { showLoading, hideLoading } = useLoading();
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(Array(AUDIO_BAR_COUNT).fill(0));
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentScenario = VOICE_TYPE_CONFIG[voiceType];

  // 使用 ref 保存最新的回调函数，避免闭包问题
  const onCloseRef = useRef(onClose);
  const onTaskCloseRef = useRef(onTaskClose);
  const finishTaskRef = useRef(finishTask);

  useEffect(() => {
    onCloseRef.current = onClose;
    onTaskCloseRef.current = onTaskClose;
    finishTaskRef.current = finishTask;
  }, [onClose, onTaskClose, finishTask]);

  // 更新音频波形数据
  const updateAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // 从频域数据中获取 20 个采样
    const sampleSize = Math.floor(dataArray.length / AUDIO_BAR_COUNT);
    const newAudioData = Array(AUDIO_BAR_COUNT)
      .fill(0)
      .map((_, i) => {
        const start = i * sampleSize;
        const end = start + sampleSize;
        const slice = dataArray.slice(start, end);
        const average = slice.reduce((a, b) => a + b, 0) / slice.length;
        return average / 255; // 归一化到 0-1
      });

    setAudioData(newAudioData);
    animationFrameRef.current = requestAnimationFrame(updateAudio);
  }, []);

  // 清理音频资源
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    if (audioContextRef.current && audioContextRef.current.state !== AudioContextState.CLOSED) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  // 停止录音并清理资源
  const stopAndCleanup = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === RecordingState.RECORDING) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }

    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    mediaRecorderRef.current = null;
  }, []);

  // 开始录音
  const onStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // 埋点：语音转写初始化
      bpTrack(EventName.pwa_voice_transcript_init, {
        voice_type: voiceType,
        task_id: currentScenario.taskId,
      });

      // 设置音频分析
      audioContextRef.current = new AudioContext();
      // 确保 AudioContext 处于运行状态
      if (audioContextRef.current.state === AudioContextState.SUSPENDED) {
        await audioContextRef.current.resume();
      }
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = FFT_SIZE;
      source.connect(analyserRef.current);
      // 开始动画帧更新
      animationFrameRef.current = requestAnimationFrame(updateAudio);
      // 使用 WebM 格式录制
      const recorder = new MediaRecorder(stream, {
        mimeType: AUDIO_MIME_TYPE,
      });
      const audioChunks: BlobPart[] = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      recorder.onstop = async () => {
        const webmBlob = new Blob(audioChunks, { type: "audio/webm" });
        cleanup();
        // 立即关闭录音弹窗
        onCloseRef.current();
        showLoading();
        try {
          // 步骤1: 转换为 WAV 格式
          const wavBlob = await convertWebMToWav(webmBlob);
          // 步骤2: 检查音频时长
          const audio = new Audio();
          const url = URL.createObjectURL(wavBlob);
          audio.src = url;
          const duration = await getAudioDuration(audio);
          URL.revokeObjectURL(url);
          // 步骤3: 上传音频到服务器（后端会自动进行语音转文本和内容审核）
          // 埋点：语音转写上传尝试
          bpTrack(EventName.pwa_voice_transcript_upload_attempt, {
            voice_type: voiceType,
            task_id: currentScenario.taskId,
            duration: duration,
          });

          const uploadResponse = await uploadVoiceGreeting({
            audioBlob: wavBlob,
            duration,
          });
          // 检查上传结果
          if (uploadResponse.code !== UserServiceCommonCode.Success) {
            // 上传失败
            // 埋点：语音转写上传失败
            bpTrack(EventName.pwa_voice_transcript_upload_failed, {
              voice_type: voiceType,
              task_id: currentScenario.taskId,
              error: uploadResponse.message,
            });
            hideLoading();
            toast.error(uploadResponse.message || "Failed to upload voice recording. Please try again.");
            return;
          }

          // 埋点：语音转写上传成功
          bpTrack(EventName.pwa_voice_transcript_upload_success, {
            voice_type: voiceType,
            task_id: currentScenario.taskId,
            duration: duration,
          });
          // 步骤4: 完成任务
          await finishTaskRef.current(currentScenario.taskId);
          // 埋点：录音完成
          bpTrack(EventName.pwa_earnings_record_audio_complete, {
            voice_type: voiceType,
            task_id: currentScenario.taskId,
            duration: duration,
          });
          hideLoading();
          onTaskCloseRef.current?.();
        } catch (error) {
          // 埋点：语音转写上传错误
          bpTrack(EventName.pwa_voice_transcript_upload_error, {
            voice_type: voiceType,
            task_id: currentScenario.taskId,
            error: error instanceof Error ? error.message : "unknown_error",
          });
          hideLoading();
          toast.error(error instanceof Error ? error.message : "Failed to process audio recording");
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      // 45秒后自动停止
      recordingTimerRef.current = setTimeout(() => {
        stopAndCleanup();
      }, MAX_RECORDING_DURATION);
    } catch (error) {
      toast.error("Failed to start recording. Please check microphone permissions.");
    }
  };

  // 停止录音
  const onStop = () => {
    // 埋点：语音转写停止
    bpTrack(EventName.pwa_voice_transcript_stop, {
      voice_type: voiceType,
      task_id: currentScenario.taskId,
    });
    stopAndCleanup();
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      // 埋点：语音转写清理
      bpTrack(EventName.pwa_voice_transcript_cleanup, {
        voice_type: voiceType,
        task_id: currentScenario.taskId,
      });
      cleanup();
      stopAndCleanup();
    };
  }, [cleanup, stopAndCleanup, voiceType]);

  return (
    <>
      <div className="bg-white rounded-xl w-full max-w-[360px] p-5 flex flex-col items-center gap-4">
        {/* 标题和文本 */}
        <h3 className="text-[#333] text-lg font-semibold text-center">{currentScenario.title}</h3>
        <p className="text-[#333] text-base leading-6 text-center">{currentScenario.text}</p>

        {/* 录音按钮或录音动画 */}
        {!isRecording ? (
          <button
            onClick={onStart}
            className="w-full py-3 px-6 bg-[#1c8dff] text-white rounded-md text-base cursor-pointer border-none"
          >
            Record
          </button>
        ) : (
          <div className="w-full flex flex-col items-center gap-6 bg-[#f5f5f5] rounded-xl p-5">
            {/* 波形容器 */}
            <div className="w-full bg-white rounded-2xl p-5 flex tems-center gap-3 shadow-sm">
              <div className="flex items-center gap-2 bg-[rgba(255,77,79,0.1)] px-3 py-1.5 rounded-full self-start">
                <div
                  className="w-2 h-2 bg-[#ff4d4f] rounded-full"
                  style={{
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <span className="text-[#ff4d4f] text-[13px] font-medium">Recording</span>
              </div>

              {/* 音频波形 */}
              <div className="flex items-center justify-center gap-[3px]">
                {audioData.map((value, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-sm"
                    style={{
                      height: `${Math.max(4, value * 40)}px`,
                      background: "linear-gradient(180deg, #1c8dff 0%, #c026d3 100%)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 停止录音按钮 */}
            <button
              onClick={onStop}
              className="w-full py-3 px-6 bg-[#ff4d4f] text-white rounded-md text-base cursor-pointer border-none hover:bg-[#ff7875] transition-colors"
            >
              Stop Recording
            </button>
          </div>
        )}
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

```
