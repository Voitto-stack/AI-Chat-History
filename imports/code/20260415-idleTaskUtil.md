---
title: idleTaskUtil
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: idleTaskUtil.ts
---

# idleTaskUtil

```ts
/**
 * Idle Task 工具
 * 使用 requestIdleCallback 在浏览器空闲时执行任务
 *
 * 应用的 Vercel React Best Practices:
 * - js-early-exit: 早期返回优化
 * - async-defer-await: 延迟 await 到真正需要的地方
 */

const TAG = 'IdleTaskUtil'

/**
 * Idle Task Controller
 * 用于控制定时任务的执行和停止
 */
export interface IdleTaskController {
  stop: () => void
}

/**
 * 执行空闲任务
 * 使用 requestIdleCallback API 在浏览器空闲时执行任务
 *
 * @param taskFn - 任务函数
 * @param intervalMs - 执行间隔（毫秒）
 * @param delayFirstTime - 是否延迟第一次执行
 * @param options - requestIdleCallback 选项
 * @returns IdleTaskController - 任务控制器
 */
export const executeIdleTask = (
  taskFn: (deadline: IdleDeadline) => Promise<void> | void,
  intervalMs: number,
  delayFirstTime: boolean,
  options?: IdleRequestOptions
): IdleTaskController => {
  // 标志任务是否应该继续
  let isRunning = true
  // 存储 requestIdleCallback 和 setTimeout 的 ID
  let idleCallbackId: number | null = null
  let timeoutId: number | null = null

  // 检查浏览器是否支持 requestIdleCallback
  const hasIdleCallback = typeof window !== 'undefined' && 'requestIdleCallback' in window

  const executeTask = () => {
    // js-early-exit: 如果任务已经被停止，则不再继续
    if (!isRunning) return

    if (hasIdleCallback) {
      // 使用 requestIdleCallback 低优先级执行，不影响页面渲染
      idleCallbackId = window.requestIdleCallback(async (deadline) => {
        // js-early-exit: 如果任务已被停止，则不执行任务
        if (!isRunning) return

        // 如果当前有剩余时间就执行任务
        if (deadline.timeRemaining() > 0) {
          try {
            // async-defer-await: 执行传入的任务函数
            await taskFn(deadline)
          } catch (error) {
            console.error(TAG, 'Error executing idle task:', error)
          }

          // 如果任务在执行过程中被停止，则不再安排下一次执行
          if (isRunning) {
            // 设置下一次定时执行
            timeoutId = window.setTimeout(executeTask, intervalMs)
          }
        } else {
          // 如果没有足够时间，则立即重新尝试执行
          executeTask()
        }
      }, options)
    } else {
      // 浏览器不支持 requestIdleCallback 时，使用 setTimeout 模拟
      timeoutId = window.setTimeout(async () => {
        if (!isRunning) return

        try {
          // 创建一个模拟的 deadline 对象
          const mockDeadline: IdleDeadline = {
            didTimeout: false,
            timeRemaining: () => 16, // 假设有 16ms 剩余时间（约一帧时间）
          }

          await taskFn(mockDeadline)
        } catch (error) {
          console.error(TAG, 'Error executing idle task:', error)
        }

        if (isRunning) {
          executeTask()
        }
      }, intervalMs)
    }
  }

  // 根据 delayFirstTime 决定是立即执行还是延迟执行
  if (delayFirstTime) {
    // 延迟第一次执行
    timeoutId = window.setTimeout(executeTask, intervalMs)
  } else {
    // 立即执行第一次
    executeTask()
  }

  // 返回控制器，用于停止任务
  return {
    stop: () => {
      isRunning = false

      if (idleCallbackId !== null) {
        window.cancelIdleCallback(idleCallbackId)
        idleCallbackId = null
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
        timeoutId = null
      }

      console.log(TAG, 'Idle task stopped')
    },
  }
}

```
