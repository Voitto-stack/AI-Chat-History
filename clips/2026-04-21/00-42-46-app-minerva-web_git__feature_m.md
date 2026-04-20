---
date: 2026-04-21T00:42:46+08:00
source: clipboard
chars: 3089
---

app-minerva-web git:(feature/migrate-minerva-from-monorepo) ✗ pnpm dev:local 

> @sitin/minerva@0.1.0 dev:local /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web
> UMI_ENV=local max dev

info  - [你知道吗？] max g tsconfig 可一键完成项目的 TypeScript 配置。
info  - Umi v4.6.45
info  - Preparing...
(node:98874) Warning: `--localstorage-file` was provided without a valid path
(Use `node --trace-warnings ...` to show where the warning was created)
✘ [ERROR] No matching export in "src/api/guild.ts" for import "listGuildTemplates"

    src/pages/Guild/Templates/List/index.tsx:7:9:
      7 │ import { listGuildTemplates, review...
        ╵          ~~~~~~~~~~~~~~~~~~

✘ [ERROR] No matching export in "src/api/guild.ts" for import "reviewGuildTemplate"

    src/pages/Guild/Templates/List/index.tsx:7:29:
      7 │ ...lates, reviewGuildTemplate } fro...
        ╵           ~~~~~~~~~~~~~~~~~~~

✘ [ERROR] No matching export in "src/api/guild.ts" for import "getGuildTemplate"

    src/pages/Guild/Templates/Editor/index.tsx:7:2:
      7 │   getGuildTemplate,
        ╵   ~~~~~~~~~~~~~~~~

✘ [ERROR] No matching export in "src/api/guild.ts" for import "createGuildTemplate"

    src/pages/Guild/Templates/Editor/index.tsx:8:2:
      8 │   createGuildTemplate,
        ╵   ~~~~~~~~~~~~~~~~~~~

✘ [ERROR] No matching export in "src/api/guild.ts" for import "updateGuildTemplate"

    src/pages/Guild/Templates/Editor/index.tsx:9:2:
      9 │   updateGuildTemplate,
        ╵   ~~~~~~~~~~~~~~~~~~~

fatal - Error: Build failed with 5 errors:
src/pages/Guild/Templates/Editor/index.tsx:7:2: ERROR: No matching export in "src/api/guild.ts" for import "getGuildTemplate"
src/pages/Guild/Templates/Editor/index.tsx:8:2: ERROR: No matching export in "src/api/guild.ts" for import "createGuildTemplate"
src/pages/Guild/Templates/Editor/index.tsx:9:2: ERROR: No matching export in "src/api/guild.ts" for import "updateGuildTemplate"
src/pages/Guild/Templates/List/index.tsx:7:9: ERROR: No matching export in "src/api/guild.ts" for import "listGuildTemplates"
src/pages/Guild/Templates/List/index.tsx:7:29: ERROR: No matching export in "src/api/guild.ts" for import "reviewGuildTemplate"
    at failureErrorWithLog (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:1472:15)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:945:25
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:1353:9
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5) {
  errors: [Getter/Setter],
  warnings: [Getter/Setter]
}
fatal - A complete log of this run can be found in:
fatal - /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web/node_modules/.cache/logger/umi.log
fatal - Consider reporting a GitHub issue on https://github.com/umijs/umi/issues
➜  app-minerva-web git:(feature/migrate-minerva-from-monorepo) ✗ 
