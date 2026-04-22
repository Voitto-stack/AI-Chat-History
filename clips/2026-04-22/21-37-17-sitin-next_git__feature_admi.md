---
date: 2026-04-22T21:37:17+08:00
source: clipboard
chars: 2546
---

  sitin-next git:(feature/admin-migrate) ✗ # 执行此命令后，所有的 git@github.com 都会被替换为 https://github.com/
git config --global url."https://github.com/".insteadOf git@github.com:
➜  sitin-next git:(feature/admin-migrate) ✗ git submodule init && git submodule update --remote                   
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/docs/opentelemetry-js'...
^C
➜  sitin-next git:(feature/admin-migrate) ✗ git submodule update --init --recursive --depth 1 --jobs 8
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/docs/opentelemetry-js'...
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/docs/pino-roll'...
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/packages/business-pwa-proto/proto'...
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/docs/pino'...
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/docs/pm2'...
Submodule path 'docs/opentelemetry-js': checked out '60c08f1466d0a5cf61118feaf2300c2262d47255'
Submodule 'experimental/packages/otlp-transformer/protos' (https://github.com/open-telemetry/opentelemetry-proto.git) registered for path 'docs/opentelemetry-js/experimental/packages/otlp-transformer/protos'
Cloning into '/Users/presence79/Desktop/WORK/sitin-next/docs/opentelemetry-js/experimental/packages/otlp-transformer/protos'...
remote: Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Enumerating objects: 84, done.
remote: Counting objects: 100% (84/84), done.
remote: Compressing objects: 100% (29/29), done.
remote: Total 44 (delta 22), reused 20 (delta 1), pack-reused 0 (from 0)
Unpacking objects: 100% (44/44), 17.92 KiB | 241.00 KiB/s, done.
From https://github.com/open-telemetry/opentelemetry-proto
 * branch            8654ab7a5a43ca25fe8046e59dcd6935c3f76de0 -> FETCH_HEAD
Submodule path 'docs/opentelemetry-js/experimental/packages/otlp-transformer/protos': checked out '8654ab7a5a43ca25fe8046e59dcd6935c3f76de0'
Submodule path 'docs/pino': checked out 'eac18013e875c1c0c9287cc975c9746782087300'
Submodule path 'docs/pino-roll': checked out '7008d53c3213592132188b692c7eaad13cecb847'
Submodule path 'docs/pm2': checked out 'ff1ca974afada8730aa55f8ed1df40e700cedbcb'
Submodule path 'packages/business-pwa-proto/proto': checked out '22d62a934177602c488888bf7bcfbc1d01375f8b'
➜  sitin-next git:(feature/admin-migrate) ✗ git submodule update --init --recursive --depth 1 --jobs 8
➜  sitin-next git:(feature/admin-migrate) ✗ 工作区一堆这些图片里的东西，怎么回事
