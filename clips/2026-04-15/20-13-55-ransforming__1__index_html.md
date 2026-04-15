---
date: 2026-04-15T20:13:55+08:00
source: clipboard
chars: 3054
---

ransforming (1) index.html
@heyhru/app-pwa:build: /fonts/TT-Fellows-Black.ttf referenced in /fonts/TT-Fellows-Black.ttf didn't resolve at build time, it will remain unchanged to be resolved at runtime
@heyhru/app-pwa:build: 
@heyhru/app-pwa:build: /fonts/RacingSansOne-Regular.ttf referenced in /fonts/RacingSansOne-Regular.ttf didn't resolve at build time, it will remain unchanged to be resolved at runtime
✓ 2365 modules transformed.
x Build failed in 12.21s
@heyhru/app-pwa:build: error during build:
@heyhru/app-pwa:build: [vite-plugin-pwa:build] There was an error during the build:
@heyhru/app-pwa:build:   ../../node_modules/zustand/esm/middleware/immer.mjs (1:9): "produce" is not exported by "__vite-optional-peer-dep:immer:zustand", imported by "../../node_modules/zustand/esm/middleware/immer.mjs".
@heyhru/app-pwa:build: Additionally, handling the error in the 'buildEnd' hook caused the following error:
@heyhru/app-pwa:build:   ../../node_modules/zustand/esm/middleware/immer.mjs (1:9): "produce" is not exported by "__vite-optional-peer-dep:immer:zustand", imported by "../../node_modules/zustand/esm/middleware/immer.mjs".
@heyhru/app-pwa:build: file: /Users/presence79/Desktop/WORK/sitin-next/node_modules/zustand/esm/middleware/immer.mjs:1:9
@heyhru/app-pwa:build: 
@heyhru/app-pwa:build: 1: import { produce } from 'immer';
@heyhru/app-pwa:build:             ^
@heyhru/app-pwa:build: 2: 
@heyhru/app-pwa:build: 3: const immerImpl = (initializer) => (set, get, store) => {
@heyhru/app-pwa:build: 
@heyhru/app-pwa:build:     at getRollupError (file:///Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa/node_modules/rollup/dist/es/shared/parseAst.js:406:41)
@heyhru/app-pwa:build:     at file:///Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa/node_modules/rollup/dist/es/shared/node-entry.js:23863:39
@heyhru/app-pwa:build:     at async catchUnfinishedHookActions (file:///Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa/node_modules/rollup/dist/es/shared/node-entry.js:23321:16)
@heyhru/app-pwa:build:     at async rollupInternal (file:///Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa/node_modules/rollup/dist/es/shared/node-entry.js:23846:5)
@heyhru/app-pwa:build:     at async build (file:///Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:65709:14)
@heyhru/app-pwa:build:     at async CAC.<anonymous> (file:///Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa/node_modules/vite/dist/node/cli.js:829:5)
@heyhru/app-pwa:build:  ELIFECYCLE  Command failed with exit code 1.
 ERROR  @heyhru/app-pwa#build: command (/Users/presence79/Desktop/WORK/sitin-next/packages/app-pwa) /Users/presence79/Library/pnpm/.tools/pnpm/10.33.0/bin/pnpm run build exited (1)

 Tasks:    19 successful, 20 total
Cached:    17 cached, 20 total
  Time:    57.822s 
Failed:    @heyhru/app-pwa#build

 ERROR  run failed: command  exited (1)
 ELIFECYCLE  Command failed with exit code 1.
➜  sitin-next git:(feature/pwa-bff-referral-v2) ✗ 
