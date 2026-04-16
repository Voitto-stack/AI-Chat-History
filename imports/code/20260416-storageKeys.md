---
title: storageKeys
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: storageKeys.ts
---

# storageKeys

```ts
// LocalStorage Keys 统一管理

export const STORAGE_KEYS = {
  HAVEN_TOKEN: "haven_token", // 用户认证 token，用于 HTTP 请求的身份验证
  MOCK_DEVICE_ID: "mock_device_id", // 模拟设备 ID，开发/测试环境使用（登出不清除）
  OAUTH_PROCESSING: "oauth_processing", // OAuth 处理状态，用于防止回调被重复处理
  AUTH_STORAGE: "auth-storage", // Zustand Auth Store 持久化存储
  CASHOUT_STORAGE: "cashout-storage", // Zustand Cashout Store 持久化存储
  LAST_POST_TIME: "lastPostTime", // 发帖冷却时间戳
  TIM_USERSIG: "tim-usersig", //tim用户sig 用于tim注册
  CASHOUT_FLOW_PENDING: "cashout_flow_pending", // PayPal OAuth 完成后需要自动继续提现流程
  PAYPAL_OAUTH_HISTORY_LENGTH: "paypal_oauth_history_length", // PayPal OAuth 跳转前的历史记录长度，用于返回
  PAYPAL_COUNTRY_IS_US: "paypalCountryIsUS", // PayPal 账户国家是否为美国
  DEV_IS_ALL_CHAT_LIST: "isAllChatList", // 开发模式：展示全量聊天列表（跳过用户过滤）
  DEBUG_DISABLE_VALIDATION: "debug_disable_validation", // 调试模式：跳过提现地理位置验证
  CALL_HISTORY: "call_history", // 本地通话记录（仅设备级，不跨设备同步）
  LIVE_START_UTC_TIME: "live_start_utc_time", // 开播 UTC 时间戳，供 useTask 判断今日是否开播
  MOCK_TASK_RUNNING: "MockTaskRunning", // Mock 任务运行状态
  STAGE_TWO_MOCK_COUNT: "StageTwoMockCount", // 第二阶段 Mock 完成计数
  MOCK_TASK_PAUSED: "MockTaskPaused", // Mock 任务暂停状态
  STAGE_TWO_MOCK_CALL_TASK_COMPLETED: "StageTwoMockCallTaskCompleted", // 第二阶段 Mock 视频任务已完成（本地快速判断，避免依赖 API）
  APK_PROMPT_SECOND_EARN_SHOWN: "apk_prompt_second_earn_shown", // SecondEarn 完成后 APK 弹窗已弹过
  APK_PROMPT_DAILY_LAST_DATE: "apk_prompt_daily_last_date", // StageTwo 完成后每日 APK 弹窗上次日期
  DEBUG_DISABLE_AUTO_MOCK: "debug_disable_auto_mock", // 调试模式：禁用自动弹出 Mock 视频
  DEBUG_VCONSOLE: "debug_vconsole", // vConsole 开关（"1" 开启 / "0" 关闭，未设置时 dev 默认开、prod 默认关）
  BFF_INVITE_CODE: "bff_invite_code", // 被邀请者落地页存入的邀请码（设备级，登出不清除）
  REFERRAL_CODE_USED: "referral_code_used", // 是否已使用过邀请码注册（防止老用户重复算邀请，设备级）
} as const;

// 类型安全的 storage keys
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * 清除所有用户相关的 localStorage 数据
 * 注意：MOCK_DEVICE_ID / 调试 key 属于设备级，不清除
 */
export function clearUserLocalStorage() {
  const userKeys: StorageKey[] = [
    STORAGE_KEYS.HAVEN_TOKEN,
    STORAGE_KEYS.AUTH_STORAGE,
    STORAGE_KEYS.TIM_USERSIG,
    STORAGE_KEYS.OAUTH_PROCESSING,
    STORAGE_KEYS.CASHOUT_FLOW_PENDING,
    STORAGE_KEYS.PAYPAL_OAUTH_HISTORY_LENGTH,
    STORAGE_KEYS.PAYPAL_COUNTRY_IS_US,
    STORAGE_KEYS.LAST_POST_TIME,
    //通话相关
    STORAGE_KEYS.STAGE_TWO_MOCK_COUNT,
    STORAGE_KEYS.STAGE_TWO_MOCK_CALL_TASK_COMPLETED,
    STORAGE_KEYS.MOCK_TASK_RUNNING,
    STORAGE_KEYS.MOCK_TASK_PAUSED,
    STORAGE_KEYS.CALL_HISTORY,
  ];
  userKeys.forEach((key) => localStorage.removeItem(key));
}

```
