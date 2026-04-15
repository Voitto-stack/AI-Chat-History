---
title: data-analysis.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: data-analysis.d.ts
---

# data-analysis.d

```ts
import { z } from "zod";
export declare const PRODUCT_PRICES: Record<string, number>;
/** 根据 productId 查价格，未找到返回 0 */
export declare function getProductPrice(productId: string): number;
export declare const APP_ID_MAP: {
    readonly HAVEN: 2;
    readonly AI_FANTASY: 3;
    readonly GRACE_CHAT: 4;
    readonly AURA: 5;
    readonly LOVIA: 7;
    readonly DORA_IOS: 8;
    readonly DORA_ANDROID: 9;
    readonly DONI: 11;
    readonly JOVIA_ANDROID: 12;
    readonly LUMA: 13;
    readonly ROMI_IOS: 14;
    readonly ELARA: 15;
    readonly ROMI_ANDROID: 18;
};
export declare const APP_LIST: readonly [{
    readonly id: 4;
    readonly name: "GraceChat";
    readonly icon: "/gc.png";
}, {
    readonly id: 8;
    readonly name: "Dora";
    readonly icon: "/Dora.png";
}, {
    readonly id: 9;
    readonly name: "Dora Android";
    readonly icon: "/DoraAnd.png";
}, {
    readonly id: 13;
    readonly name: "Luma";
    readonly icon: "/luma.png";
}, {
    readonly id: 11;
    readonly name: "Doni";
    readonly icon: "/doni.jpeg";
}, {
    readonly id: 14;
    readonly name: "Romi";
    readonly icon: "/romi.png";
}, {
    readonly id: 18;
    readonly name: "Romi Android";
    readonly icon: "/romi.png";
}, {
    readonly id: 12;
    readonly name: "Jovia Android";
    readonly icon: "/jovia-and.jpeg";
}, {
    readonly id: 2;
    readonly name: "Haven";
    readonly icon: "/haven.png";
}, {
    readonly id: 5;
    readonly name: "Aura";
    readonly icon: "/aura.png";
}, {
    readonly id: 3;
    readonly name: "AI Fantasy";
    readonly icon: "/aif.jpeg";
}, {
    readonly id: 7;
    readonly name: "Lovia";
    readonly icon: "/lovia.png";
}, {
    readonly id: 15;
    readonly name: "Elara";
    readonly icon: "/elara.jpeg";
}];
export declare const ActionType: {
    readonly PAID: 0;
    readonly RENEW: 1;
    readonly REFUND: 2;
    readonly EXPIRE: 3;
};
export declare const newUserCountsQuerySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
    appId: z.ZodNumber;
    timezone: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    appId: number;
    timezone: string;
}, {
    startDate: string;
    endDate: string;
    appId: number;
    timezone?: string | undefined;
}>;
export type NewUserCountsQuery = z.infer<typeof newUserCountsQuerySchema>;
export declare const actionUsersQuerySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
    appId: z.ZodNumber;
    actionType: z.ZodNumber;
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    timezone: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    appId: number;
    timezone: string;
    actionType: number;
    page: number;
    pageSize: number;
}, {
    startDate: string;
    endDate: string;
    appId: number;
    actionType: number;
    timezone?: string | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export type ActionUsersQuery = z.infer<typeof actionUsersQuerySchema>;
export declare const revenueQuerySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
    appId: z.ZodNumber;
    timezone: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    appId: number;
    timezone: string;
}, {
    startDate: string;
    endDate: string;
    appId: number;
    timezone?: string | undefined;
}>;
export type RevenueQuery = z.infer<typeof revenueQuerySchema>;
export declare const newUserCountItemSchema: z.ZodObject<{
    timestamp: z.ZodString;
    numOfNewUsers: z.ZodNumber;
    numOfNewMaleUsers: z.ZodNumber;
    numOfNewFemaleUsers: z.ZodNumber;
    numOfNewNonBinaryUsers: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    timestamp: string;
    numOfNewUsers: number;
    numOfNewMaleUsers: number;
    numOfNewFemaleUsers: number;
    numOfNewNonBinaryUsers: number;
}, {
    timestamp: string;
    numOfNewUsers: number;
    numOfNewMaleUsers: number;
    numOfNewFemaleUsers: number;
    numOfNewNonBinaryUsers: number;
}>;
export type NewUserCountItem = z.infer<typeof newUserCountItemSchema>;
export declare const newUserCountResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        timestamp: z.ZodString;
        numOfNewUsers: z.ZodNumber;
        numOfNewMaleUsers: z.ZodNumber;
        numOfNewFemaleUsers: z.ZodNumber;
        numOfNewNonBinaryUsers: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
        numOfNewUsers: number;
        numOfNewMaleUsers: number;
        numOfNewFemaleUsers: number;
        numOfNewNonBinaryUsers: number;
    }, {
        timestamp: string;
        numOfNewUsers: number;
        numOfNewMaleUsers: number;
        numOfNewFemaleUsers: number;
        numOfNewNonBinaryUsers: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        timestamp: string;
        numOfNewUsers: number;
        numOfNewMaleUsers: number;
        numOfNewFemaleUsers: number;
        numOfNewNonBinaryUsers: number;
    }[];
}, {
    items: {
        timestamp: string;
        numOfNewUsers: number;
        numOfNewMaleUsers: number;
        numOfNewFemaleUsers: number;
        numOfNewNonBinaryUsers: number;
    }[];
}>;
export type NewUserCountResponse = z.infer<typeof newUserCountResponseSchema>;
export declare const actionUserItemSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodString;
    gender: z.ZodNullable<z.ZodNumber>;
    age: z.ZodNullable<z.ZodNumber>;
    region: z.ZodNullable<z.ZodString>;
    avatar: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    amount: z.ZodNumber;
    productId: z.ZodNullable<z.ZodString>;
    purchaseDate: z.ZodString;
    paymentProvider: z.ZodNullable<z.ZodString>;
    paymentMethod: z.ZodNullable<z.ZodString>;
    transactionType: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    userId: number;
    age: number | null;
    region: string | null;
    amount: number;
    gender: number | null;
    avatar: string | null;
    createdAt: string;
    productId: string | null;
    purchaseDate: string;
    paymentProvider: string | null;
    paymentMethod: string | null;
    transactionType: string;
}, {
    username: string;
    userId: number;
    age: number | null;
    region: string | null;
    amount: number;
    gender: number | null;
    avatar: string | null;
    createdAt: string;
    productId: string | null;
    purchaseDate: string;
    paymentProvider: string | null;
    paymentMethod: string | null;
    transactionType: string;
}>;
export type ActionUserItem = z.infer<typeof actionUserItemSchema>;
export declare const actionUserListResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodString;
        gender: z.ZodNullable<z.ZodNumber>;
        age: z.ZodNullable<z.ZodNumber>;
        region: z.ZodNullable<z.ZodString>;
        avatar: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        amount: z.ZodNumber;
        productId: z.ZodNullable<z.ZodString>;
        purchaseDate: z.ZodString;
        paymentProvider: z.ZodNullable<z.ZodString>;
        paymentMethod: z.ZodNullable<z.ZodString>;
        transactionType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username: string;
        userId: number;
        age: number | null;
        region: string | null;
        amount: number;
        gender: number | null;
        avatar: string | null;
        createdAt: string;
        productId: string | null;
        purchaseDate: string;
        paymentProvider: string | null;
        paymentMethod: string | null;
        transactionType: string;
    }, {
        username: string;
        userId: number;
        age: number | null;
        region: string | null;
        amount: number;
        gender: number | null;
        avatar: string | null;
        createdAt: string;
        productId: string | null;
        purchaseDate: string;
        paymentProvider: string | null;
        paymentMethod: string | null;
        transactionType: string;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        username: string;
        userId: number;
        age: number | null;
        region: string | null;
        amount: number;
        gender: number | null;
        avatar: string | null;
        createdAt: string;
        productId: string | null;
        purchaseDate: string;
        paymentProvider: string | null;
        paymentMethod: string | null;
        transactionType: string;
    }[];
}, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        username: string;
        userId: number;
        age: number | null;
        region: string | null;
        amount: number;
        gender: number | null;
        avatar: string | null;
        createdAt: string;
        productId: string | null;
        purchaseDate: string;
        paymentProvider: string | null;
        paymentMethod: string | null;
        transactionType: string;
    }[];
}>;
export type ActionUserListResponse = z.infer<typeof actionUserListResponseSchema>;
export declare const revenueResponseSchema: z.ZodObject<{
    overallRevenue: z.ZodObject<{
        total: z.ZodString;
        payments: z.ZodNumber;
        uniqueUserCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: string;
        payments: number;
        uniqueUserCount: number;
    }, {
        total: string;
        payments: number;
        uniqueUserCount: number;
    }>;
    subscriptionsRevenue: z.ZodObject<{
        total: z.ZodString;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: string;
        count: number;
    }, {
        total: string;
        count: number;
    }>;
    coinsRevenue: z.ZodObject<{
        total: z.ZodString;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: string;
        count: number;
    }, {
        total: string;
        count: number;
    }>;
    newUsersRevenue: z.ZodObject<{
        total: z.ZodString;
        payments: z.ZodNumber;
        uniqueUserCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: string;
        payments: number;
        uniqueUserCount: number;
    }, {
        total: string;
        payments: number;
        uniqueUserCount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    overallRevenue: {
        total: string;
        payments: number;
        uniqueUserCount: number;
    };
    subscriptionsRevenue: {
        total: string;
        count: number;
    };
    coinsRevenue: {
        total: string;
        count: number;
    };
    newUsersRevenue: {
        total: string;
        payments: number;
        uniqueUserCount: number;
    };
}, {
    overallRevenue: {
        total: string;
        payments: number;
        uniqueUserCount: number;
    };
    subscriptionsRevenue: {
        total: string;
        count: number;
    };
    coinsRevenue: {
        total: string;
        count: number;
    };
    newUsersRevenue: {
        total: string;
        payments: number;
        uniqueUserCount: number;
    };
}>;
export type RevenueResponse = z.infer<typeof revenueResponseSchema>;
//# sourceMappingURL=data-analysis.d.ts.map
```
