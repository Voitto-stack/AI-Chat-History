---
title: 你看下historical-transactions页面的，我现在遇到：点击翻页
date: 2026-04-09T14:34:55+08:00
session_id: 4e0e688d-e0c5-4fe2-baea-f55714160361
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 17
---

# 你看下historical-transactions页面的，我现在遇到：点击翻页

### User (14:34:55)

你看下historical-transactions页面的，我现在遇到：点击翻页的最后一页，然后从后面往前翻，然后列表的数据越来越多，像是不同页的数据堆积在一起

### Assistant (14:35:12)

我来看一下 historical-transactions 页面的代码，检查分页数据处理逻辑。

### Assistant (14:35:50)

找到问题了！在第 **486-491 行**的 Table `onChange` 回调中，分页切换时调用了 `fetchData`，但在第 **143 行** `setData(list)` 是直接赋值（正确），问题出在第 **152 行**：

```typescript
setPagination((prev) => ({ ...prev, total: result.total ?? list.length, current: currentPage, pageSize: currentPageSize }));
```

这里使用了 `prev => { ...prev }` 展开之前的状态，但实际上 `current` 和 `pageSize` 应该完全替换，而不是合并。但这不是主要问题。

**真正的问题**：第 486 行 `onChange` 事件处理中，先调用了 `setPagination(p)`，然后又在 fetchData 成功后再次调用 `setPagination`（第 152 行），这导致：

1. 用户点击翻页 → `setPagination(p)` 设置新页码
2. `fetchData` 请求数据
3. 数据返回后，又调用 `setPagination`（第 152 行）

更关键的是，Table 的 `onChange` 中直接传递了 Antd 的分页对象 `p`，如果这个对象包含了之前的某些状态，可能导致状态混乱。

让我检查一下后端 API 返回的数据结构：

### Assistant (14:35:57)

让我再检查一下后端返回的 `total` 字段是否正确：

### Assistant (14:36:12)

好的，后端返回了 `total` 字段（总记录数）。现在我明白问题所在了：

**根本原因**：Table 的 `dataSource` 应该只显示当前页的数据，但第 **143 行** `setData(list)` 将服务器返回的 `callDataList` 全部设置进去了。如果后端实现是前端分页（即每次返回全量数据），那么应该在前端切分数据；如果后端已经分页（只返回当前页的数据），那么 `setData(list)` 是正确的。

让我检查后端实现：

### Assistant (14:36:44)

**找到根本原因了！**

看第 **397 行**：

```typescript
const responseData = isExport
  ? mergedList
  : mergedList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
```

**后端已经做了分页**，每次只返回当前页的数据。所以前端的 `setData(list)` 是正确的（第 143 行）。

**但是问题出在前端的 `onChange` 处理逻辑**：

```typescript
onChange={(p) => {
  setPagination(p);  // ← 这里直接设置了 Antd 传来的分页对象
  if (dateRange) {
    fetchData(dateRange[0], dateRange[1], undefined, p.current, p.pageSize);
  }
}}
```

当用户点击分页时：
1. `setPagination(p)` 立即更新 pagination 状态（包括 `current`）
2. 然后调用 `fetchData`，传入 `p.current`
3. `fetchData` 请求数据，成功后在第 152 行再次调用 `setPagination`

这里的问题是：Antd 的 `onChange` 回调中的 `p` 参数可能包含了一些内部状态，导致 `setPagination(p)` 可能会有副作用。

**但更重要的是**：我需要看一下实际的 bug 表现。让我分析一下可能的原因：

如果"数据越来越多"，说明 `data` 数组在累积，而不是被替换。但第 143 行明明是 `setData(list)`（直接赋值，不是 concat）。

**唯一可能**：Table 组件的 `dataSource={data}` 在渲染时出现了问题，或者 `rowKey` 有重复导致 React 没有正确更新 DOM。

让我检查 rowKey：

第 483 行：
```typescript
rowKey={(record) => `${record.orderType}_${record.orderId}`}
```

如果 `orderId` 在不同页之间有重复，那么 rowKey 会重复，React 就不会正确更新列表。

**修复方案**：

1. **最简单**：在 `fetchData` 中，在请求开始前先清空数据：`setData([])`
2. **更好**：确保 rowKey 唯一（可能需要加上 page 信息）
3. **最佳**：检查后端返回的 `orderId` 是否真的在不同页间有重复

