---
title: taskStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: taskStore.ts
---

# taskStore

```ts
/**
 * 任务状态管理
 * 使用 Zustand 管理任务数据
 */

import { create } from "zustand";
import { ITask, TaskId, TaskStatus } from "@/types/task";

interface TaskState {
  tasks: Map<TaskId, ITask>; // 任务数据 Map，key 为 TaskId
  setTasks: (tasks: Map<TaskId, ITask>) => void;
  updateTask: (taskId: TaskId, updates: Partial<ITask>) => void;
  updateTaskStatus: (taskId: TaskId, status: TaskStatus) => void;
  getTask: (taskId: TaskId) => ITask | undefined;
  reset: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: new Map<TaskId, ITask>(),

  setTasks: (tasks) => {
    set({ tasks: new Map(tasks) });
  },

  updateTask: (taskId, updates) => {
    const { tasks } = get();
    const task = tasks.get(taskId);
    if (task) {
      const newTasks = new Map(tasks);
      newTasks.set(taskId, { ...task, ...updates });
      set({ tasks: newTasks });
    }
  },

  updateTaskStatus: (taskId, status) => {
    const { tasks } = get();
    const task = tasks.get(taskId);
    if (task) {
      const newTasks = new Map(tasks);
      newTasks.set(taskId, { ...task, status });
      set({ tasks: newTasks });
    }
  },

  getTask: (taskId) => {
    return get().tasks.get(taskId);
  },

  reset: () => set({ tasks: new Map<TaskId, ITask>() }),
}));

```
