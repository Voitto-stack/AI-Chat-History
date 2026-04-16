---
title: consoleControl
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: consoleControl.ts
---

# consoleControl

```ts
/**
 * 运行时 console 控制器
 * - 开发/测试环境：console 默认开启
 * - 生产环境：console 默认静默，通过 localStorage printLog=1 开启
 */

const PRINT_LOG_KEY = "printLog";

const noop = () => {};

// 保存原始 console 方法
const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  debug: console.debug,
  error: console.error,
};

function isConsoleEnabled(): boolean {
  // 非生产环境始终开启
  if (import.meta.env.MODE !== "production") return true;
  // 生产环境检查 localStorage 开关
  try {
    return localStorage.getItem(PRINT_LOG_KEY) === "1";
  } catch {
    return false;
  }
}

function silenceConsole() {
  console.log = noop;
  console.info = noop;
  console.warn = noop;
  console.debug = noop;
  // 保留 console.error，始终输出错误
}

function restoreConsole() {
  console.log = originalConsole.log;
  console.info = originalConsole.info;
  console.warn = originalConsole.warn;
  console.debug = originalConsole.debug;
  console.error = originalConsole.error;
}

/** 初始化 console 控制，应在应用启动时调用 */
export function initConsoleControl() {
  if (isConsoleEnabled()) {
    restoreConsole();
  } else {
    silenceConsole();
  }
}

/** 切换 console 开关状态，返回新状态 */
export function toggleConsole(enabled: boolean) {
  localStorage.setItem(PRINT_LOG_KEY, enabled ? "1" : "0");
  if (enabled) {
    restoreConsole();
  } else {
    silenceConsole();
  }
}

```
