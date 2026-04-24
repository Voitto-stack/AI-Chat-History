---
date: 2026-04-24T11:50:04+08:00
source: clipboard
chars: 32911
---

本文基于 sitin-next 中 DMS 的实际代码模式，规划 Minerva 迁移后的完整项目结构和每个页面的迁移路径。

---
一、后端项目结构
1.1 app-minerva-server（Fastify 入口）
只做路由注册 + 中间件配置，不含业务逻辑。所有 handler 从 business 包导入。
app-minerva-server/src/
├── index.ts                    # 启动：createPgDb → initRedis → runMigrations → buildApp → listen
├── app.ts                      # Fastify 实例：注册 CORS / auth hook / error hook / 所有 controller
├── config.ts                   # 环境变量：DATABASE_URL, JWT_SECRET, REDIS_URL, PORT...
├── logger.ts                   # Pino logger（已有）
│
├── auth/                       
│   ├── auth.controller.ts      # POST /auth/login, /auth/me, /auth/change-password
│   ├── auth.middleware.ts       # AuthUser 类型 + module augmentation + verifyToken
│   └── auth.permissions.ts     # ★ 所有路由权限的集中声明（核心文件）
│
├── rbac/
│   └── rbac.controller.ts      # /rbac/users/*, /rbac/roles/*, /rbac/permissions/*
├── users/
│   └── users.controller.ts     # /users/search, /users/detail, /users/regulate
├── posts/
│   └── posts.controller.ts     # /posts/list, /posts/detail, /posts/comments/*
├── data-analysis/
│   └── data-analysis.controller.ts  # /data-analysis/revenue, /data-analysis/new-users
├── risk/
│   └── risk.controller.ts      # /risk/reports, /risk/suspicious
├── transactions/
│   └── transactions.controller.ts   # /transactions/list, /transactions/approve
├── digital-human/
│   └── digital-human.controller.ts  # /digital-human/list, /digital-human/update
├── review-score/
│   └── review-score.controller.ts   # /review-score/aggregate, /review-score/detail
├── screenshot-review/
│   └── screenshot-review.controller.ts
├── call-feed/
│   └── call-feed.controller.ts
├── pwa-databoard/
│   └── pwa-databoard.controller.ts
├── union-streamer/
│   └── union-streamer.controller.ts
├── chat-console/
│   └── chat-console.controller.ts   # /chat-console/user-sig, /chat-console/sources
├── lovia/
│   └── lovia.controller.ts     # /lovia/stories/*
├── upload/
│   └── upload.controller.ts    # /upload/gcs, /upload/oss
├── webhook/
│   └── webhook.controller.ts   # /webhook/lead
├── changelog/
│   └── changelog.controller.ts
│
└── migrate/                   
    ├── runner.ts
    └── migrations.ts           # admin_users 相关表（不动业务库）
controller 写法（照搬 DMS 模式）
// users/users.controller.ts
import type { FastifyInstance } from "fastify";
import { userSearch, userDetail, userRegulate } from "@heyhru/business-minerva-user";

export function usersController(app: FastifyInstance) {
  app.post("/users/search", userSearch);
  app.post("/users/detail", userDetail);
  app.post("/users/regulate", userRegulate);
}
app.ts 注册所有 controller
// app.ts
export async function buildApp() {
  const app = Fastify({ loggerInstance: logger });
  await app.register(cors, { origin: true, credentials: true });
  app.decorateRequest("user", null as any);
  app.addHook("preHandler", authHook);

  // 注册所有 controller（一行一个，清晰明了）
  authController(app);
  rbacController(app);
  usersController(app);
  postsController(app);
  dataAnalysisController(app);
  riskController(app);
  transactionsController(app);
  digitalHumanController(app);
  reviewScoreController(app);
  screenshotReviewController(app);
  callFeedController(app);
  pwaDataboardController(app);
  unionStreamerController(app);
  chatConsoleController(app);
  loviaController(app);
  uploadController(app);
  webhookController(app);
  changelogController(app);

  return app;
}
auth.permissions.ts 权限声明（核心）
// 所有路由的权限集中在这一个文件，不分散到各 controller
const PERMISSIONS: Record<string, RoutePermission> = {
  // 公开
  "POST /auth/login":              { auth: false },

  // 登录即可
  "POST /auth/me":                 { auth: true },
  "POST /auth/change-password":    { auth: true },

  // app.read —— 只读权限
  "POST /users/search":            { auth: true, permissions: ["app.read"] },
  "POST /users/detail":            { auth: true, permissions: ["app.read"] },
  "POST /data-analysis/revenue":   { auth: true, permissions: ["app.read"] },
  "POST /posts/list":              { auth: true, permissions: ["app.read"] },
  // ... 所有只读接口

  // app.write —— 写权限
  "POST /users/regulate":          { auth: true, permissions: ["app.write"] },
  "POST /posts/moderate":          { auth: true, permissions: ["app.write"] },
  "POST /transactions/approve":    { auth: true, permissions: ["app.write"] },
  // ... 所有写接口

  // rbac.manage —— 管理员
  "POST /rbac/users/create":       { auth: true, permissions: ["rbac.manage"] },
  "POST /rbac/roles/update":       { auth: true, permissions: ["rbac.manage"] },
  // ... 所有 RBAC 接口
};

