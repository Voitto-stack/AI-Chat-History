---
title: 分支checkout来源排查
date: 2026-04-15 19:41:28
model: claude-sonnet-4-5-20250929
messages: 4
---

# 分支checkout来源排查

### User (19:34:00)
你在当前的分支里找到自这个分支创建以来提交者为cjkunwang
和presence79的所有cherry-pick然后列出来

### Assistant (19:40:43)
### 1. 直接执行

我查了当前分支 `feat/web/pwa-liebian` 相对 `main` 的分叉点 `25d0898` 之后的提交。

严格按 Git 提交信息里的 `cherry picked from commit` 标记来找，结果是 **0 条**。

但按 patch-id 做内容等价比对，能确认出一批**高概率是 cherry-pick / 重放过的提交**。这些提交都在当前分支 first-parent 历史上，且能在后面 merge 进来的 `feat/web/pwa-referral` 历史里找到内容完全一致、SHA 不同的对应提交。

当前分支提交 -> 等价来源提交：

- `fb5f6622` `feat(pwa): add invite landing page` -> `f82e8cee`
- `b2644617` `feat：修改图片icon和复制问题` -> `050018e6`
- `5184c407` `fix: 逻辑修复` -> `3baac89d`
- `71f097b8` `fix: 部分问题修复` -> `270277ce`
- `54292fb5` `fix：删除冗余代码+调整字段类型等` -> `06be19e2`
- `97487a06` `fix: 部分问题修复` -> `dd3b05a9`
- `978cac44` `feat: 更新 devTools 添加业务阶段说明和后端同步` -> `0905a659`
- `4fd66ba7` `fix: 更新proto` -> `30175d9e`
- `255f9ff2` `feat: devTools 添加测试提现请求功能` -> `eb2e92bd`
- `f56fb3f6` `fix: 更新proto` -> `add0fe53`
- `5484f22f` `feat: 恢复 PWA inviteLanding 用于本地调试` -> `7aa9e4c7`
- `df351dbc` `fix: 修复 BFF API TypeScript 类型错误` -> `5df88866`
- `cfeeb77c` `fix: 修复 inviteLanding 静态资源未复制到构建输出` -> `e0623181`
- `20ab17dc` `fix: 修复 inviteLanding.js API 地址和响应结构` -> `fbdf25b9`
- `ffee08b1` `refactor: 清理 PWA 下的 invite 落地页，统一使用 static-pages` -> `33a05f88`
- `fa02280f` `fix: 修复部署脚本只上传 doraPage 未上传 invite 的问题` -> `9128d2ad`
- `745a30ff` `debug: 部署脚本添加诊断日志，排查 invite 目录缺失问题` -> `78fd8490`
- `7c67861f` `fix: 将 static-pages 构建输出改到包内 build/ 目录` -> `8f38337e`
- `c69910f4` `fix: 更新proto` -> `8e2fe442`
- `48b55d02` `补充落地页链接` -> `912b9048`
- `0d685f9e` `fix: 使用导出的路径常量` -> `ed0c1670`
- `adfbfe90` `fix: 兼容类型检查` -> `5096bcc4`
- `62dea49c` `fix: 更新proto` -> `e4b12d2e`
- `9bac4a7d` `fix: 补充吊起分享面板文案改接收后端字段逻辑` -> `daa2bd4c`

补充两点：
1. 这些不是通过 commit message 明示的 cherry-pick，而是通过 patch-id 判断为“内容完全等价的重复提交”。
2. 这批重复提交基本都在后续 `2faafd89` 这个 merge（`merge: 合并 origin/feat/web/pwa-referral 到 feat/web/pwa-liebian`）里又出现了一次，所以很像“先挑过来，后面又把原分支 merge 进来”。

### 2. 深度交互

你真正想确认的，应该不是“有没有 cherry-pick 这个动作”本身，而是：**当前分支里哪些改动已经重复引入过，后续整理 PR 或 rebase 时哪些提交可以视为重复历史。**

只看 `cherry picked from commit` 标记会漏掉很多实际发生过的手工 cherry-pick，因为很多人挑提交时会用不保留来源信息的方式。这里用 patch-id 去重更接近你真正要的结果。

### User (19:40:55)
你从哪个分支checkout出来的

### Assistant (19:41:28)
### 1. 直接执行

从 reflog 看，`feat/web/pwa-liebian` 是在 `2026-03-25 20:09:51 +0800` 通过 `branch: Created from HEAD` 创建的。

也就是说，**Git 只记录了“从当时的 HEAD 创建”**，没有直接记录“当时你正在哪个分支上 checkout”。

但结合后续最早的操作记录看：
- 这条分支创建后最早连续执行的是 `pull origin feat/web/pwa --rebase`
- 分叉点提交 `25d0898` 现在被 `feat/web/pwa` 包含

所以高概率是：**从 `feat/web/pwa` 切出来的**。

更准确地说：
- **Git 明确能证明的**：`feat/web/pwa-liebian` 是从创建当时的 `HEAD` 切出来的
- **基于现有历史的最佳判断**：那个 `HEAD` 大概率就是 `feat/web/pwa`

### 2. 深度交互

你现在要的其实不是“checkout 时站在哪个分支名上”，而是“这条线最初继承的是哪条开发线”。

这两个概念在 Git 里不完全一样。因为 `branch: Created from HEAD` 只保存了当时的提交，不保存分支名；分支名事后可能移动、删除、重建。所以我能高置信判断它继承自 `feat/web/pwa` 这条线，但没法 100% 从 Git 原始记录里证明“当时 checkout 的名字就是 feat/web/pwa”。
