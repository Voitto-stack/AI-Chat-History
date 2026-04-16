---
title: PhoneNumber
date: 2026-04-16T11:07:55+08:00
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
import Input from "@/pages/Onboarding/Input";

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
      <div className="flex flex-col h-full bg-surface">
        <NavigationBar title="" />

        <div className="flex-1 flex flex-col p-6">
          <Input title="Your Phone Number" titleClassName="text-xl font-bold capitalize text-brand-dark">
            <div className="flex items-center justify-center w-[80%] h-14 mt-10 border-b-[0.5px] border-b-[#e5e5ea] overflow-hidden">
              <span className="text-black/30 font-medium text-[22px] leading-7 mr-2 shrink-0">+1</span>
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="off"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1 min-w-0 h-full p-0 border-0 bg-transparent text-black font-medium text-[28px] leading-7 text-left focus:outline-none autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent]"
              />
            </div>
          </Input>

          <Button onClick={handleSave} disabled={!isValid} variant="primary" className="shrink-0">
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
}

```
