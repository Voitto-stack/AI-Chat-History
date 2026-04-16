---
title: ServiceCode.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: ServiceCode.d.ts
---

# ServiceCode.d

```ts
export declare const protobufPackage = "ServiceCommonCode";
export declare enum ServiceCode {
    /**
     * SUCCESS - Not an error; returned on success.
     *
     * common code range 1-100
     */
    SUCCESS = 0,
    /** UNKNOWN - server error */
    UNKNOWN = 1,
    /** USER_NOT_FOUND - user service */
    USER_NOT_FOUND = 100,
    USER_DB_ERROR = 101,
    USER_FETCH_ERROR = 102,
    UNRECOGNIZED = -1
}
export declare function serviceCodeFromJSON(object: any): ServiceCode;
export declare function serviceCodeToJSON(object: ServiceCode): string;
//# sourceMappingURL=ServiceCode.d.ts.map
```
