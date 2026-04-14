---
date: 2026-04-14T10:54:15+08:00
source: clipboard
chars: 18847
---

Started by user xuzaixing
Running as SYSTEM
Building in workspace /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp
The recommended git tool is: git
using credential a737f077-8bee-449d-ba01-b9ea73f051b4
 > git rev-parse --resolve-git-dir /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/.git # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url git@github.com:presence-io/sitin-monorepo.git # timeout=10
Fetching upstream changes from git@github.com:presence-io/sitin-monorepo.git
 > git --version # timeout=10
 > git --version # 'git version 2.39.5'
using GIT_SSH to set credentials 
Verifying host key using known hosts file
 > git fetch --tags --force --progress -- git@github.com:presence-io/sitin-monorepo.git +refs/heads/*:refs/remotes/origin/* # timeout=10
 > git rev-parse refs/remotes/origin/feat/web/pwa-referral^{commit} # timeout=10
Checking out Revision ed0c16702e568780f60987460217d4ce9fdfc224 (refs/remotes/origin/feat/web/pwa-referral)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f ed0c16702e568780f60987460217d4ce9fdfc224 # timeout=10
Commit message: "fix: 使用导出的路径常量"
 > git rev-list --no-walk 912b904877dd92cdab23efd726753b1323ee6ea1 # timeout=10
[frontend_dev_sitin_webapp] $ /bin/bash /tmp/jenkins12125460123224202886.sh
[INFO] ========================================
[INFO] Starting Jenkins Build
[INFO] ========================================

[INFO] Step 1: Installing dependencies...
Scope: all 11 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: -512
--------------------------------------------------------------------------------

devDependencies:
+ ts-proto 2.11.6

. prepare$ husky
. prepare: Done
apps/minerva postinstall$ max setup
apps/minerva postinstall: info  - [你知道吗？] HMR=none max dev 可以关闭 Umi 开发服务器的模块热替换功能。
apps/minerva postinstall: info  - generate files
apps/minerva postinstall: info  - Preparing...
apps/minerva postinstall: Done
apps/minerva prepare$ husky
apps/minerva prepare: .git can't be found
apps/minerva prepare: Done
Done in 7.7s
[SUCCESS] Dependencies installed successfully

[INFO] Step 2: Building project...
[INFO] Environment==> development
[INFO] noCache==> false
[INFO] 🟢 Using development build script: build:dev
[INFO] 📦 Using cache, building with turbo...

> sitin-webapp@1.0.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp
> turbo run build:dev && pnpm run collect:build

• Packages in scope: @sitin/api-proto, @sitin/cashier, @sitin/eslint-config, @sitin/http-client, @sitin/minerva, @sitin/minerva-schemas, @sitin/minerva-server, @sitin/pwa, @sitin/static-pages, @sitin/ua
• Running build:dev in 10 packages
• Remote caching disabled
@sitin/ua:build: cache hit, replaying logs d28cfd28b9ebda6a
@sitin/ua:build: 
@sitin/ua:build: > @sitin/ua@1.0.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/ua
@sitin/ua:build: > father build
@sitin/ua:build: 
@sitin/ua:build: info  - Clean output directories
@sitin/ua:build: info  - Bundless for src directory to esm format
@sitin/ua:build: event - Bundless index.ts to es/index.js (with declaration)
@sitin/ua:build: event - Generate declaration file...
@sitin/ua:build: event - Transformed successfully in 2377 ms (1 files)
@sitin/ua:build: info  - Bundless for src directory to cjs format
@sitin/ua:build: event - Bundless index.ts to lib/index.js (with declaration)
@sitin/ua:build: event - Generate declaration file...
@sitin/ua:build: event - Transformed successfully in 1761 ms (1 files)
@sitin/static-pages:build:dev: cache miss, executing de93d45e90e430b2
@sitin/minerva-schemas:build: cache hit, replaying logs babec51bf1b81d52
@sitin/minerva-schemas:build: 
@sitin/minerva-schemas:build: > @sitin/minerva-schemas@0.1.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/minerva-schemas
@sitin/minerva-schemas:build: > tsc -p tsconfig.json
@sitin/minerva-schemas:build: 
@sitin/minerva-server:build:dev: cache miss, executing b56eb7105f940ac5
@sitin/minerva:build:dev: cache miss, executing 68f3ae0a34416d8c
@sitin/api-proto:build: cache hit, replaying logs 12114b190ff6bdbf
@sitin/api-proto:build: 
@sitin/api-proto:build: > @sitin/api-proto@1.0.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/api-proto
@sitin/api-proto:build: > father build
@sitin/api-proto:build: 
@sitin/api-proto:build: info  - Clean output directories
@sitin/api-proto:build: info  - Bundless for src directory to esm format
@sitin/api-proto:build: event - Bundless demo.ts to es/gen/archat_api/demo.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_recommend_api.ts to es/gen/archat_api/bot_recommend_api.js (with declaration)
@sitin/api-proto:build: event - Bundless chat_match.ts to es/gen/ai_tcp/chat_match.js (with declaration)
@sitin/api-proto:build: event - Bundless baseType.ts to es/baseType.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_api.ts to es/gen/archat_api/bot_api.js (with declaration)
@sitin/api-proto:build: event - Bundless messaging_api.ts to es/gen/archat_api/messaging_api.js (with declaration)
@sitin/api-proto:build: event - Bundless offline_task_api.ts to es/gen/archat_api/offline_task_api.js (with declaration)
@sitin/api-proto:build: event - Bundless data_bridge_api.ts to es/gen/archat_api/data_bridge_api.js (with declaration)
@sitin/api-proto:build: event - Bundless agora_callback.ts to es/gen/archat_api/agora_callback.js (with declaration)
@sitin/api-proto:build: event - Bundless story_api.ts to es/gen/archat_api/story_api.js (with declaration)
@sitin/api-proto:build: event - Bundless ServiceCode.ts to es/gen/common/ServiceCode.js (with declaration)
@sitin/api-proto:build: event - Bundless message.ts to es/gen/config/message.js (with declaration)
@sitin/api-proto:build: event - Bundless auth.ts to es/gen/messages/Common/auth.js (with declaration)
@sitin/api-proto:build: event - Bundless enum.ts to es/gen/messages/Common/enum.js (with declaration)
@sitin/api-proto:build: event - Bundless post_api.ts to es/gen/archat_api/post_api.js (with declaration)
@sitin/api-proto:build: event - Bundless index.ts to es/index.js (with declaration)
@sitin/api-proto:build: event - Bundless room.ts to es/gen/messages/CAH/room.js (with declaration)
@sitin/api-proto:build: event - Bundless user_api.ts to es/gen/archat_api/user_api.js (with declaration)
@sitin/api-proto:build: event - Generate declaration files...
@sitin/api-proto:build: event - Transformed successfully in 27330 ms (19 files)
@sitin/api-proto:build: info  - Bundless for src directory to cjs format
@sitin/api-proto:build: event - Bundless baseType.ts to lib/baseType.js (with declaration)
@sitin/api-proto:build: event - Bundless agora_callback.ts to lib/gen/archat_api/agora_callback.js (with declaration)
@sitin/api-proto:build: event - Bundless chat_match.ts to lib/gen/ai_tcp/chat_match.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_recommend_api.ts to lib/gen/archat_api/bot_recommend_api.js (with declaration)
@sitin/api-proto:build: event - Bundless demo.ts to lib/gen/archat_api/demo.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_api.ts to lib/gen/archat_api/bot_api.js (with declaration)
@sitin/api-proto:build: event - Bundless data_bridge_api.ts to lib/gen/archat_api/data_bridge_api.js (with declaration)
@sitin/api-proto:build: event - Bundless messaging_api.ts to lib/gen/archat_api/messaging_api.js (with declaration)
@sitin/api-proto:build: event - Bundless offline_task_api.ts to lib/gen/archat_api/offline_task_api.js (with declaration)
@sitin/api-proto:build: event - Bundless ServiceCode.ts to lib/gen/common/ServiceCode.js (with declaration)
@sitin/api-proto:build: event - Bundless message.ts to lib/gen/config/message.js (with declaration)
@sitin/api-proto:build: event - Bundless post_api.ts to lib/gen/archat_api/post_api.js (with declaration)
@sitin/api-proto:build: event - Bundless auth.ts to lib/gen/messages/Common/auth.js (with declaration)
@sitin/api-proto:build: event - Bundless story_api.ts to lib/gen/archat_api/story_api.js (with declaration)
@sitin/api-proto:build: event - Bundless index.ts to lib/index.js (with declaration)
@sitin/api-proto:build: event - Bundless enum.ts to lib/gen/messages/Common/enum.js (with declaration)
@sitin/api-proto:build: event - Bundless room.ts to lib/gen/messages/CAH/room.js (with declaration)
@sitin/api-proto:build: event - Bundless user_api.ts to lib/gen/archat_api/user_api.js (with declaration)
@sitin/api-proto:build: event - Generate declaration files...
@sitin/api-proto:build: event - Transformed successfully in 24296 ms (19 files)
@sitin/http-client:build: cache hit, replaying logs a262e241a19d9247
@sitin/http-client:build: 
@sitin/http-client:build: > @sitin/http-client@1.0.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/http-client
@sitin/http-client:build: > father build
@sitin/http-client:build: 
@sitin/http-client:build: info  - Clean output directories
@sitin/http-client:build: info  - Bundless for src directory to esm format
@sitin/http-client:build: event - Bundless types.ts to es/types.js (with declaration)
@sitin/http-client:build: event - Bundless index.ts to es/index.js (with declaration)
@sitin/http-client:build: event - Bundless HttpClient.ts to es/HttpClient.js (with declaration)
@sitin/http-client:build: event - Generate declaration files...
@sitin/http-client:build: event - Transformed successfully in 2375 ms (3 files)
@sitin/http-client:build: info  - Bundless for src directory to cjs format
@sitin/http-client:build: event - Bundless types.ts to lib/types.js (with declaration)
@sitin/http-client:build: event - Bundless HttpClient.ts to lib/HttpClient.js (with declaration)
@sitin/http-client:build: event - Bundless index.ts to lib/index.js (with declaration)
@sitin/http-client:build: event - Generate declaration files...
@sitin/http-client:build: event - Transformed successfully in 1629 ms (3 files)
@sitin/cashier:build:dev: cache miss, executing 1be344e44d5b892f
@sitin/pwa:build:dev: cache miss, executing 62bf132f537d51c8
@sitin/static-pages:build:dev: 
@sitin/static-pages:build:dev: > @sitin/static-pages@1.0.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/static-pages
@sitin/static-pages:build:dev: > node scripts/build.cjs
@sitin/static-pages:build:dev: 
@sitin/static-pages:build:dev: [INFO] Building static pages...
@sitin/static-pages:build:dev: [SUCCESS] doraPage → build/doraPage
@sitin/static-pages:build:dev: [SUCCESS] invite → build/invite
@sitin/static-pages:build:dev: [SUCCESS] Static pages build complete!
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: > @sitin/minerva-server@0.1.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/minerva-server
@sitin/minerva-server:build:dev: > prisma generate && tsc && cp -R src/generated build/
@sitin/minerva-server:build:dev: 
@sitin/minerva:build:dev: 
@sitin/minerva:build:dev: > @sitin/minerva@0.1.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/minerva
@sitin/minerva:build:dev: > UMI_ENV=development max build
@sitin/minerva:build:dev: 
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: > @sitin/cashier@0.1.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/cashier
@sitin/cashier:build:dev: > NODE_ENV=production next build && npm run pre:deploy
@sitin/cashier:build:dev: 
@sitin/pwa:build:dev: 
@sitin/pwa:build:dev: > @sitin/pwa@1.0.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/pwa
@sitin/pwa:build:dev: > tsc -b && vite build --mode development
@sitin/pwa:build:dev: 
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/minerva:build:dev: info  - [你知道吗？] father 4 正式发布了，详见 https://zhuanlan.zhihu.com/p/558192063
@sitin/minerva:build:dev: info  - Umi v4.6.23
@sitin/cashier:build:dev:    ▲ Next.js 16.0.7 (Turbopack)
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev:    Running TypeScript ...
@sitin/minerva-server:build:dev: Prisma schema loaded from prisma/schema.prisma
@sitin/minerva:build:dev: info  - Preparing...
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: ✔ Generated Prisma Client (v6.19.2) to ./src/generated/prisma in 1.42s
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: Tip: Interested in query caching in just a few lines of code? Try Accelerate today! https://pris.ly/tip-3-accelerate
@sitin/minerva-server:build:dev: 
@sitin/minerva:build:dev: [info] [webpackbar] Compiling Webpack
@sitin/cashier:build:dev:    Creating an optimized production build ...
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:  ✓ Compiled successfully in 7.3s
@sitin/cashier:build:dev:    Collecting page data using 15 workers ...
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:    Generating static pages using 15 workers (0/3) ...
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:  ✓ Generating static pages using 15 workers (3/3) in 911.1ms
@sitin/cashier:build:dev:    Finalizing page optimization ...
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: Route (pages)
@sitin/cashier:build:dev: ┌ ƒ /
@sitin/cashier:build:dev: ├   /_app
@sitin/cashier:build:dev: ├ ○ /404
@sitin/cashier:build:dev: ├ ƒ /api/health
@sitin/cashier:build:dev: ├ ƒ /api/hello
@sitin/cashier:build:dev: ├ ƒ /callback
@sitin/cashier:build:dev: └ ○ /records
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: ○  (Static)   prerendered as static content
@sitin/cashier:build:dev: ƒ  (Dynamic)  server-rendered on demand
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: npm warn Unknown env config "auto-install-peers". This will stop working in the next major version of npm.
@sitin/cashier:build:dev: npm warn Unknown env config "shamefully-hoist". This will stop working in the next major version of npm.
@sitin/cashier:build:dev: npm warn Unknown project config "public-hoist-pattern". This will stop working in the next major version of npm.
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: > @sitin/cashier@0.1.0 pre:deploy
@sitin/cashier:build:dev: > node scripts/pre-deploy.js
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: 🚀 开始整理部署包...
@sitin/cashier:build:dev: 🗑️  清理旧的 build 目录...
@sitin/cashier:build:dev: 📦 复制 standalone 根目录的 node_modules...
@sitin/cashier:build:dev: ✅ node_modules 复制完成
@sitin/cashier:build:dev: 📦 强制复制根目录的特定 node_modules 包...
@sitin/cashier:build:dev:    ✅ mime-db 复制完成
@sitin/cashier:build:dev:    ✅ scheduler 复制完成
@sitin/cashier:build:dev: ✅ 强制复制了 2/2 个特定包
@sitin/cashier:build:dev: 📦 复制 standalone/apps/cashier 文件到根目录（排除 node_modules）...
@sitin/cashier:build:dev:    ⏭️  跳过 apps/cashier/node_modules（不需要复制）
@sitin/cashier:build:dev: ✅ standalone 文件复制完成
@sitin/cashier:build:dev: 📦 复制 static 文件...
@sitin/cashier:build:dev: ✅ static 文件复制完成
@sitin/cashier:build:dev: 📦 复制 public 文件...
@sitin/cashier:build:dev: ✅ public 文件复制完成
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: 🎉 部署包整理完成！
@sitin/cashier:build:dev: 📁 部署包位置: /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/cashier/build
@sitin/pwa:build:dev: src/api/bff.ts(100,7): error TS2322: Type '{ relationId: string; nickname: string; avatar: string; currentStage: BffStage; stageProgress: any[]; inactiveHours: number; pokeAvailable: boolean; riskFlag: string; taskText: string; mainBtnText: string; shareText: string; activeStatus: string; activeStatusCopy: string; }[]' is not assignable to type 'SquadMember[]'.
@sitin/pwa:build:dev:   Type '{ relationId: string; nickname: string; avatar: string; currentStage: BffStage; stageProgress: any[]; inactiveHours: number; pokeAvailable: boolean; riskFlag: string; taskText: string; mainBtnText: string; shareText: string; activeStatus: string; activeStatusCopy: string; }' is not assignable to type 'SquadMember'.
@sitin/pwa:build:dev:     Types of property 'riskFlag' are incompatible.
@sitin/pwa:build:dev:       Type 'string' is not assignable to type 'BffRiskFlag'.
@sitin/pwa:build:dev:  ELIFECYCLE  Command failed with exit code 1.
@sitin/pwa:build:dev: ERROR: command finished with error: command (/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/pwa) /var/lib/jenkins/.local/share/pnpm/.tools/pnpm/8.15.0/bin/pnpm run build:dev exited (1)
@sitin/pwa#build:dev: command (/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/pwa) /var/lib/jenkins/.local/share/pnpm/.tools/pnpm/8.15.0/bin/pnpm run build:dev exited (1)

 Tasks:    7 successful, 9 total
Cached:    4 cached, 9 total
  Time:    28.916s 
Failed:    @sitin/pwa#build:dev

 ERROR  run failed: command  exited (1)
 ELIFECYCLE  Command failed with exit code 1.
[ERROR] Build failed
Build step 'Execute shell' marked build as failure
Finished: FAILURE
