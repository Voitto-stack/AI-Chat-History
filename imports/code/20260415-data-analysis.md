---
title: data-analysis
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: data-analysis.js
---

# data-analysis

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revenueResponseSchema = exports.actionUserListResponseSchema = exports.actionUserItemSchema = exports.newUserCountResponseSchema = exports.newUserCountItemSchema = exports.revenueQuerySchema = exports.actionUsersQuerySchema = exports.newUserCountsQuerySchema = exports.ActionType = exports.APP_LIST = exports.APP_ID_MAP = exports.PRODUCT_PRICES = void 0;
exports.getProductPrice = getProductPrice;
const zod_1 = require("zod");
// ── Product Price Mappings ───────────────────────────────────
exports.PRODUCT_PRICES = {
    // iOS coins (通用)
    coins_tier_1: 0.99,
    coins_tier_2: 2.99,
    coins_tier_3: 7.99,
    coins_tier_4: 9.99,
    coins_tier_5: 19.99,
    coins_tier6: 99.99,
    coins_tier7: 59.99,
    coins_tier8: 3.99,
    coins_tier9: 9.99,
    coins_tier10: 19.99,
    coins_tier11: 39.99,
    coins_tier12: 99.99,
    // 通用订阅
    monthly_subscription_tier_3: 19.99,
    yearly_subscription_tier_3: 44.99,
    monthly_subscription_tier_2: 24.99,
    yearly_subscription_tier_2: 59.99,
    yearly_subscription: 69.99,
    monthly_subscription: 29.99,
    weekly_subscription: 14.99,
    // Lovia 订阅
    lovia_v_weekly_subscription: 4.99,
    lovia_v_monthly_subscription: 9.99,
    lovia_v_yearly_subscription: 39.99,
    // Dora iOS coins
    dora_gold_1: 59.99,
    dora_gold_2: 3.99,
    dora_gold_3: 9.99,
    dora_gold_4: 19.99,
    dora_gold_5: 39.99,
    dora_gold_6: 99.99,
    // Dora 订阅
    dora_week_subscription: 14.99,
    dora_week_subscription_new: 14.99,
    dora_month_subscription: 29.99,
    dora_year_subscription: 69.99,
    // Dora 访客订阅
    visit_dora_week_subscription: 4.99,
    visit_dora_month_subscription: 9.99,
    visit_dora_year_subscription: 39.99,
    // Luma coins
    luma_coin_1: 59.99,
    luma_coin_2: 3.99,
    luma_coin_3: 9.99,
    luma_coin_4: 19.99,
    luma_coin_5: 39.99,
    luma_coin_6: 99.99,
    // Luma 订阅
    luma_subscription_week: 14.99,
    luma_subscription_month: 29.99,
    luma_subscription_year: 69.99,
    // Luma 访客订阅
    luma_visit_subscription_week: 4.99,
    luma_visit_subscription_month: 9.99,
    luma_visit_subscription_year: 39.99,
    // Dora Android coins
    dora_coins_a: 3.99,
    dora_coins_b: 9.99,
    dora_coins_c: 19.99,
    dora_coins_d: 39.99,
    dora_coins_e: 59.99,
    dora_coins_f: 99.99,
    // Android 通用订阅
    premium_monthly: 29.99,
    premium_weekly: 14.99,
    premium_yearly: 69.99,
    visitor_monthly: 9.99,
    visitor_weekly: 4.99,
    visitor_yearly: 39.99,
    // Doni coins
    doni_coins_a: 3.99,
    doni_coins_b: 9.99,
    doni_coins_c: 19.99,
    doni_coins_d: 39.99,
    doni_coins_e: 59.99,
    doni_coins_f: 99.99,
    doni_coins_g: 99.99,
    // Romi coins
    romi_bronze_1: 59.99,
    romi_bronze_2: 3.99,
    romi_bronze_3: 9.99,
    romi_bronze_4: 19.99,
    romi_bronze_5: 39.99,
    romi_bronze_6: 99.99,
    // Romi 订阅
    romi_vip_weekly: 14.99,
    romi_vip_monthly: 29.99,
    romi_vip_yearly: 69.99,
    // Romi 访客
    romi_guest_weekly: 4.99,
    romi_guest_monthly: 9.99,
    romi_guest_yearly: 39.99,
    // Elara coins
    elara_coin_3000: 59.99,
    elara_coin_200: 3.99,
    elara_coin_500: 9.99,
    elara_coin_1000: 19.99,
    elara_coin_2000: 39.99,
    elara_coin_5000: 99.99,
    // Elara 订阅
    sub_elara_week: 14.99,
    sub_elara_month: 29.99,
    sub_elara_year: 69.99,
    // Elara 访客
    visit_elara_week: 4.99,
    visit_elara_month: 9.99,
    visit_elara_year: 39.99,
    // Jovia Android coins
    jovia_coins_a: 3.99,
    jovia_coins_b: 9.99,
    jovia_coins_c: 19.99,
    jovia_coins_d: 39.99,
    jovia_coins_e: 59.99,
    jovia_coins_f: 99.99,
};
/** 根据 productId 查价格，未找到返回 0 */
function getProductPrice(productId) {
    return exports.PRODUCT_PRICES[productId] ?? 0;
}
exports.APP_ID_MAP = {
    HAVEN: 2,
    AI_FANTASY: 3,
    GRACE_CHAT: 4,
    AURA: 5,
    LOVIA: 7,
    DORA_IOS: 8,
    DORA_ANDROID: 9,
    DONI: 11,
    JOVIA_ANDROID: 12,
    LUMA: 13,
    ROMI_IOS: 14,
    ELARA: 15,
    ROMI_ANDROID: 18,
};
exports.APP_LIST = [
    { id: 4, name: "GraceChat", icon: "/gc.png" },
    { id: 8, name: "Dora", icon: "/Dora.png" },
    { id: 9, name: "Dora Android", icon: "/DoraAnd.png" },
    { id: 13, name: "Luma", icon: "/luma.png" },
    { id: 11, name: "Doni", icon: "/doni.jpeg" },
    { id: 14, name: "Romi", icon: "/romi.png" },
    { id: 18, name: "Romi Android", icon: "/romi.png" },
    { id: 12, name: "Jovia Android", icon: "/jovia-and.jpeg" },
    { id: 2, name: "Haven", icon: "/haven.png" },
    { id: 5, name: "Aura", icon: "/aura.png" },
    { id: 3, name: "AI Fantasy", icon: "/aif.jpeg" },
    { id: 7, name: "Lovia", icon: "/lovia.png" },
    { id: 15, name: "Elara", icon: "/elara.jpeg" },
];
exports.ActionType = {
    PAID: 0,
    RENEW: 1,
    REFUND: 2,
    EXPIRE: 3,
};
// === Request Schemas ===
exports.newUserCountsQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    appId: zod_1.z.coerce.number().int(),
    timezone: zod_1.z.string().default("Asia/Shanghai"),
});
exports.actionUsersQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    appId: zod_1.z.coerce.number().int(),
    actionType: zod_1.z.coerce.number().int().min(0).max(3),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    timezone: zod_1.z.string().default("Asia/Shanghai"),
});
exports.revenueQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    appId: zod_1.z.coerce.number().int(),
    timezone: zod_1.z.string().default("Asia/Shanghai"),
});
// === Response Schemas ===
exports.newUserCountItemSchema = zod_1.z.object({
    timestamp: zod_1.z.string(),
    numOfNewUsers: zod_1.z.number(),
    numOfNewMaleUsers: zod_1.z.number(),
    numOfNewFemaleUsers: zod_1.z.number(),
    numOfNewNonBinaryUsers: zod_1.z.number(),
});
exports.newUserCountResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.newUserCountItemSchema),
});
exports.actionUserItemSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    gender: zod_1.z.number().nullable(),
    age: zod_1.z.number().nullable(),
    region: zod_1.z.string().nullable(),
    avatar: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    amount: zod_1.z.number(),
    productId: zod_1.z.string().nullable(),
    purchaseDate: zod_1.z.string(),
    paymentProvider: zod_1.z.string().nullable(),
    paymentMethod: zod_1.z.string().nullable(),
    transactionType: zod_1.z.string(),
});
exports.actionUserListResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.actionUserItemSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    pageSize: zod_1.z.number(),
});
exports.revenueResponseSchema = zod_1.z.object({
    overallRevenue: zod_1.z.object({
        total: zod_1.z.string(),
        payments: zod_1.z.number(),
        uniqueUserCount: zod_1.z.number(),
    }),
    subscriptionsRevenue: zod_1.z.object({
        total: zod_1.z.string(),
        count: zod_1.z.number(),
    }),
    coinsRevenue: zod_1.z.object({
        total: zod_1.z.string(),
        count: zod_1.z.number(),
    }),
    newUsersRevenue: zod_1.z.object({
        total: zod_1.z.string(),
        payments: zod_1.z.number(),
        uniqueUserCount: zod_1.z.number(),
    }),
});
//# sourceMappingURL=data-analysis.js.map
```
