---
name: user_prefers_direct_execution_over_worktree_workflow
description: User prefers direct execution on urgent bugfixes and reacts negatively when workflow overhead delays the actual code change.
type: feedback
originSessionId: 35dbd53a-9531-4e7d-904b-ff926984fad9
---
For urgent bugfixes, start fixing the code directly after root-cause confirmation instead of expanding into worktree-heavy process overhead.

**Why:** The user interrupted the worktree setup with frustration ("你修完了吗，你到底在干什么！") when the process delayed the actual implementation.

**How to apply:** On straightforward bugfixes in this repo, minimize planning/worktree ceremony and prioritize direct code changes, unless the user explicitly asks for isolation or branch/worktree workflow.
