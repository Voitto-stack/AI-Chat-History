---
date: 2026-04-14T20:18:21+08:00
source: clipboard
chars: 822
---

<CashoutSuccessModal
            amount={Number(amount)}
            onClose={() => {
              const withdrawList = useCashoutStore.getState().withdrawList;
              const totalCashoutValue = withdrawList.reduce((sum, w) => sum + (w.amount || 0), 0) + Number(amount);
              // 埋点：提现结果 - 最终成功
              bpTrack(EventName.pwa_cashout_result, {
                cashout_value: Number(amount),
                result: "success",
                source: "cashout_modal",
                task_stage: willCashoutStage,
                total_cashout_value: totalCashoutValue,
                total_income: totalCashoutValue + (cash || 0),
              });
              // 成功确认，关闭弹窗
              handleClose();
              onConfirm?.();
            }}
          />
