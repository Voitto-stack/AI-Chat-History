---
title: callStore
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: callStore.ts
---

# callStore

```ts
import { create } from "zustand";
import { CallState } from "@/types/call";
import { UserInfo } from "@sitin/api-proto/gen/archat_api/user_api";

export const DEFAULT_RELEASE_PRICE = 1.5;

/**
 * CallStore - 通话状态管理
 *
 * 应用 Vercel 最佳实践:
 * - rerender-defer-reads: 状态与业务逻辑分离
 * - rerender-state-minimal: 最小化状态更新
 */

export interface CallStoreState {
  /** 当前通话状态 */
  callState: CallState;

  /** 远程用户信息 */
  remoteUserInfo: UserInfo;

  /** 是否有免费通话时长 */
  hasFreeCallDuration: boolean;

  /** NoFace 遮盖是否可见（仅视频通话） */
  noFaceVisible: boolean;

  /** NoVoice 遮盖是否可见（仅视频通话，mock 除外） */
  noVoiceVisible: boolean;

  /** 真实通话每分钟单价（美元） */
  releasePrice: number;

  /** 设置远程用户信息 */
  setRemoteUserInfo: (remoteUserInfo: UserInfo) => void;

  /** 设置通话状态 */
  setCallState: (callState: CallState) => void;

  /** 设置免费通话时长状态 */
  setHasFreeCallDuration: (hasFreeCallDuration: boolean) => void;

  /** 显示 NoFace 遮盖（同时隐藏 NoVoice） */
  showNoFace: () => void;

  /** 隐藏 NoFace 遮盖 */
  hideNoFace: () => void;

  /** 显示 NoVoice 遮盖 */
  showNoVoice: () => void;

  /** 隐藏 NoVoice 遮盖 */
  hideNoVoice: () => void;

  /** 设置真实通话单价 */
  setReleasePrice: (price: number) => void;

  /** 重置通话状态 */
  resetCall: () => void;
}

export const useCallStore = create<CallStoreState>()((set) => ({
  callState: CallState?.Idle,
  remoteUserInfo: {},
  hasFreeCallDuration: false,
  noFaceVisible: false,
  noVoiceVisible: false,
  releasePrice: DEFAULT_RELEASE_PRICE,

  setRemoteUserInfo: (remoteUserInfo) => {
    set({ remoteUserInfo });
  },

  setCallState: (callState) => {
    set({ callState });
  },

  setHasFreeCallDuration: (hasFreeCallDuration) => {
    set({ hasFreeCallDuration });
  },

  showNoFace: () => {
    set({ noFaceVisible: true, noVoiceVisible: false });
  },

  hideNoFace: () => {
    set({ noFaceVisible: false });
  },

  showNoVoice: () => {
    set({ noVoiceVisible: true });
  },

  hideNoVoice: () => {
    set({ noVoiceVisible: false });
  },

  setReleasePrice: (releasePrice) => {
    set({ releasePrice });
  },

  resetCall: () => {
    set({
      callState: CallState?.Idle,
      hasFreeCallDuration: false,
      noFaceVisible: false,
      noVoiceVisible: false,
    });
  },
}));

```
