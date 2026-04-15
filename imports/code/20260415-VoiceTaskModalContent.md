---
title: VoiceTaskModalContent
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: VoiceTaskModalContent.tsx
---

# VoiceTaskModalContent

```tsx
import { useEffect } from "react";
import { DragHandle } from "./DragHandle";
import { showVoiceRecordModal } from "./showVoiceRecordModal";
import Button from "./Button";
import icAudio from "@/assets/images/task_detail/ic_audio.webp";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface VoiceTaskModalContentProps {
  onClose: () => void;
  voiceType: "first" | "second" | "third" | "forth";
}

const INSTRUCTIONS = [
  "Find a quiet place",
  "Enable Microphone access when prompted",
  "Read the text aloud when prompted",
  'Tap "Start Recording" when ready',
];

export default function VoiceTaskModalContent({ onClose, voiceType }: VoiceTaskModalContentProps) {
  // 埋点：录音任务页面显示
  useEffect(() => {
    bpTrack(EventName.pwa_earnings_record_audio_click, {
      voice_type: voiceType,
      scene: "voice_task",
    });
  }, [voiceType]);

  const onClick = () => {
    // 埋点：开始录音点击
    bpTrack(EventName.pwa_earnings_record_audio_click, {
      voice_type: voiceType,
      action: "start_recording",
      scene: "voice_task",
    });
    showVoiceRecordModal(voiceType, onClose);
  };

  return (
    <div data-bottom-sheet className="w-full bg-white rounded-t-[20px] flex flex-col h-[94vh] overflow-hidden">
      <DragHandle onClose={onClose} backgroundColor="bg-white" />
      <div className="flex flex-col px-3.5 py-3.5 overflow-y-auto flex-1 text-brand-dark">
        {/* Task Header */}
        <div className="flex flex-row items-center mb-6">
          <img src={icAudio} alt="Voice Recording" className="w-[55px] h-[55px] rounded-full object-cover" />
          <div className="flex flex-col items-start ml-3 gap-1">
            <span className="text-brand-dark/50 font-semibold text-xs ">Voice Recording Task</span>
            <span className="text-brand-dark font-semibold text-sm">Record a voice greeting</span>
            <span className="px-2 rounded-[10px] bg-[#6bc4ff] text-brand-dark font-medium text-[10px]">
              In Progress
            </span>
          </div>
        </div>

        {/* Rewards Container */}
        <div className="flex flex-col rounded-[14px] bg-[#d1edff] mb-5">
          <div className="flex flex-row items-center px-3.5 py-[18px]">
            <span className="flex-grow text-brand-dark font-medium text-sm">Total Rewards</span>
            <span className="text-[#212d64] text-xl" style={{ fontFamily: "RacingSansOne, serif" }}>
              $0.30
            </span>
          </div>
          <div className="h-px bg-white/40" />
          <div className="flex flex-row items-center px-3.5 py-[18px]">
            <span className="flex-grow text-brand-dark font-medium text-sm">Estimated Time</span>
            <span className="text-[#212d64] text-xl" style={{ fontFamily: "RacingSansOne, serif" }}>
              45 secs
            </span>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="flex flex-col flex-1 pb-5">
          <span className="font-medium text-lg mb-5">Instructions</span>
          <div className="flex flex-col gap-3.5">
            {INSTRUCTIONS.map((instruction, index) => (
              <div key={index} className="flex items-baseline">
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#d1edff] text-brand font-semibold text-xs">
                  {index + 1}
                </span>
                <span className="ml-2.5 font-medium text-sm opacity-70">{instruction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex-shrink-0 pt-2.5">
          <Button onClick={onClick} variant="primary">
            Start Recording
          </Button>
        </div>
      </div>
    </div>
  );
}

```