---
1.2 business 包拆分
按业务域拆分，每个包独立发布。遵循 DMS 的 service → model → sql 三层。
包名                             │ 职责                             │ 查询的主要表
─────────────────────────────────┼──────────────────────────────────┼────────────────────────────
business-minerva-auth       ✅   │ 登录/改密/当前用户                 │ admin_users, roles, permissions
business-minerva-rbac            │ 管理员/角色/权限 CRUD + 审计日志    │ admin_users, roles, permissions, audit_log
business-minerva-user            │ 用户搜索/详情/管控操作              │ userinfo, user_online_status_record
business-minerva-post            │ 帖子/评论列表/审核                  │ post, post_comment, post_like, post_report
business-minerva-analytics       │ 营收/新增用户/数据看板               │ ai_call_daily_stats, user_transaction...
business-minerva-risk            │ 风险报告/可疑用户                   │ userinfo, screenshot_detect
business-minerva-transaction     │ 提现列表/审批/通话历史               │ user_transaction, unified_payment_orders
business-minerva-content         │ DH/评分/截图/Lovia（小模块合并）     │ bot_warehouse_v2, screenshot_detect...
business-minerva-pwa             │ PWA 数据看板/Call Feed/Union        │ 多个统计表
business-minerva-upload          │ GCS/OSS 文件上传                   │ 无（调用外部 SDK）
business-minerva-misc            │ Webhook/Changelog/ChatConsole      │ 杂项
每个 business 包的内部结构
business-minerva-user/
├── package.json          # name: @heyhru/business-minerva-user
├── tsconfig.json
├── tsup.config.ts
└── src/
    ├── index.ts          # export { userSearch, userDetail, userRegulate } from "./user.service.js"
    ├── user.service.ts   # Fastify handler（req, reply）→ 调用 model → reply.send
    ├── user.model.ts     # DB 函数（getPgDb().query / queryOne / run）
    └── user.sql.ts       # SQL 常量 + 动态查询构建函数
三层代码示例（user 模块）
sql 层：
// user.sql.ts
export const SEARCH_USERS = `
  SELECT user_id, username, nickname, custom_avatar, gender, age,
         cai_user_type, regulation_status, app_name, created_at
  FROM userinfo
`;  // WHERE 条件在 model 层动态拼接

export const USER_DETAIL = `
  SELECT * FROM userinfo WHERE user_id = ?
`;

export const USER_ONLINE_STATUS = `
  SELECT user_id, updated_at FROM user_online_status_record WHERE user_id IN (?)
`;
model 层：
// user.model.ts
import { getPgDb } from "@heyhru/server-plugin-pg";
import * as Q from "./user.sql.js";

export function getUserById(userId: number) {
  return getPgDb().queryOne<UserRow>(Q.USER_DETAIL, [userId]);
}

