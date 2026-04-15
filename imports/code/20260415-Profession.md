---
title: Profession
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: Profession.tsx
---

# Profession

```tsx
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import NavigationBar from "@/components/NavigationBar";
import Button from "@/components/Button";
import FormErrorMessage from "@/components/FormErrorMessage";
import { useUser } from "@/hooks/useUser";
import { useLoading } from "@/hooks/useLoading";
import { useLockFn } from "@/hooks/useLockFn";
import { toast } from "@/utils/toast";
import { goBack } from "@/utils/navigation";
import { useAutoFocus } from "@/hooks/useAutoFocus";
import { useTask } from "@/hooks/useTask";
import { TaskId } from "@/types/task";
import SkipTaskButton from "@/pages/ProfileTask/SkipTaskButton";
import {
  PERCENT_BY_STEP,
  getTaskNextPath,
  getTaskPrevPath,
  isCompleteProfileDone,
  getTaskStep,
} from "@/pages/ProfileTask/taskMode";

const MAX_LENGTH = 50;

export default function Profession() {
  const navigate = useNavigate();
  const location = useLocation();
  const taskMode = (location.state as { taskMode?: boolean } | null)?.taskMode === true;
  const step = getTaskStep(location.pathname);
  const nextPath = getTaskNextPath(location.pathname);
  const prevPath = getTaskPrevPath(location.pathname);
  const { userInfo, updateProfile, refreshUserInfo } = useUser();
  const { showLoading, hideLoading } = useLoading();
  const { finishTask } = useTask();

  const [value, setValue] = useState(userInfo?.profession || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoFocus(inputRef);

  const isValid = value.trim().length > 0 && value.length <= MAX_LENGTH;

  const handleChange = (text: string) => {
    setValue(text);
    setErrorMessage(text.length > MAX_LENGTH ? `Please keep it within ${MAX_LENGTH} characters` : null);
  };

  const handleSave = useLockFn(async () => {
    if (!isValid) return;
    showLoading();
    try {
      await updateProfile({ profession: value.trim() });

      if (taskMode) {
        // 刷新用户信息以检查是否完成所有资料
        await refreshUserInfo();
        if (isCompleteProfileDone(userInfo)) {
          await finishTask(TaskId.CompleteProfile);
        }
        navigate(nextPath, nextPath === "/" ? { replace: true } : { state: { taskMode: true } });
      } else {
        goBack(navigate);
      }
    } catch {
      toast.error("Save failed");
    } finally {
      hideLoading();
    }
  });

  return (
    <Layout showTabBar={false}>
      <div className="flex flex-col h-full bg-[#eff8ff]">
        <NavigationBar
          bgColor="bg-[#eff8ff]"
          showBorder={false}
          onBack={() =>
            taskMode
              ? navigate(prevPath, prevPath === "/" ? { replace: true } : { state: { taskMode: true } })
              : goBack(navigate)
          }
          rightSlot={taskMode ? <SkipTaskButton to={nextPath} replace={nextPath === "/"} /> : null}
        />
        {taskMode ? (
          <div className="h-1 w-full bg-white">
            <div
              className="h-full bg-[#6bc4ff] transition-all duration-300"
              style={{ width: `${PERCENT_BY_STEP[step as 0 | 1 | 2] ?? PERCENT_BY_STEP[2]}%` }}
            />
          </div>
        ) : null}

        <div className="flex-1 flex flex-col items-center pb-6">
          <h1 className="mt-[30px] text-[#012269] text-xl font-bold text-center">Your Profession</h1>
          <p className="mt-1 text-[#159cd7] text-[15px] font-normal text-center">
            so AI won't make mistakes when chatting on your behalf
          </p>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="h-14 mt-[50px] mx-[37px] w-[calc(100%-74px)] border-0 border-b-[0.5px] border-b-[rgba(0,0,0,0.1)] text-center text-lg font-medium text-[#012269] bg-transparent outline-none caret-[#159cd7]"
          />

          {errorMessage && <FormErrorMessage message={errorMessage} className="mt-[14px]" />}

          <div className="flex-grow" />

          <div className="w-full shrink-0 px-6">
            <Button onClick={handleSave} disabled={!isValid} variant="primary">
              {taskMode ? "Next" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

```
