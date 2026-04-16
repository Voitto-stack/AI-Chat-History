---
title: useBffShare
date: 2026-04-16T11:07:55+08:00
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
import { useBffDashboard, useBffOverview } from "@/hooks/useBff";
import { useUser } from "@/hooks/useUser";
import { BFF_LANDING_PATH } from "@/constants/bff";

export const useBffShare = () => {
  const { dashboard } = useBffDashboard();
  const { overview } = useBffOverview();
  const { userInfo } = useUser();

  const handleShare = async () => {
    const inviteCode = userInfo?.invitationCode || "";
    const inviteUrl = `${window.location.origin}${BFF_LANDING_PATH}?c=${inviteCode}`;

    await shareBffLink({
      text: dashboard?.shareText || `Earn $${overview?.bannerRewardAmount ?? 60} for every friend you invite.`,
      url: inviteUrl,
    });
  };

  return { handleShare };
};

```
