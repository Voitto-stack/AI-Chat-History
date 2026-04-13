---
date: 2026-04-13T11:10:58+08:00
source: clipboard
chars: 2556
---

 sitin-monorepo git:(fix/minerva-bugs) ✗ git fetch origin                                         
remote: Enumerating objects: 28, done.
remote: Counting objects: 100% (28/28), done.
remote: Compressing objects: 100% (10/10), done.
remote: Total 28 (delta 18), reused 28 (delta 18), pack-reused 0 (from 0)
Unpacking objects: 100% (28/28), 23.09 KiB | 319.00 KiB/s, done.
From https://github.com/presence-io/sitin-monorepo
   f53ac0cd..439a161f  feature/social-proxy -> origin/feature/social-proxy
   d53fa0f1..5fdbf225  release/test         -> origin/release/test
➜  sitin-monorepo git:(fix/minerva-bugs) ✗ git rebase origin/fix/minerva-bugs
error: cannot rebase: You have unstaged changes.
error: Please commit or stash them.
➜  sitin-monorepo git:(fix/minerva-bugs) ✗ git add . && git stash            
Saved working directory and index state WIP on fix/minerva-bugs: a240fabd fix: 补充video文件
➜  sitin-monorepo git:(fix/minerva-bugs) git rebase origin/fix/minerva-bugs
Current branch fix/minerva-bugs is up to date.
➜  sitin-monorepo git:(fix/minerva-bugs) git stash pop                     
On branch fix/minerva-bugs
Your branch is ahead of 'origin/feature/minerva-v2' by 1009 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   apps/minerva-server/.env.local
        modified:   apps/minerva-server/src/config/jwt.ts
        modified:   apps/minerva-server/src/middlewares/auth.ts
        modified:   apps/minerva-server/src/routes/auth.ts
        modified:   apps/minerva-server/src/routes/auth/feishu.ts
        modified:   apps/minerva-server/src/utils/redis.ts

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (0419f2f38be8fcd5c42867e31077e9464a9d4f27)
➜  sitin-monorepo git:(fix/minerva-bugs) ✗ git push origin feature/minerva-forOL-v2:fix/minerva-bugs
To https://github.com/presence-io/sitin-monorepo.git
 ! [rejected]          feature/minerva-forOL-v2 -> fix/minerva-bugs (non-fast-forward)
error: failed to push some refs to 'https://github.com/presence-io/sitin-monorepo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
➜  sitin-monorepo git:(fix/minerva-bugs) ✗ 
