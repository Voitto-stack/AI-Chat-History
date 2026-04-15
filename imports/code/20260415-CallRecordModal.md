---
title: CallRecordModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: CallRecordModal.tsx
---

# CallRecordModal

```tsx
import { useCallback, useMemo } from "react";
import { UserInfo } from "@sitin/api-proto/gen/archat_api/user_api";
import { useModal } from "@/hooks/useModal";
import { formatDuration } from "@/utils/timeFormat";

/**
 * CallRecordModal - 通话记录弹窗
 */

const MODAL_ID = "call-record-modal";

type CallUserInfo = {
  userId?: number | null;
  username?: string | null;
  avatarUrl?: string | null;
};

interface CallRecordModalProps {
  earned: number; // 赚取的金额
  totalDuration: number; // 总通话时长（秒）
  qualifiedMinutes: number; // 有效分钟数
  caller: CallUserInfo; // 呼叫方信息
  callee: CallUserInfo; // 接听方信息
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  timezone?: string; // 时区，默认 UTC-8
  onContinue?: () => void; // 继续按钮回调
  onClose: () => void; // 关闭回调
}

// rendering-hoist-jsx: 静态文本提取到常量
const VIOLATIONS_NOTE = "2 violations in the same minute = no earnings for that minute.";

/**
 * UserInfoDisplay - 用户信息展示组件
 * 显示用户头像、用户名和 ID
 */
interface UserInfoDisplayProps {
  avatarUrl?: string | null; // 头像 URL
  username?: string | null; // 用户名
  userId?: number | null; // 用户 ID
  altText?: string; // 备用文本（用于 alt）
}

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ avatarUrl, username, userId, altText = "User" }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full">
        <img src={avatarUrl || ""} alt={username || altText} className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p
          className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium leading-[18px] text-black"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
        >
          {username || "Unknown"}
        </p>
        <p
          className="m-0 break-all text-xs font-normal leading-4 text-[rgba(60,60,67,0.3)]"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
        >
          ID: {userId || "N/A"}
        </p>
      </div>
    </div>
  );
};

/**
 * TimeInfoRow - 时间信息展示组件
 * 显示标签、时区和时间值
 */
interface TimeInfoRowProps {
  label: string; // 标签文本
  timezone: string; // 时区
  time: string; // 时间值
}

const TimeInfoRow: React.FC<TimeInfoRowProps> = ({ label, timezone, time }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span
          className="text-xs font-normal leading-4 tracking-[-0.23px] text-[rgba(60,60,67,0.6)]"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
        >
          {label}
        </span>
        <span
          className="flex h-4 items-center justify-center rounded-full bg-white px-[5px] py-px text-[10px] font-normal leading-[13px] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
        >
          {timezone}
        </span>
      </div>
      <span
        className="text-xs font-normal leading-4 tracking-[-0.23px] text-black"
        style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
      >
        {time}
      </span>
    </div>
  );
};

/**
 * StatCard - 统计卡片组件
 * 显示标签和对应的数值
 */
interface StatCardProps {
  label: string; // 标签文本
  value: string | number; // 显示的值
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p
        className="m-0 text-center text-[15px] font-normal leading-5 tracking-[-0.23px] text-[rgba(60,60,67,0.3)]"
        style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
      >
        {label}
      </p>
      <p
        className="m-0 text-center text-lg font-medium leading-[22px] tracking-[-0.23px] text-black"
        style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
      >
        {value}
      </p>
    </div>
  );
};

export const CallRecordModalContent: React.FC<CallRecordModalProps> = ({
  earned,
  totalDuration,
  qualifiedMinutes,
  caller,
  callee,
  startTime,
  endTime,
  timezone = "UTC-8",
  onContinue,
  onClose,
}) => {
  // rerender-use-callback: 使用 useCallback 稳定回调引用
  const handleContinue = useCallback(() => {
    onContinue?.();
    // 点击继续后关闭弹窗
    onClose();
  }, [onContinue, onClose]);

  // rerender-derived-state: 在渲染期间派生格式化的值
  const formattedEarned = useMemo(() => earned.toFixed(2), [earned]);
  const formattedDuration = useMemo(() => formatDuration(totalDuration), [totalDuration]);

  return (
    <div className="relative flex w-full max-w-[360px] flex-col gap-4 rounded-[18px] bg-white p-6 pb-[18px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_3px_8px_0px_rgba(0,0,0,0.15),0px_3px_1px_0px_rgba(0,0,0,0.06)] sm:max-w-[320px] sm:p-5 sm:pb-4">
      {/* Header */}
      <div className="w-full text-center">
        <p
          className="m-0 text-lg font-medium leading-[22px] tracking-[-0.23px] text-black sm:text-base sm:leading-5"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
        >
          Congrats!
        </p>
      </div>

      {/* Billable Minutes Section */}
      <div className="flex flex-col gap-3.5 rounded-xl bg-[rgba(242,242,247,0.6)] p-3">
        <div className="flex flex-col gap-4">
          {/* You Earned */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p
              className="m-0 text-[15px] font-normal leading-5 tracking-[-0.23px] text-black"
              style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
            >
              You Earned
            </p>
            <p
              className="m-0 text-[32px] font-semibold leading-normal text-[#47aeef] sm:text-[28px]"
              style={{ fontFamily: '"Gilmer", sans-serif' }}
            >
              ${formattedEarned}
            </p>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] w-full bg-black/10" />

          {/* Duration Grid */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard label="Total Duration" value={formattedDuration} />
            <StatCard label="Qualified Minutes" value={`${qualifiedMinutes} min`} />
          </div>

          {/* Divider */}
          <div className="h-[0.5px] w-full bg-black/10" />
        </div>

        {/* Violations Note */}
        <div className="flex items-center justify-center rounded-lg px-2.5">
          <p
            className="m-0 text-center text-[10px] font-normal leading-4 tracking-[-0.23px] text-[rgba(60,60,67,0.6)]"
            style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
          >
            {VIOLATIONS_NOTE}
          </p>
        </div>
      </div>

      {/* Call Info Section */}
      <div className="flex flex-col gap-3.5 rounded-xl bg-[rgba(242,242,247,0.6)] p-3">
        <div
          className="text-center text-[15px] font-medium leading-5 tracking-[-0.23px] text-black"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
        >
          Call Info
        </div>

        {/* Participants */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Caller */}
          <UserInfoDisplay {...caller} altText="Caller" />

          {/* Callee */}
          <UserInfoDisplay {...callee} altText="Callee" />
        </div>

        {/* Divider */}
        <div className="h-[0.5px] w-full bg-black/10" />

        {/* Time Info */}
        <div className="flex flex-col gap-4">
          {/* Start Time */}
          <TimeInfoRow label="Start Time" timezone={timezone} time={startTime} />

          {/* End Time */}
          <TimeInfoRow label="End Time" timezone={timezone} time={endTime} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-[11px]">
        <button
          className="flex h-[45px] flex-1 items-center justify-center rounded-full border-none bg-[#47aeef] text-center text-base font-normal leading-[21px] tracking-[-0.23px] text-white shadow-[0_4px_12px_rgba(71,174,239,0.3)] transition-all duration-300 ease-in-out hover:bg-[#3a9ed6] hover:shadow-[0_6px_16px_rgba(71,174,239,0.4)] active:scale-[0.98] sm:h-[42px] sm:text-[15px]"
          style={{ fontFamily: '"Euclid Circular A", sans-serif' }}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

/**
 * 显示通话记录弹窗
 *
 * @param params - 弹窗参数
 */
export const showCallRecordModal = (params: {
  earned: number;
  totalDuration: number;
  qualifiedMinutes: number;
  caller: UserInfo;
  callee: UserInfo;
  startTime: string;
  endTime: string;
  timezone?: string;
  onContinue?: () => void;
}): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <CallRecordModalContent
      earned={params.earned}
      totalDuration={params.totalDuration}
      qualifiedMinutes={params.qualifiedMinutes}
      caller={params.caller}
      callee={params.callee}
      startTime={params.startTime}
      endTime={params.endTime}
      timezone={params.timezone}
      onContinue={params.onContinue}
      onClose={handleClose}
    />,
    { variant: "center" },
  );
};

/**
 * 显示通话记录弹窗（Promise 版本，关闭后 resolve）
 */
export const showCallRecordModalAsync = (params: {
  earned: number;
  totalDuration: number;
  qualifiedMinutes: number;
  caller: UserInfo;
  callee: UserInfo;
  startTime: string;
  endTime: string;
  timezone?: string;
  onContinue?: () => void;
}): Promise<void> => {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();

    const handleClose = () => {
      modalStore.close(MODAL_ID);
    };

    modalStore.open(
      MODAL_ID,
      <CallRecordModalContent
        earned={params.earned}
        totalDuration={params.totalDuration}
        qualifiedMinutes={params.qualifiedMinutes}
        caller={params.caller}
        callee={params.callee}
        startTime={params.startTime}
        endTime={params.endTime}
        timezone={params.timezone}
        onContinue={params.onContinue}
        onClose={handleClose}
      />,
      { variant: "center", onClose: resolve },
    );
  });
};

export const closeCallRecordModal = () => {
  const modalStore = useModal.getState();

  modalStore.close(MODAL_ID);
};

```
