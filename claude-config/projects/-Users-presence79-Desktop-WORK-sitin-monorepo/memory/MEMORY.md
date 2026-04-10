# Minerva 项目记忆

## 项目别名
- **老代码** = `/Users/presence79/Desktop/WORK/presence-server-admin-console`（纯前端 React 项目，PostConsole 的旧版本）
- **当前项目** = `/Users/presence79/Desktop/WORK/sitin-monorepo`（Minerva 全栈 monorepo）

## 架构规范（来自飞书文档）
- Schema 即契约：所有 API 结构在 `@sitin/minerva-schemas` 用 Zod 定义，前后端共用
- 命名约定：Schema 变量 `xxxSchema`，类型名去掉 Schema 后缀
- 后端验证：`.parse()` + 权限中间件（authMiddleware / requirePermission / requireAnyPermission）
- 前端验证：request 函数第三个参数传 schema
- 权限系统：三个权限点（app.read / app.write / rbac.manage），三个角色（Super Admin / Admin / Viewer）
- 前端权限：路由用 access 字段，组件用 useAccess() hook

## 数据库注意事项
- 用户表是 `userinfo`（不是 user），主键 `user_id`，用户名 `username`，头像 `custom_avatar`（JSON 字符串）
- `post.pictures` 是 JSON 字符串，需要嵌套解析
- `post_comment` 是分区表，复合主键 `(id, post_id)`，避免 COUNT 全表扫描
- `post_comment_count` 表被 `@@ignore`，后续可解除用于读取评论数
- minerva-schemas 修改后需要 `pnpm build` 编译到 dist

## 反馈记忆
- [排查时先给极简结论](feedback_terse_actionable_bug_status.md) — 先说现在什么情况、怎么改，别写长篇分析
- [不要添加老项目没有的功能](feedback_no_new_features.md) — 迁移时严格对齐老项目，不自行添加新功能
- [Antd v5 Table 分页居中用 pagination.style](feedback_antd_pagination_style.md) — 不要用 CSS 选择器覆盖，用 inline style
- [数据库操作必须先确认](feedback_database_ops_must_confirm.md) — 任何数据库增删改查操作前必须停下来获得用户明确许可
- [迁移时必须对齐前端默认值](feedback_migration_defaults.md) — useState 默认值必须与老项目一致，否则初始加载数据不一致
- [SQL NULL 处理必须对齐老项目](feedback_sql_null_alignment.md) — 不要自作主张改进 NULL 处理逻辑，严格复制老项目 WHERE 条件
- [对比测试必须对称验证](feedback_verify_symmetrically.md) — 不信 DOM 查询完备性，先读代码再看 UI，两端用相同方法验证
- [飞书文档必须用原生表格和代码块](feedback_feishu_doc_formatting.md) — 不能用 Markdown 纯文本渲染表格和代码

## 数据库补充
- 用户管控状态从 `userinfo.regulation_status` 读取（不是 `user_regulation_status` 表）
- regulation_status 枚举：0=Active, 1=KGroup, 2=Banned, 3=Admin, 4=Collaborator, 5=Suspended, 6=Deleted

- [直接执行优先](feedback_direct_execution_for_urgent_bugfixes.md) — 紧急 bug 修复少走流程，先动代码
- [老后端服务位置](reference_old_backend.md) — dora-service 和 presence-server-gateway 的本地路径
