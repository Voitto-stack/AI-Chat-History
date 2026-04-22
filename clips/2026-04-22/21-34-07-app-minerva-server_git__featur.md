---
date: 2026-04-22T21:34:07+08:00
source: clipboard
chars: 1642
---

app-minerva-server git:(feature/admin-migrate) ✗ pnpm run dev 

> @heyhru/app-minerva-server@0.1.1 dev /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server
> NODE_ENV=local tsx watch src/index.ts

node:internal/modules/cjs/loader:530
      const err = new Error(
                  ^

Error: Cannot find module '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/node_modules/@heyhru/minerva-schemas/dist/index.js'. Please verify that the package.json has a valid "main" entry
    at tryPackage (node:internal/modules/cjs/loader:530:19)
    at Module._findPath (node:internal/modules/cjs/loader:798:18)
    at node:internal/modules/cjs/loader:1460:27
    at nextResolveSimple (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1004)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:2630
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1542
    at resolveTsPaths (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:760)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1102
    at m._resolveFilename (file:///Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1048:27) {
  code: 'MODULE_NOT_FOUND',
  path: '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/node_modules/@heyhru/minerva-schemas/package.json',
  requestPath: '@heyhru/minerva-schemas'
}

Node.js v25.8.0

