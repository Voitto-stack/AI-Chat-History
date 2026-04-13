---
date: 2026-04-13T10:22:18+08:00
source: clipboard
chars: 411
---

const retentionRes = await protoPost<{
          userRetention: Array<{
            withdrawId: number;
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
          }>;
        }>(4776, {
          requests: tasks.map((t) => ({ withdraw_id: t.id })),
        });
