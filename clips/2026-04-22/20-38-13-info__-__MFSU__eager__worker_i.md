---
date: 2026-04-22T20:38:13+08:00
source: clipboard
chars: 1014
---

info  - [MFSU][eager] worker init, takes 1291ms
info  - [MFSU][eager] build worker start to build
error - Can not resolve dependence : '@heyhru/minerva-schemas', please install it
error - AssertionError [ERR_ASSERTION]: dependence not found: @heyhru/minerva-schemas
    at _Dep.buildExposeContent (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/mfsu/dist/dep/dep.js:98:31)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async DepBuilderInWorker.writeMFFiles (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/dist/commands/dev/depBuildWorker/depBuilder.js:145:23)
    at async DepBuilderInWorker.build (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@umijs/preset-umi/dist/commands/dev/depBuildWorker/depBuilder.js:119:7)
event - [Webpack] Compiled in 3404 ms (603 modules)
wait  - [Webpack] Compiling...
event - [MFSU][eager] start build deps
info  - [MFSU] skip buildDeps
event - [Webpack] Compiled in 234 ms (589 modules)