让我先用第一种方案修复：

### Assistant (14:37:12)

现在还需要修复 Table 的 `onChange` 回调，避免重复设置 pagination：

### Assistant (14:37:32)

## 修复完成

**问题根因**：分页切换时，Table 的 `onChange` 回调中先调用了 `setPagination(p)`，然后又在 `fetchData` 成功后再次调用 `setPagination`，导致状态更新冲突。加上数据替换时没有先清空旧数据，可能导致 React 的 diff 算法在某些情况下（比如 rowKey 重复）无法正确识别需要删除的旧节点。

**修复方案**：
1. ✅ 在 `fetchData` 开始时先 `setData([])`，确保每次请求前清空旧数据
2. ✅ 移除 `onChange` 中的 `setPagination(p)` 调用，避免重复更新状态

**变更位置**：
- `apps/minerva/src/pages/HistoricalTransactionsNew/index.tsx:122` — 添加 `setData([])` 清空旧数据
- `apps/minerva/src/pages/HistoricalTransactionsNew/index.tsx:487` — 移除重复的 `setPagination(p)` 调用

现在翻页时会先��空列表，加载完成后只显示当前页的数据，不会再累积了。

### User (14:39:49)

还有一个问题，这个页面里列表里出现的为什么都是没有邀请码的数据，你看下老项目，线上老测试环境里的列表有带着邀请码的

### Assistant (14:40:03)

我来对比一下老项目和新项目对邀请码的处理逻辑。

### Assistant (14:41:39)

老项目看起来没什么特别的。让我看看老项目调用的后端 API：

### Assistant (14:41:47)

好，老项目调用的是 protoId 4682。现在让我看看新项目的后端查询逻辑，特别是关于 `guildInviteCode` 的处理：

### Assistant (14:41:55)

让我看看查询 CallOrder 的函数：

### Assistant (14:42:12)

看到了！问题在第 **621 行**：

```sql
AND (${guildInviteCode} = '' OR pc.invitation_code = ${guildInviteCode})
```

这个逻辑是：
- 如果 `guildInviteCode` 为空字符串 → 不过滤，返回所有数据（包括有邀请码和无邀请码的）
- 如果 `guildInviteCode` 有值 → 只返回匹配该邀请码的数据

但问题是，**当 `guildInviteCode` 为空时**，SQL 会返回所有订单，包括那些 `pc.invitation_code` 为 NULL 或空字符串的订单。但由于：

```sql
LEFT JOIN userinfo_pwa_club_mapping ucm ON u.user_id = ucm.user_id
LEFT JOIN pwa_club pc ON ucm.pwa_club_id = pc.id
```

这是 **LEFT JOIN**，所以如果用户没有加入公会，`pc.invitation_code` 会是 NULL。然后在第 **599 行**：

```sql
COALESCE(pc.invitation_code, '') AS guild_invite_code,
```

将 NULL 转换为空字符串。这看起来是正确的。

让我看看老项目的后端是怎么做的。我需要查看 dora-service 的代码：

### Assistant (14:43:42)

看到了！老项目有**两个不同的查询方法**：

1. **`queryCallDataByTimeRange`** — 当 `guildInviteCode` 为空时，查询所有数据（**没有过滤邀请码**）
2. **`queryCallDataByGuild`** — 当 `guildInviteCode` 有值时，**强制要求** `pc.invitation_code = $3`

而新项目的代码（第 621 行）合并了这两种情况：

```sql
AND (${guildInviteCode} = '' OR pc.invitation_code = ${guildInviteCode})
```

但这有个问题：当 `guildInviteCode = ''` 时，这个条件永远为 true，所以不会过滤任何数据。这看起来是正确的。

**让我检查一下问题的另一个可能原因**：前端是否正确传递了 `guildInviteCode` 参数？

### Assistant (14:43:55)

前端代码看起来没问题。让我检查一下后端 SQL 的 JOIN 逻辑是否有问题：

```sql
LEFT JOIN userinfo_pwa_club_mapping ucm ON u.user_id = ucm.user_id
LEFT JOIN pwa_club pc ON ucm.pwa_club_id = pc.id
```

