---
title: useBffShare
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useBffShare.ts
---

# useBffShare

```ts
/**
 * BFF 分享邀请链接的通用 Hook
 * 封装分享逻辑，供所有 BFF 相关弹窗复用
 */

import { shareBffLink } from "@/utils/bffShare";
import { useBffOverview } from "@/hooks/useBff";
import { useUser } from "@/hooks/useUser";

export const useBffShare = () => {
  const { overview } = useBffOverview();
  const { userInfo } = useUser();

  const handleShare = async () => {
    const inviteCode = userInfo?.invitationCode || "";
    const inviteUrl = `${window.location.origin}/invite.html?c=${inviteCode}`;

    await shareBffLink({
      text: `Earn $${overview?.bannerRewardAmount ?? 60} for every friend you invite.`,
      url: inviteUrl,
    });
  };

  return { handleShare };
};

```
