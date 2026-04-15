---
date: 2026-04-15T16:09:26+08:00
source: clipboard
chars: 2983
---

在实际开发中（尤其是像 `sitin-monorepo` 这样复杂的项目），这种需求通常被称为**“同步上游依赖”**。

为了确保你的分支 A 包含分支 B 的最新内容，同时又能安全地提交到分支 C，最推荐的流程是 **“先取 B，再合 A，后提 C”**。

这里有两种主流方案，取决于你们团队对 Git 历史整洁度的要求：

---

### 方案一：标准 Merge 模式（最安全、最直观）
这种方式会保留分支 B 合并进来的记录，适合 B 分支包含大量复杂逻辑，且你希望在历史中看到这次“依赖同步”的情况。

1.  **更新 B 分支**：确保本地有 B 的最新代码。
    ```bash
    git fetch origin
    git checkout B
    git pull origin B
    ```
2.  **将 B 合并到 A**：
    ```bash
    git checkout A
    git merge B
    ```
    *此时如果发生冲突，就在 A 分支上解决。*
3.  **提交到 C**：
    推送到远端 A 分支，然后发起从 **A 到 C** 的 Pull Request。
    ```bash
    git push origin A
    ```

---

### 方案二：Rebase 模式（最整洁、推荐个人开发使用）
如果你希望你的提交历史像“直接基于 B 开发的一样”干净，可以使用 rebase。这会把你 A 分支特有的 commit 重新“粘贴”在 B 分支的末尾。

1.  **拉取 B 的最新动态**：
    ```bash
    git fetch origin B
    ```
2.  **在 A 分支上执行变基**：
    ```bash
    git checkout A
    git rebase origin/B
    ```
    *这样做之后，分支 A 就包含了 B 的所有内容，且你的 commit 都在最顶部。*
3.  **推送并提 PR**：
    ```bash
    # 如果之前 push 过 A，rebase 后可能需要 force push (谨慎使用)
    git push origin A --force-with-lease 
    ```

---

### 方案对比：Merge vs Rebase



| 维度 | Merge 方式 | Rebase 方式 |
| :--- | :--- | :--- |
| **历史线图** | 会出现分叉和合并点（非线性） | 是一条直线（线性） |
| **冲突处理** | 只需解决一次冲突 | 可能需要按 commit 顺序多次解决冲突 |
| **安全性** | 极高，不改变原有 commit | 略低，会重写 commit ID |
| **推荐场景** | B 是公共大分支（如 `develop`） | B 是你依赖的另一个小功能分支 |

---

### 总结操作建议

既然你最终要提交到 **分支 C**（通常是 `release` 或 `main`），操作核心在于：**在你的本地分支 A 完成“合样”工作。**

**最佳实践流程：**
1. `git checkout A`
2. `git pull --rebase origin B` （直接把 B 的新代码拉下来并接在 A 下面）
3. **测试**：确保 A + B 的内容在本地运行正常，没有破坏 C 分支的逻辑。
4. `git push origin A`
5. **提 PR**：在 GitHub 页面上申请 `A -> C` 的合并。

**注意：** 如果分支 B 的代码还没合并进 C，那么你的 PR（A -> C）会同时包含 B 和 A 的所有改动。如果 B 已经在 C 里面了，那么你的 PR 就只会显示 A 的改动。
