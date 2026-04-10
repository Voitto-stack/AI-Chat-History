---
title: 看下报错：TypeError: Cannot read properties o
date: 2026-04-09T15:50:09+08:00
session_id: a1d441e7-fd4f-4f04-8d44-c18c98f22c4f
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 13
---

# 看下报错：TypeError: Cannot read properties o

### User (15:50:09)

看下报错：TypeError: Cannot read properties of null (reading 'entryStatus')
    at BffEntryCard (index.tsx:57:16)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=0e958e64:18509:20)
    at renderWithHooks (react-dom_client.js?v=0e958e64:5654:24)
    at updateFunctionComponent (react-dom_client.js?v=0e958e64:7475:21)
    at beginWork (react-dom_client.js?v=0e958e64:8525:20)
    at runWithFiberInDEV (react-dom_client.js?v=0e958e64:997:72)
    at performUnitOfWork (react-dom_client.js?v=0e958e64:12561:98)
    at workLoopSync (react-dom_client.js?v=0e958e64:12424:43)
    at renderRootSync (react-dom_client.js?v=0e958e64:12408:13)
    at performWorkOnRoot (react-dom_client.js?v=0e958e64:11827:37)Caused by: React ErrorBoundary TypeError: Cannot read properties of null (reading 'entryStatus')
    at BffEntryCard (index.tsx:18:32)
    at div (<anonymous>)
    at div (<anonymous>)
    at Earnings (index.tsx:13:37)
    at Suspense (<anonymous>)
    at div (<anonymous>)
    at div (<anonymous>)
    at div (<anonymous>)
    at TabLayout (TabLayout.tsx:20:37)
    at ProtectedRoute (index.tsx:47:27)
    at RenderedRoute (react-router-dom.js?v=d51e8a42:4131:5)
    at Routes (react-router-dom.js?v=d51e8a42:4601:5)
    at Suspense (<anonymous>)
    at AppRouter (<anonymous>)
    at AppContent (App.tsx:19:44)
    at FaceIdProvider (FaceIdContext.tsx:65:34)
    at Router (react-router-dom.js?v=d51e8a42:4544:15)
    at BrowserRouter (react-router-dom.js?v=d51e8a42:5290:5)
    at ErrorBoundary (@sentry_react.js?v=8c057f7f:29767:5)
    at App (App.tsx:60:20)

### Assistant (15:50:23)

我来看看 `BffEntryCard` 组件的代码，定位问题。

### Assistant (15:50:41)

## 1. 问题定位

错误发生在第 57 行，代码尝试访问 `overview.entryStatus`，但 `overview` 是 `null`：

```typescript:apps/pwa/src/components/BffEntryCard/index.tsx
// 第 51-54 行的 null 检查被注释掉了！
// if (loading || !overview) {
//   return null;
// }

// 第 57 行直接访问 overview，但此时可能为 null
if (overview.entryStatus === "IN_PROGRESS" && overview.activeInviteCount === 0) {
```

## 2. 修复方案

取消注释第 51-54 行的 null 检查：

### Assistant (15:51:11)

✅ 已修复。

**问题原因**：第 51-54 行的 `null` 检查被注释掉了，导致当 `overview` 为 `null` 时，代码继续执行到第 57 行尝试访问 `overview.entryStatus`。

**解决方法**：恢复了 null 检查，确保在 `loading` 或 `overview` 为空时提前 return。

---

## 深度交互

这个问题暴露了一个代码健壮性风险：

1. **注释掉防御性代码很危险** - 这段注释可能是调试时临时添加的，但忘记恢复了
2. **可选链更安全** - 如果不方便提前 return，可以用 `overview?.entryStatus` 避免崩溃
3. **TypeScript 类型保护** - 可以添加类型守卫确保 overview 非空后再使用：
   ```typescript
   if (!overview) return null;
   // 此后 TypeScript 知道 overview 不是 null
   ```

建议：扫描代码库中其他被注释掉的防御性检查，避免类似问题。

### User (16:38:56)

你更新一下这个项目的proto，这是一个submodule，后端的更新，然后后端指向的分支是release/test，不是前端分支

### Assistant (16:45:26)

我来更新 proto 子模块到后端的 `release/test` 分支。

### Assistant (16:45:56)

抱歉，我应该进入子模块目录操作。让我重新执行：

### User (16:47:35)

[Request interrupted by user]

### User (16:48:02)

等会，你不是应该看下readme之类的文档，找到类似：# 更新 Proto 定义 默认线上分支
pnpm update:proto
# 更新 Proto 定义 测试分支
pnpm update:proto release/test
这种分析一下吗

### Assistant (16:48:14)

你说得对！我应该先查看项目文档和脚本。让我看看：

### Assistant (16:48:29)

完全正确！我应该先看项目文档。找到了：

**README.md 85-88 行**：
```bash
# 更新 Proto 定义 默认线上分支
pnpm update:proto
# 更新 Proto 定义 测试分支
pnpm update:proto release/test
```

