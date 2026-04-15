---
title: PhoneNumber
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: PhoneNumber.tsx
---

# PhoneNumber

```tsx
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import NavigationBar from "@/components/NavigationBar";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { useLoading } from "@/hooks/useLoading";
import { useLockFn } from "@/hooks/useLockFn";
import { toast } from "@/utils/toast";
import { goBack } from "@/utils/navigation";
import { useAutoFocus } from "@/hooks/useAutoFocus";
import { formatUsPhone, parseUsPhone, US_PHONE_FORMATTED_LENGTH } from "@/utils/phone";

export default function PhoneNumber() {
  const navigate = useNavigate();
  const { userInfo, updateProfile } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const [value, setValue] = useState(() => parseUsPhone(userInfo?.phoneNumber));
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoFocus(inputRef);

  const isValid = value.length >= US_PHONE_FORMATTED_LENGTH;

  const handleChange = useCallback((text: string) => {
    setValue(formatUsPhone(text));
  }, []);

  const handleSave = useLockFn(async () => {
    if (!isValid) return;
    showLoading();
    try {
      await updateProfile({ phoneNumber: `+1 ${value}` });
      goBack(navigate);
    } catch {
      toast.error("Save failed");
    } finally {
      hideLoading();
    }
  });

  return (
    <Layout showTabBar={false}>
      <div className="flex flex-col h-full bg-white">
        <NavigationBar title="" showBorder={false} />

        <div className="flex-1 flex flex-col items-center pb-6">
          <h1 className="text-sm font-light text-center">Your Phone Number</h1>

          <div className="flex items-center justify-center w-[calc(100%-74px)] h-12 mt-6 text-[#012269] text-lg font-medium border-b-[0.5px] border-b-[rgba(0,0,0,0.1)]">
            <span className="shrink-0">+1</span>
            <input
              ref={inputRef}
              type="tel"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className="ml-1 w-[14ch] border-none outline-none bg-transparent text-[#012269] text-lg font-medium caret-[#012269]"
            />
          </div>

          <div className="flex-grow" />

          <div className="w-full shrink-0 px-8">
            <Button onClick={handleSave} disabled={!isValid} variant="primary">
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

```
