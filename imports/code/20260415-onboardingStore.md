---
title: onboardingStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: onboardingStore.ts
---

# onboardingStore

```ts
import { create } from "zustand";

export interface OnboardingState {
  inputUserName: string;
  inputAge: number;
  inputGender: "MALE" | "FEMALE" | "UNSPECIFIED";
  inputPhoneNumber: string;
  avatarUri: string;
  currentPage: number;
  latestPage: number;
  fakeCash: number;
  setInputUserName: (name: string) => void;
  setInputAge: (age: number) => void;
  setInputGender: (gender: "MALE" | "FEMALE" | "UNSPECIFIED") => void;
  setInputPhoneNumber: (phone: string) => void;
  setAvatarUri: (uri: string) => void;
  setCurrentPage: (page: number) => void;
  setLatestPage: (page: number) => void;
  setFakeCash: (cash: number) => void;
  reset: () => void;
}

const initialState = {
  inputUserName: "",
  inputAge: 0,
  inputGender: "UNSPECIFIED" as const,
  inputPhoneNumber: "",
  avatarUri: "",
  currentPage: 1,
  latestPage: 0,
  fakeCash: 0,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setInputUserName: (name: string) => set({ inputUserName: name }),
  setInputAge: (age: number) => set({ inputAge: age }),
  setInputGender: (gender: "MALE" | "FEMALE" | "UNSPECIFIED") => set({ inputGender: gender }),
  setInputPhoneNumber: (phone: string) => set({ inputPhoneNumber: phone }),
  setAvatarUri: (uri: string) => set({ avatarUri: uri }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setLatestPage: (page: number) => set({ latestPage: page }),
  setFakeCash: (cash: number) => set({ fakeCash: cash }),
  reset: () => set(initialState),
}));

```
