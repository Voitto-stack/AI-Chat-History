---
title: git_hooks
date: 2026-04-15T17:04:47+08:00
source: import
original: git_hooks.md
---

# Git Hooks

## What/Why

Minerva 使用 [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) 在提交代码时自动执行检查：
- 代码格式化
- Lint 检查
- Commit message 格式校验

确保代码质量和提交规范。

## Config Entrypoints

### Husky 配置

位于 `apps/minerva/.husky/`：

**pre-commit**：提交前执行 lint-staged

```bash
# .husky/pre-commit
npx --no-install lint-staged --quiet
```

**commit-msg**：校验 commit message 格式

```bash
# .husky/commit-msg
npx --no-install max verify-commit $1
```

### lint-staged 配置

位于 `apps/minerva/.lintstagedrc`：

```json
{
  "*.{md,json}": ["prettier --cache --write"],
  "*.{js,jsx}": ["max lint --fix --eslint-only", "prettier --cache --write"],
  "*.{css,less}": ["max lint --fix --stylelint-only", "prettier --cache --write"],
  "*.ts?(x)": ["max lint --fix --eslint-only", "prettier --cache --parser=typescript --write"]
}
```

执行顺序：
1. ESLint/Stylelint 检查并自动修复
2. Prettier 格式化

### ESLint 配置

位于 `apps/minerva/.eslintrc.js`：

```javascript
module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
};
```

使用 Umi Max 内置的 ESLint 配置。

### Prettier 配置

位于 `apps/minerva/.prettierrc`：

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never",
  "plugins": [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson"
  ]
}
```

### Stylelint 配置

位于 `apps/minerva/.stylelintrc.js`：

```javascript
module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
};
```

## Commit Message 规范

`max verify-commit` 使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具变更 |
| `revert` | 回滚 |

### 示例

```bash
# 新功能
git commit -m "feat(rbac): 添加用户角色分配功能"

# 修复 bug
git commit -m "fix(auth): 修复 Token 过期后未自动登出的问题"

# 文档
git commit -m "docs: 更新 API 文档"

# 重构
git commit -m "refactor(request): 重构请求封装层"

# 带 body 的提交
git commit -m "feat(rbac): 添加权限分组功能

- 按 domain 分组显示权限
- 支持批量选择
- 添加搜索功能"
```

## Commands

### 手动执行 lint

```bash
# 在 apps/minerva 目录下
pnpm format          # 格式化所有文件

# 在 monorepo 根目录
pnpm lint            # 所有项目 lint
pnpm lint:fix        # 所有项目 lint 并修复
pnpm format          # 所有项目格式化
```

### 跳过 hooks（不推荐）

```bash
# 紧急情况跳过 pre-commit
git commit --no-verify -m "fix: emergency fix"

# 或
HUSKY=0 git commit -m "fix: emergency fix"
```

## 常见问题

### 1. Husky 未生效

确保已安装并初始化 Husky：

```bash
cd apps/minerva
pnpm prepare  # 运行 husky install
```

### 2. lint-staged 报错

检查是否有语法错误或 lint 规则违反：

```bash
# 手动运行查看详细错误
npx lint-staged --debug
```

### 3. Commit message 被拒绝

确保遵循 Conventional Commits 格式：

```bash
# 错误
git commit -m "添加新功能"

# 正确
git commit -m "feat: 添加新功能"
```

### 4. Prettier 和 ESLint 冲突

两者配置应该一致，当前配置已通过 `eslint-config-prettier` 解决冲突。

## 相关文档

- [Husky 文档](https://typicode.github.io/husky/)
- [lint-staged 文档](https://github.com/lint-staged/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [PR Checklist](../05_dev_process/pr_checklist.md)

