---
title: UserAvatar
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: UserAvatar.tsx
---

# UserAvatar

```tsx
import { useEffect, useState } from "react";
import { getRemoteUserInfo } from "@/http/userApi";
import { getAvatarUrl, CustomAvatarType } from "@/utils/userUtil";
import Avatar from "@/components/Avatar";
import { useEarningUser } from "@/hooks/useEarningUser";
import type { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

interface UserAvatarProps {
  userId: number;
  className?: string;
}

export default function UserAvatar({ userId, className = "w-8 h-8" }: UserAvatarProps) {
  // 从缓存中获取用户信息
  const { getUserInfo, setUserInfo } = useEarningUser();
  const cachedUserInfo = getUserInfo(userId);
  const [fetchedUserInfo, setFetchedUserInfo] = useState<UserInfo | null>(null);

  // 优先使用缓存，其次使用本地 fetch 结果
  const userInfo = cachedUserInfo ?? fetchedUserInfo;

  useEffect(() => {
    // 如果已有缓存，直接使用，不再请求
    if (!userId || cachedUserInfo) return;

    const fetchUserInfo = async () => {
      try {
        const response = await getRemoteUserInfo({ remoteUserId: userId });
        // getRemoteUserInfo 返回 GetUserBasicInfosV2Response，需要提取第一个用户信息
        if (response.userBasicInfos && response.userBasicInfos.length > 0) {
          const basicInfo = response.userBasicInfos[0];
          // 转换为 UserInfo 格式（UserBasicInfo 包含头像相关字段）
          const userInfo = basicInfo as unknown as UserInfo;
          setUserInfo(userId, userInfo); // 存入全局缓存
          setFetchedUserInfo(userInfo);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId, cachedUserInfo, setUserInfo]);

  const avatarUrl = getAvatarUrl(userInfo, CustomAvatarType.Mid);

  return <Avatar src={avatarUrl} alt="" className={className} />;
}

```
