---
date: 2026-04-15T15:09:14+08:00
source: clipboard
chars: 914
---

minerva-server git:(fix/minerva-bugs) ✗ node tunnel.js
node:internal/modules/cjs/loader:1478
  throw err;
  ^

Error: Cannot find module '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/apps/minerva-server/tunnel.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1475:15)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1048:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1072:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1093:12)
    at Module._load (node:internal/modules/cjs/loader:1261:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v25.8.0
➜  minerva-server git:(fix/minerva-bugs) ✗ 