export function searchUsers(filters: UserFilters) {
  const conditions: string[] = [];
  const params: unknown[] = [];
  if (filters.keyword) {
    conditions.push("(username ILIKE ? OR user_id::text = ?)");
    params.push(`%${filters.keyword}%`, filters.keyword);
  }
  if (filters.regulationStatus !== undefined) {
    conditions.push("regulation_status = ?");
    params.push(filters.regulationStatus);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `${Q.SEARCH_USERS} ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  params.push(filters.pageSize, (filters.page - 1) * filters.pageSize);
  return getPgDb().query<UserRow>(sql, params);
}
service 层：
// user.service.ts
import type { FastifyRequest, FastifyReply } from "fastify";
import { searchUsers as search, getUserById } from "./user.model.js";

export async function userSearch(req: FastifyRequest, reply: FastifyReply) {
  const filters = req.body as UserFilters;
  const list = await search(filters);
  return reply.send({ success: true, data: { list } });
}

export async function userDetail(req: FastifyRequest, reply: FastifyReply) {
  const { userId } = req.body as { userId: number };
  const user = await getUserById(userId);
  if (!user) return reply.code(404).send({ success: false, error: { code: "NOT_FOUND", message: "User not found" } });
  return reply.send({ success: true, data: user });
}

---
1.3 contract-minerva（Zod 契约层）
从 minerva-schemas 复制 + 按域拆分文件：
contract-minerva/src/
├── index.ts              # 统一 re-export
├── auth.ts               # ✅ 已完成（login, currentUser, changePassword）
├── response.ts           # ✅ 已完成（ApiSuccessResponse, ApiErrorResponse）
├── common.ts             # 分页、排序等通用 schema
├── rbac.ts               # AdminUser, Role, Permission schema
├── user.ts               # 用户搜索/详情/管控 schema
├── post.ts               # 帖子/评论 schema
├── data-analysis.ts      # 营收/新增用户查询 schema
├── risk.ts               # 风险报告 schema
├── transactions.ts       # 交易/提现 schema
├── digital-human.ts      # DH 配置 schema
├── review-score.ts       # 评分 schema
├── screenshot-review.ts  # 截图审核 schema
├── call-feed.ts          # Call Feed schema
├── pwa-databoard.ts      # PWA 看板 schema
├── union-streamer.ts     # 主播管理 schema
├── chat-console.ts       # IM 相关 schema
├── lovia.ts              # 故事 schema
└── webhook.ts            # Webhook payload schema

---
二、前端项目结构
2.1 app-minerva-web 完整目录
app-minerva-web/src/
├── main.tsx                     # React 19 入口 + BrowserRouter
├── App.tsx                      # 路由定义（lazy load 所有页面）
├── global.css
│
├── api/                         # API 调用层（每个域一个文件）
│   ├── client.ts                # ✅ 已完成（httpClient + token 管理）
│   ├── auth.ts                  # ✅ 已完成（login, me, logout）
│   ├── rbac.ts                  # 待建：用户/角色/权限 CRUD
│   ├── users.ts                 # 待建：搜索/详情/管控
│   ├── posts.ts                 # 待建：帖子/评论
│   ├── data-analysis.ts         # 待建：营收/新增用户
│   ├── risk.ts                  # 待建：风控
│   ├── transactions.ts          # 待建：交易/提现
│   ├── digital-human.ts         # 待建：DH
│   ├── review-score.ts          # 待建：评分
│   ├── screenshot-review.ts     # 待建：截图
│   ├── call-feed.ts             # 待建：Call Feed
│   ├── pwa-databoard.ts         # 待建：PWA 看板
│   ├── union-streamer.ts        # 待建：主播
│   ├── chat-console.ts          # 待建：聊天
│   ├── lovia.ts                 # 待建：故事
│   └── changelog.ts             # 待建：版本记录
│
├── store/                       # Zustand 状态
│   └── auth.ts                  # ✅ 已完成（user, setUser, hasPermission）
│
├── hooks/                       # 自定义 hooks
│   ├── usePermission.ts         # 权限检查 hook
│   └── usePagination.ts         # 通用分页 hook（Table 复用）
│
├── components/                  # 全局共享组件
│   ├── Layout/
│   │   └── index.tsx            # ✅ 已完成（Sider + Header + Outlet）
│   ├── ProtectedRoute.tsx       # ✅ 已完成
│   ├── RequirePermission.tsx    # 待建：权限包裹组件
│   └── UserBriefCard.tsx        # 待建：用户简要信息卡（多页面复用）
│
└── pages/                       # 每个页面一个目录
    ├── Login/                   # ✅ 已完成
    │   └── index.tsx
    ├── Dashboard/               # ✅ 已完成（需改为 Home 仪表盘）
    │   └── index.tsx
    ├── RBAC/
    │   ├── index.tsx            # Tabs 入口
    │   ├── UsersTab.tsx
    │   ├── RolesTab.tsx
    │   └── PermissionsTab.tsx
    ├── UserManagement/
    │   ├── index.tsx            # 搜索框 + Tab 详情
    │   ├── BasicInfoTab.tsx
    │   ├── SubscriptionTab.tsx
    │   ├── PostsTab.tsx
    │   ├── InterestsTab.tsx
    │   ├── ViolationsTab.tsx
    │   ├── TransactionsTab.tsx
    │   ├── TestVideoTab.tsx
    │   └── RegulationTab.tsx
    ├── DataAnalysis/
    │   ├── index.tsx            # 图表 + 表格
    │   ├── RevenueChart.tsx
    │   ├── NewUsersChart.tsx
    │   └── config.ts            # 列定义/图表配置
    ├── PostConsole/
    │   ├── index.tsx
    │   └── PostFeed.tsx         # 帖子 Feed 浏览器
    ├── Transactions/
    │   ├── index.tsx
    │   └── WithdrawalList.tsx
    ├── RiskControl/
    │   ├── index.tsx            # Tabs 入口
    │   ├── ReportsTab.tsx
    │   └── SuspiciousTab.tsx
    ├── DigitalHuman/
    │   ├── index.tsx
    │   └── DHFormDrawer.tsx
    ├── ReviewScore/
    │   ├── index.tsx
    │   └── DetailDrawer.tsx
    ├── ScreenshotReview/
    │   └── index.tsx
    ├── CallFeed/
    │   ├── index.tsx            # Tabs 入口
    │   ├── LiveStreamers.tsx
    │   └── TestVideoList.tsx
    ├── PWADataboard/
    │   ├── index.tsx
    │   ├── columns.ts           # 列配置（复杂，独立文件）
    │   └── OperationDrawer.tsx
    ├── UnionStreamer/
    │   ├── index.tsx            # Tabs 入口
    │   ├── InquiryTab.tsx
    │   ├── ReviewTab.tsx
    │   └── GuildListTab.tsx
    ├── ChatConsole/
    │   ├── index.tsx
    │   └── ChatPanel.tsx        # IM SDK 集成
    ├── Lovia/
    │   ├── List.tsx
    │   └── Create.tsx
    ├── Changelog/
    │   └── index.tsx
    ├── FeishuCallback/
    │   └── index.tsx
    └── ServerStatus/
        └── index.tsx

---
2.2 App.tsx 路由设计
// App.tsx
const LoginPage = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Dashboard"));
const RBACPage = lazy(() => import("./pages/RBAC"));
const UserMgmtPage = lazy(() => import("./pages/UserManagement"));
const DataAnalysisPage = lazy(() => import("./pages/DataAnalysis"));
const PostConsolePage = lazy(() => import("./pages/PostConsole"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));
const RiskControlPage = lazy(() => import("./pages/RiskControl"));
const DigitalHumanPage = lazy(() => import("./pages/DigitalHuman"));
const ReviewScorePage = lazy(() => import("./pages/ReviewScore"));
const ScreenshotReviewPage = lazy(() => import("./pages/ScreenshotReview"));
const CallFeedPage = lazy(() => import("./pages/CallFeed"));
const PWADataboardPage = lazy(() => import("./pages/PWADataboard"));
const UnionStreamerPage = lazy(() => import("./pages/UnionStreamer"));
const ChatConsolePage = lazy(() => import("./pages/ChatConsole"));
const LoviaListPage = lazy(() => import("./pages/Lovia/List"));
const LoviaCreatePage = lazy(() => import("./pages/Lovia/Create"));
const ChangelogPage = lazy(() => import("./pages/Changelog"));
const FeishuCallbackPage = lazy(() => import("./pages/FeishuCallback"));
const ServerStatusPage = lazy(() => import("./pages/ServerStatus"));

export const App = () => (
  <Suspense fallback={null}>
    <Routes>
      {/* 公开页面 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/feishu/callback" element={<FeishuCallbackPage />} />

      {/* 登录保护 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />

          {/* 用户域 */}
          <Route path="/user/management" element={<P p="app.read"><UserMgmtPage /></P>} />
          <Route path="/user/risk-control" element={<P p="app.read"><RiskControlPage /></P>} />
          <Route path="/user/digital-human" element={<P p="app.read"><DigitalHumanPage /></P>} />
          <Route path="/user/review-score" element={<P p="app.read"><ReviewScorePage /></P>} />
          <Route path="/user/post-console" element={<P p="app.read"><PostConsolePage /></P>} />
          <Route path="/user/chat-console" element={<P p="app.read"><ChatConsolePage /></P>} />

          {/* 数据域 */}
          <Route path="/data-analysis" element={<P p="app.read"><DataAnalysisPage /></P>} />
          <Route path="/transactions" element={<P p="app.read"><TransactionsPage /></P>} />

          {/* PWA 域 */}
          <Route path="/pwa/databoard" element={<P p="app.read"><PWADataboardPage /></P>} />
          <Route path="/pwa/call-feed" element={<P p="app.read"><CallFeedPage /></P>} />
          <Route path="/pwa/union-streamer" element={<P p="app.read"><UnionStreamerPage /></P>} />

          {/* 通话域 */}
          <Route path="/call/screenshot-review" element={<P p="app.read"><ScreenshotReviewPage /></P>} />

          {/* 内容域 */}
          <Route path="/lovia" element={<P p="app.read"><LoviaListPage /></P>} />
          <Route path="/lovia/create" element={<P p="app.write"><LoviaCreatePage /></P>} />

          {/* 管理 */}
          <Route path="/rbac" element={<P p="rbac.manage"><RBACPage /></P>} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/dev/server-status" element={<P p="rbac.manage"><ServerStatusPage /></P>} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

// P = RequirePermission 简写
const P = ({ p, children }: { p: string; children: React.ReactNode }) => (
  <RequirePermission permission={p}>{children}</RequirePermission>
);

---
2.3 Layout 侧边栏菜单
// Layout/index.tsx 中的 menuItems
const menuItems = [
  { key: "/", icon: <HomeOutlined />, label: "首页" },
  {
    key: "user", icon: <UserOutlined />, label: "用户管理",
    children: [
      { key: "/user/management", label: "用户查询" },
      { key: "/user/risk-control", label: "风控管理" },
      { key: "/user/digital-human", label: "数字人管理" },
      { key: "/user/review-score", label: "评分系统" },
      { key: "/user/post-console", label: "帖子管理" },
      { key: "/user/chat-console", label: "聊天接管" },
    ],
  },
  { key: "/data-analysis", icon: <LineChartOutlined />, label: "数据分析" },
  { key: "/transactions", icon: <DollarOutlined />, label: "交易审批" },
  {
    key: "pwa", icon: <MobileOutlined />, label: "PWA 运营",
    children: [
      { key: "/pwa/databoard", label: "数据看板" },
      { key: "/pwa/call-feed", label: "Call Feed" },
      { key: "/pwa/union-streamer", label: "公会主播" },
    ],
  },
  { key: "/call/screenshot-review", icon: <CameraOutlined />, label: "截图审核" },
  { key: "/lovia", icon: <ReadOutlined />, label: "Lovia 故事" },
  { key: "/rbac", icon: <SafetyOutlined />, label: "权限管理" },  // rbac.manage 才显示
  { key: "/changelog", icon: <HistoryOutlined />, label: "版本记录" },
];
菜单按权限过滤：rbac.manage 才显示"权限管理"，其余菜单登录即可见。

---
三、每个页面的迁移规划
以下按 Phase 顺序，说明每个页面需要创建的文件、关键注意点、和老代码的对应关系。

---
Phase 2 — 认证与管理
Login（/login）
要创建的文件：
  pages/Login/index.tsx          # ✅ 已有（需补飞书登录）

老代码对应：minerva/src/pages/Login.tsx（418 行）

迁移要点：
  ├─ 账号密码登录 → ✅ 已实现
  ├─ 飞书扫码登录 → 需要集成飞书 JS-SDK（jssdk-1.0.6）
  │   ├─ 调用 /auth/feishu/config 获取 appId + agentId
  │   └─ 渲染 QR 二维码，回调跳转 /auth/feishu/callback
  └─ "暗门"切换（点击 logo 5 次）→ 老代码有，照搬
FeishuCallback（/auth/feishu/callback）
要创建的文件：
  pages/FeishuCallback/index.tsx

老代码对应：minerva/src/pages/FeishuCallback.tsx（130 行）

迁移要点：
  ├─ 从 URL query 取 code + state
  ├─ 调用 /auth/feishu/login 交换 JWT token
  ├─ 存 token → 跳转首页
  └─ 直接照搬，逻辑很简单
Home（/）
要创建的文件：
  pages/Dashboard/index.tsx      # ✅ 已有（需改为真实数据）

老代码对应：minerva/src/pages/Home.tsx（251 行）

迁移要点：
  ├─ 调用 getRevenueOverview + getNewUserCountsOverview
  ├─ 展示营收/新增用户卡片
  ├─ 导航网格（跳转各功能页）
  └─ 简单页面，直接重写
RBAC（/rbac）
要创建的文件：
  pages/RBAC/index.tsx           # Tabs 容器
  pages/RBAC/UsersTab.tsx        # 管理员 Table + 创建/编辑 Modal
  pages/RBAC/RolesTab.tsx        # 角色 Table + 权限分配
  pages/RBAC/PermissionsTab.tsx  # 权限 Table（只读）
  api/rbac.ts                    # CRUD 接口

老代码对应：minerva/src/pages/RBAC/（1,105 行）

迁移要点：
  ├─ 3 个 Tab 组件，各自独立
  ├─ 老代码用 ProTable → 这里用 antd Table + Form（更可控）
  ├─ 创建管理员 Modal：用户名/显示名/密码/角色选择
  ├─ 角色编辑 Modal：名称/描述/权限多选
  └─ 审计日志可以放在 RBAC 页面的第 4 个 Tab
UserManagement（/user/management）★ 最复杂
要创建的文件：
  pages/UserManagement/index.tsx         # 搜索框 + Tab 详情区
  pages/UserManagement/BasicInfoTab.tsx  # 基础信息
  pages/UserManagement/SubscriptionTab.tsx
  pages/UserManagement/PostsTab.tsx
  pages/UserManagement/InterestsTab.tsx
  pages/UserManagement/ViolationsTab.tsx
  pages/UserManagement/TransactionsTab.tsx
  pages/UserManagement/TestVideoTab.tsx
  pages/UserManagement/RegulationTab.tsx # 管控操作
  api/users.ts                           # 搜索/详情/各 Tab 数据接口

老代码对应：minerva/src/pages/UserManagement/（2,341 行，9 个子组件）

迁移要点：
  ├─ 搜索框：输入 userId / username / phone → AutoComplete
  ├─ 搜索后展示用户 Card + 8 个详情 Tab
  ├─ 每个 Tab 是独立接口（按需加载，不一次性查）
  ├─ Tab 切换时才调用对应 API
  ├─ fetchUserMap 在后端只查 userinfo + user_online_status_record（308 行）
  └─ 管控操作（Ban/Suspend/Activate）需确认弹窗

---
Phase 3 — 内容管理
PostConsole（/user/post-console）
要创建的文件：
  pages/PostConsole/index.tsx     # 搜索 + Feed 选择
  pages/PostConsole/PostFeed.tsx  # 帖子 Feed 列表（核心组件）
  api/posts.ts                    # 帖子/评论接口

老代码对应：minerva/src/pages/PostConsole/（2,059 行）

迁移要点：
  ├─ PostFeed 是核心：图片/视频预览、用户信息卡、评论展开
  ├─ Feed 选择器：Haven / Aura（不同 app）
  ├─ 评论查询注意 post_comment 分区表（必须带 post_id）
  ├─ pictures 字段是 JSON 字符串，需嵌套 JSON.parse
  └─ 审核操作：删帖、隐藏、标记
Lovia（/lovia）
要创建的文件：
  pages/Lovia/List.tsx            # 故事列表 + 批量操作
  pages/Lovia/Create.tsx          # 创建/编辑故事
  api/lovia.ts

老代码对应：minerva/src/pages/Lovia/（965 行）

迁移要点：
  ├─ Card 列表 + Checkbox 批量选择 + 批量删除
  ├─ 编辑用 Modal（不是新页面）
  └─ 标准 CRUD，直接重写
ScreenshotReview（/call/screenshot-review）
要创建的文件：
  pages/ScreenshotReview/index.tsx
  api/screenshot-review.ts

老代码对应：minerva/src/pages/ScreenshotReview/（355 行）

迁移要点：
  ├─ Table + Image 预览 + 日期/状态筛选
  ├─ CSV 导出功能
  └─ 标准模式，直接迁移
DigitalHuman（/user/digital-human）
要创建的文件：
  pages/DigitalHuman/index.tsx
  pages/DigitalHuman/DHFormDrawer.tsx  # 编辑/创建 Drawer
  api/digital-human.ts

老代码对应：minerva/src/pages/DigitalHuman/（933 行）

迁移要点：
  ├─ Table 列表 + 性别筛选 + 分页
  ├─ DHFormDrawer：Drawer 表单（字段较多但模式清晰）
  └─ 直接迁移

---
Phase 4 — 数据与运营
DataAnalysis（/data-analysis）★ 高复杂度
要创建的文件：
  pages/DataAnalysis/index.tsx
  pages/DataAnalysis/RevenueChart.tsx    # ECharts 营收折线图
  pages/DataAnalysis/NewUsersChart.tsx   # ECharts 新增用户图
  pages/DataAnalysis/config.ts           # 列定义 + 图表配置
  api/data-analysis.ts

老代码对应：minerva/src/pages/DataAnalysis/（1,771 行）

迁移要点：
  ├─ ECharts 组件可直接复用（echarts + echarts-for-react）
  ├─ 时区选择器（Pacific / UTC / Asia...）
  ├─ 按 App 分维度展示（多折线）
  ├─ Tab 切换营收 / 新增用户
  ├─ ★ 后端 SQL 是最大挑战：多维度聚合（日/周/月 × app × 指标）
  └─ 老代码部分已经用 $queryRaw，SQL 可参考
PWADataboard（/pwa/databoard）★ 高复杂度
要创建的文件：
  pages/PWADataboard/index.tsx
  pages/PWADataboard/columns.ts          # 列配置（独立文件，列数多）
  pages/PWADataboard/OperationDrawer.tsx  # 操作详情 Drawer
  api/pwa-databoard.ts

老代码对应：minerva/src/pages/PWADataboard/（2,755 行）

迁移要点：
  ├─ 老代码用 ProTable（列数非常多，有列显示/隐藏配置）
  ├─ 两种数据源切换：Proto / Minerva
  ├─ 列状态持久化（localStorage）
  ├─ CSV 导出含汇总行
  ├─ ProTable 在 antd 6 兼容性需验证
  └─ 如不兼容，降级为 antd Table + 自定义列配置
CallFeed（/pwa/call-feed）
要创建的文件：
  pages/CallFeed/index.tsx        # Tabs 入口
  pages/CallFeed/LiveStreamers.tsx
  pages/CallFeed/TestVideoList.tsx
  api/call-feed.ts

老代码对应：minerva/src/pages/CallFeed/（1,723 行）

迁移要点：
  ├─ 2 Tab：在线主播列表 + 测试视频列表
  ├─ 标准 Table 模式
  └─ 直接迁移
UnionStreamer（/pwa/union-streamer）
要创建的文件：
  pages/UnionStreamer/index.tsx
  pages/UnionStreamer/InquiryTab.tsx
  pages/UnionStreamer/ReviewTab.tsx
  pages/UnionStreamer/GuildListTab.tsx
  api/union-streamer.ts

老代码对应：minerva/src/pages/UnionStreamer/（3,724 行）

迁移要点：
  ├─ 3 Tab：主播查询 / 审核 / 公会列表
  ├─ 行数多但模式都是 Table + 筛选 + 操作
  └─ 逐 Tab 迁移

---
Phase 5 — 交易与风控
Transactions（/transactions）
要创建的文件：
  pages/Transactions/index.tsx
  pages/Transactions/WithdrawalList.tsx   # 提现列表 + 审批操作
  api/transactions.ts

老代码对应：minerva/src/pages/Transactions/（795 行）

迁移要点：
  ├─ 提现列表 Table + 审批/拒绝按钮
  ├─ 审批确认 Modal
  └─ 标准模式
RiskControl（/user/risk-control）
要创建的文件：
  pages/RiskControl/index.tsx
  pages/RiskControl/ReportsTab.tsx     # 举报列表
  pages/RiskControl/SuspiciousTab.tsx  # 可疑用户排行
  api/risk.ts

老代码对应：minerva/src/pages/RiskControl/（644 行）

迁移要点：
  ├─ 2 Tab，各自独立 Table
  └─ 直接迁移
ReviewScore（/user/review-score）
要创建的文件：
  pages/ReviewScore/index.tsx
  pages/ReviewScore/DetailDrawer.tsx
  api/review-score.ts

老代码对应：minerva/src/pages/ReviewScore/（776 行）

迁移要点：
  ├─ 评分分布统计 + Table + 筛选
  ├─ Rate 组件 + Statistic 展示
  ├─ DetailDrawer 展示单用户评分详情
  └─ 直接迁移
ChatConsole（/user/chat-console）🔴 SDK 风险
要创建的文件：
  pages/ChatConsole/index.tsx
  pages/ChatConsole/ChatPanel.tsx      # IM SDK 集成
  api/chat-console.ts

老代码对应：minerva/src/pages/ChatConsole/（784 行）

迁移要点：
  ├─ 腾讯云 TUIKit IM SDK：ConversationList + MessageList + MessageInput
  ├─ 需要后端生成 UserSig（/chat-console/user-sig）
  ├─ 自定义消息过滤 + 用户信息增强
  ├─ 可调整面板（resizable panes）
  ├─ ★★ 关键风险：TUIKit 在 React 19 下的兼容性
  │   建议：先做单独 POC 验证 SDK 能否正常工作
  └─ 如果不兼容，可能需要降级 React 版本或用 iframe 隔离
HistoricalTransactions（/call/historical-transactions）
要创建的文件：
  pages/HistoricalTransactions/index.tsx
  api/historical-transactions.ts

老代码对应：minerva/src/pages/HistoricalTransactionsNew.tsx（976 行）

迁移要点：
  ├─ 7 个筛选条件 + 14 列 Table
  ├─ 时区处理（Pacific）
  ├─ CSV 导出 + 4 项统计汇总
  └─ 逻辑清晰但字段多，注意对齐

---
Phase 6 — 辅助功能
Changelog / ServerStatus / UploadTest
Changelog：
  pages/Changelog/index.tsx
  调 GitHub API（fetchRepos, fetchCommits），不依赖后端

ServerStatus：
  pages/ServerStatus/index.tsx
  调 /health/services 展示 DB/Redis/Auth 状态

UploadTest：
  可暂不迁移（纯调试页面）

---
四、通用开发模式
4.1 页面开发 SOP（每个页面都走这个流程）
1. 在 contract-minerva 中定义请求/响应 Zod schema
2. 在 business 包中写 sql.ts → model.ts → service.ts
3. 在 app-minerva-server 的 controller 中注册路由
4. 在 auth.permissions.ts 中声明该路由的权限
5. 用 curl / Postman 验证后端接口
6. 在 api/xxx.ts 中写前端 API 调用函数
7. 在 pages/XXX/ 中写页面组件
8. 在 App.tsx 中注册路由（lazy load）
9. 对照老系统验证数据一致性
4.2 Table 页面通用模板
// 大部分页面都是这个模式
export default function XXXPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getList({ page: pagination.page, pageSize: pagination.pageSize });
      setList(res.data.list);
      setPagination(p => ({ ...p, total: res.data.total }));
    } finally { setLoading(false); }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div>
      <Table
        dataSource={list}
        loading={loading}
        columns={columns}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => setPagination({ page, pageSize, total: pagination.total }),
        }}
      />
    </div>
  );
}
4.3 API 调用通用模板
// api/xxx.ts
import { client } from "./client";

export async function getList(params: ListParams) {
  const res = await client.post<ApiResponse<ListData>>("/xxx/list", params);
  return res;
}

export async function getDetail(id: number) {
  const res = await client.post<ApiResponse<DetailData>>("/xxx/detail", { id });
  return res;
}
