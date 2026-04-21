---
date: 2026-04-21T19:43:15+08:00
source: clipboard
chars: 1559
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
Checking out Revision 15367b6ee339bd7d0a4f040d58e74a6c2064da8c (refs/remotes/origin/feature/migrate-minerva-from-monorepo)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 15367b6ee339bd7d0a4f040d58e74a6c2064da8c # timeout=10
Commit message: "refactor(admin): 补充脚本"
First time build. Skipping changelog.
[frontend_dev_sitin_next] $ /bin/bash /tmp/jenkins10331594733392151768.sh
chmod: cannot access 'scripts/jenkins-build.sh': No such file or directory
/tmp/jenkins10331594733392151768.sh: line 4: ./scripts/jenkins-build.sh: No such file or directory
Build step 'Execute shell' marked build as failure
Finished: FAILURE
