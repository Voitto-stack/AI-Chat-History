# 修复：通话结束时补做一次违规扣款检查

## Context
真实通话中违规3次后挂断电话，earned 没有被扣款。原因是 `checkAndDeduct` 每60秒才执行一次，通话在定时器触发前结束，扣款就漏掉了。`setExitCall(true)` 会清掉定时器，且在 `showCallRecordModal()` 之前没有做最后一次扣款检查。

## 修改文件
`src/prod/live/call/AVCallContext.tsx`

## 修改位置
通话结束回调中（约 line 1073），在 `setExitCall(true)` 之前或 `showCallRecordModal()` 之前，内联一次扣款检查逻辑：

```ts
// === 通话结束前，补做一次违规扣款检查 ===
const finalViolationCount = sharedViolationCountRef.current ?? 0;
if (finalViolationCount >= 3 && !violationDeductedRef.current) {
  const callOrderId = isTestCallRef.current
    ? testVideoInfoRef.current?.orderId || 0
    : chatOrderManagerV2.getCallingOrderId(remoteUserId.current) || 0;
  if (callOrderId > 0) {
    try {
      await requestPost2(PwaEarnDeductionRequest, { callOrderId }, PwaEarnDeductionResponse);
      totalDeductedMinutesRef.current += 1;
    } catch (error) {
      logger.error(TAG, "[通话结束] 补扣款失败:", error);
    }
  }
}
```

插入位置：在 `GlobalDestroyAllModals()` 之后、`showCallRecordModal()` 之前（约 line 1088-1089 之间）。

## 验证
1. 发起真实通话，触发3次违规
2. 在60秒内挂断
3. Console 确认补扣款执行
4. 结算弹窗 earned 应反映扣款后的金额
