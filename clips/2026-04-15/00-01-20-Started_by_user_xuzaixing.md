---
date: 2026-04-15T00:01:20+08:00
source: clipboard
chars: 24660
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
Checking out Revision 2faafd899cf17901a277c1876bd2a12e8be4a7e2 (refs/remotes/origin/feat/web/pwa-referral)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 2faafd899cf17901a277c1876bd2a12e8be4a7e2 # timeout=10
Commit message: "merge: 合并 origin/feat/web/pwa-referral 到 feat/web/pwa-liebian"
 > git rev-list --no-walk daa2bd4c1903ef4489bb1e7bd6cfcb0614b28f5b # timeout=10
[frontend_dev_sitin_webapp] $ /bin/bash /tmp/jenkins4396514378061192921.sh
[INFO] ========================================
[INFO] Starting Jenkins Build
[INFO] ========================================

[INFO] Step 1: Installing dependencies...
Scope: all 11 workspace projects
Lockfile is up to date, resolution step is skipped
Progress: resolved 1, reused 0, downloaded 0, added 0
Packages: +5 -510
+-------------------------------------------------------------------------------
Progress: resolved 5, reused 5, downloaded 0, added 0, done

devDependencies:
+ ts-proto 2.11.6

. prepare$ husky
. prepare: Done
apps/minerva postinstall$ max setup
apps/minerva postinstall: info  - [你知道吗？] 如果你需要使用 Jest 来测试 Umi 项目, max g jest 就可以一键完成配置，详见 https://umijs.org/docs/guides/generator#jest-配置生成器
apps/minerva postinstall: info  - generate files
apps/minerva postinstall: info  - Preparing...
apps/minerva postinstall: Done
apps/minerva prepare$ husky
apps/minerva prepare: .git can't be found
apps/minerva prepare: Done
Done in 8.6s
[SUCCESS] Dependencies installed successfully

[INFO] Step 2: Building project...
[INFO] Environment==> development
[INFO] noCache==> false
[INFO] 🟢 Using development build script: build:dev
[INFO] 📦 Using cache, building with turbo...

> sitin-webapp@1.0.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp
> turbo run build:dev

