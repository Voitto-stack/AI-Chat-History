---
date: 2026-04-14T20:15:34+08:00
source: clipboard
chars: 5214
---

sitin-monorepo-dev git:(feature/pwa-web) git pull origin feature/pwa-web
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 5 (delta 3), reused 5 (delta 3), pack-reused 0 (from 0)
Unpacking objects: 100% (5/5), 756 bytes | 108.00 KiB/s, done.
From github.com:presence-io/sitin-monorepo
 * branch              feature/pwa-web -> FETCH_HEAD
   47eb5206..4d054656  feature/pwa-web -> origin/feature/pwa-web
Updating 47eb5206..4d054656
Fast-forward
 apps/pwa/docs/apk-integration.md        | 116 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 apps/pwa/docs/ins-migration.md          | 187 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 apps/pwa/docs/keyboard-and-safe-area.md | 118 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 421 insertions(+)
 create mode 100644 apps/pwa/docs/apk-integration.md
 create mode 100644 apps/pwa/docs/ins-migration.md
 create mode 100644 apps/pwa/docs/keyboard-and-safe-area.md
➜  sitin-monorepo-dev git:(feature/pwa-web) git checkout feat/web/pwa-liebian
Switched to branch 'feat/web/pwa-liebian'
➜  sitin-monorepo-dev git:(feat/web/pwa-liebian) git merge feature/pwa-web
Auto-merging apps/pwa/src/components/CashoutProcessingModal.tsx
CONFLICT (content): Merge conflict in apps/pwa/src/components/CashoutProcessingModal.tsx
Auto-merging apps/pwa/src/components/Toast.tsx
Auto-merging apps/pwa/src/components/showCashoutModal.tsx
CONFLICT (content): Merge conflict in apps/pwa/src/components/showCashoutModal.tsx
Auto-merging apps/pwa/src/constants/storageKeys.ts
Auto-merging apps/pwa/src/hooks/useGoogleAuth.ts
CONFLICT (content): Merge conflict in apps/pwa/src/hooks/useGoogleAuth.ts
Auto-merging apps/pwa/src/hooks/useUser.ts
CONFLICT (content): Merge conflict in apps/pwa/src/hooks/useUser.ts
Auto-merging apps/pwa/src/http/userApi.ts
Auto-merging apps/pwa/src/main.tsx
Auto-merging apps/pwa/src/pages/Earning/index.tsx
Auto-merging apps/pwa/src/pages/Home/index.tsx
Auto-merging apps/pwa/src/pages/Onboarding/index.tsx
Auto-merging apps/pwa/src/styles/fonts.css
CONFLICT (content): Merge conflict in apps/pwa/src/styles/fonts.css
Auto-merging apps/pwa/src/tracking/events.ts
CONFLICT (content): Merge conflict in apps/pwa/src/tracking/events.ts
Auto-merging package.json
Auto-merging packages/api-proto/gen/ai_tcp/chat_match.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/ai_tcp/chat_match.ts
Auto-merging packages/api-proto/gen/archat_api/agora_callback.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/agora_callback.ts
Auto-merging packages/api-proto/gen/archat_api/bot_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/bot_api.ts
Auto-merging packages/api-proto/gen/archat_api/bot_recommend_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/bot_recommend_api.ts
Auto-merging packages/api-proto/gen/archat_api/data_bridge_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/data_bridge_api.ts
Auto-merging packages/api-proto/gen/archat_api/demo.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/demo.ts
Auto-merging packages/api-proto/gen/archat_api/messaging_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/messaging_api.ts
Auto-merging packages/api-proto/gen/archat_api/offline_task_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/offline_task_api.ts
Auto-merging packages/api-proto/gen/archat_api/post_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/post_api.ts
Auto-merging packages/api-proto/gen/archat_api/story_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/story_api.ts
Auto-merging packages/api-proto/gen/archat_api/user_api.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/archat_api/user_api.ts
Auto-merging packages/api-proto/gen/common/ServiceCode.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/common/ServiceCode.ts
Auto-merging packages/api-proto/gen/config/message.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/config/message.ts
Auto-merging packages/api-proto/gen/messages/CAH/room.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/messages/CAH/room.ts
Auto-merging packages/api-proto/gen/messages/Common/auth.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/messages/Common/auth.ts
Auto-merging packages/api-proto/gen/messages/Common/enum.ts
CONFLICT (content): Merge conflict in packages/api-proto/gen/messages/Common/enum.ts
Auto-merging packages/api-proto/proto/archat_api/user_api.proto
CONFLICT (content): Merge conflict in packages/api-proto/proto/archat_api/user_api.proto
Auto-merging pnpm-lock.yaml
Automatic merge failed; fix conflicts and then commit the result.
➜  sitin-monorepo-dev git:(feat/web/pwa-liebian) ✗ git add .                
➜  sitin-monorepo-dev git:(feat/web/pwa-liebian) ✗ git rebase --continue                  
fatal: No rebase in progress?
