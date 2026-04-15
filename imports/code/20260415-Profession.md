---
title: Profession
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: Profession.tsx
---

# Profession

```tsx
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import NavigationBar from "@/components/NavigationBar";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { useLoading } from "@/hooks/useLoading";
import { useLockFn } from "@/hooks/useLockFn";
import { toast } from "@/utils/toast";
import { goBack } from "@/utils/navigation";
import { useAutoFocus } from "@/hooks/useAutoFocus";
import { useTask } from "@/hooks/useTask";
import { TaskId } from "@/types/task";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import SkipTaskButton from "@/pages/ProfileTask/SkipTaskButton";
import { showRewardModalAsync } from "@/components/showRewardModal";
import { finishUserTutorialTaskOne, claimUserTutorialTask } from "@/http/api";
import Input from "@/pages/Onboarding/Input";
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
  const { finishTask, tasks } = useTask();

  const [value, setValue] = useState(userInfo?.profession || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoFocus(inputRef);

  // 埋点：Profession 页面展示
  useEffect(() => {
    if (taskMode) {
      bpTrack(EventName.pwa_profile_task_profession_show);
    }
  }, [taskMode]);

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
        bpTrack(EventName.pwa_profile_task_profession_continue, { profession: value.trim() });
      }
      bpTrack(EventName.pwa_profile_update_success, { field: "profession" });

      if (taskMode) {
        // 刷新用户信息以检查是否完成所有资料
        const latestUserInfo = await refreshUserInfo();
        const isProfileComplete = isCompleteProfileDone(latestUserInfo);

        if (isProfileComplete) {
          try {
            // 第一阶段：调用完成API，标记任务完成但不发放奖励
            await finishUserTutorialTaskOne();

            // 获取当前余额和任务奖励金额
            const currentCash = userInfo?.balance || 0;
            const task = tasks.get(TaskId.CompleteProfile);
            const earnedAmount = parseFloat(task?.reward || "0");

            // 埋点：完成profile任务
            bpTrack(EventName.pwa_earnings_finish_profile_complete);

            // 第二阶段：调用领取API，真正发放奖励
            await claimUserTutorialTask();

            // 完成任务（更新本地状态）
            await finishTask(TaskId.CompleteProfile);

            // 刷新余额
            await refreshUserInfo();

            hideLoading();

            // 先导航回首页，再弹奖励弹窗
            navigate("/", { replace: true });

            // 埋点：完成页面展示（奖励弹窗）
            bpTrack(EventName.pwa_profile_task_finish_show);

            // 退出任务页面后显示奖励弹窗
            await showRewardModalAsync(currentCash, earnedAmount);
          } catch (error) {
            console.error("Profile task completion failed:", error);
            toast.error("Failed to complete profile task");
          }
          return;
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
      <div className="flex flex-col h-full bg-surface">
        <NavigationBar
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

        <div className="flex-1 flex flex-col p-6">
          <Input
            ref={inputRef}
            title="Your Profession"
            titleClassName="text-xl font-bold text-brand-dark"
            error={errorMessage}
            subtitle={
              <p className="text-[#159cd7] text-[15px] font-normal text-center">
                so AI won't make mistakes when chatting on your behalf
              </p>
            }
            inputProps={{
              type: "text",
              autoComplete: "off",
              value,
              onChange: (e) => handleChange(e.target.value),
            }}
          />

          <Button onClick={handleSave} disabled={!isValid} variant="primary" className="shrink-0">
            {taskMode ? "Next" : "Save"}
          </Button>
        </div>
      </div>
    </Layout>
  );
}

```