• Packages in scope: @sitin/api-proto, @sitin/cashier, @sitin/eslint-config, @sitin/http-client, @sitin/minerva, @sitin/minerva-schemas, @sitin/minerva-server, @sitin/pwa, @sitin/static-pages, @sitin/ua
• Running build:dev in 10 packages
• Remote caching disabled
@sitin/api-proto:build: cache miss, executing 0e53c3a55871476a
@sitin/minerva-schemas:build: cache miss, executing db6a5bf0de11504f
@sitin/static-pages:build:dev: cache miss, executing 19f0a4e77a5eed17
@sitin/ua:build: cache miss, executing 9efdf63f72d35d93
@sitin/api-proto:build: 
@sitin/api-proto:build: > @sitin/api-proto@1.0.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/api-proto
@sitin/api-proto:build: > father build
@sitin/api-proto:build: 
@sitin/ua:build: 
@sitin/ua:build: > @sitin/ua@1.0.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/ua
@sitin/ua:build: > father build
@sitin/ua:build: 
@sitin/minerva-schemas:build: 
@sitin/minerva-schemas:build: > @sitin/minerva-schemas@0.1.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/minerva-schemas
@sitin/minerva-schemas:build: > tsc -p tsconfig.json
@sitin/minerva-schemas:build: 
@sitin/static-pages:build:dev: 
@sitin/static-pages:build:dev: > @sitin/static-pages@1.0.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/static-pages
@sitin/static-pages:build:dev: > node scripts/build.cjs
@sitin/static-pages:build:dev: 
@sitin/static-pages:build:dev: [INFO] Building static pages...
@sitin/static-pages:build:dev: [SUCCESS] doraPage → build/doraPage
@sitin/static-pages:build:dev: [SUCCESS] invite → build/invite
@sitin/static-pages:build:dev: [SUCCESS] Static pages build complete!
@sitin/ua:build: info  - Clean output directories
@sitin/ua:build: info  - Bundless for src directory to esm format
@sitin/api-proto:build: info  - Clean output directories
@sitin/ua:build: event - Bundless index.ts to es/index.js (with declaration)
@sitin/ua:build: event - Generate declaration file...
@sitin/api-proto:build: info  - Bundless for src directory to esm format
@sitin/api-proto:build: event - Bundless baseType.ts to es/baseType.js (with declaration)
@sitin/api-proto:build: event - Bundless agora_callback.ts to es/gen/archat_api/agora_callback.js (with declaration)
@sitin/api-proto:build: event - Bundless demo.ts to es/gen/archat_api/demo.js (with declaration)
@sitin/api-proto:build: event - Bundless chat_match.ts to es/gen/ai_tcp/chat_match.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_recommend_api.ts to es/gen/archat_api/bot_recommend_api.js (with declaration)
@sitin/api-proto:build: event - Bundless messaging_api.ts to es/gen/archat_api/messaging_api.js (with declaration)
@sitin/api-proto:build: event - Bundless data_bridge_api.ts to es/gen/archat_api/data_bridge_api.js (with declaration)
@sitin/api-proto:build: event - Bundless offline_task_api.ts to es/gen/archat_api/offline_task_api.js (with declaration)
@sitin/api-proto:build: event - Bundless post_api.ts to es/gen/archat_api/post_api.js (with declaration)
@sitin/api-proto:build: event - Bundless ServiceCode.ts to es/gen/common/ServiceCode.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_api.ts to es/gen/archat_api/bot_api.js (with declaration)
@sitin/api-proto:build: event - Bundless story_api.ts to es/gen/archat_api/story_api.js (with declaration)
@sitin/api-proto:build: event - Bundless message.ts to es/gen/config/message.js (with declaration)
@sitin/api-proto:build: event - Bundless auth.ts to es/gen/messages/Common/auth.js (with declaration)
@sitin/api-proto:build: event - Bundless enum.ts to es/gen/messages/Common/enum.js (with declaration)
@sitin/api-proto:build: event - Bundless index.ts to es/index.js (with declaration)
@sitin/api-proto:build: event - Bundless room.ts to es/gen/messages/CAH/room.js (with declaration)
@sitin/api-proto:build: event - Bundless user_api.ts to es/gen/archat_api/user_api.js (with declaration)
@sitin/api-proto:build: event - Generate declaration files...
@sitin/ua:build: event - Transformed successfully in 2637 ms (1 files)
@sitin/ua:build: info  - Bundless for src directory to cjs format
@sitin/ua:build: event - Bundless index.ts to lib/index.js (with declaration)
@sitin/ua:build: event - Generate declaration file...
@sitin/minerva-server:build:dev: cache miss, executing a294f197ee46745b
@sitin/minerva:build:dev: cache miss, executing d351c981c60e6099
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: > @sitin/minerva-server@0.1.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/minerva-server
@sitin/minerva-server:build:dev: > prisma generate && tsc && cp -R src/generated build/
@sitin/minerva-server:build:dev: 
@sitin/minerva:build:dev: 
@sitin/minerva:build:dev: > @sitin/minerva@0.1.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/minerva
@sitin/minerva:build:dev: > UMI_ENV=development max build
@sitin/minerva:build:dev: 
@sitin/ua:build: event - Transformed successfully in 1565 ms (1 files)
@sitin/minerva:build:dev: info  - [你知道吗？] 如果你需要使用 Tailwind CSS, max g tailwindcss 就可以一键完成配置，详见 https://umijs.org/docs/guides/generator#tailwind-css-配置生成器
@sitin/minerva:build:dev: info  - Umi v4.6.23
@sitin/minerva-server:build:dev: Prisma schema loaded from prisma/schema.prisma
@sitin/minerva:build:dev: info  - Preparing...
@sitin/minerva:build:dev: [info] [webpackbar] Compiling Webpack
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: ✔ Generated Prisma Client (v6.19.2) to ./src/generated/prisma in 1.72s
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
@sitin/minerva-server:build:dev: 
@sitin/minerva-server:build:dev: Tip: Want to turn off tips and other hints? https://pris.ly/tip-4-nohints
@sitin/minerva-server:build:dev: 
@sitin/api-proto:build: event - Transformed successfully in 27038 ms (19 files)
@sitin/api-proto:build: info  - Bundless for src directory to cjs format
@sitin/api-proto:build: event - Bundless baseType.ts to lib/baseType.js (with declaration)
@sitin/api-proto:build: event - Bundless agora_callback.ts to lib/gen/archat_api/agora_callback.js (with declaration)
@sitin/api-proto:build: event - Bundless chat_match.ts to lib/gen/ai_tcp/chat_match.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_recommend_api.ts to lib/gen/archat_api/bot_recommend_api.js (with declaration)
@sitin/api-proto:build: event - Bundless bot_api.ts to lib/gen/archat_api/bot_api.js (with declaration)
@sitin/api-proto:build: event - Bundless demo.ts to lib/gen/archat_api/demo.js (with declaration)
@sitin/api-proto:build: event - Bundless messaging_api.ts to lib/gen/archat_api/messaging_api.js (with declaration)
@sitin/api-proto:build: event - Bundless data_bridge_api.ts to lib/gen/archat_api/data_bridge_api.js (with declaration)
@sitin/api-proto:build: event - Bundless offline_task_api.ts to lib/gen/archat_api/offline_task_api.js (with declaration)
@sitin/api-proto:build: event - Bundless story_api.ts to lib/gen/archat_api/story_api.js (with declaration)
@sitin/api-proto:build: event - Bundless message.ts to lib/gen/config/message.js (with declaration)
@sitin/api-proto:build: event - Bundless ServiceCode.ts to lib/gen/common/ServiceCode.js (with declaration)
@sitin/api-proto:build: event - Bundless post_api.ts to lib/gen/archat_api/post_api.js (with declaration)
@sitin/api-proto:build: event - Bundless auth.ts to lib/gen/messages/Common/auth.js (with declaration)
@sitin/api-proto:build: event - Bundless enum.ts to lib/gen/messages/Common/enum.js (with declaration)
@sitin/api-proto:build: event - Bundless index.ts to lib/index.js (with declaration)
@sitin/api-proto:build: event - Bundless room.ts to lib/gen/messages/CAH/room.js (with declaration)
@sitin/api-proto:build: event - Bundless user_api.ts to lib/gen/archat_api/user_api.js (with declaration)
@sitin/api-proto:build: event - Generate declaration files...
@sitin/minerva:build:dev: [success] [webpackbar] Webpack: Compiled successfully in 26.45s
@sitin/minerva:build:dev: info  - Memory Usage: 889.43 MB (RSS: 1144.17 MB)
@sitin/minerva:build:dev: 
@sitin/minerva:build:dev: info  - File sizes after gzip:
@sitin/minerva:build:dev: 
@sitin/minerva:build:dev:   278.69 kB  build/umi.js
@sitin/minerva:build:dev:   112.57 kB  build/7445.async.js
@sitin/minerva:build:dev:   91.88 kB   build/7335.async.js
@sitin/minerva:build:dev:   44.46 kB   build/4523.async.js
@sitin/minerva:build:dev:   39.37 kB   build/717.async.js
@sitin/minerva:build:dev:   37.09 kB   build/9884.async.js
@sitin/minerva:build:dev:   35.85 kB   build/4334.async.js
@sitin/minerva:build:dev:   32.23 kB   build/9661.async.js
@sitin/minerva:build:dev:   22.25 kB   build/1790.async.js
@sitin/minerva:build:dev:   20.12 kB   build/2373.async.js
@sitin/minerva:build:dev:   19.89 kB   build/1079.async.js
@sitin/minerva:build:dev:   15.61 kB   build/9309.async.js
@sitin/minerva:build:dev:   13.91 kB   build/4432.async.js
@sitin/minerva:build:dev:   12.89 kB   build/2363.async.js
@sitin/minerva:build:dev:   12.36 kB   build/6959.async.js
@sitin/minerva:build:dev:   11.94 kB   build/302.async.js
@sitin/minerva:build:dev:   11.59 kB   build/p__PWADataboard__index.async.js
@sitin/minerva:build:dev:   11.44 kB   build/3573.async.js
@sitin/minerva:build:dev:   10.9 kB    build/4634.async.js
@sitin/minerva:build:dev:   10.42 kB   build/3123.async.js
@sitin/minerva:build:dev:   10.35 kB   build/8633.async.js
@sitin/minerva:build:dev:   10.19 kB   build/6258.async.js
@sitin/minerva:build:dev:   9.8 kB     build/2062.async.js
@sitin/minerva:build:dev:   9.52 kB    build/9591.async.js
@sitin/minerva:build:dev:   9.38 kB    build/3273.async.js
@sitin/minerva:build:dev:   9.3 kB     build/p__Login__index.async.js
@sitin/minerva:build:dev:   8.89 kB    build/6754.async.js
@sitin/minerva:build:dev:   8.74 kB    build/p__Union__Brain__PromptManage__index.async.js
@sitin/minerva:build:dev:   8.71 kB    build/p__Union__Devices__Detail__index.async.js
@sitin/minerva:build:dev:   8.54 kB    build/8240.async.js
@sitin/minerva:build:dev:   8.51 kB    build/737.async.js
@sitin/minerva:build:dev:   8.47 kB    build/6439.async.js
@sitin/minerva:build:dev:   8.18 kB    build/5673.async.js
@sitin/minerva:build:dev:   8.14 kB    build/p__Union__Users__List__index.async.js
@sitin/minerva:build:dev:   7.7 kB     build/8377.async.js
@sitin/minerva:build:dev:   7.5 kB     build/6800.async.js
@sitin/minerva:build:dev:   7.37 kB    build/p__Union__BatchJobs__index.async.js
@sitin/minerva:build:dev:   6.72 kB    build/3834.async.js
@sitin/minerva:build:dev:   6.5 kB     build/p__Union__Users__Detail__index.async.js
@sitin/minerva:build:dev:   6.39 kB    build/p__Union__Analytics__Funnel__index.async.js
@sitin/minerva:build:dev:   6.38 kB    build/9915.async.js
@sitin/minerva:build:dev:   6.38 kB    build/p__Union__Brain__ModelConfig__index.async.js
@sitin/minerva:build:dev:   6.28 kB    build/2044.async.js
@sitin/minerva:build:dev:   5.93 kB    build/4759.async.js
@sitin/minerva:build:dev:   5.93 kB    build/1954.async.js
@sitin/minerva:build:dev:   5.81 kB    build/p__Union__Devices__Queue__index.async.js
@sitin/minerva:build:dev:   5.31 kB    build/p__RBAC__index.async.js
@sitin/minerva:build:dev:   4.93 kB    build/5641.async.js
@sitin/minerva:build:dev:   4.89 kB    build/3935.async.js
@sitin/minerva:build:dev:   4.85 kB    build/p__Union__Brain__Playground__index.async.js
@sitin/minerva:build:dev:   4.62 kB    build/p__Home__index.async.js
@sitin/minerva:build:dev:   4.6 kB     build/p__Union__Simulator__index.async.js
@sitin/minerva:build:dev:   4.51 kB    build/7774.async.js
@sitin/minerva:build:dev:   4.37 kB    build/p__Union__Brain__DecisionLog__index.async.js
@sitin/minerva:build:dev:   4.29 kB    build/p__JwtStatus__index.async.js
@sitin/minerva:build:dev:   3.66 kB    build/9665.async.js
@sitin/minerva:build:dev:   3.56 kB    build/7173.async.js
@sitin/minerva:build:dev:   3.53 kB    build/5726.async.js
@sitin/minerva:build:dev:   3.51 kB    build/p__Union__Users__Create__index.async.js
@sitin/minerva:build:dev:   3.46 kB    build/p__Lovia__List__index.async.js
@sitin/minerva:build:dev:   3.46 kB    build/p__Union__Templates__Experiments__index.async.js
@sitin/minerva:build:dev:   3.24 kB    build/2336.async.js
@sitin/minerva:build:dev:   3.2 kB     build/t__plugin-layout__Layout.async.js
@sitin/minerva:build:dev:   3.17 kB    build/7325.async.js
@sitin/minerva:build:dev:   3.16 kB    build/549.async.js
@sitin/minerva:build:dev:   3 kB       build/p__Union__Users__Import__index.async.js
@sitin/minerva:build:dev:   2.85 kB    build/p__Union__Dashboard__index.async.js
@sitin/minerva:build:dev:   2.65 kB    build/p__Union__Devices__List__index.async.js
@sitin/minerva:build:dev:   2.53 kB    build/p__Union__Settings__index.async.js
@sitin/minerva:build:dev:   2.05 kB    build/p__Union__MessageTemplates__List__index.async.js
@sitin/minerva:build:dev:   1.45 kB    build/p__Union__Templates__List__index.async.js
@sitin/minerva:build:dev:   1.4 kB     build/p__FeishuCallback__index.async.js
@sitin/minerva:build:dev:   1.34 kB    build/p__Union__Templates__Editor__index.async.js
@sitin/minerva:build:dev:   1.16 kB    build/umi.css
@sitin/minerva:build:dev:   620 B      build/p__Login__index.chunk.css
@sitin/minerva:build:dev:   372 B      build/t__plugin-layout__Layout.chunk.css
@sitin/minerva:build:dev:   259 B      build/p__Lovia__Create__index.async.js
@sitin/minerva:build:dev:   220 B      build/7877.async.js
@sitin/minerva:build:dev:   159 B      build/p__PWADataboard__index.chunk.css
@sitin/minerva:build:dev:   150 B      build/p__Home__index.chunk.css
@sitin/minerva:build:dev: 
@sitin/minerva:build:dev: event - Build index.html
@sitin/api-proto:build: event - Transformed successfully in 25703 ms (19 files)
@sitin/http-client:build: cache miss, executing 360f565e71e33304
@sitin/http-client:build: 
@sitin/http-client:build: > @sitin/http-client@1.0.0 build /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/packages/http-client
@sitin/http-client:build: > father build
@sitin/http-client:build: 
@sitin/http-client:build: info  - Clean output directories
@sitin/http-client:build: info  - Bundless for src directory to esm format
@sitin/http-client:build: event - Bundless types.ts to es/types.js (with declaration)
@sitin/http-client:build: event - Bundless HttpClient.ts to es/HttpClient.js (with declaration)
@sitin/http-client:build: event - Bundless index.ts to es/index.js (with declaration)
@sitin/http-client:build: event - Generate declaration files...
@sitin/http-client:build: event - Transformed successfully in 2404 ms (3 files)
@sitin/http-client:build: info  - Bundless for src directory to cjs format
@sitin/http-client:build: event - Bundless HttpClient.ts to lib/HttpClient.js (with declaration)
@sitin/http-client:build: event - Bundless index.ts to lib/index.js (with declaration)
@sitin/http-client:build: event - Bundless types.ts to lib/types.js (with declaration)
@sitin/http-client:build: event - Generate declaration files...
@sitin/http-client:build: event - Transformed successfully in 1831 ms (3 files)
@sitin/cashier:build:dev: cache miss, executing c54c9cac6d32dce7
@sitin/pwa:build:dev: cache miss, executing 4a1e3d5e2648fe7d
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev: > @sitin/cashier@0.1.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/cashier
@sitin/cashier:build:dev: > NODE_ENV=production next build && npm run pre:deploy
@sitin/cashier:build:dev: 
@sitin/pwa:build:dev: 
@sitin/pwa:build:dev: > @sitin/pwa@1.0.0 build:dev /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/pwa
@sitin/pwa:build:dev: > tsc -b && vite build --mode development
@sitin/pwa:build:dev: 
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:    ▲ Next.js 16.0.7 (Turbopack)
@sitin/cashier:build:dev: 
@sitin/cashier:build:dev:    Running TypeScript ...
@sitin/cashier:build:dev:    Creating an optimized production build ...
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:  ✓ Compiled successfully in 6.9s
@sitin/cashier:build:dev:    Collecting page data using 15 workers ...
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:    Generating static pages using 15 workers (0/3) ...
@sitin/cashier:build:dev: [baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
@sitin/cashier:build:dev:  ✓ Generating static pages using 15 workers (3/3) in 1888.9ms
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
@sitin/pwa:build:dev: src/hooks/useGoogleAuth.ts(115,11): error TS2304: Cannot find name 'mode'.
@sitin/pwa:build:dev: src/hooks/useGoogleAuth.ts(118,41): error TS2304: Cannot find name 'getThirdPartyLoginOldUser'.
@sitin/pwa:build:dev: src/hooks/useGoogleAuth.ts(122,37): error TS2304: Cannot find name 'showConfirmDialog'.
@sitin/pwa:build:dev: src/hooks/useGoogleAuth.ts(140,32): error TS2552: Cannot find name 'getDeviceId'. Did you mean 'deviceId'?
@sitin/pwa:build:dev: src/hooks/useGoogleAuth.ts(141,24): error TS2304: Cannot find name 'userInfo'.
@sitin/pwa:build:dev: src/hooks/useGoogleAuth.ts(148,26): error TS2304: Cannot find name 'bind'.
@sitin/pwa:build:dev:  ELIFECYCLE  Command failed with exit code 1.
@sitin/pwa:build:dev: ERROR: command finished with error: command (/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/pwa) /var/lib/jenkins/.local/share/pnpm/.tools/pnpm/8.15.0/bin/pnpm run build:dev exited (1)
@sitin/pwa#build:dev: command (/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_webapp/apps/pwa) /var/lib/jenkins/.local/share/pnpm/.tools/pnpm/8.15.0/bin/pnpm run build:dev exited (1)

 Tasks:    8 successful, 9 total
Cached:    0 cached, 9 total
  Time:    1m42.482s 
Failed:    @sitin/pwa#build:dev

 ERROR  run failed: command  exited (1)
 ELIFECYCLE  Command failed with exit code 1.
[ERROR] Build failed
Build step 'Execute shell' marked build as failure
Finished: FAILURE
