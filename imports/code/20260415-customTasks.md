---
title: customTasks
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: customTasks.ts
---

# customTasks

```ts
/**
 * 自定义任务工具函数
 * 自定义任务是前端维护状态的任务，与服务端任务统一在 task 系统中管理
 */

import { UserCloudStorage, UserCloudKey } from "@/services/userCloudStorage";
import { TaskId } from "@/types/task";

// 自定义任务ID列表（需要跨设备同步状态的任务）
export const CUSTOM_TASK_IDS = [
  TaskId.SecondEarn,
  TaskId.ThirdEarn,
  TaskId.FourthEarn,
  TaskId.FourthVideoDuration,
  TaskId.FifthEarn,
  TaskId.FifthVideoDuration,
  TaskId.SixthEarn,
  TaskId.SixthVideoDuration,
  TaskId.SeventhEarn,
  TaskId.SeventhVideoDuration,
] as const;

/**
 * 加载已完成的自定义任务列表（类似 listUserCommonTasks）
 */
export async function getCustomFinishedTasks(): Promise<TaskId[]> {
  try {
    const tasksStr = await UserCloudStorage.getValue(UserCloudKey.CustomTasksState);
    if (tasksStr) {
      const taskIds = JSON.parse(tasksStr) as TaskId[];
      return Array.isArray(taskIds) ? taskIds : [];
    }
    return [];
  } catch (error) {
    console.error("[CustomTasks] Failed to load from cloud:", error);
    return [];
  }
}

/**
 * 完成自定义任务（类似 finishUserCommonTask）
 */
export async function finishCustomTask(taskId: TaskId): Promise<void> {
  try {
    // 先获取现有的已完成任务列表
    const finishedTasks = await getCustomFinishedTasks();
    // 如果任务已经在列表中，直接返回
    if (finishedTasks.includes(taskId)) {
      return;
    }

    // 添加新完成的任务
    finishedTasks.push(taskId);

    // 保存回云端
    await UserCloudStorage.setValue(UserCloudKey.CustomTasksState, JSON.stringify(finishedTasks));
    console.log(`[CustomTasks] Finished task ${taskId}`);
  } catch (error) {
    console.error(`[CustomTasks] Failed to finish task ${taskId}:`, error);
  }
}

/**
 * 检查是否是自定义任务
 */
export function isCustomTask(taskId: TaskId): boolean {
  return CUSTOM_TASK_IDS.includes(taskId as (typeof CUSTOM_TASK_IDS)[number]);
}

```
