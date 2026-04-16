---
title: apk-integration
date: 2026-04-16T11:07:55+08:00
source: import
original: apk-integration.md
---

# APK 集成与地区守卫功能文档

> **最后更新**：2026-03-25

## 设计决策

- **APK 通信**：Android Intent URL + 剪贴板 JSON + WebView Bridge
- **登录态同步**：`window.reloadUser` 全局函数（APK 注入 → PWA 登录）
- **地区检测**：`navigator.language` + `Intl.DateTimeFormat().resolvedOptions().timeZone`
- **弹窗频率控制**：localStorage 存标记/日期

## 功能清单

### 1. APK WebView 登录态注入（window.reloadUser）

- APK 通过 Intent / 剪贴板拿到 `userId/timSig/token` 后，加载 PWA 页面
- 页面加载完成（`onPageFinished`），APK 调 `window.reloadUser(userId, timSig, token)`
- PWA 将 token/timSig 写入 Zustand store（自动持久化 localStorage）
- 调 `fetchUserInfo` 获取用户信息 → `setUserInfo` → `userState` 变为 `FullRegister`
- `App.tsx` 的 `useEffect` 监听到 `userId` 变化 → 自动走 `initUser` 完整初始化

### 2. Home 页跳转 APK

- 进入 Home 页时，如果不在 APK 中（`!isApp()`），通过 Intent URL 尝试打开 APK
- Intent 格式：`intent://main#Intent;scheme=com.gracechat.prod.pwatool;S.userId=...;S.timSig=...;S.token=...;S.host=...;end`
- APK `MainActivity` 接收 Intent 参数 → 传给 `PWAWebViewFragment` → 加载 PWA 并注入登录态
- 如果 APK 未安装，Intent 跳转静默失败，不影响当前页面

### 3. APK 下载携带登录信息

- 用户点击 APK 下载弹窗的 "Download APP & Cash Out" 按钮时
- 下载前将登录信息以 JSON 写入剪贴板：`{ userid, timsig, token, host }`
- APK 安装后首次启动，`PWAWebViewFragment.readClipboard()` 延迟 200ms 读取
- 读取成功后自动清除剪贴板，避免敏感信息残留

### 4. 中文语言/中国时区跳转官网

- 在 `main.tsx` render 之前同步检测
- 命中条件：生产环境 + 非 APK + (`navigator.language` 以 `zh` 开头 **或** 时区为 `Asia/Shanghai` / `Asia/Chongqing`)
- 命中后 `window.location.replace("https://gracechat.com")`，阻止后续渲染
- 开发/测试环境不生效

### 5. 第二阶段提现任务 APK 弹窗

#### 5.1 SecondEarn 完成自动弹窗（只弹一次）

- `finishTask(SecondEarn)` 成功后检测
- 条件：不在 APK + `APK_PROMPT_SECOND_EARN_SHOWN` 未设置
- 弹 `showApkDownloadModal()`，设置标记，永不再弹

#### 5.2 StageTwo 完成后每天弹一次

- Home 页挂载时检测 `currentTaskStage`
- 条件：`currentTaskStage` ≥ StageThree（index ≥ 2）+ 不在 APK + 今日未弹过
- 比对 `APK_PROMPT_DAILY_LAST_DATE` 与当日日期（YYYY-MM-DD）
- 弹 `showApkDownloadModal()`，更新日期

## 核心数据流

### Intent 跳转 APK

```
PWA Home 页
  → openInToolApp()
  → window.location.href = intent://main#Intent;scheme=...;S.token=...;end
  → Android 拦截 Intent
  → MainActivity.onCreate() 接收参数
  → PWAWebViewFragment.newInstance(userId, timSig, token, host)
  → loadUrl(PWA)
  → onPageFinished → evaluateJavascript("window.reloadUser(...)")
  → PWA setToken/setTimUsersig → fetchUserInfo → setUserInfo
  → App.tsx useEffect → initUser()
```

### 剪贴板传递登录态

```
PWA 下载弹窗
  → copyLoginInfoToClipboard() 写入 { userid, timsig, token, host }
  → downloadApk()
  → 用户安装并打开 APK
  → PWAWebViewFragment.readClipboard() (200ms delay)
  → 解析 JSON → 赋值 mUserId/mTimSig/mToken/mHost → 清除剪贴板
  → loadUrl(PWA) → onPageFinished → reloadUser(...)
```

### 地区守卫

```
main.tsx 初始化
  → redirectIfChina()
  → 检测 MODE / isApp / language / timezone
  → 命中 → window.location.replace("https://gracechat.com") → 停止渲染
  → 未命中 → 正常初始化 PWA
```

## 文件清单

### 新增

| 文件                    | 说明                                                                |
| ----------------------- | ------------------------------------------------------------------- |
| `utils/globalBridge.ts` | `window.reloadUser` 全局函数，APK WebView 登录态注入                |
| `utils/regionGuard.ts`  | 中文/上海时区跳转官网守卫                                           |
| `utils/openApk.ts`      | `openInToolApp` Intent 跳转 + `copyLoginInfoToClipboard` 剪贴板传参 |
| `hooks/useApkPrompt.ts` | StageTwo 完成后每日 APK 弹窗                                        |

### 修改

| 文件                                  | 改动                                                          |
| ------------------------------------- | ------------------------------------------------------------- |
| `main.tsx`                            | +`globalBridge` import、+`redirectIfChina` 拦截               |
| `components/showApkDownloadModal.tsx` | 下载前 `copyLoginInfoToClipboard()`                           |
| `pages/Home/index.tsx`                | +`openInToolApp()` 跳转、+`useApkPrompt()` 弹窗               |
| `hooks/useTask.ts`                    | SecondEarn 完成后弹 APK 弹窗（只弹一次）                      |
| `constants/storageKeys.ts`            | +`APK_PROMPT_SECOND_EARN_SHOWN`、`APK_PROMPT_DAILY_LAST_DATE` |

