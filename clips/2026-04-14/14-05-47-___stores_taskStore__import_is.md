---
date: 2026-04-14T14:05:47+08:00
source: clipboard
chars: 667
---

'@/stores/taskStore' import is restricted from being used by a pattern. ❌ 禁止直接导入 Store
✅ 请使用对应的 Hook:
- userStore → useUser (从 @/hooks/useUser)
- cashoutStore → useCashout (从 @/hooks/useCashout)
- taskStore → useTask (从 @/hooks/useTask)
- tagStore → useTag (从 @/hooks/useTag)
- postStore → usePost (从 @/hooks/usePost)
- insStore → useIns (从 @/hooks/useIns)
- loadingStore → useLoading (从 @/hooks/useLoading)
- modalStore → useModal (从 @/hooks/useModal)
- onboardingStore → useOnboarding (从 @/hooks/useOnboarding)
- permissionStore → usePermission (从 @/hooks/usePermission)eslintno-restricted-imports
