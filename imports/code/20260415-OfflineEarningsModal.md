---
title: OfflineEarningsModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: OfflineEarningsModal.tsx
---

# OfflineEarningsModal

```tsx
import { FC, useEffect, useState } from "react";
import { useOfflineEarningsStore, type EarningsData } from "@/stores/offlineEarningsStore";
import { useUserStore } from "@/stores/userStore";
import { useModalStore } from "@/stores/modalStore";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

export const OFFLINE_EARNINGS_MODAL_ID = "offline-earnings";

interface Props {
  earnings: EarningsData;
}

export const OfflineEarningsModal: FC<Props> = ({ earnings }) => {
  const [loading, setLoading] = useState(false);
  const claimEarnings = useOfflineEarningsStore((s) => s.claimEarnings);
  const setCash = useUserStore((s) => s.setCash);
  const closeModal = useModalStore((s) => s.close);
  const userInfo = useUserStore((s) => s.userInfo);

  // 埋点：离线收益弹窗展示
  useEffect(() => {
    bpTrack(EventName.pwa_ai_avatar_earnings_pop_up_show, {
      total: earnings.total,
      instagram: earnings.instagram,
      idle: earnings.idle,
      reward_amount: earnings.total,
      reward_type: "offline_earnings",
    });
  }, [earnings]);

  const handleClaim = async () => {
    if (loading) return;

    // 埋点：离线收益领取点击
    bpTrack(EventName.pwa_ai_avatar_earnings_pop_up_click, {
      total: earnings.total,
      reward_amount: earnings.total,
      reward_type: "offline_earnings",
    });
    bpTrack(EventName.pwa_offline_earnings_claim, {
      total: earnings.total,
    });

    setLoading(true);
    const result = await claimEarnings();

    if (result.success && result.balance) {
      setCash(parseFloat(result.balance));
      closeModal(OFFLINE_EARNINGS_MODAL_ID);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 pb-8 shadow-xl">
        {/* 用户头像 - 绝对定位在顶部外侧 */}
        {userInfo?.emojiAvatar && (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <img src={userInfo.emojiAvatar} alt="" className="h-24 w-24 rounded-full border-4 border-white shadow-lg" />
          </div>
        )}

        {/* 内容区域 - 留出头像空间 */}
        <div className="mt-8">
          {/* 标题 */}
          <h2 className="text-center text-xl font-bold text-gray-900">Earnings from AI avatar</h2>

          {/* 总金额 */}
          <div className="mt-4 text-center text-4xl font-bold text-green-600">${earnings.total.toFixed(2)}</div>

          {/* 收益明细 */}
          <div className="mt-6 space-y-3">
            {earnings.instagram > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">INS Assistant</span>
                <span className="text-base font-bold text-purple-600">${earnings.instagram.toFixed(2)}</span>
              </div>
            )}

            {earnings.idle > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Mining reward</span>
                <span className="text-base font-bold text-blue-600">${earnings.idle.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* 领取按钮 */}
          <button
            onClick={handleClaim}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Claim"}
          </button>
        </div>
      </div>
    </div>
  );
};

```
