---
title: WithdrawRecord
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: WithdrawRecord.tsx
---

# WithdrawRecord

```tsx
import { useEffect } from "react";
import { useCashout } from "@/hooks/useCashout";
import { WithdrawStatus } from "@/types/cashout";
import NavigationBar from "@/components/NavigationBar";
import EmptyView from "@/components/EmptyView";
import paypalLogo from "@/assets/images/cash_v2/ic_paypal_logo_2.webp";

const statusConfig: Record<WithdrawStatus, { label: string; color: string }> = {
  [WithdrawStatus.Finished]: { label: "Paid Out", color: "text-black" },
  [WithdrawStatus.Processing]: { label: "Processing", color: "text-[#ff7c32]" },
  [WithdrawStatus.Failed]: { label: "Failed", color: "text-[#ff0000]" },
};

export default function WithdrawRecord() {
  const { withdrawList, fetchWithdrawList } = useCashout();

  useEffect(() => {
    fetchWithdrawList();
  }, [fetchWithdrawList]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavigationBar title="Record" showBorder={false} />

      {withdrawList.length > 0 ? (
        <div className="flex flex-col gap-[10px] mx-5 mt-[30px]">
          {withdrawList.map((info) => {
            const status = statusConfig[info.status] ?? statusConfig[WithdrawStatus.Processing];
            return (
              <div
                key={info.id}
                className="flex justify-between items-start py-[10px] border-b-[0.5px] border-black/10"
              >
                <div className="flex flex-col items-start gap-[10px]">
                  <img src={paypalLogo} alt="PayPal" className="w-[72px] h-6" />
                  <span className={`text-xs font-normal ${status.color}`}>{status.label}</span>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <span className="text-[#212d64] font-[RacingSansOne] text-2xl font-normal">${info.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyView className="flex-1" />
      )}
    </div>
  );
}

```
