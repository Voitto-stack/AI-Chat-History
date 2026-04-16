---
title: approvals.service.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.service.d.ts
---

# approvals.service.d

```ts
import { type FastifyRequest, type FastifyReply } from "fastify";
interface AuthenticatedRequest extends FastifyRequest {
    user: {
        id: string;
    };
}
export declare function approvalList(req: AuthenticatedRequest, reply: FastifyReply): Promise<never>;
export declare function approvalGet(req: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function approvalCreate(req: AuthenticatedRequest, reply: FastifyReply): Promise<never>;
export declare function approvalApprove(req: AuthenticatedRequest, reply: FastifyReply): Promise<never>;
export declare function approvalReject(req: AuthenticatedRequest, reply: FastifyReply): Promise<never>;
export declare function approvalExecute(encryptionKey: string): (req: AuthenticatedRequest, reply: FastifyReply) => Promise<never>;
export {};
//# sourceMappingURL=approvals.service.d.ts.map
```
