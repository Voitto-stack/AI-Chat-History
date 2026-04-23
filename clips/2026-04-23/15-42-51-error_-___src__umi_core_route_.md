---
date: 2026-04-23T15:42:51+08:00
source: clipboard
chars: 6804
---

error - ./src/.umi/core/route.tsx:560:23-134
Module not found: Error: Can't resolve '@/pages/Guild/Experiments/List/index.tsx' in '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web/src/.umi/core'
wait  - [Webpack] Compiling...
event - [MFSU][eager] start build deps
info  - [MFSU] skip buildDeps
✘ [ERROR] Can't resolve '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web/src/pages/Guild/Experiments/List/index.tsx' in '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web/src/.umi/core' [plugin esbuildAliasPlugin]

    ../../node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:309:17:
      309 │       const error = new Error("Can't " + message);
          ╵                     ^

    at finishWithoutResolve (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:309:18)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:386:15
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:27:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:87:43
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:16:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:27:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:87:43
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:16:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:435:5
    at eval (eval at create (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/DirectoryExistsPlugin.js:41:15
    at process.processTicksAndRejections (node:internal/process/task_queues:89:21)

  This error came from the "onResolve" callback registered here:

    ../../node_modules/@umijs/preset-umi/dist/features/prepare/esbuildPlugins/esbuildAliasPlugin.js:85:16:
      85 │           build.onResolve({ filter: filter2 }, asyn...
         ╵                 ~~~~~~~~~

    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/dist/features/prepare/esbuildPlugins/esbuildAliasPlugin.js:85:17
    at Array.forEach (<anonymous>)
    at setup (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/dist/features/prepare/esbuildPlugins/esbuildAliasPlugin.js:71:10)
    at handlePlugins (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:1150:21)
    at buildOrContextImpl (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:873:5)
    at Object.buildOrContext (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:699:5)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:2032:68
    at new Promise (<anonymous>)
    at Object.context (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:2032:27)
    at Object.context (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/bundler-utils/node_modules/esbuild/lib/main.js:1874:58)
    at build (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/dist/features/prepare/build.js:96:46)
    at Hook.fn (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/dist/features/prepare/prepare.js:107:40)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async /Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/core/dist/service/service.js:184:15

  The plugin "esbuildAliasPlugin" was triggered by this import

    src/.umi/core/route.tsx:55:90:
      55 │ ...dex" */'@/pages/Guild/Experiments/List/index.tsx...
         ╵           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

event - [Webpack] Compiled in 439 ms (589 modules)
error - [icons] build failed: Error: Build failed with 1 error:
../../node_modules/@umijs/preset-umi/node_modules/enhanced-resolve/lib/Resolver.js:309:17: ERROR: [plugin: esbuildAliasPlugin] Can't resolve '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web/src/pages/Guild/Experiments/List/index.tsx' in '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-web/src/.umi/core'
wait  - [Webpack] Compiling...
event - [MFSU][eager] start build deps
info  - [MFSU] skip buildDeps
event - config routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes, routes changed, regenerate tmp files...
event - [Webpack] Compiled in 1711 ms (589 modules)
wait  - [Webpack] Compiling...
event - [MFSU][eager] start build deps
info  - [MFSU] skip buildDeps
event - [Webpack] Compiled in 2580 ms (590 modules)

