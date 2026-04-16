---
title: tupuConfig
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: tupuConfig.ts
---

# tupuConfig

```ts
/**
 * 图普科技内容检测配置
 * Tuputech API Configuration for content moderation
 */

// 图普科技 API 配置
export const TUPU_CONFIG = {
  // 异步视频接口 SID
  SECRET_SID: "684a8589789f620094fcc8ff",
  // API Key
  API_KEY: "eb733014bf84e012497fbe5a99a7fb0e0b5971ba",
  // 非法任务 ID
  ILLEGAL_TASK_ID: "5eddb86afaf52c4ca704ea41",
  // 色情任务 ID
  PORN_TASK_ID: "54bcfc6c329af61034f7c2fc",
} as const;

// 检测结果类型枚举
export enum ViolationType {
  PORN = "porn",
  MINOR = "minor",
  VIOLENCE = "violence",
  POLITICAL = "political",
  NONE = "none",
}

// 检测结果严重程度
export enum SeverityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// 违规类型映射表
export const TUPU_ILLEGAL_MAP = {
  0: "正常",
  1: "抽烟",
  2: "吸毒",
  3: "纹身",
  4: "赌博",
  5: "喝酒",
  6: "不文明手势",
  7: "未成年",
  8: "宗教风俗",
} as const;

// 色情检测映射表
export const TUPU_SEX_MAP = {
  0: "色情",
  1: "性感",
  2: "正常",
} as const;

/**
 * 违规提示信息配置
 * rendering-hoist-jsx: 提取静态对象到模块级别
 */
interface ViolationTipResult {
  warning: string;
}

// js-index-maps: 使用 Map 优化查找性能
const VIOLATION_TIP_MAP = new Map<string, ViolationTipResult>([
  [TUPU_SEX_MAP[0], { warning: "Warning: Discontinue all sexually explicit behavior at once." }],
  [TUPU_SEX_MAP[1], { warning: "Warning: Discontinue all sexually explicit behavior at once." }],
  [TUPU_ILLEGAL_MAP[1], { warning: "Warning: Smoking detected. You must cease immediately." }],
  [TUPU_ILLEGAL_MAP[7], { warning: "Warning: A child detected in frame. This behavior must stop at once." }],
  ["无人", { warning: "Warning: No individual currently visible in your video feed. Please return to the frame." }],
  ["出镜不完整", { warning: "Warning: Face not detected. Please return to the frame." }],
]);

// 默认提示
const DEFAULT_VIOLATION_TIP: ViolationTipResult = {
  warning: "Warning: Your recent chat contained prohibited content.",
};

/**
 * 获取违规提示信息
 * @param detectResult - 检测结果字符串
 * @returns 违规提示对象
 */
export const getViolationTip = (detectResult: string): ViolationTipResult => {
  // js-early-exit: 早期返回优化
  const tip = VIOLATION_TIP_MAP.get(detectResult);
  if (tip) return tip;

  return DEFAULT_VIOLATION_TIP;
};

```
