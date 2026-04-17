---
title: 我只是想在执行数据库操作的时候加一层拦截校验，这是我们dms的接口：curl '
date: 2026-04-16T19:47:57+08:00
session_id: cad18bb7-a655-40c0-bba5-824613e418b2
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 7
---

# 我只是想在执行数据库操作的时候加一层拦截校验，这是我们dms的接口：curl '

### User (19:47:58)

我只是想在执行数据库操作的时候加一层拦截校验，这是我们dms的接口：curl 'https://dms-api.sitin.ai/sql/execute' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjMzVmMzRmLWZlZDItNDllYy05YjVkLTlhMmNiNWU4ZGE0MyIsInVzZXJuYW1lIjoic2hhbmdiaW4iLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzc2MzI5OTM4LCJleHAiOjE3NzY0MTYzMzh9.3bCrtRwx2hjy6KYwqxRY9zhW8g-jx14yGTm4h5kHkME' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'origin: https://dms.sitin.ai' \
  -H 'pragma: no-cache' \
  -H 'priority: u=1, i' \
  -H 'referer: https://dms.sitin.ai/' \
  -H 'sec-ch-ua: "Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36' \
  --data-raw '{"dataSourceId":"338e555f-6031-49ac-ab35-d14eb769824f","database":"archat","sql":"select * from union_device_logs","page":1,"pageSize":50}'

### Assistant (19:57:26)

### 1. 直接执行

我先对齐一下你的真实目标：

你说的“加一层拦截校验”，你是想拦在 **Minerva Server 这一层**，把前端原本会直接发到 DMS 的 SQL 执行请求，统一改成：

`前端 → Minerva Server → 校验 SQL / 数据源 / 操作类型 → 再转发到 DMS`

对吗？

### 2. 深度交互

我先审慎挑战一下路径：

如果你的目标只是“防误操作”，那**最值钱的拦截点**不是前端，而是 **BFF/服务端代理层**。  
原因很简单：

- 前端拦截只能防“正常 UI 操作”
- 但真正危险的是绕过前端直接打 DMS 接口
- 所以如果拦截逻辑不在服务端，本质上只是“提示”，不是“保护”

如果你确认是要放在 **Minerva Server**，我下一步就继续帮你收敛：
- 是只允许 `SELECT`
- 还是允许部分写操作，但要做黑白名单/关键词拦截/人工确认 token

你先确认这一个问题。

### User (19:59:54)

比如代码里的sql语句执行的时候，如何确保操作数据库之前做一层拦截校验

### Assistant (20:01:24)

### 1. 直接执行

最稳的做法是：**不要让代码直接执行原始 SQL**，而是统一收口到一个“数据库执行网关”里，在真正发往数据库之前先过一遍校验。

你这个“拦截校验”本质上要解决 3 件事：

1. **谁在执行**
   - 当前用户是谁
   - 有没有这类数据库操作权限

2. **执行什么**
   - 是 `SELECT` / `INSERT` / `UPDATE` / `DELETE` / `DDL`
   - 是否命中危险语句：`DROP`、`TRUNCATE`、`ALTER`、无 `WHERE` 的 `UPDATE/DELETE` 等

3. **对哪个库执行**
   - 是否允许访问这个 `dataSourceId`
   - 是否允许访问这个 database / schema / table

一个通用的落地结构通常是这样：

```ts
await guardedSqlExecute({
  actor,
  dataSourceId,
  database,
  sql,
  page,
  pageSize,
});
```

内部顺序：

```ts
async function guardedSqlExecute(input) {
  assertUserPermission(input.actor);
  assertAllowedDataSource(input.dataSourceId, input.database);

  const parsed = parseSql(input.sql); // 至少先做类型识别
  assertOperationAllowed(parsed);     // 只允许 SELECT / 禁止 DDL / 禁止多语句
  assertTableAllowed(parsed);         // 可选：限制表白名单
  assertSafeWhere(parsed);            // 可选：UPDATE/DELETE 必须带 WHERE

  auditLog(input, parsed);            // 记录审计日志

  return executeSql(input);           // 真正调用 DMS / DB
}
```

如果你问的是“**代码里怎么确保每次执行前都拦截**”，关键不是写一个校验函数，而是：