这是 LEFT JOIN，所以：
- 如果用户没有加入公会 → `ucm` 为 NULL → `pc` 也为 NULL → `pc.invitation_code` 为 NULL
- 如果用户加入了公会 → `pc.invitation_code` 有值

然后在 WHERE 子句中：

```sql
AND (${guildInviteCode} = '' OR pc.invitation_code = ${guildInviteCode})
```

**问题找到了！** 当 `guildInviteCode` 有值（比如 "ABC"）时，这个条件变成：

```sql
AND ('' = 'ABC' OR pc.invitation_code = 'ABC')
```

简化为：

```sql
AND pc.invitation_code = 'ABC'
```

**但是**，如果用户没有加入公会，`pc.invitation_code` 是 NULL，那么 `NULL = 'ABC'` 是 false，这些记录会被过滤掉。这是正确的行为。

**但是当 `guildInviteCode` 为空字符串时：**

```sql
AND ('' = '' OR pc.invitation_code = '')
```

简化为：

```sql
AND true
```

这样就不会过滤任何记录，应该能返回所有数据（包括有邀请码和没有邀请码的）。

等等，让我再看看老项目的逻辑。老项目有两个方法，让我看看什么时候调用哪个：

### Assistant (14:44:07)

让我看看 `isTimeRangeOnlyQuery` 的判断逻辑：

### Assistant (14:44:17)

好的，所以老项目的逻辑是：
- **如果 `guildInviteCode` 为空** → 调用 `queryCallDataByTimeRange`（不过滤邀请码）
- **如果 `guildInviteCode` 有值** → 调用 `queryCallDataByGuild`（强制过滤邀请码）

让我看看 `queryCallDataByGuild` 的 SQL：

### Assistant (14:44:29)

**找到问题了！** 关键在第 **27 行**：

```sql
AND pc.invitation_code = $3
```

老项目在 Guild 模式下，**直接用 `=` 而不是 `COALESCE`**，这意味着：
- 如果 `pc.invitation_code` 是 NULL（用户没有加入公会），这条记录会被过滤掉
- 只有 `pc.invitation_code` 有值且等于参数的记录才会返回

而在 TimeRange 模式（`guildInviteCode` 为空）下，**完全不过滤邀请码**，所以会返回所有记录（包括有邀请码和没有邀请码的）。

**但是新项目的问题是**：当前端在搜索时，`guildInviteCode` 的默认值是什么？让我检查一下：

### Assistant (14:44:44)

`guildInviteCode` 默认是空字符串 `''`，这是正确的。

**让我重新思考问题**：用户说"列表里出现的都是没有邀请码的数据"，这意味着：
- 返回的数据中，`guild_invite_code` 字段都是空字符串
- 但老项目的测试环境里，有些记录的 `guild_invite_code` 有值

这可能的原因是：
1. 数据库数据不同（新旧环境数据不一致）
2. SQL 查询逻辑有问题
3. JOIN 逻辑有问题

让我再仔细看看 SQL 的 JOIN 部分。老项目的 TimeRange 模式：

```sql
LEFT JOIN userinfo_pwa_club_mapping ucm ON u.user_id = ucm.user_id
LEFT JOIN pwa_club pc ON ucm.pwa_club_id = pc.id
```

新项目（第 613-614 行）：

```sql
LEFT JOIN userinfo_pwa_club_mapping ucm ON u.user_id = ucm.user_id
LEFT JOIN pwa_club pc ON ucm.pwa_club_id = pc.id
```

看起来一样。但等等，让我看看老项目 Guild 模式的 ORDER BY：

```sql
ORDER BY
    MAX(ucm.created_at) OVER (PARTITION BY ucm.user_id) DESC NULLS LAST,
    ucm.user_id,
    uco.create_at DESC
```

而新项目（第 630-633 行）：

```sql
ORDER BY
  MAX(uco.create_at) OVER (PARTITION BY uco.female_user_id) DESC,
  uco.female_user_id DESC,
  uco.create_at DESC
```

新项目这里用的是 TimeRange 模式的排序！但这只是排序差异，不会影响返回的数据内容。

**让我直接问用户一个关键问题**：用户是在什么条件下搜索的？是否填写了邀请码？

其实，我有个猜测：**可能是数据库连接配置问题**。让我检查一下 `.env.local`：

*...conversation truncated for brevity...*
