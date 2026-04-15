---
title: ChatTopCard
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: ChatTopCard.tsx
---

# ChatTopCard

```tsx
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo, UserServiceCommonCode } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { getMatchCardInfo } from "@/http/chatApi";
import { getAvatarUrl, CustomAvatarType, isRealHuman } from "@/utils/userUtil";
import { useMatchCardCache } from "@/hooks/chatList";
import { useUser } from "@/hooks/useUser";
import Avatar from "@/components/Avatar";
import bgHaoganChatTop from "@/assets/images/chat/bg_haogan_chat_top.webp";
import icRightChatTop from "@/assets/images/chat/ic_right_chat_top.svg";
import iconChatTopLeft from "@/assets/images/chat/icon_chat_top_left.svg";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface ChatTopCardProps {
  peerUserInfo: UserInfo | null; // 对方用户信息
  selfUserInfo: UserInfo | null; // 自己的用户信息
}

/**
 * ChatTopCard - 聊天顶部用户信息卡片
 * 显示双方头像、好感度、位置、标签、简介
 */
const ChatTopCard = memo<ChatTopCardProps>(({ peerUserInfo, selfUserInfo }) => {
  const navigate = useNavigate();
  const { cash } = useUser();
  const { cachedUserInfo, setMatchCardInfo } = useMatchCardCache(peerUserInfo?.userId);

  const [locationString, setLocationString] = useState("");

  useEffect(() => {
    if (!peerUserInfo?.userId) return;

    // 提取地理位置
    setLocationString((peerUserInfo.geoLocation?.region?.replace(/\d+/g, "") ?? "").trim());

    const userId = peerUserInfo.userId;

    // 如果已经有缓存，跳过
    if (cachedUserInfo?.matchCardInfo) {
      return;
    }

    // 获取最新数据
    async function fetchMatchInfo(userId: number) {
      try {
        const resp = await getMatchCardInfo(userId);
        if (resp.code === UserServiceCommonCode.Success) {
          setMatchCardInfo(userId, resp);
        }
      } catch {
        // 静默处理
      }
    }

    fetchMatchInfo(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerUserInfo?.userId, setMatchCardInfo, cachedUserInfo?.matchCardInfo]);

  // 直接使用缓存数据，不用 state
  const info = cachedUserInfo?.matchCardInfo;

  // 没有数据时不显示
  if (!info) return null;

  // 提取标签
  const herTags =
    info.peerInterests
      ?.flatMap((tab) => tab.tags?.filter((t) => t.key?.trim() !== "None").map((t) => t.key))
      .filter(Boolean)
      .join("、") ?? "";

  const peerAvatar = info.customAvatar?.minUrl || getAvatarUrl(peerUserInfo, CustomAvatarType.Min);
  const selfAvatar = getAvatarUrl(selfUserInfo, CustomAvatarType.Min);
  const showLocation = locationString && locationString !== "unknown" && !locationString.startsWith("unknown,");
  const displayLocation = locationString.endsWith(",") ? locationString.slice(0, -1) : locationString;
  const bioOrSuggestions =
    peerUserInfo?.bio || (Array.isArray(info.suggestions) ? info.suggestions.join("、") : info.suggestions);

  const handleClick = () => {
    if (peerUserInfo?.userId) {
      // 埋点：聊天资料卡点击
      bpTrack(EventName.pwa_chat_profile_card_click, {
        target_user_id: peerUserInfo.userId,
        earning_value: 0, // 点击资料卡不产生收益
        total_earning_value: cash ?? 0,
        target_user_type: isRealHuman(peerUserInfo) ? "real" : "dh",
      });
      navigate("/profile", { state: { userId: peerUserInfo.userId } });
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-[12px] bg-[rgba(0,0,0,0.27)] p-5 font-[Pangram]" onClick={handleClick}>
      {/* 头像行 */}
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5">
          <Avatar src={peerAvatar} alt="peer" className="h-[49px] w-[49px]" />
          <span
            className="flex h-[49px] w-[49px] items-center justify-center rounded-full bg-cover bg-center text-[12px] font-bold text-white/95"
            style={{
              backgroundImage: `url(${bgHaoganChatTop})`,
              textShadow: "1px 0 0 #ff6130, -1px 0 0 #ff6130, 0 1px 0 #ff6130, 0 -1px 0 #ff6130",
            }}
          >
            {info.matchScore ?? 0}%
          </span>
          <Avatar src={selfAvatar} alt="self" className="h-[49px] w-[49px]" />
        </div>
        <div className="flex items-center gap-0.5 text-[13px] text-white/70">
          Profile
          <img src={icRightChatTop} alt="arrow" className="h-4 w-4" />
        </div>
      </div>

      {/* 详细信息 */}
      {showLocation && <InfoRow icon={iconChatTopLeft} label="Location:" value={displayLocation} />}
      {herTags && <InfoRow icon={iconChatTopLeft} label="His tags:" value={herTags} />}
      {bioOrSuggestions && <InfoRow icon={iconChatTopLeft} value={bioOrSuggestions} />}
    </div>
  );
});

// 信息行组件
const InfoRow = memo<{ icon: string; label?: string; value: string }>(({ icon, label, value }) => (
  <div className="flex items-start gap-1 text-[13px] leading-[18px] tracking-[-0.23px] text-white/70">
    <img src={icon} alt="icon" className="mt-0.5 h-4 w-4 shrink-0" />
    <p>
      {label && <>{label} </>}
      <span className="text-white">{value}</span>
    </p>
  </div>
));

export default ChatTopCard;

```
