---
date: 2026-04-22T23:12:41+08:00
source: clipboard
chars: 2114
---

app-minerva-server git:(feature/admin-migrate) ✗ pnpm run dev  

> @heyhru/app-minerva-server@0.1.1 dev /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server
> NODE_ENV=local tsx watch src/index.ts

node:internal/modules/cjs/loader:1475
  const err = new Error(message);
              ^

Error: Cannot find module '../generated/prisma'
Require stack:
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/utils/prisma.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/auth.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/index.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/index.ts
    at node:internal/modules/cjs/loader:1475:15
    at nextResolveSimple (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1004)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:2630
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1542
    at resolveTsPaths (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:760)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1102
    at m._resolveFilename (file:///Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1048:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1072:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1093:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/utils/prisma.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/auth.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/index.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/index.ts'
  ]
}

Node.js v25.8.0
