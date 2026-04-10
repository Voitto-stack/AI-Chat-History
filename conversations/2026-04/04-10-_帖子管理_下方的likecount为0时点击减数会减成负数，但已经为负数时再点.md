---
title: 【帖子管理】下方的likecount为0时点击减数会减成负数，但已经为负数时再点
date: 2026-04-10T19:19:10+08:00
session_id: c01890e1-b96a-4c46-8771-7d545b7db0ef
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 5
---

# 【帖子管理】下方的likecount为0时点击减数会减成负数，但已经为负数时再点

### User (19:19:10)

【帖子管理】下方的likecount为0时点击减数会减成负数，但已经为负数时再点击加数，会从0开始加，以上操作均不会将 总likecount 减成负数。预期效果：任何操作都不会使likecount减成负数。

### User (19:19:13)

[Request interrupted by user]

### User (19:19:16)

【帖子管理】下方的likecount为0时点击减数会减成负数，但已经为负数时再点击加数，会从0开始加，以上操作均不会将 总likecount 减成负数。预期效果：任何操作都不会使likecount减成负数。[Image #1]

### Assistant (19:19:52)

用调试流程先定位根因，再改。



### Assistant (19:21:11)

先读相关代码，确认负数是在哪一层产生的。



### Assistant (19:21:46)

根因已经出来了：后端其实已经做了 `GREATEST(0, ...)` 防负数，负数是前端 `PostCard` 的本地状态自己减出来的。现在先补一个失败测试把这个现象锁住。



### Assistant (19:22:12)

继续先找测试环境，确定失败测试该放哪。



### Assistant (19:22:30)

先确认 Minerva 现有测试入口，再按 TDD 补最小失败用例。



### Assistant (19:23:10)

我先确认这个仓库能不能跑一个最小的前端失败测试，不然没法按 TDD 验证。



### Assistant (19:23:55)

我再确认一下现有测试工具，尽量用最小单测把这个前端状态 bug 锁住。



### Assistant (19:25:32)

我先确认 `tsx` 在这个仓库里能直接跑，这样可以用最小 one-off 测试按 TDD 走。



### Assistant (19:26:16)

### 1. 直接执行

我已经定位到根因了：

后端其实已经做了防负数保护，`apps/minerva-server/src/routes/posts/posts.ts:223` 到 `apps/minerva-server/src/routes/posts/posts.ts:231` 用了 `GREATEST(0, post_interact_count.count + ...)`，所以数据库里的 likecount 不会被减成负数。

负数是前端本地状态自己算出来的：  
`apps/minerva/src/pages/PostConsole/components/PostCard.tsx:70` 到 `apps/minerva/src/pages/PostConsole/components/PostCard.tsx:90`

这里点击减数后直接执行：
- `setMaleScore((prev) => prev + value)` `apps/minerva/src/pages/PostConsole/components/PostCard.tsx:76`
- `setNonbinaryScore((prev) => prev + value)` `apps/minerva/src/pages/PostConsole/components/PostCard.tsx:77`
- `setFemaleScore((prev) => prev + value)` `apps/minerva/src/pages/PostConsole/components/PostCard.tsx:89`

没有做下限截断，所以 UI 会先显示成负数；而后端刷新回来又从 0 开始，所以你看到“已经为负数时再点加数，会从 0 开始加“。

另外我刚确认了仓库里有 `tsx`，可以用最小脚本方式补一个失败用例再修，按 TDD 走。

### 2. 深度交互

当前上下文已经很低了，只剩大约 23%。继续做可以，但有中途丢上下文的风险。

你想怎么继续：我现在直接在这个会话里完成修复，还是你开个新会话让我从这个结论继续？

### User (19:28:53)

你继续

### Assistant (19:30:33)

按 TDD 继续：先补最小失败测试，再改前端本地状态逻辑。



### Assistant (19:31:00)

先跑失败测试，确认它因为实现不存在而失败。



### Assistant (19:33:17)

红灯已经确认：测试因为实现不存在而失败。现在补最小实现，再把组件接上。



### Assistant (19:34:03)

我先把改动读一遍，再跑测试验证。



### Assistant (19:34:15)

先跑刚才的测试，再做一次类型检查级验证。



### User (19:38:25)

This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.

Summary:
1. Primary Request and Intent:
   用户的核心诉求是修复【帖子管理】页面中分项 likecount 的负数显示问题。用户明确描述了当前现象：

   - 当下方 likecount 为 0 时，点击减数会减成负数。
   - 当它已经是负数时，再点击加数，会从 0 开始加。
   - 以上操作都不会把总 likecount 减成负数。
   - 预期效果：任何操作都不会使 likecount 减成负数。

   这说明用户关心的是“分项 likecount 的任意操作都不能小于 0“，不只是总数，也不只是数据库层，而是整个交互行为都要符合这一约束。

2. Key Technical Concepts:
   - Minerva 前端：Umi Max + Ant Design
   - Minerva Server：Koa + Prisma
   - 前后端分层：前端通过 BFF 调用，不能直连外部服务
   - 帖子管理 PostConsole 页面
   - 本地 React state 更新
   - optimistic UI / 本地立即更新
   - 后端 DB 防负数更新
   - Prisma `$executeRaw`
   - SQL `GREATEST(0, ...)`
   - TDD：先写失败测试，再写最小实现
   - one-off test script：通过 `tsx` 直接执行 `.ts` 测试文件
   - 类型检查：`tsc --noEmit`
   - 任务跟踪：TaskCreate / TaskUpdate 的任务状态管理
   - Skill 工作流：
     - `superpowers:using-superpowers`
     - `superpowers:systematic-debugging`
     - `superpowers:test-driven-development`
     - `minerva`

3. Files and Code Sections:

   - `apps/minerva/src/pages/PostConsole/components/PostFeed.tsx`
     - 重要性：这里定义了评分按钮触发时，`scoreType` 如何映射到后端 `likeCountType`。
     - 关键代码：
```ts
const handleScoreUpdate = async (
  postId: string,
  scoreType: 'male' | 'female' | 'nonbinary',
  value: number,
) => {
  // scoreType → likeCountType: male=[0,2], female=[1], nonbinary=[0,2]
  const likeCountType = scoreType === 'female' ? [1] : [0, 2];
  try {
    await modifyPostScore(postId, value, likeCountType);
    message.success(`已更新 ${scoreType} 分数 ${value > 0 ? '+' : ''}${value}`);
    fetchData(currentPage);
  } catch {
    message.error('更新分数失败');
  }
};
```
     - 说明：
       - `female` 只影响 `FEMALE_LIKE`
       - `nonbinary` 实际影响 `[0,2]`，即 `MALE_LIKE` 和 `NON_BINARY_LIKE`
       - 这是后续理解 `PostCard` 为什么会同时更新 male 与 nonbinary 两个本地分值的关键

   - `apps/minerva/src/pages/PostConsole/components/PostCard.tsx`
     - 重要性：这是 bug 的真正产生点。后端已防负数，但这个组件的本地 state 直接 `prev + value`，导致 UI 能先出现负数。
     - 修改前的关键逻辑：
```ts
const [nonbinaryScore, setNonbinaryScore] = useState(post.nonbinaryLikeScore || 0);
const [maleScore, setMaleScore] = useState(post.maleLikeScore || 0);
const [femaleScore, setFemaleScore] = useState(post.femaleLikeScore || 0);

useEffect(() => {
  setNonbinaryScore(post.nonbinaryLikeScore || 0);
  setMaleScore(post.maleLikeScore || 0);
  setFemaleScore(post.femaleLikeScore || 0);
  setUserBanned(post.userRegulationStatus === 2);
}, [post.nonbinaryLikeScore, post.maleLikeScore, post.femaleLikeScore, post.userRegulationStatus]);

const modifyNonbinaryScore = async (value: number) => {
  if (scoreLoading) return;
  const key = `nonbinary-${value}`;
  setScoreLoading(key);
  try {

*...truncated...*

### Assistant (19:45:46)

直接执行

这次修复已经落下去了。

核心改动在这两个位置：
- `apps/minerva/src/pages/PostConsole/components/PostCard.tsx:31`
- `apps/minerva/src/pages/PostConsole/components/likeCount.ts:1`

现在的行为是：
- 初始渲染时，分项 likecount 小于 0 会被归一成 0。
- 点击减数时，本地显示不会再掉到 0 以下。
- 即使后端回来的旧脏数据里有负数，组件同步时也会直接钳回 0。

验证结果：
- `apps/minerva/src/pages/PostConsole/components/likeCount.test.ts:1` 已通过。
- 全量 TypeScript 检查报错，但都是仓库里已有的无关问题，不是这次修复引入的。

深度交互

这个 bug 本质上不是“接口没防住“，而是“前端 optimistic state 和后端约束脱节“。后端其实一直没让数据库写出负数，只是前端局部状态自己先算成了负数，所以用户看到的错觉只出现在交互层。像这类“服务端有下限、前端本地也会先算一次“的地方，最好都把边界收敛到同一个纯函数里；这次已经这么处理了，至少这个页面后面不容易再出现同类分叉。

