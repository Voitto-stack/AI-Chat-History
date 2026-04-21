---
date: 2026-04-21T19:49:40+08:00
source: clipboard
chars: 7150
---

Started by user xuzaixing
Running as SYSTEM
Building in workspace /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next
The recommended git tool is: NONE
using credential a737f077-8bee-449d-ba01-b9ea73f051b4
 > git rev-parse --resolve-git-dir /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/.git # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url git@github.com:presence-io/sitin-next.git/ # timeout=10
Fetching upstream changes from git@github.com:presence-io/sitin-next.git/
 > git --version # timeout=10
 > git --version # 'git version 2.39.5'
using GIT_SSH to set credentials 
Verifying host key using known hosts file
 > git fetch --tags --force --progress -- git@github.com:presence-io/sitin-next.git/ +refs/heads/*:refs/remotes/origin/* # timeout=10
 > git rev-parse refs/remotes/origin/feature/migrate-minerva-from-monorepo^{commit} # timeout=10
Checking out Revision dd8a227deb75d1d1820f4078d51c0d3eb523a722 (refs/remotes/origin/feature/migrate-minerva-from-monorepo)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f dd8a227deb75d1d1820f4078d51c0d3eb523a722 # timeout=10
Commit message: "refactor(admin): 修复脚本名称"
 > git rev-list --no-walk 15367b6ee339bd7d0a4f040d58e74a6c2064da8c # timeout=10
[frontend_dev_sitin_next] $ /bin/bash /tmp/jenkins843394747112428603.sh
[INFO] ========================================
[INFO] Starting Jenkins Build
[INFO] ========================================

[INFO] Step 1: Installing dependencies...
Scope: all 34 workspace projects
 WARN  Ignoring broken lockfile at /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/node_modules/.pnpm: Lockfile /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/node_modules/.pnpm/lock.yaml not compatible with current pnpm
Lockfile is up to date, resolution step is skipped
Packages: +3975
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 0, reused 0, downloaded 1, added 0
Progress: resolved 0, reused 0, downloaded 334, added 89
Progress: resolved 0, reused 0, downloaded 451, added 118
Progress: resolved 0, reused 0, downloaded 552, added 142
Progress: resolved 0, reused 0, downloaded 605, added 151
Progress: resolved 0, reused 0, downloaded 970, added 272
Progress: resolved 0, reused 0, downloaded 1270, added 341
Progress: resolved 0, reused 0, downloaded 1531, added 397
Progress: resolved 0, reused 0, downloaded 1884, added 470
Progress: resolved 0, reused 0, downloaded 2052, added 479
Progress: resolved 0, reused 0, downloaded 2173, added 489
Progress: resolved 0, reused 0, downloaded 2408, added 572
Progress: resolved 0, reused 0, downloaded 2550, added 618
Progress: resolved 0, reused 0, downloaded 2723, added 667
Progress: resolved 0, reused 0, downloaded 2894, added 693
Progress: resolved 0, reused 0, downloaded 3073, added 730
Progress: resolved 0, reused 0, downloaded 3186, added 838
Progress: resolved 0, reused 0, downloaded 3189, added 1178
Progress: resolved 0, reused 0, downloaded 3192, added 1366
Progress: resolved 0, reused 0, downloaded 3193, added 1471
Progress: resolved 0, reused 0, downloaded 3193, added 1696
Progress: resolved 0, reused 0, downloaded 3193, added 1960
Progress: resolved 0, reused 0, downloaded 3193, added 2398
Progress: resolved 0, reused 0, downloaded 3193, added 2722
Progress: resolved 0, reused 0, downloaded 3193, added 3144
Progress: resolved 0, reused 0, downloaded 3193, added 3335
Progress: resolved 0, reused 0, downloaded 3193, added 3520
Progress: resolved 0, reused 0, downloaded 3193, added 3917
Progress: resolved 0, reused 0, downloaded 3193, added 3975
Progress: resolved 0, reused 0, downloaded 3193, added 3975, done
node_modules/esbuild postinstall$ node install.js
.../bundler-utils/node_modules/esbuild postinstall$ node install.js
.../vite/node_modules/esbuild postinstall$ node install.js
.../bundler-vite/node_modules/esbuild postinstall$ node install.js
node_modules/esbuild postinstall: Done
.../bundler-utils/node_modules/esbuild postinstall: Done
.../vite/node_modules/esbuild postinstall: Done
.../bundler-vite/node_modules/esbuild postinstall: Done

. preinstall$ npx -y only-allow pnpm
. preinstall: npm warn Unknown env config "cxxflags". This will stop working in the next major version of npm.
. preinstall: npm warn Unknown env config "node-linker". This will stop working in the next major version of npm.
. preinstall: npm warn Unknown env config "verify-deps-before-run". This will stop working in the next major version of npm.
. preinstall: npm warn Unknown env config "npm-globalconfig". This will stop working in the next major version of npm.
. preinstall: npm warn Unknown env config "_jsr-registry". This will stop working in the next major version of npm.
. preinstall: npm warn Unknown project config "node-linker". This will stop working in the next major version of npm.
. preinstall: npm warn Unknown project config "CXXFLAGS". This will stop working in the next major version of npm.
. preinstall: Done
. prepare$ husky
. prepare: Done
packages/app-minerva-web postinstall$ max setup
packages/app-minerva-web postinstall: info  - [你知道吗？] dev 模式下访问 /__umi 路由，可以发现很多有用的内部信息。
packages/app-minerva-web postinstall: info  - generate files
packages/app-minerva-web postinstall: info  - Preparing...
packages/app-minerva-web postinstall: Done
╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: @confluentinc/kafka-javascript@1.9.0,               │
│   @nestjs/core@11.1.19, @prisma/client@6.19.3, @prisma/engines@6.19.3,       │
│   @sentry/cli@2.58.5, @swc/core@1.15.30, core-js-pure@3.49.0,                │
│   core-js@2.6.12, core-js@3.34.0, core-js@3.49.0, es5-ext@0.10.64,           │
│   nx@22.6.5, prisma@6.19.3, protobufjs@7.5.5, unrs-resolver@1.11.1.          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
Done in 58.4s using pnpm v10.33.0
[SUCCESS] Dependencies installed successfully

[INFO] Step 2: Building project...
[INFO] Environment==> development
[INFO] noCache==> 
[INFO] 🟢 Using development build script: build:dev
[INFO] 📦 Using cache, building with turbo...
 ERR_PNPM_NO_SCRIPT  Missing script: build:dev

Command "build:dev" not found. Did you mean "pnpm run build"?
[ERROR] Build failed
Build step 'Execute shell' marked build as failure
Finished: FAILURE