- **禁止业务代码直接调数据库执行接口**
- **只能通过统一入口调用**
- 最好再加一层：
  - ESLint/代码约束
  - 封装模块导出限制
  - code review 明确禁止绕过

也就是：

```ts
// ❌ 不允许
await axios.post('https://dms-api.sitin.ai/sql/execute', ...)

// ✅ 只允许
await dmsSqlGateway.executeChecked(...)
```

---

如果你要的是更具体一点的“校验规则最小集”，我建议先上这 6 条：

1. **禁止多语句执行**
   - 禁止 `;` 拼接多条 SQL

2. **默认只允许 SELECT**
   - 如果不是查数场景，先别开放写操作

3. **禁止 DDL / 高危语句**
   - `DROP`, `TRUNCATE`, `ALTER`, `CREATE`, `RENAME`, `GRANT`, `REVOKE`

*...truncated...*

### User (20:06:22)

你要怎么结合我的接口去加拦截？

### Assistant (20:08:01)

### 1. 直接执行

结合你这条接口，最直接的接法不是去改 DMS 本身，而是在 **Minerva Server 里包一层 DMS client**，让所有 SQL 执行都先走你自己的代理，再由代理转发到：

`POST https://dms-api.sitin.ai/sql/execute`

也就是把你现在这类请求：

```bash
curl https://dms-api.sitin.ai/sql/execute
```

改成：

```text
前端 / 业务代码
  -> Minerva Server 自己的 /api/.../sql/execute
  -> 服务端先做拦截校验
  -> 校验通过后再 fetch DMS /sql/execute
```

基于你仓库现有模式，最像的落点是参考：

- `apps/minerva-server/src/services/external-service.ts:15`
- `apps/minerva-server/src/lib/doraClient.ts:15`

也就是说，做法不是“在每段 SQL 前手写 if 判断”，而是新建一个统一入口，比如：

- `apps/minerva-server/src/services/dms.ts`
- `apps/minerva-server/src/routes/dms/index.ts`

---

#### 具体怎么接你这个接口

你的 DMS 请求体现在是：

```json
{
  "dataSourceId": "338e555f-6031-49ac-ab35-d14eb769824f",
  "database": "archat",
  "sql": "select * from union_device_logs",
  "page": 1,
  "pageSize": 50
}
```

我会把它包成这种流程：

---

##### 1）前端不再直接请求 DMS

前端改调 Minerva Server：

```ts
POST /api/dms/sql/execute
```

请求体仍然基本一致：

```ts
type ExecuteSqlInput = {
  dataSourceId: string;
  database: string;
  sql: string;
  page: number;
  pageSize: number;
};
```

---

##### 2）Minerva Server 路由层先做身份和权限校验

例如：

```ts
router.post(
  '/sql/execute',

*...truncated...*

### User (20:13:33)

我看不懂你那些方案，能不能直白一点

### Assistant (20:15:46)

### 1. 直接执行

可以，直白说就是这句：

**不要让代码直接调用 DMS 接口。**  
**统一包一层你自己的函数，先检查 SQL，再放行。**

就像这样：

```ts
// 原来
await fetch('https://dms-api.sitin.ai/sql/execute', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dataSourceId,
    database,
    sql,
    page,
    pageSize,
  }),
});
```

改成：

```ts
await executeSafeSql({
  dataSourceId,
  database,
  sql,
  page,
  pageSize,
});
```

然后在 `executeSafeSql()` 里面先拦截：

```ts
async function executeSafeSql(input) {
  const sqlText = input.sql.trim().toLowerCase();

  // 1. 只允许固定库
  if (input.dataSourceId !== '338e555f-6031-49ac-ab35-d14eb769824f') {
    throw new Error('不允许的数据源');
  }

  if (input.database !== 'archat') {
    throw new Error('不允许的数据库');
  }

  // 2. 只允许 select
  if (!sqlText.startsWith('select')) {
    throw new Error('只允许执行 SELECT');
  }

  // 3. 禁止多条 SQL
  if (input.sql.includes(';')) {
    throw new Error('禁止多语句执行');
  }

  // 4. 再真正调用 DMS
  return fetch('https://dms-api.sitin.ai/sql/execute', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DMS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
}
```

**核心点就一个：**

> 以后所有 SQL 执行都只能走 `executeSafeSql()`，不能直接 `fetch('/sql/execute')`


*...truncated...*

*...conversation truncated for brevity...*
