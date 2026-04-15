---
title: digital-human.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: digital-human.d.ts
---

# digital-human.d

```ts
import { z } from 'zod';
export declare const dhInterestTagSchema: z.ZodObject<{
    key: z.ZodString;
    sortKey: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    key: string;
    sortKey: number;
}, {
    key: string;
    sortKey: number;
}>;
export declare const dhInterestTabSchema: z.ZodObject<{
    key: z.ZodString;
    sortKey: z.ZodNumber;
    tags: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        sortKey: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        key: string;
        sortKey: number;
    }, {
        key: string;
        sortKey: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    key: string;
    sortKey: number;
    tags: {
        key: string;
        sortKey: number;
    }[];
}, {
    key: string;
    sortKey: number;
    tags: {
        key: string;
        sortKey: number;
    }[];
}>;
export type DhInterestTab = z.infer<typeof dhInterestTabSchema>;
export declare const digitalHumanListRequestSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    gender: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    gender?: number | undefined;
}, {
    gender?: number | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export type DigitalHumanListRequest = z.infer<typeof digitalHumanListRequestSchema>;
export declare const digitalHumanCreateRequestSchema: z.ZodObject<{
    username: z.ZodString;
    age: z.ZodNumber;
    gender: z.ZodNumber;
    bio: z.ZodOptional<z.ZodString>;
    interests: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        sortKey: z.ZodNumber;
        tags: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            sortKey: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            key: string;
            sortKey: number;
        }, {
            key: string;
            sortKey: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }, {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }>, "many">>;
    profession: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    education: z.ZodOptional<z.ZodString>;
    isPwaVideoVerify: z.ZodDefault<z.ZodBoolean>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    age: number;
    gender: number;
    isPwaVideoVerify: boolean;
    avatarUrl?: string | undefined;
    region?: string | undefined;
    bio?: string | undefined;
    interests?: {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }[] | undefined;
    profession?: string | undefined;
    education?: string | undefined;
}, {
    username: string;
    age: number;
    gender: number;
    avatarUrl?: string | undefined;
    region?: string | undefined;
    bio?: string | undefined;
    interests?: {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }[] | undefined;
    profession?: string | undefined;
    education?: string | undefined;
    isPwaVideoVerify?: boolean | undefined;
}>;
export type DigitalHumanCreateRequest = z.infer<typeof digitalHumanCreateRequestSchema>;
export declare const digitalHumanUpdateRequestSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
    gender: z.ZodOptional<z.ZodNumber>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    interests: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        sortKey: z.ZodNumber;
        tags: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            sortKey: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            key: string;
            sortKey: number;
        }, {
            key: string;
            sortKey: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }, {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }>, "many">>>;
    profession: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    region: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    education: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isPwaVideoVerify: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    username?: string | undefined;
    avatarUrl?: string | undefined;
    age?: number | undefined;
    region?: string | undefined;
    bio?: string | undefined;
    gender?: number | undefined;
    interests?: {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }[] | undefined;
    profession?: string | undefined;
    education?: string | undefined;
    isPwaVideoVerify?: boolean | undefined;
}, {
    username?: string | undefined;
    avatarUrl?: string | undefined;
    age?: number | undefined;
    region?: string | undefined;
    bio?: string | undefined;
    gender?: number | undefined;
    interests?: {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }[] | undefined;
    profession?: string | undefined;
    education?: string | undefined;
    isPwaVideoVerify?: boolean | undefined;
}>;
export type DigitalHumanUpdateRequest = z.infer<typeof digitalHumanUpdateRequestSchema>;
export declare const botConfigUpsertRequestSchema: z.ZodObject<{
    botId: z.ZodString;
    participantName: z.ZodString;
    shortDescription: z.ZodString;
    longDescription: z.ZodString;
    greeting: z.ZodString;
}, "strip", z.ZodTypeAny, {
    botId: string;
    participantName: string;
    shortDescription: string;
    longDescription: string;
    greeting: string;
}, {
    botId: string;
    participantName: string;
    shortDescription: string;
    longDescription: string;
    greeting: string;
}>;
export type BotConfigUpsertRequest = z.infer<typeof botConfigUpsertRequestSchema>;
export declare const botConfigSchema: z.ZodObject<{
    externalId: z.ZodString;
    participantName: z.ZodNullable<z.ZodString>;
    shortDescription: z.ZodString;
    longDescription: z.ZodString;
    greeting: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodString>;
    chatUserId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    avatarUrl: string | null;
    participantName: string | null;
    shortDescription: string;
    longDescription: string;
    greeting: string;
    externalId: string;
    chatUserId: number;
}, {
    avatarUrl: string | null;
    participantName: string | null;
    shortDescription: string;
    longDescription: string;
    greeting: string;
    externalId: string;
    chatUserId: number;
}>;
export type BotConfig = z.infer<typeof botConfigSchema>;
export declare const digitalHumanItemSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodString;
    nickname: z.ZodNullable<z.ZodString>;
    age: z.ZodNullable<z.ZodNumber>;
    gender: z.ZodNullable<z.ZodNumber>;
    genderLabel: z.ZodNullable<z.ZodString>;
    bio: z.ZodNullable<z.ZodString>;
    avatarUrl: z.ZodNullable<z.ZodString>;
    customAvatar: z.ZodNullable<z.ZodAny>;
    profession: z.ZodNullable<z.ZodString>;
    education: z.ZodNullable<z.ZodString>;
    region: z.ZodNullable<z.ZodString>;
    isPwaVideoVerify: z.ZodBoolean;
    createdAt: z.ZodNullable<z.ZodString>;
    interests: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        sortKey: z.ZodNumber;
        tags: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            sortKey: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            key: string;
            sortKey: number;
        }, {
            key: string;
            sortKey: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }, {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }>, "many">;
    bot: z.ZodNullable<z.ZodObject<{
        externalId: z.ZodString;
        participantName: z.ZodNullable<z.ZodString>;
        shortDescription: z.ZodString;
        longDescription: z.ZodString;
        greeting: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
        chatUserId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        avatarUrl: string | null;
        participantName: string | null;
        shortDescription: string;
        longDescription: string;
        greeting: string;
        externalId: string;
        chatUserId: number;
    }, {
        avatarUrl: string | null;
        participantName: string | null;
        shortDescription: string;
        longDescription: string;
        greeting: string;
        externalId: string;
        chatUserId: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    username: string;
    avatarUrl: string | null;
    userId: number;
    nickname: string | null;
    age: number | null;
    region: string | null;
    bio: string | null;
    gender: number | null;
    createdAt: string | null;
    interests: {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }[];
    profession: string | null;
    education: string | null;
    isPwaVideoVerify: boolean;
    genderLabel: string | null;
    bot: {
        avatarUrl: string | null;
        participantName: string | null;
        shortDescription: string;
        longDescription: string;
        greeting: string;
        externalId: string;
        chatUserId: number;
    } | null;
    customAvatar?: any;
}, {
    username: string;
    avatarUrl: string | null;
    userId: number;
    nickname: string | null;
    age: number | null;
    region: string | null;
    bio: string | null;
    gender: number | null;
    createdAt: string | null;
    interests: {
        key: string;
        sortKey: number;
        tags: {
            key: string;
            sortKey: number;
        }[];
    }[];
    profession: string | null;
    education: string | null;
    isPwaVideoVerify: boolean;
    genderLabel: string | null;
    bot: {
        avatarUrl: string | null;
        participantName: string | null;
        shortDescription: string;
        longDescription: string;
        greeting: string;
        externalId: string;
        chatUserId: number;
    } | null;
    customAvatar?: any;
}>;
export type DigitalHumanItem = z.infer<typeof digitalHumanItemSchema>;
export declare const digitalHumanListResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodString;
        nickname: z.ZodNullable<z.ZodString>;
        age: z.ZodNullable<z.ZodNumber>;
        gender: z.ZodNullable<z.ZodNumber>;
        genderLabel: z.ZodNullable<z.ZodString>;
        bio: z.ZodNullable<z.ZodString>;
        avatarUrl: z.ZodNullable<z.ZodString>;
        customAvatar: z.ZodNullable<z.ZodAny>;
        profession: z.ZodNullable<z.ZodString>;
        education: z.ZodNullable<z.ZodString>;
        region: z.ZodNullable<z.ZodString>;
        isPwaVideoVerify: z.ZodBoolean;
        createdAt: z.ZodNullable<z.ZodString>;
        interests: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            sortKey: z.ZodNumber;
            tags: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                sortKey: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                key: string;
                sortKey: number;
            }, {
                key: string;
                sortKey: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            key: string;
            sortKey: number;
            tags: {
                key: string;
                sortKey: number;
            }[];
        }, {
            key: string;
            sortKey: number;
            tags: {
                key: string;
                sortKey: number;
            }[];
        }>, "many">;
        bot: z.ZodNullable<z.ZodObject<{
            externalId: z.ZodString;
            participantName: z.ZodNullable<z.ZodString>;
            shortDescription: z.ZodString;
            longDescription: z.ZodString;
            greeting: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            chatUserId: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            avatarUrl: string | null;
            participantName: string | null;
            shortDescription: string;
            longDescription: string;
            greeting: string;
            externalId: string;
            chatUserId: number;
        }, {
            avatarUrl: string | null;
            participantName: string | null;
            shortDescription: string;
            longDescription: string;
            greeting: string;
            externalId: string;
            chatUserId: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        username: string;
        avatarUrl: string | null;
        userId: number;
        nickname: string | null;
        age: number | null;
        region: string | null;
        bio: string | null;
        gender: number | null;
        createdAt: string | null;
        interests: {
            key: string;
            sortKey: number;
            tags: {
                key: string;
                sortKey: number;
            }[];
        }[];
        profession: string | null;
        education: string | null;
        isPwaVideoVerify: boolean;
        genderLabel: string | null;
        bot: {
            avatarUrl: string | null;
            participantName: string | null;
            shortDescription: string;
            longDescription: string;
            greeting: string;
            externalId: string;
            chatUserId: number;
        } | null;
        customAvatar?: any;
    }, {
        username: string;
        avatarUrl: string | null;
        userId: number;
        nickname: string | null;
        age: number | null;
        region: string | null;
        bio: string | null;
        gender: number | null;
        createdAt: string | null;
        interests: {
            key: string;
            sortKey: number;
            tags: {
                key: string;
                sortKey: number;
            }[];
        }[];
        profession: string | null;
        education: string | null;
        isPwaVideoVerify: boolean;
        genderLabel: string | null;
        bot: {
            avatarUrl: string | null;
            participantName: string | null;
            shortDescription: string;
            longDescription: string;
            greeting: string;
            externalId: string;
            chatUserId: number;
        } | null;
        customAvatar?: any;
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
        avatarUrl: string | null;
        userId: number;
        nickname: string | null;
        age: number | null;
        region: string | null;
        bio: string | null;
        gender: number | null;
        createdAt: string | null;
        interests: {
            key: string;
            sortKey: number;
            tags: {
                key: string;
                sortKey: number;
            }[];
        }[];
        profession: string | null;
        education: string | null;
        isPwaVideoVerify: boolean;
        genderLabel: string | null;
        bot: {
            avatarUrl: string | null;
            participantName: string | null;
            shortDescription: string;
            longDescription: string;
            greeting: string;
            externalId: string;
            chatUserId: number;
        } | null;
        customAvatar?: any;
    }[];
}, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        username: string;
        avatarUrl: string | null;
        userId: number;
        nickname: string | null;
        age: number | null;
        region: string | null;
        bio: string | null;
        gender: number | null;
        createdAt: string | null;
        interests: {
            key: string;
            sortKey: number;
            tags: {
                key: string;
                sortKey: number;
            }[];
        }[];
        profession: string | null;
        education: string | null;
        isPwaVideoVerify: boolean;
        genderLabel: string | null;
        bot: {
            avatarUrl: string | null;
            participantName: string | null;
            shortDescription: string;
            longDescription: string;
            greeting: string;
            externalId: string;
            chatUserId: number;
        } | null;
        customAvatar?: any;
    }[];
}>;
export type DigitalHumanListResponse = z.infer<typeof digitalHumanListResponseSchema>;
export declare const DigitalHumanGender: {
    readonly UNSPECIFIED: 0;
    readonly MALE: 1;
    readonly FEMALE: 2;
    readonly NON_BINARY: 3;
};
export declare const BotVisibility: {
    readonly UNKNOWN: 0;
    readonly PUBLIC: 1;
    readonly PRIVATE: 2;
    readonly DELETED: 3;
};
//# sourceMappingURL=digital-human.d.ts.map
```