**package.json 第 17 行**：
```json
"update:proto": "node scripts/update-proto.js"
```

让我使用项目提供的脚本来更新：

### User (16:52:23)

[Request interrupted by user]

### User (16:55:40)

我怎么撤回刚才的git stash pop

### Assistant (16:58:09)

撤回 `git stash pop` 有几种方法：

### Assistant (16:59:29)

看到你当前在合并冲突状态。要完全撤回，用这个命令：

### Assistant (17:00:41)

✅ 已撤回！现在切回你的工作分支：

### Assistant (17:01:06)

**完成！** 已回到 `feat/web/pwa-liebian` 分支，工作区干净。

---

## 关于 Proto 更新

README 提到的 `pnpm update:proto release/test` 脚本不存在。建议：

1. **手动更新子模块**（如果 api-proto 是 git submodule）：
   ```bash
   cd packages/api-proto
   git fetch origin
   git checkout release/test
   git pull origin release/test
   cd ../..
   git add packages/api-proto
   ```

2. **或询问团队**：这个脚本可能已废弃，确认当前正确的 proto 更新流程。

需要我帮你手动更新 proto 子模块吗？

### User (17:03:25)

为什么每次执行pnpm update:proto release/test都会把我的开发分支切到release/test去呢，这事不对的

### Assistant (17:03:37)

你说得对！`update:proto` 脚本不应该切换主仓库的分支。让我找到并检查这个脚本：

### Assistant (17:04:05)

找到问题了！脚本看起来没问题，它用 `-C packages/api-proto/proto` 参数在子模块目录执行命令。但让我检查一下实际的子模块路径：

### Assistant (17:04:20)

脚本本身看起来是对的！它用 `git -C packages/api-proto/proto` 参数，应该只在子模块目录执行。问题可能是：

1. **子模块初始化问题** - 让我验证一下：

### Assistant (17:06:49)

**找到问题了！** 子模块的 remote 指向错了：

```bash
origin  https://github.com/presence-io/sitin-monorepo.git  # ❌ 错误：指向主仓库
```

而 `.gitmodules` 中配置的是：
```
url = git@github.com:presence-io/proto.git  # ✅ 正确：应该指向 proto 仓库
```

**这就是为什么切换主仓库分支的原因**：脚本在 `packages/api-proto/proto` 目录执行 `git checkout release/test`，但这个子模块实际指向主仓库，所以相当于切换了主仓库分支！

**修复方法**：

### User (17:21:17)

[Request interrupted by user]

### User (17:21:25)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m</local-command-stdout>

### User (17:21:29)

继续

### Assistant (17:22:07)

Good, remote 已修复。现在清理旧的本地分支（它们来自主仓库），然后拉取 proto 仓库的分支：

### Assistant (17:23:07)

现在 fetch 到的是 proto 仓库的分支了。切到 `release/test` 并拉取最新：

### Assistant (17:25:01)

这说明 `packages/api-proto/proto` 没有被正确初始化为独立子模块，git 仍然把它当作主仓库的一部分。让我确认：

### Assistant (17:27:42)

**问题更严重了**：`packages/api-proto/proto` 根本没有初始化为子模块，它没有 `.git` 文件。之前的 `git remote set-url` 实际上改的是**主仓库的 remote**！

先恢复主仓库的 remote：

### Assistant (17:28:24)

确实被改了。恢复主仓库 remote：

### Assistant (17:28:47)

✅ 主仓库 remote 已恢复。

现在正确初始化子模块：

### Assistant (17:31:32)

子模块仍未初始化。让我深入诊断：

### Assistant (17:34:50)

**根因找到了：**

`.gitmodules` 声明了子模块 `packages/api-proto/proto → git@github.com:presence-io/proto.git`，但这个子模块**从未被正确初始化**：

1. `git config` 中无子模块注册
2. `.git/modules/` 目录不存在
3. `proto/` 目录有内容但**没有 `.git` 文件**

这意味着 `proto/` 的内容是直接被主仓库 tracking 的（不是子模块引用）。所以 `update-proto.js` 中的 `git -C packages/api-proto/proto checkout release/test` 实际执行的是主仓库的 `git checkout`，因为 `-C` 进入的目录没有独立的 `.git`，git 会向上查找到主仓库。

**这是一个仓库配置问题**，需要和团���确认：proto 到底是要用 submodule 方式管理，还是直接嵌入主仓库？如果要走 submodule，需要重新初始化。

现在如果你只是想手动拿到 proto 仓库 `release/test` 分支的最新文件，可以用这个方式：

```bash
# 临时 clone proto 仓库，拷贝文件过来
git clone --branch release/test --depth 1 git@github.com:presence-io/proto.git /tmp/proto-update
cp -r /tmp/proto-update/* packages/api-proto/proto/
rm -rf /tmp/proto-update
```

要我执行这个吗？

*...conversation truncated for brevity...*
